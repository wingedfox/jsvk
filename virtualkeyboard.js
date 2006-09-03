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
  *  @type String
  *  @access public
  */
  var lang = '';
  /*
  *  Available layouts
  *
  *  Array contains layout, it's 'shifted' difference and name
  *  Structure:
  *   <lang_code> : { 'name' : String,
  *                   'alpha' : Array, // key codes
  *                   'diff' : Object { <start2> : Array, // array of symbols, could not be taken with toUpperCase
  *                                     <start2> : Array,
  *                                   }
  *                 }
  *
  *  @type Object
  *  @access private
  */
  var layout = {};
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
    isOpen : false,      // virtual keyboard open state
    shift : false,       // Shift
    caps : false,        // CapsLock
    kbd_shift : false,   // real shift
    skip_keyup : false,  // used to skip letter type, when keyboard key is released
    blockRealKey : false // used to block input, when it converted to virtual
  }
  /*
  *  Keyboard center coordinates
  *
  *  @type Object
  *  @access private
  */
  var keyboard_coords = {'x':0,'y':0};

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
      if (lang == code) this.switchLayout(i);
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
    if ('string' == typeof code && ('undefined' == typeof layout[code] || override) &&
        (alpha instanceof Array) && (diff instanceof Object)) {
      layout[code] = {'name' : name,
                        'alpha' : alpha,
                        'diff' : diff
                       }
      updateLangList();
      if (!lang) self.switchLayout(code);
      return true;
    }
    return false;
  }
  /*
  *  Set current layout
  *
  *  @param {String} layout code
  *  @return {Boolean} change state
  *  @access public
  */
  this.switchLayout = function (code) {
    if (nodes.desk == null || 'string' != typeof code || !layout.hasOwnProperty(code) || code == lang) return false;
    /*
    *  we will use old but quick innerHTML
    */
    var btns = "", i;
    for (i=0, aL = layout[code].alpha.length; i<aL; i++) {
      btns +=  "<div id=\""+idPrefix+(parseInt(layout[code].alpha[i])?i:layout[code].alpha[i])
              +"\" class=\""+cssClasses['buttonUp']
              +"\"><a href=\"#\""
              +">"+(parseInt(layout[code].alpha[i])?"<span>"+String.fromCharCode(layout[code].alpha[i])+"</span>"
                                                   :"")+"</a></div>";
    }
    nodes.desk.innerHTML = btns;

    /*
    *  add shiftable elements
    */
    for (i in layout[code].diff) {
      if (parseInt(i) != NaN && layout[code].diff[i] instanceof Array) {
        for (var k=0, sL = layout[code].diff[i].length; k<sL; k++) {
          nodes.desk.childNodes[parseInt(i)+k].firstChild.innerHTML += "<span class=\""+cssClasses['buttonShifted']+"\">"+String.fromCharCode(layout[code].diff[i][k])+"</span>";
          nodes.desk.childNodes[parseInt(i)+k].firstChild.firstChild.className = cssClasses['buttonNormal'];
        }
      }
    }
    lang = code;
    self.toggleShift();
  }
  /*
  *  Toggle Shift keys
  *
  *  @param {Boolean} optional, forces shift state toggle
  *
  */
  this.toggleShift = function (force) {
    if (!flags.shift && !force) return;
    for (var i in layout[lang].diff) {
      if (parseInt(i) != NaN && layout[lang].diff[i] instanceof Array) {
        for (var k=0, sL = layout[lang].diff[i].length; k<sL; k++) {
          /*
          *  swap symbols and its CSS classes
          */
          nodes.desk.childNodes[parseInt(i)+k].firstChild.appendChild(nodes.desk.childNodes[parseInt(i)+k].firstChild.firstChild);
          nodes.desk.childNodes[parseInt(i)+k].firstChild.firstChild.className = cssClasses['buttonNormal'];
          nodes.desk.childNodes[parseInt(i)+k].firstChild.lastChild.className = cssClasses['buttonShifted'];
        }
      }
    }
  }
  /*
  *  Update layout selector
  *
  *  @see langbox
  *  @return update state
  *  access private
  */
  var updateLangList = function () {
    if (nodes.langbox == null) return false;
    var osel = nodes.langbox.selected;
    nodes.langbox.options.length = 0;
    for (var i in layout) {
      if (!layout.hasOwnProperty(i)) continue;
      /*
      *  trick to decode possible HTML entities
      */
      var t = document.createElement('span');
      t.innerHTML = layout[i].name;
      nodes.langbox.options[nodes.langbox.options.length] = new Option(t.firstChild.nodeValue, i, i==osel);
    }
    return true;
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
        self.toggleShift(true);
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
        if (flags.shift ^ flags.caps) chr = chr.toUpperCase();
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
    }

  }
  /*
  *  Method keeps keyboard in the visible area of document
  *
  *  @param {Event} scroll event
  *  @access protected
  */
  var _scrollHandler_ = function(e) {
    if (nodes.keyboard && nodes.keyboard.style.visibility == 'visible') {
      var x = getClientCenterX(), y = getClientCenterY();
      nodes.keyboard.style.left = ((parseInt(nodes.keyboard.style.left) + x - keyboard_coords.x)) + 'px';
      nodes.keyboard.style.top = (parseInt(nodes.keyboard.style.top) + y - keyboard_coords.y) + 'px';
      keyboard_coords = {'x': x, 'y': y};
      return false;
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
            if (e.type != 'keydown') return;
            document.getElementById(idPrefix+'caps').firstChild.fireEvent('onmousedown');
            return;
          case 27:
            VirtualKeyboard.close();
            return false;
          default:
            if (keymap.indexOf(e.keyCode)>-1) {
              nodes.desk.childNodes[keymap.indexOf(e.keyCode)].firstChild.fireEvent('onmouseup')
              nodes.desk.childNodes[keymap.indexOf(e.keyCode)].firstChild.fireEvent('onmousedown');
              flags.blockRealKey = true;
            }
        }
        break;
      case 'keyup' :
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
  *  @param {Event} mouseup event
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
    if (!nodes.keyboard.offsetParent) document.body.appendChild(nodes.keyboard);
    nodes.keyboard.style.visibility = 'visible';
    var x = getClientCenterX(),
        y = getClientCenterY();
    nodes.keyboard.style.left = (x-nodes.keyboard.clientWidth/2) + 'px';
    nodes.keyboard.style.top = (y-nodes.keyboard.clientHeight/2) + 'px';
    keyboard_coords = {'x': x, 'y': y};

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
     '<div id="kbHeader"><div id="kbHeaderLeft">Virtual Keyboard'+
      '<a href="#" id="kbHeaderRight" onclick="VirtualKeyboard.close(); return false;" alt="Close">&nbsp;</a></div></div>'+
     '<div id="kbDesk"></div>'+
     '<div id="kb_langselector">&#1071;&#1079;&#1099;&#1082;: <select name="select" onchange="VirtualKeyboard.switchLayout(this.value)"></select></div>';
    /*
    *  reference to keyboard desk
    */
    nodes.desk = nodes.keyboard.childNodes[1];
    /*
    *  reference to layout selector
    */
    nodes.langbox = nodes.keyboard.lastChild.lastChild;

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
                              'min' : getBodyScrollLeft()+5,
                              'max' : (getClientWidth()+getBodyScrollLeft()-25)
                             },
                       'y' : { 'move' : true,
                               'min' : getBodyScrollTop()+5,
                               'max' : (getClientHeight()+getBodyScrollTop()-25)
                             }
                      };
              return r;
            }
    }

    /*
    *  attach scroll capturer
    */
    window.attachEvent('onscroll', _scrollHandler_);
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
VirtualKeyboard.addLayout('ru','&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;', 
                            [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92,
                            'backspace',
                            'tab',
                            1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 
                            'enter',
                            'caps',
                            1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101,
                            'shift_left',
                            1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46,
                            'shift_right',
                            'del',
                            'space'],
                            { '1' : [33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43, 47],
                              '51': [44]
                            });
VirtualKeyboard.addLayout('en', 'English',
                            [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92,
                            'backspace',
                            'tab',
                            113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93,
                            'enter',
                            'caps',
                            97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39,
                            'shift_left',
                            122, 120, 99, 118, 98, 110, 109, 44, 46, 47,
                            'shift_right',
                            'del',
                            'space'
                            ],
                            { '0' : [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 124],
                              '26' : [123, 125],
                              '39' : [58, 34],
                              '49' : [60, 62, 63]
                            });

  
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