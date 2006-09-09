/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard.
 * (C) 2006 Vladislav SHCHapov, phprus@gmail.com
 * (C) 2006 Ilya Lebedev <ilya@lebedev.net>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * See http://www.gnu.org/copyleft/lesser.html
 *
 * Do not remove this comment if you want to use script!
 * Не удаляйте данный комментарий, если вы хотите использовать скрипт!
 *
 * @author Vladislav SHCHapov <phprus@gmail.com>
 * @author Ilya Lebedev <ilya@lebedev.net>
 * @version $Rev$
 * @modified Yuriy Nasretdinov
 * @lastchange $Author$ $Date$
 */

/*
*  The Virtual Keyboard
*
*  @class virtualKeyboard
*/
var VirtualKeyboard = new function () {
  var self = this;
  /*
  *  ID prefix
  *
  *  @type String
  *  @access private
  */
  var idPrefix = 'kb_b';
  /*
  *  Keyboard keys mapping, as on the keyboard
  *
  *  @type Array
  *  @access private
  */
  var keymap = [192,49,50,51,52,53,54,55,56,57,48,109,61,220,8, // ~ to BS
                9,81,87,69,82,84,89,85,73,79,80,219,221,13,     // TAB to ENTER
                20,65,83,68,70,71,72,74,75,76,59,222,           // CAPS to '
                16,90,88,67,86,66,78,77,188,190,191,16,         // SHIFT to SHIFT
                46,32];                                         // SPACE, Delete
//                17,18,32,18,17,                                 // CTRL to CTRL
//                46];                                            // Delete
  /*
  *  Special letter-replacements
  *
  *  @see http://en.wikipedia.org/wiki/Complex_Text_Layout
  *  @type Array
  *  @access private
  */
  var ligatures = [ // started from 0xe000
   "\u0638\u064b", "\u0644\u0627", "\u0644\u0625", 
   "\u0644\u0623", "\u0644\u0622", "\u0631\u064a\u0627\u0644",
   "\u094d\u0930", "\u0930\u094d", "\u091c\u094d\u091e", "\u0924\u094d\u0930",
   "\u0915\u094d\u0937", "\u0936\u094d\u0930", "\u0644\u0627\u064b",
  ];
  /*
  *  CSS classes will be used to style buttons
  *
  *  @type Object
  *  @access private
  */
  var cssClasses = {
    'buttonUp' : 'kbButton',
    'buttonDown' : 'kbButtonDown',
    'buttonHover' : 'kbButtonHover',
    'buttonNormal' : 'normal',
    'buttonShifted' : 'shifted',
    'capslock' : 'capsLock'
  }
  /*
  *  current layout
  *
  *  @type Object
  *  @access public
  */
  var lang = {'code' : null,
              'lyt' : null
             };
  /*
  *  Available layouts
  *
  *  Array contains layout, it's 'shifted' difference and name
  *  Structure:
  *   [
  *    ['alpha' : Array, // key codes
  *     'diff' : Object { <start1> : Array, // array of symbols, could not be taken with toUpperCase
  *                       <start2> : Array,
  *                     }
  *    ].name=<layout_code>,
  *    {...}
  *   ].name = <lang_code>
  *
  *  @type Object
  *  @access private
  */
  var layout = [];
  /*
  *  toString overload method for the layouts and languages
  *
  *  @type function
  *  @access protected
  */
  var layoutToString = function () {
    return this.name;
  }
  /*
  *  Shortcuts to the nodes
  *
  *  @type Object
  *  @access private
  */
  var nodes = {
    keyboard : null,    // Keyboard container @type HTMLDivElement
    desk : null,        // Keyboard desk @type HTMLDivElement
    langbox : null      // Layout selector @type HTMLSelectElement
  }
  /*
  *  Stores flags state
  *
  *  @type Object
  *  @access private
  */
  var flags = {
    isOpen : false,       // virtual keyboard open state
    shift : false,        // Shift
    caps : false,         // CapsLock
    kbd_shift : false,    // real shift
    kbd_caps : false,     // real capslock
    skip_keyup : false,   // used to skip letter type, when keyboard key is released
    blockRealKey : false, // used to block input, when it converted to virtual
    translateKeys : false,// when true - translate real keys to virtual letters
    new_lang : false      // used to prevent language switch on auto-repeat
  }

  /**************************************************************************
  **  KEYBOARD LAYOUT
  **************************************************************************/
  /*
  *  Remove layout from the list
  *
  *  @param {String} layout code
  *  @return {Boolean} removal state
  *  @access public
  */
  this.removeLayout = function (code) {
    if ('string' != typeof code || !layout[code]) return false;
    for (var i in layout) {
      if (!hasOwnProperty(code) || i==code) continue;
      /*
      *  if we have more than 1 layout available, delete requested one
      */
      delete (layout[code]);
      /*
      *  it was used before
      */
      if (lang.code == code) this.switchLayout(i);
      updateLangList();
      return true;
    }
    /*
    *  we will not delete only one available layout
    */
    return false;
  }
  /*
  *  Add layout to the list
  *
  *  @see layout
  *  @param {String} layout code
  *  @param {String} layout name
  *  @param {Array} keycodes
  *  @param {Object} differences
  *  @param {Boolean} optional overwrite existing layout or no
  *  @return {Boolean} addition state
  *  @access public
  */
  this.addLayout = function(code, name, alpha, diff, override) {
    if ('string' == typeof code && (alpha instanceof Array) && (diff instanceof Object)) {
      /*
      *  trick to decode possible HTML entities
      */
      var span = document.createElement('span');
      span.innerHTML = code;
      code = span.firstChild.nodeValue.toUpperCase();
      span.innerHTML = name;
      name = span.firstChild.nodeValue;


      var pos = layout.indexOf(code);
      /*
      *  add language, if it does not exists
      */
      if (pos < 0) {
        var lng = [];
        /*
        *  overload toString, for the search/
        */
        lng.toString = layoutToString;
        /*
        *  name for lookup/sorting
        */
        lng.name = code;

        pos = layout.length;
        layout[pos] = lng;
      }
      var pos_lt = layout[pos].indexOf(name);
      /*
      *  add layout, if it does not exists
      */
      if (pos_lt<0) {
        var lt = {};
        /*
        *  overload toString, for the search/
        */
        lt.toString = layoutToString;
        lt.name = name;
        pos_lt = layout[pos].length;
        layout[pos][pos_lt] = lt;
      }
      /*
      *  add control keys
      */
      alpha.splice(14,0,'backspace');
      alpha.splice(15,0,'tab');
      alpha.splice(28,0,'enter');
      alpha.splice(29,0,'caps');
      alpha.splice(41,0,'shift_left');
      alpha.splice(52,0,'shift_right');
      alpha.splice(53,0,'del');
      alpha.splice(54,0,'space');
      layout[pos][pos_lt].alpha = alpha;
      layout[pos][pos_lt].diff = diff;
      /*
      *  sort things...
      */
      layout.sort();
      layout[pos].sort();

      return true;
    }
    return false;
  }
  /*
  *  Set current layout
  *
  *  @param {String} language code
  *  @param {String} layout code
  *  @return {Boolean} change state
  *  @access public
  */
  this.switchLayout = function (code, name) {
    if (nodes.desk == null                             // no keyboard initialized
        || (code!=null && layout.indexOf(code)<0       // code == null means current language
           && code == lang.code)                       // or if current and new langs are equal
        || !(code=code?code:lang.code)                 // even if code == null, it should have a valid value
        || (name!=null && layout[layout.indexOf(code)].indexOf(name)<0  // name == null means current layout
           && name == lang.lyt))                       // or if current and new layouts are equal
      return false;
    /*
    *  name to index conversion
    */
    code = layout.indexOf(code);
    name = layout[code].indexOf(name==null?lang.lyt:name);
    /*
    * if layout still could not be found - use first found one
    */
    if (!layout[code][name]) name=0; 
    /*
    *  die, if layout does not exists
    */
    if ('undefined' == typeof (layout[code][name])) return false;
    /*
    *  we will use old but quick innerHTML
    */
    var btns = "", i;

    var lyt = layout[code][name];
    var zcnt = 0;
    for (i=0, aL = lyt.alpha.length; i<aL; i++) {
      var chr = lyt.alpha[i];
      btns +=  "<div id=\""+idPrefix+(parseInt(chr)?zcnt++:chr)
              +"\" class=\""+cssClasses['buttonUp']
              +"\"><a href=\"#"+i+"\""
              +">"+(parseInt(chr)?"<span>"+((ligatures[chr - 0xe000])?ligatures[chr - 0xe000] // perform the lookup...
                                                                     :String.fromCharCode(chr))+"</span>"
                                          :"")+"</a></div>";
    }
    nodes.desk.innerHTML = btns;
    /*
    *  add shiftable elements
    */
    for (i in lyt.diff) {
      if (parseInt(i) != NaN && lyt.diff[i] instanceof Array) {
        for (var k=0, sL = lyt.diff[i].length; k<sL; k++) {
          var chr = lyt.diff[i][k];
          var btn = document.getElementById(idPrefix+((parseInt(i)+k)));
          btn.firstChild.innerHTML += "<span class=\""+cssClasses['buttonShifted']+"\">"
                                     +((ligatures[chr - 0xe000])?ligatures[chr - 0xe000] // perform the lookup...
                                                                :String.fromCharCode(chr))
                                     +"</span>";
          btn.firstChild.firstChild.className = cssClasses['buttonNormal'];
        }
      }
    }
    lang.code = layout[code];
    lang.lyt = lyt;
    /*
    *  restore capslock state
    */
    var caps = document.getElementById(idPrefix+'caps');
    if (caps && flags.caps) {
      caps.className += ' '+cssClasses['buttonDown'];
    }
    /*
    *  restore shift state
    */
    var shift = document.getElementById(idPrefix+'shift_left');
    if (shift && flags.shift) {
      shift.className += ' '+cssClasses['buttonDown'];
      shift = document.getElementById(idPrefix+'shift_right');
      shift.className += ' '+cssClasses['buttonDown'];
      this.toggleShift();
   }
  }
  /*
  *  Toggle Shift keys
  *
  *  @access private
  */
  this.toggleShift = function (force) {
    var lng = layout[layout.indexOf(lang.code)],
        diff = lng[lng.indexOf(lang.lyt)].diff;
    for (var i in diff) {
      if (parseInt(i) != NaN && diff[i] instanceof Array) {
        for (var k=0, sL = diff[i].length; k<sL; k++) {
          var btn = document.getElementById(idPrefix+(parseInt(i)+k));
          /*
          *  swap symbols and its CSS classes
          */
          btn.firstChild.appendChild(btn.firstChild.firstChild);
          btn.firstChild.firstChild.className = cssClasses['buttonNormal'];
          btn.firstChild.lastChild.className = cssClasses['buttonShifted'];
        }
      }
    }
  }
  /*
  *  Update layout selector
  *
  *  @see langbox
  *  @return update state
  *  @access private
  */
  var updateLangList = function () {
    if (nodes.langbox == null) return false;
    var osel = lang.code;
    nodes.langbox.options.length = 0;
    for (var i=0,lL=layout.length; i<lL; i++) {
      nodes.langbox.options[nodes.langbox.options.length] = new Option(layout[i], layout[i], layout[i]==osel);
    }
    nodes.langbox.value = lang.code;
    return true;
  }
  /*
  *  Update layouts for the selected language
  *
  *  @see langbox
  *  @see lang
  *  @return update state
  *  @access private
  */
  var updateLayoutList = function () {
    if (nodes.lytbox == null) return false;
    var osel = lang.name;
    nodes.lytbox.options.length = 0;
    var lyt = layout[layout.indexOf(lang.code)];
    for (var i=0,lL=lyt.length; i<lL; i++) {
      nodes.lytbox.options[nodes.lytbox.options.length] = new Option(lyt[i], lyt[i], lyt[i]==osel);
    }
    nodes.lytbox.value = lang.code;
    nodes.lytbox.disabled = nodes.lytbox.options.length<2;
    return true;
  }
  /*
  *  Used to rotate langs (or set prefferred one, if legal code is specified)
  *
  *  @param {String} optional language code
  *  @access private
  */
  this.setNextLang = function (lng) {
    if ('string' == typeof lng) lng = lng.toUpperCase();
    var osel;
    if ((osel = layout.indexOf(lng))<0) {
      /*
      *  if no such language, just switch to next one
      */
      osel = layout.indexOf(lang.code);
      osel++;
      if (osel > layout.length-1) osel = 0;
    }
    /*
    *  no need to switch to the same language
    */
    if (lang.code == layout[osel]) return false;

    self.switchLayout(layout[osel].toString(),0);
    nodes.langbox.options[osel].selected = true;
    updateLayoutList()
  }
  /*
  *  Used to rotate lang layouts
  *
  *  @param {String} optional layout code
  *  @access private
  */
  this.setNextLayout = function (lng) {
    if ('string' == typeof lng) lng = lng.toUpperCase();
    var osel, lyt = layout[layout.indexOf(lang.code)];

    if ((osel = lyt.indexOf(lng))<0) {
      /*
      *  if no such language, just switch to next one
      */
      osel = lyt.indexOf(lang.lyt);
      osel++;
      if (osel > lyt.length-1) osel = 0;
    }
    /*
    *  no need to switch to the same language
    */
    if (lang.lyt == lyt[osel]) return false;

    self.switchLayout(null,lyt[osel].toString());
    nodes.lytbox.options[osel].selected = true;
  }
  /***************************************************************************************
  ** GLOBAL EVENT HANDLERS
  ***************************************************************************************/
  /*
  *  Do the key clicks, caught from both virtual and real keyboards
  *
  *  @param {HTMLInputElement} key on the virtual keyboard
  *  @access private
  */
  var _keyClicker_ = function (key) {
    var chr = "";
    switch (key) {
      case "caps" :
        return;
      case "shift" :
      case "shift_left" :
      case "shift_right" :
        /*
        *  toggle the keyboard shift state
        */
        self.toggleShift();
        return;
      case 'backspace':
        DocumentSelection.deleteAtCursor(attachedInput, false);
        break;
      case 'del':
        DocumentSelection.deleteAtCursor(attachedInput, true);
        break;
      case 'space':
        chr = " ";
        break;
      case 'tab':
        chr = "\t";
        break;
      case 'enter':
        chr = "\n";
        break;
      default:
        var el = document.getElementById(idPrefix+key);
        chr = el.firstChild.firstChild.firstChild.nodeValue;
        /*
        *  do uppercase if either caps or shift clicked, not both
        */
        if (flags.shift ^ flags.caps && el.firstChild.firstChild==el.firstChild.lastChild) chr = chr.toUpperCase();
        /*
        *  reset shift state, if clicked on the letter button
        */
        if (!flags.kbd_shift && flags.shift && el.firstChild.firstChild == el.firstChild.lastChild) {
          /*
          *  we need firstChild here and on other places to be sure that we point to 'a' node
          */
          document.getElementById(idPrefix+'shift_left').firstChild.fireEvent('onmousedown');
        }
        break;
    }
    if (chr) {
      /*
      *  use behavior of real keyboard - replace selected text with new input
      */
      if (DocumentSelection.getStart(attachedInput) != DocumentSelection.getEnd(attachedInput))
        DocumentSelection.deleteAtCursor(attachedInput);
      DocumentSelection.insertAtCursor(attachedInput,chr);
      /*
      *  check for right-to-left languages
      */
      if (chr.charCodeAt (0) > 0x5b0 && chr.charCodeAt (0) < 0x6ff)
        attachedInput.dir = "rtl";
    }

  }
  /*
  *  Captures some keyboard events
  *
  *  @param {Event} keydown
  *  @access protected
  */
  var _keydownHandler_ = function(e) {
    /*
    *  it's global event handler. do not process event, if keyboard is closed
    */
    if (!flags.isOpen) return;
    e = e || window.event;
    /*
    *  differently process different events
    */
    switch (e.type) {
      case 'keydown' :
        /*
        *  switch languages
        */
        var s = "";
        for(var i in e) {
          if ('function' != typeof e[i] && i.indexOf('DOM_')<0
          && i != i.toUpperCase()
          ) s+=i+":"+e[i]+"\n";
        }
        if (e.shiftKey && e.ctrlKey && !e.altKey && !flags.new_lang) {
          flags.new_lang = true;
          self.setNextLang();
        }
        /*
        *  switch layouts
        */
        if (e.shiftKey && e.altKey && !e.ctrlKey && !flags.new_lang) {
          flags.new_lang = true;
          self.setNextLayout();
        }
        switch (e.keyCode) {
          case 16: //shift
            if (flags.kbd_shift) return;
            /*
            *  kbd_shift flag is used to fix shift key pressed, while keyboard does autoswitch it
            */
            flags.kbd_shift = true;
            document.getElementById(idPrefix+'shift_left').firstChild.fireEvent('onmousedown');
            return false;
          case 20://caps lock
            if (flags.kbd_caps) return;
            /*
            *  prevent CAPS from auto-switch
            */
            flags.kbd_caps = true;
            document.getElementById(idPrefix+'caps').firstChild.fireEvent('onmousedown');
            return;
          case 27:
            VirtualKeyboard.close();
            return false;
          default:
            /*
            *  skip keypress if alt or ctrl pressed and key translation allowed
            */
            if (flags.translateKeys && keymap.indexOf(e.keyCode)>-1 && !e.altKey && !e.ctrlKey) {
              /*
              *  mouseup needed to insert the key
              */
              nodes.desk.childNodes[keymap.indexOf(e.keyCode)].firstChild.fireEvent('onmouseup')
              /*
              *  then mousedown, to show pressed state
              */
              nodes.desk.childNodes[keymap.indexOf(e.keyCode)].firstChild.fireEvent('onmousedown');
              flags.blockRealKey = true;
            }
        }
        break;
      case 'keyup' :
        /*
        *  reset flag, language can be switched on the next keypress
        */
        flags.new_lang = false;
        if (keymap.indexOf(e.keyCode)>-1) {
          /*
          *  skip unwanted letter creation
          */
          flags.skip_keyup = true;
          nodes.desk.childNodes[keymap.indexOf(e.keyCode)].firstChild.fireEvent('onmouseup')
        }
        switch (e.keyCode) {
          case 16: //shift
            flags.kbd_shift = false;
            document.getElementById(idPrefix+'shift_left').firstChild.fireEvent('onmousedown');
            return false;
          case 20: //caps
            flags.kbd_caps = false;
            return false;
        }
        break;
      case 'keypress' :
        /*
        *  flag is set only when virtual key passed to input target
        */
        if (flags.blockRealKey) {
          /*
          *  reset flag
          */
          flags.blockRealKey = false;
          e.returnValue = false;
          if (e.preventDefault) e.preventDefault();
          return false;
        }
    }
  }
  /*
  *  Handle clicks on the buttons, actually used with mouseup event
  *
  *  @param {Event} mouseup event
  *  @access protected
  */
  var _btnClick_ = function (e) {
    /*
    *  either a pressed key or something new
    */
    var el = getParent(e.srcElement||e.target,'a');
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;
    var key = el.id.substring(idPrefix.length);
    switch (key) {
      case "caps":
      case "shift_left":
      case "shift_right":
        break;
      default:
        el.className = el.className.replace(new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),"");
        /*
        *  mouse event captures 'mouseup' to have better response
        *  but real keyboard uses mouseup event to 'release' virtual key w/o real keypress
        */
        if (!flags.skip_keyup) _keyClicker_(key);
    }
    flags.skip_keyup = false;
  }
  /*
  *  Handle mousedown event
  *
  *  Method is used to set 'pressed' button state and toggle shift, if needed
  *  Additionally, it is used by keyboard wrapper to forward keyboard events to the virtual keyboard
  *
  *  @param {Event} mousedown event
  *  @access protected
  */
  var _btnMousedown_ = function (e) { 
    /*
    *  either pressed key or something new
    */
    var el = getParent(e.srcElement||e.target, 'a'); 
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;
    var key = el.id.substring(idPrefix.length);
    switch (key) {
      case "caps":
        var cp = document.getElementById(idPrefix+'caps');
        if (flags.caps = (!flags.caps))
          cp.className += ' '+cssClasses['buttonDown'];
        else
          cp.className = cp.className.replace (new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),'');
        /*
        *  start personal clicker
        */
        _keyClicker_(key);
        break;
      case "shift_left":
      case "shift_right":
        /*
        *  if event came from both keyboard and mouse - skip it
        */
        if (e.shiftKey && flags.shift) break;
        var s1 = document.getElementById(idPrefix+'shift_left'),
            s2 = document.getElementById(idPrefix+'shift_right'),
            ofs = flags.shift;
        /*
        *  update keys state
        *  shift is toggled in the following cases:
        *  1. keyboard shift is pressed, virtual is not
        *  2. keyboard shift is released
        *  3. keyboard shift is not pressed, vitrual is pressed
        *  4. keyboard shift is not pressed, virtual is released
        */
        if ((flags.shift = (!flags.shift | flags.kbd_shift)))
          s1.className = s2.className = s1.className+" "+cssClasses['buttonDown'];
        else
          s1.className = s2.className = s1.className.replace (new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),'');
        /*
        *  start personal clicker, in case if Shift is not pressed
        */
        if (ofs != flags.shift) _keyClicker_(key);
        break;
      /*
      *  any real pressed key
      */
      default:
        el.className += ' '+cssClasses['buttonDown'];
        return;
    }
    /*
    *  do uppercase transformation
    */
    if (flags.caps ^ !flags.shift)
      nodes.desk.className = nodes.desk.className.replace(new RegExp("\\s*\\b"+cssClasses['capslock']+"\\b","g"),"");
    else 
      nodes.desk.className += ' '+cssClasses['capslock'];

  }
  /*
  *  Handle mouseout event
  *
  *  Method is used to remove 'pressed' button state
  *
  *  @param {Event} mouseup event
  *  @access protected
  */
  var _btnMouseout_ = function (e) { 
    /*
    *  either pressed key or something new
    */
    var el = getParent(e.srcElement||e.target, 'a'); 
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;

    var cn = el.className.replace(new RegExp("\\s*\\b"+cssClasses['buttonHover']+"\\b","g"),"");
    /*
    *  hard-to-avoid IE bug cleaner. if 'hover' state is get removed, button looses it's 'down' state
    *  should be applied for every button, needed to save 'pressed' state on mouseover/out
    */
    if (el.id.indexOf('shift')>-1) {
      /*
      *  both shift keys should be blurred
      */
      var s1 = document.getElementById(idPrefix+'shift_left'),
          s2 = document.getElementById(idPrefix+'shift_right');
      s1.className = s2.className = cn;
    } else {
      el.className = cn;
    }
  }
  /*
  *  Handle mouseover event
  *
  *  Method is used to remove 'pressed' button state
  *
  *  @param {Event} mouseup event
  *  @access protected
  */
  var _btnMouseover_ = function (e) { 
    /*
    *  either pressed key or something new
    */
    var el = getParent(e.srcElement||e.target, 'a'); 
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;
    el.className += ' '+cssClasses['buttonHover'];
    /*
    *  both shift keys should be highlighted
    */
    if (el.id.indexOf('shift')>-1) {
      var s1 = document.getElementById(idPrefix+'shift_left'),
          s2 = document.getElementById(idPrefix+'shift_right');
      s1.className = s2.className = el.className;
    }
  }
  /*
  *  blocks link behavior
  *
  *  @param {Event} event to be blocked
  *  @access protected
  */
  var _blockLink_ = function (e) {
    /*
    *  either pressed key or something new
    */
    var el = getParent(e.srcElement||e.target, 'a'); 
    if (!el) return;

    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
    if (e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
  }
  /**********************************************************
  *  MOST COMMON METHODS
  **********************************************************/
  /*
  *  Used to attach keyboard output to specified input
  *
  *  @param {HTMLInputElement,String} element to attach keyboard to
  *  @return attach state
  *  @access public
  */
  self.attachInput = function (el) {
    if ('string' == typeof el) el = document.getElementById(el);
    /*
    *  only inputable nodes are allowed
    */
    if (!el || !el.tagName || (el.tagName.toLowerCase() != 'input' && el.tagName.toLowerCase() != 'textarea')) return false;
    attachedInput = el;
    attachedInput.focus();
    return true;
  }
  /*
  *  Shows keyboard
  *
  *  @return {Boolean} operation state
  *  @access public
  */
  self.show = function (input){
    if (input && !self.attachInput(input)) return false;
    if (!nodes.keyboard || !document.body || attachedInput == null) return false;
    /*
    *  check pass means that node is not attached to the body
    */
    if (!nodes.keyboard.offsetParent) {
      document.body.appendChild(nodes.keyboard);
      /*
      *  add event listener personally to the checkbox
      */
      document.getElementById('virtualKeyboardTranslator').attachEvent('onchange',function(e){flags.translateKeys = (e.srcElement||e.target).checked;});
    }
    /*
    *  creat the list of available languages
    */
    updateLangList();
    /*
    *  show the buttons...
    */
    if (lang.code == null) self.setNextLang('ar');
    /*
    * create the list of available layouts
    */
    updateLayoutList();
    /*
    *  special, for IE
    */
    setTimeout(function(){nodes.keyboard.style.visibility = 'visible'},1);
    var x = getClientCenterX(),
        y = getClientCenterY();
    nodes.keyboard.style.left = (x-nodes.keyboard.clientWidth/2) + 'px';
    nodes.keyboard.style.top = (y-nodes.keyboard.clientHeight/2) + 'px';

    /*
    *  set open flag, for the internal checks
    */
    flags.isOpen = true;

    return true;
  }
  /*
  * Закрытие клавиатуры
  */
  self.close = function () {
    if (!nodes.keyboard) return false;
    nodes.keyboard.style.visibility = 'hidden';
    attachedInput = null;
    /*
    *  keyboard is closed, no more keyboard-related stuff processing
    */
    flags.isOpen = false;
//    capslock = false;
//    shift = false;
//    toggle
  }
  /*
  *  Keyboard constructor
  *
  *  @constructor
  *  @access public
  */
  __construct = function() {
    nodes.keyboard = document.createElement("DIV");
    nodes.keyboard.id = "virtualKeyboard";
    nodes.keyboard.style.visibility = 'hidden';

    nodes.keyboard.innerHTML = 
      '<div id="kbHeader"><div id="kbHeaderLeft">Virtual Keyboard'
      +'<a href="#" id="kbHeaderRight" onclick="VirtualKeyboard.close(); return false;" alt="Close">&nbsp;</a></div></div>'
     +'<div id="kbDesk"></div>'
     +'<label class="kbTranslatorLabel" for="virtualKeyboardTranslator"><input type="checkbox" id="virtualKeyboardTranslator" />A->Z</label>'
     +'<div id="kb_langselector"><select onchange="VirtualKeyboard.setNextLang(this.value)"></select><select onchange="VirtualKeyboard.setNextLayout(this.value)"></select></div>';
    /*
    *  reference to keyboard desk
    */
    nodes.desk = nodes.keyboard.childNodes[1];
    /*
    *  reference to layout selector
    */
    nodes.langbox = nodes.keyboard.lastChild.firstChild;
    nodes.lytbox = nodes.keyboard.lastChild.lastChild;

    nodes.keyboard.attachEvent('onmousedown', _btnMousedown_);
    nodes.keyboard.attachEvent('onmouseup', _btnClick_);
    nodes.keyboard.attachEvent('onmouseover', _btnMouseover_);
    nodes.keyboard.attachEvent('onmouseout', _btnMouseout_);
    nodes.keyboard.attachEvent('onclick', _blockLink_);
    nodes.keyboard.attachEvent('ondragstart', _blockLink_);

    //Перемещение окна
    __DDI__.setPlugin('fixNoMouseSelect');
    __DDI__.setPlugin('moveIT');
    __DDI__.setPlugin('adjustZIndex');
    __DDI__.setPlugin('fixDragInMz');
    __DDI__.setPlugin('fixDragInIE');
    if (nodes.keyboard) {
            nodes.keyboard.alwaysOnTop = true;
            // Required, it's just blank event handler to initialize library
            nodes.keyboard.__onDragStart = function (e) {
                    if (e.__target.id != 'virtualKeyboard') return;
                    e.__dataTransfer.effectAllowed = 'none';
            }
            // Disallow any drag effects, if any...
            nodes.keyboard.__onDrag = function (e) {
                    return false;
            }
            // Initializes move.
            nodes.keyboard.__onMoveStart = function (e) {
              //Window could be dragged using header bar only.
              var p = e.__target;
              while (p.offsetParent) {
                if (p.id == 'kbHeaderLeft') return true;
                if (p.id == 'kbHeaderRight') return false;
                p = p.parentNode;
              }
              return false;
            }
            // Checks constraits and tells moveIT plugin how it can move window
            nodes.keyboard.__onMove = function (e) {
              var r = {'x' : {'move' : true,
                              'min' : 5,
                              'max' : getClientWidth()-25
                             },
                       'y' : { 'move' : true,
                               'min' : 5,
                               'max' : getClientHeight()-25
                             }
                      };
              return r;
            }
    }

    /*
    *  attach key capturer
    */
    document.attachEvent('onkeydown', _keydownHandler_);
    document.attachEvent('onkeyup', _keydownHandler_);
    document.attachEvent('onkeypress', _keydownHandler_);
  }
  /*
  *  call the constructor
  */
  __construct();
}
VirtualKeyboard.addLayout('ru','Russian', 
[1105,49,50,51,52,53,54,55,56,57,48,45,61,92,1081,1094,1091,1082,1077,1085,1075,1096,1097,1079,1093,1098,1092,1099,1074,1072,1087,1088,1086,1083,1076,1078,1101,1103,1095,1089,1084,1080,1090,1100,1073,1102,46],
{'1': [33,34,8470,59,37,58,63,42,40,41,95,43,47],
'47': [44]});
VirtualKeyboard.addLayout('ru','&#1103;&#1046;&#1077;&#1088;&#1090;&#1099;',
[1102,49,50,51,52,53,54,55,56,57,48,45,61,1101,1103,1078,1077,1088,1090,1099,1091,1080,1086,1087,1096,1097,1072,1089,1076,1092,1075,1095,1081,1082,1083,59,39,1079,1093,1094,1074,1073,1085,1084,44,46,47,],
{'1': [33,1098,1066,36,37,1105,1025,42,40,41,95,43],
'35': [58,34],
'44': [60,62,63]});
VirtualKeyboard.addLayout('ar', 'Arabic',
[1584,49,50,51,52,53,54,55,56,57,48,45,61,92,1590,1589,1579,1602,1601,1594,1593,1607,1582,1581,1580,1583,1588,1587,1610,1576,1604,1575,1578,1606,1605,1603,1591,1574,1569,1572,1585,57345,1609,1577,1608,1585,1592],
{'0': [1617,33,64,35,36,37,94,38,42,41,40,95,43,124,1614,1611,1615,1612,57346,1573,8216,247,215,1563,60,62,1616,1613,93,91,57347,1571,1600,1548,47,58,34,126,1618,125,123,57348,1570,8217,44,46,1567]});

VirtualKeyboard.addLayout('bl', 'Baltic',
[96,169,174,34,36,8364,163,178,179,167,92,45,61,181,261,230,257,228,229,263,269,281,275,233,279,291,303,299,311,316,322,324,326,243,333,245,246,248,343,347,353,371,363,252,378,380,382],
{});

VirtualKeyboard.addLayout('bu', 'Bulgarian',
[96,49,50,51,52,53,54,55,56,57,48,45,46,40,44,1091,1077,1080,1096,1097,1082,1089,1076,1079,1094,59,1100,1103,1072,1086,1078,1075,1090,1085,1074,1084,1095,1102,1081,1098,1101,1092,1093,1087,1088,1083,1073],
{'0': [126,33,63,43,34,37,61,58,47,95,8470,1030,86,41,1099,167]});

VirtualKeyboard.addLayout('ca', 'Canadian',
[35,49,50,51,52,53,54,55,56,57,48,45,61,60,113,119,101,114,116,121,117,105,111,112,9475,9477,97,115,100,102,103,104,106,107,108,59,9476,122,120,99,118,98,110,109,44,46,233],
{'0': [124,33,34,47,36,37,63,38,42,40,41,95,43,62],
'25': [9474,58],
'44': [39]});

VirtualKeyboard.addLayout('ce', 'Centr.Eur.',
[96,169,174,34,36,8364,163,178,179,167,261,225,226,259,228,263,231,269,271,273,233,281,235,283,237,238,314,318,322,324,328,243,244,337,246,345,347,353,351,357,355,367,250,369,252,253,380],
{});

VirtualKeyboard.addLayout('cz', 'Czech',
[59,43,283,353,269,345,382,253,225,237,233,61,9473,9474,113,119,101,114,116,122,117,105,111,112,250,41,97,115,100,102,103,104,106,107,108,367,167,121,120,99,118,98,110,109,44,46,45],
{'0': [9479,49,50,51,52,53,54,55,56,57,48,37,9480,39,47,40,34,33,63,58,95]});

VirtualKeyboard.addLayout('dn', 'Danish',
[189,49,50,51,52,53,54,55,56,57,48,43,39,9473,113,119,101,114,116,121,117,105,111,112,229,9474,97,115,100,102,103,104,106,107,108,230,248,122,120,99,118,98,110,109,44,46,45],
{'0': [167,33,34,35,164,37,38,47,40,41,61,63,42,9476,9475,59,58,95]});

VirtualKeyboard.addLayout('et', 'Estonian',
[9480,49,50,51,52,53,54,55,56,57,48,43,39,9473,113,119,101,114,116,121,117,105,111,112,252,245,97,115,100,102,103,104,106,107,108,246,228,122,120,99,118,98,110,109,44,46,45],
{'0': [9477,33,34,35,164,37,38,47,40,41,61,63,42,9476,72,74,75,76,214,196,42,59,58,95]});

VirtualKeyboard.addLayout('fn', 'Finish',
[167,49,50,51,52,53,54,55,56,57,48,43,39,9473,113,119,101,114,116,121,117,105,111,112,229,9474,97,115,100,102,103,104,106,107,108,246,228,122,120,99,118,98,110,109,44,46,45],
{'0': [189,33,34,35,164,37,38,47,40,41,61,63,42,9476,9475,59,58,95]});

VirtualKeyboard.addLayout('hu', 'Hungarian',
[48,49,50,51,52,53,54,55,56,57,246,252,243,369,113,119,101,114,116,122,117,105,111,112,337,250,97,115,100,102,103,104,106,107,108,233,225,121,120,99,118,98,110,109,44,46,45],
{'0': [167,39,34,43,33,37,47,61,40,41,63,58,95]});

VirtualKeyboard.addLayout('ic', 'Icelandic',
[9479,49,50,51,52,53,54,55,56,57,48,246,45,43,113,119,101,114,116,121,117,105,111,112,240,39,97,115,100,102,103,104,106,107,108,230,9473,122,120,99,118,98,110,109,44,46,254],
{'0': [9474,33,34,35,36,37,38,47,40,41,61,95,42,63,39,59,58]});

VirtualKeyboard.addLayout('ir', 'Irish',
[9476,49,50,51,52,53,54,55,56,57,48,45,61,35,113,119,101,114,116,121,117,105,111,112,91,93,97,115,100,102,103,104,106,107,108,59,39,122,120,99,118,98,110,109,44,46,47],
{'0': [172,33,34,163,36,37,94,38,42,40,41,95,43,126,123,125,58,64,60,62,63]});

VirtualKeyboard.addLayout('du', 'Dutch',
[64,49,50,51,52,53,54,55,56,57,48,47,176,60,113,119,101,114,116,121,117,105,111,112,9474,42,97,115,100,102,103,104,106,107,108,43,9473,122,120,99,118,98,110,109,44,46,45],
{'0': [167,33,34,35,36,37,38,95,40,41,39,63,9477,62,9475,124,177,9476,59,58,61]});

VirtualKeyboard.addLayout('fa', 'Farsi',
[247,49,50,51,52,53,54,55,56,57,48,45,61,1662,1590,1589,1579,1602,1601,1594,1593,1607,1582,1581,1580,1670,1588,1587,1740,1576,1604,1575,1578,1606,1605,1705,1711,1592,1591,1586,1585,1584,1583,1574,1608,46,47],
{'0': [215,33,64,35,36,37,94,38,42,41,40,95,43,124,1611,1612,1613,57349,1548,1563,44,93,91,92,125,123,1614,1615,1616,1617,1728,1570,1600,171,187,58,34,1577,1610,1688,1572,1573,1571,1569,60,62,1567]});

VirtualKeyboard.addLayout('fr', 'French',
[178,38,233,34,39,40,45,232,95,231,224,41,61,42,97,122,101,114,116,121,117,105,111,112,9475,36,113,115,100,102,103,104,106,107,108,109,249,119,120,99,118,98,110,44,59,58,33],
{'0': [32,49,50,51,52,53,54,55,56,57,48,176,43,181,9474,163,37,63,46,47,167]});

VirtualKeyboard.addLayout('fr', 'French (Swiss)',
[167,49,50,51,52,53,54,55,56,57,48,39,9475,36,113,119,101,114,116,122,117,105,111,112,232,9474,97,115,100,102,103,104,106,107,108,233,224,121,120,99,118,98,110,109,44,46,45],
{'0': [176,43,34,42,231,37,38,47,40,41,61,63,9476,163,252,33,246,228,59,58,95]});

VirtualKeyboard.addLayout('de', 'German',
[9475,49,50,51,52,53,54,55,56,57,48,223,9473,35,113,119,101,114,116,122,117,105,111,112,252,43,97,115,100,102,103,104,106,107,108,246,228,121,120,99,118,98,110,109,44,46,45],
{'0': [176,33,34,167,36,37,38,47,40,41,61,63,9476,39,42,59,58,95]});

VirtualKeyboard.addLayout('de', 'German (Swiss)',
[167,49,50,51,52,53,54,55,56,57,48,39,9475,36,113,119,101,114,116,122,117,105,111,112,252,9474,97,115,100,102,103,104,106,107,108,246,228,121,120,99,118,98,110,109,44,46,45],
{'0': [176,43,34,42,231,37,38,47,40,41,61,63,9476,232],
'25': [33,233,224,59,58,95]});

VirtualKeyboard.addLayout('el', 'Greek',
[96,49,50,51,52,53,54,55,56,57,48,45,61,92,59,962,949,961,964,965,952,953,959,960,91,93,945,963,948,966,947,951,958,954,955,9472,39,950,967,968,969,946,957,956,44,46,47],
{'0': [126,33,64,35,36,37,94,38,42,40,41,95,43,124,58,9478,123,125,9474,34,60,62,63]});

VirtualKeyboard.addLayout('he', 'Hebrew',
[59,49,50,51,52,53,54,55,56,57,48,45,61,92,47,39,1511,1512,1488,1496,1493,1503,1501,1508,93,91,1513,1491,1490,1499,1506,1497,1495,1500,1498,1507,44,1494,1505,1489,1492,1504,1502,1510,1514,1509,46],
{'0': [126,33,64,35,36,37,94,38,42,40,41,43,95,124,81,87,69,82,84,89,85,73,79,80,125,123,65,83,68,70,71,72,74,75,76,58,34,90,88,67,86,66,78,77,62,60,63]});

VirtualKeyboard.addLayout('it', 'Italian',
[92,49,50,51,52,53,54,55,56,57,48,39,236,249,113,119,101,114,116,121,117,105,111,112,232,43,97,115,100,102,103,104,106,107,108,242,224,122,120,99,118,98,110,109,44,46,45],
{'0': [124,33,34,163,36,37,38,47,40,41,61,63,94,167,233,42,231,176,59,58,95]});

VirtualKeyboard.addLayout('lv', 'Latvian',
[173,49,50,51,52,53,54,55,56,57,48,45,102,311,363,103,106,114,109,118,110,122,275,269,382,104,353,117,115,105,108,100,97,116,101,99,9473,326,98,299,107,112,111,257,44,46,316],
{'0': [63,33,171,187,36,37,47,38,215,40,41,95,9479,59,58]});

VirtualKeyboard.addLayout('lt', 'Lithuanian',
[96,261,269,281,279,303,353,371,363,57,48,45,382,92,113,119,101,114,116,121,117,105,111,112,91,93,97,115,100,102,103,104,106,107,108,59,39,122,120,99,118,98,110,109,44,46,47],
{'0': [126,40,41,95,124,123,125,58,34,60,62,63]});

VirtualKeyboard.addLayout('no', 'Norwegian',
[124,49,50,51,52,53,54,55,56,57,48,43,92,39,113,119,101,114,116,121,117,105,111,112,229,9474,97,115,100,102,103,104,106,107,108,248,230,122,120,99,118,98,110,109,44,46,45],
{'0': [167,33,34,35,164,37,38,47,40,41,61,63,9476,42,9475,59,58,95]});

VirtualKeyboard.addLayout('pl', 'Polish',
[9481,49,50,51,52,53,54,55,56,57,48,43,39,243,113,119,101,114,116,122,117,105,111,112,380,347,97,115,100,102,103,104,106,107,108,322,261,121,120,99,118,98,110,109,44,46,45],
{'0': [9482,33,34,35,164,37,38,47,40,41,61,63,42,378,324,263,281,59,58,95]});

VirtualKeyboard.addLayout('po', 'Portuguese',
[92,49,50,51,52,53,54,55,56,57,48,39,171,9477,113,119,101,114,116,121,117,105,111,112,43,9473,97,115,100,102,103,104,106,107,108,231,186,122,120,99,118,98,110,109,44,46,45],
{'0': [124,33,34,35,36,37,38,47,40,41,61,63,187,9475,42,9476,170,59,58,95]});

VirtualKeyboard.addLayout('ro', 'Romanian',
[93,49,50,51,52,53,54,55,56,57,48,43,39,226,113,119,101,114,116,122,117,105,111,112,259,238,97,115,100,102,103,104,106,107,108,351,355,121,120,99,118,98,110,109,44,46,45],
{'0': [91,33,34,35,164,37,38,47,40,41,61,63,42,59,58,95]});

VirtualKeyboard.addLayout('ru', 'Russian',
[1105,49,50,51,52,53,54,55,56,57,48,45,61,92,1081,1094,1091,1082,1077,1085,1075,1096,1097,1079,1093,1098,1092,1099,1074,1072,1087,1088,1086,1083,1076,1078,1101,1103,1095,1089,1084,1080,1090,1100,1073,1102,46],
{'1': [33,34,8470,59,37,58,63,42,40,41,95,43,47,44]});

VirtualKeyboard.addLayout('ru', 'Russian TR',
[1105,49,50,51,52,53,54,55,56,57,48,45,1098,1101,1103,1096,1077,1088,1090,1099,1091,1080,1086,1087,1102,1097,1072,1089,1076,1092,1075,1095,1081,1082,1083,1100,1078,1079,1093,1094,1074,1073,1085,1084,59,46,61],
{'1': [8470,33,47,34,58,171,187,63,40,41,95,39,44,37]});

VirtualKeyboard.addLayout('sl', 'Slovak',
[59,43,318,353,269,357,382,253,225,237,233,61,9473,328,113,119,101,114,116,122,117,105,111,112,250,228,97,115,100,102,103,104,106,107,108,244,167,121,120,99,118,98,110,109,44,46,45],
{'0': [9479,49,50,51,52,53,54,55,56,57,48,37,9480,41,47,40,34,33,63,58,95]});

VirtualKeyboard.addLayout('sn', 'Slovenian',
[9485,49,50,51,52,53,54,55,56,57,48,39,43,382,113,119,101,114,116,122,117,105,111,112,353,273,97,115,100,102,103,104,106,107,108,269,263,121,120,99,118,98,110,109,44,46,45],
{'0': [9474,33,34,35,36,37,38,47,40,41,61,63,42,59,58,95]});

VirtualKeyboard.addLayout('es', 'Spanish',
[124,49,50,51,52,53,54,55,56,57,48,39,191,125,113,119,101,114,116,121,117,105,111,112,9473,43,97,115,100,102,103,104,106,107,108,241,123,122,120,99,118,98,110,109,44,46,45],
{'0': [176,33,34,35,36,37,38,47,40,41,61,63,161,93,9474,42,91,59,58,95]});

VirtualKeyboard.addLayout('sw', 'Swedish',
[167,49,50,51,52,53,54,55,56,57,48,43,39,9473,113,119,101,114,116,121,117,105,111,112,229,9474,97,115,100,102,103,104,106,107,108,246,228,122,120,99,118,98,110,109,44,46,45],
{'0': [189,33,34,35,164,37,38,47,40,41,61,63,42,9476,9475,59,58,95]});

VirtualKeyboard.addLayout('tr', 'Turkish',
[34,49,50,51,52,53,54,55,56,57,48,42,45,92,113,119,101,114,116,121,117,305,111,112,287,252,97,115,100,102,103,104,106,107,108,351,105,122,120,99,118,98,110,109,246,231,46],
{'0': [233,33,39,9475,43,37,38,47,40,41,61,63,95,59,73,58]});

VirtualKeyboard.addLayout('uk', 'Ukrainian',
[1105,49,50,51,52,53,54,55,56,57,48,45,61,1169,1081,1094,1091,1082,1077,1085,1075,1096,1097,1079,1093,1111,1092,1110,1074,1072,1087,1088,1086,1083,1076,1078,1108,1103,1095,1089,1084,1080,1090,1100,1073,1102,46],
{'1': [33,34,8470,59,37,58,63,42,40,41,95,43,44]});

VirtualKeyboard.addLayout('uk', 'Ukrainian TR',
[1105,49,50,51,52,53,54,55,56,57,48,45,1169,1108,1103,1096,1077,1088,1090,1110,1091,1080,1086,1087,1102,1097,1072,1089,1076,1092,1075,1095,1081,1082,1083,1100,1078,1079,1093,1094,1074,1073,1085,1084,1111,46,61],
{'1': [33,34,8470,59,37,58,63,42,40,41,95,44]});

VirtualKeyboard.addLayout('en', 'US',
[96,49,50,51,52,53,54,55,56,57,48,45,61,92,113,119,101,114,116,121,117,105,111,112,91,93,97,115,100,102,103,104,106,107,108,59,39,122,120,99,118,98,110,109,44,46,47],
{'0': [126,33,64,35,36,37,94,38,42,40,41,95,43,124,123,125,58,34,60,62,63]});

VirtualKeyboard.addLayout('en', 'US Dvorak',
[96,49,50,51,52,53,54,55,56,57,48,91,93,92,39,44,46,112,121,102,103,99,114,108,47,61,97,111,101,117,105,100,104,116,110,115,45,59,113,106,107,120,98,109,119,118,122],
{'0': [126,33,64,35,36,37,94,38,42,40,41,123,125,124,34,60,62,63,43,95,58]});

VirtualKeyboard.addLayout('ws', 'Western',
[96,191,161,162,36,8364,163,165,170,186,48,223,181,92,224,225,226,227,228,229,230,339,231,240,241,254,232,233,234,235,236,237,238,239,253,255,223,242,243,244,245,246,248,249,250,251,252],
{});  
// #############################################################################
// Вспомогательные функции

//Размер клиентской области окна по горизонтали
function getClientWidth() {
        var w=0;
        if (self.innerHeight) w = self.innerWidth;
        else if (document.documentElement && document.documentElement.clientWidth) w = document.documentElement.clientWidth;
        else if (document.body) w = document.body.clientWidth;
        return w;
}
//Размер клиентской области окна по вертикали
function getClientHeight() {
        var h=0;
        if (self.innerHeight) h = self.innerHeight;
        else if (document.documentElement && document.documentElement.clientHeight) h = document.documentElement.clientHeight;
        else if (document.body) h = document.body.clientHeight;
        return h;
}

//координаты центра окна с учетом скроллинга
function getClientCenterX() {
        return parseInt(getClientWidth()/2)+getBodyScrollLeft();
}
function getClientCenterY() {
        return parseInt(getClientHeight()/2)+getBodyScrollTop();
}

//на сколько проскручена страница
function getBodyScrollTop() {
        return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}
function getBodyScrollLeft() {
        return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
}
/*
*  Performs parent lookup by
*   - node object: actually it's "is child of" check
*   - tagname: getParent(el, 'li') == getParent(el, 'tagName', 'LI')
*   - any node attribute
*
*  @param DOMnode source element
*  @param mixed DOMNode or string tagname or string attribute name
*  @param string optional attribute value
*  @return mixed DOMNode or null
*/
function getParent (el, cp, vl) {
  if (el == null) return null; else
  if (el.nodeType == 1 &&
      ((!isUndefined(vl) && el[cp] == vl) ||
       ('string' == typeof cp && el.tagName.toLowerCase() == cp.toLowerCase()) ||
       el == cp)) return el;
  else return getParent(el.parentNode, cp, vl); 
}
