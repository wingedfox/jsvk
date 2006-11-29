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
  this.$VERSION$ = " $HeadURL$ ".match(/\/[^\.]*[\.\/]([^\/]+)\/[\w\.\s$]+$/)[1]+"."+(" $Rev$ ".replace(/\D/g,""));
  /*
  *  ID prefix
  *
  *  @type String
  *  @access private
  */
  var idPrefix = 'kb_b';
  /**
   *  Keyboard keys mapping, as on the keyboard
   *
   *  @type Array
   *  @scope private
   */
  var keymap = [192,49,50,51,52,53,54,55,56,57,48,189,187,220,8, // ~ to BS
                9,81,87,69,82,84,89,85,73,79,80,219,221,13,     // TAB to ENTER
                20,65,83,68,70,71,72,74,75,76,186,222,           // CAPS to '
                16,90,88,67,86,66,78,77,188,190,191,16,         // SHIFT to SHIFT
                46,32];                                         // Delete, SPACE
//                17,18,32,18,17,                                 // CTRL to CTRL
//                46];                                            // Delete
  if (navigator.product && 'gecko' == navigator.product.toLowerCase()) {
    keymap[11] = 109;
    keymap[12] = 61;
    keymap[39] = 59;
  }
  /**
   *  Keyboard mode, bitmap
   *
   *
   *
   *
   *  @type Number
   *  @scope private
   */
  var mode = 0
     ,VK_NORMAL = 0
     ,VK_SHIFT = 1
     ,VK_ALT = 2
     ,VK_CTRL = 4
  /**
   *  Deadkeys, original and mofified characters
   *
   *  @see http://en.wikipedia.org/wiki/Dead_key
   *  @see http://en.wikipedia.org/wiki/Combining_character
   *  @type Array
   *  @access private
   */
  var deadkeys = [
    // greek tonos
    ["\u0384", "\u03b1\u03ac \u03b5\u03ad \u03b9\u03af \u03bf\u03cc \u03b7\u03ae \u03c5\u03cd \u03c9\u03ce "+
               "\u0391\u0386 \u0395\u0388 \u0399\u038a \u039f\u038c \u0397\u0389 \u03a5\u038e \u03a9\u038f"
    ],
    // greek dialytika tonos
    ["\u0385", "\u03c5\u03b0 \u03b9\u0390"],
    // acute accent
    ["\xb4", "a\xe1 A\xc1 e\xe9 E\xc9 i\xed I\xcd o\xf3 O\xd3 u\xfa U\xda y\xfd Y\xdd "+
             "c\u0107 C\u0106 l\u013a L\u0139 n\u0144 N\u0143 r\u0155 R\u0154 s\u015b S\u015a w\u1e83 W\u1e82 z\u017a Z\u0179"
    ],
    // diaeresis
    ["\xa8", "a\xe4 A\xc4 e\xeb E\xcb i\xef I\xcf j\u0135 J\u0134 "+
             "o\xf6 O\xd6 u\xfc U\xdc y\xff Y\u0178 w\u1e85 W\1e84 "+ //latin
             "\u03c5\u03cb \u03b9\u03ca \u03a5\u03ab \u0399\u03aa"    //greek
    ],
    // circumflex
    ["\x5e", "a\xe2 A\xc2 e\xea E\xca i\xee I\xce o\xf4 O\xd4 u\xfb U\xdb y\u0176 Y\u0177 "+
             "c\u0109 C\u0108 h\u0125 H\u0124 g\u011d G\u011c s\u015d S\u015c w\0175 W\0174 "+ //latin
             "\u0131\xee \u0130\xce " // dotless small i, capital I with dot above
    ], 
    // grave
    ["\x60", "a\xe0 A\xc0 e\xe8 E\xc8 i\xec I\xcc o\xf2 O\xd2 u\xf9 U\xd9 y\u1ef3 Y\u1ef2 w\u1e81 W\u1e80"],
    // tilde
    ["\x7e", "a\xe3 A\xc3 o\xf5 O\xd5 u\u0169 U\\u0168 n\xf1 N\xd1 y\u1ef8 Y\1ef7"],
    // ring above
    ["\xb0", "a\xe5 A\xc5 u\u016f U\u016e"],
    // caron
    ["\u02c7", "e\u011b E\u011a "+
               "c\u010d C\u010c d\u010f D\u010e l\u013e L\u013d n\u0148 N\u0147 "+
               "r\u0158 R\u0158 s\u0161 S\u0160 t\u0165 T\u0164 z\u017e Z\u017d"
    ],
    // ogonek
    ["\u02db", "a\u0105 A\u0104 e\u0119 E\u0118 i\u012f I\u012e c\u010b C\u010a g\u0121 G\u0120 u\u0173 U\u0172"],
    // dot above
    ["\u02d9", "e\u0117 E\u0116 u0131i I\u0130 z\u017c Z\u017b"],
    // breve
    ["\u02d8", "a\u0103 A\u0102 e\u0115 E\u0114 o\0u14f O\0u14e G\u011f g\u011e"],
    // double acute
    ["\u02dd", "o\u0151 O\u0150 U\u0170 u\u0171"],
    // cedilla
    ["\xb8", "c\xe7 C\xc7 g\u0123 G\u0122 k\u0137 K\u0136 l\u013c L\u013b "+
             "n\u0146 N\u0145 r\u0157 R\u0156 S\u015e s\u015f T\u0162 t\u0163"
    ]
  ];
  /*
  *  CSS classes will be used to style buttons
  *
  *  @type Object
  *  @access private
  */
  var cssClasses = {
    'buttonUp'      : 'kbButton',
    'buttonDown'    : 'kbButtonDown',
    'buttonHover'   : 'kbButtonHover',
    'buttonNormal'  : 'normal',
    'buttonShifted' : 'shifted',
    'buttonAlted'   : 'alted',
    'capslock'      : 'capsLock',
    'deadkey'       : 'deadKey'
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
    translateKeys : true  // when true - translate real keys to virtual letters
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
  /**
   *  Add layout to the list
   *
   *  @see layout
   *  @param {String} layout code
   *  @param {String} layout name
   *  @param {Array} keycodes
   *  @param {Object} differences for shift
   *  @param {Object} differences for alt
   *  @param {Array} list of the present deadkeys
   *  @return {Boolean}
   *  @scope public
   */
  this.addLayout = function(code, name, alpha, diff, alt, deadkeys) {
      if (!isString(code)) throw new Error ('VirtualKeyboard.addLayout requires first parameter to be a string.');
      if (!isString(name)) throw new Error ('VirtualKeyboard.addLayout requires second parameter to be a string.')
      if (isEmpty(alt)) alt = {};
      if (isEmpty(diff)) diff = {};
      if (isUndefined(deadkeys)) deadkeys = [];

      /*
      *  trick to decode possible HTML entities
      */
      var span = document.createElement('span');
      span.innerHTML = code;
      code = span.firstChild.nodeValue.toUpperCase();
      span.innerHTML = name;
      name = span.firstChild.nodeValue;
      if (!isArray(alpha) || 47!=alpha.length) throw new Error ('VirtualKeyboard.addLayout requires 3rd parameter to be an array with 47 items. Layout code: '+code+', layout title: '+name);


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
      *  convert layout in machine-aware form
      */
      var ca = null
         ,cac = -1
         ,cs = null
         ,csc = -1
         ,cl = layout[pos][pos_lt]
         ,lt = []

      for (var i=0, aL = alpha.length; i<aL; i++) {
         if (diff.hasOwnProperty(i)) {
           cs = diff[i];
           csc = i;
         }
         if (alt.hasOwnProperty(i)) {
           ca = alt[i];
           cac = i;
         }
         lt[i] = [alpha[i],                                          // normal chars
                  (csc>-1&&cs.hasOwnProperty(i-csc)?cs[i-csc]:null), // shift chars
                  (cac>-1&&ca.hasOwnProperty(i-cac)?ca[i-cac]:null)  // alt chart
                 ];
      }
      /*
      *  add control keys
      */
      lt.splice(14,0,'backspace');
      lt.splice(15,0,'tab');
      lt.splice(28,0,'enter');
      lt.splice(29,0,'caps');
      lt.splice(41,0,'shift_left');
      lt.splice(52,0,'shift_right');
      lt.splice(53,0,'del');
      lt.splice(54,0,'space');

      lt.dk = deadkeys;
      /*
      *  overload toString, for the search/
      */
      lt.toString = layoutToString;
      lt.name = name;
      pos_lt = layout[pos].length;
      layout[pos][pos_lt] = lt;

      /*
      *  sort things...
      */
      layout.sort();
      layout[pos].sort();

      return true;
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
    code = code?String(code).toUpperCase():'';
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
    var btns = ""
       ,i
       ,lyt = layout[code][name]
       ,zcnt = 0;
    for (i=0, aL = lyt.length; i<aL; i++) {
      var chr = lyt[i];
      btns +=  "<div id=\""+idPrefix+(isArray(chr)?zcnt++:chr)
              +"\" class=\""+cssClasses['buttonUp']
              +"\"><a href=\"#"+i+"\""
              +">"+(isArray(chr)?(__getCharHtmlForKey(lyt,chr[0],cssClasses['buttonNormal'])
                                 +__getCharHtmlForKey(lyt,chr[1],cssClasses['buttonShifted'])
                                 +__getCharHtmlForKey(lyt,chr[2],cssClasses['buttonAlted']))
                                :"")
              +"</a></div>";
    }
    nodes.desk.innerHTML = btns;

    lang.code = layout[code].name;
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
        lt = lng[lng.indexOf(lang.lyt)],
        bi = -1;
    for (var i=0, lL=lt.length; i<lL; i++) {
        if (isString(lt[i])) continue;
        bi++;
        if (isEmpty(lt[i][1])) continue;
        var btn = document.getElementById(idPrefix+bi).firstChild;
        /*
        *  swap symbols and its CSS classes
        */
        if (btn.childNodes.length>1) {
            btn.insertBefore(btn.childNodes.item(1),btn.childNodes.item(0));
            btn.childNodes.item(0).className = btn.childNodes.item(0).className.replace(cssClasses['buttonShifted'],cssClasses['buttonNormal']);
            btn.childNodes.item(1).className = btn.childNodes.item(1).className.replace(cssClasses['buttonNormal'],cssClasses['buttonShifted']);
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
//    nodes.lytbox.disabled = nodes.lytbox.options.length<2;
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
    updateLayoutList();
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
        /*
        *  is char is in the buffer, or selection made, made decision at __charProcessor
        */
        if (DocumentSelection.getSelection(attachedInput))
          chr = "\x08";
        else
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
      chr = __charProcessor(chr, DocumentSelection.getSelection(attachedInput));
      if (DocumentSelection.getStart(attachedInput) != DocumentSelection.getEnd(attachedInput))
        DocumentSelection.deleteAtCursor(attachedInput);
      DocumentSelection.insertAtCursor(attachedInput,chr[0]);

      /*
      *  select as much, as __charProcessor callback requested
      */
      DocumentSelection.setRange(attachedInput,-chr[1],0,true);
      /*
      *  check for right-to-left languages
      */
//      if (chr[0].charCodeAt (0) > 0x5b0 && chr[0].charCodeAt (0) < 0x6ff)
//        attachedInput.dir = "rtl";
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
        *  set the flags....
        */
        if (e.shiftKey) {
            mode = mode | VK_SHIFT;
            if (!flags.kbd_shift) {
              document.getElementById(idPrefix+'shift_left').firstChild.fireEvent('onmousedown');
              flags.kbd_shift = true;
            }
        }
        if (e.altKey) {
            mode = mode | VK_ALT;
            if (!flags.kbd_alt) {
//              document.getElementById(idPrefix+'alt_left').firstChild.fireEvent('onmousedown');
              flags.kbd_shift = true;
            }
        }
        if (e.ctrlKey) mode = mode | VK_CTRL;
        switch (e.keyCode) {
          case 16:
          case 17:
          case 18:
              e.returnValue = false;
              if (e.preventDefault) e.preventDefault();
              return false;
              break;
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
          case 8:
            /*
            *  special IE case, really, it DOES execute 'backspace' on keydown
            */
            e.returnValue = false;
          default:
            /*
            *  skip keypress if alt or ctrl pressed and key translation allowed
            */
            if (flags.translateKeys && keymap.hasOwnProperty(e.keyCode) && !e.ctrlKey) {
              /*
              *  mouseup needed to insert the key
              */
              nodes.desk.childNodes[keymap[e.keyCode]].firstChild.fireEvent('onmouseup')
              /*
              *  then mousedown, to show pressed state
              */
              nodes.desk.childNodes[keymap[e.keyCode]].firstChild.fireEvent('onmousedown');
              flags.blockRealKey = true;
            }
        }
        break;
      case 'keyup' :
        /*
        *  switch languages
        */
        if (!(mode ^ (VK_SHIFT | VK_CTRL))) {
          self.setNextLang();
        }
        /*
        *  switch layouts
        */
        if (!(mode ^ (VK_SHIFT | VK_ALT))) {
          self.setNextLayout();
        }
        /*
        *  reset the flags....
        */
        if (!e.shiftKey && (mode & VK_SHIFT)) {
            mode = mode ^ VK_SHIFT;
            /*
            *  say keyboard that shift is released
            */
            flags.kbd_shift = false;
            document.getElementById(idPrefix+'shift_left').firstChild.fireEvent('onmousedown');
        }
        if (!e.altKey && (mode & VK_ALT)) mode = mode ^ VK_ALT;
        if (!e.ctrlKey && (mode & VK_CTRL)) mode = mode ^ VK_CTRL;
        /*
        *  reset flag, language can be switched on the next keypress
        */
        if (keymap.hasOwnProperty(e.keyCode)) {
          /*
          *  skip unwanted letter creation
          */
          flags.skip_keyup = true;
          nodes.desk.childNodes[keymap[e.keyCode]].firstChild.fireEvent('onmouseup')
        }

        switch (e.keyCode) {
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
        break;
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
        var s1 = document.getElementById(idPrefix+'shift_left')
           ,s2 = document.getElementById(idPrefix+'shift_right')
           ,ofs = flags.shift;
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
    return true;
  }
  /*
  *  Shows keyboard
  *
  *  @param {HTMLElement, String} input element or it to bind keyboard to
  *  @param {String} holder optional keyboard holder container, keyboard won't have drag-drop when holder is specified
  *  @return {Boolean} operation state
  *  @access public
  */
  self.show = function (input, holder){
    if (input && !self.attachInput(input)) return false;
    if (!nodes.keyboard || !document.body || attachedInput == null) return false;

    /*
    *  check pass means that node is not attached to the body
    */
    if (!nodes.keyboard.offsetParent) {
      if (!isString(holder) || !document.getElementById(holder)) {
        document.body.appendChild(nodes.keyboard);
        __bindDragDrop();
        var x = getClientCenterX(),
        y = getClientCenterY();
        nodes.keyboard.style.left = (x-nodes.keyboard.clientWidth/2) + 'px';
        nodes.keyboard.style.top = (y-nodes.keyboard.clientHeight/2) + 'px';

      } else {
        document.getElementById(holder).appendChild(nodes.keyboard);
      }
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
    if (lang.code == null) self.setNextLang('cz');
    /*
    * create the list of available layouts
    */
    updateLayoutList();
    /*
    *  special, for IE
    */
    setTimeout(function(){nodes.keyboard.style.visibility = 'visible'},1);
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
  }
  //---------------------------------------------------------------------------
  // PRIVATE METHODS
  //---------------------------------------------------------------------------
  /**
   *  Char processor
   *
   *  It does process input letter, possibly modifies it
   *
   *  @param {String} char letter to be processed
   *  @param {String} buf current keyboard buffer
   *  @return {Array} new char, flag keep buffer contents
   *  @scope private
   */
  var __charProcessor = function (tchr, buf) {
    var res = [];
    if (isFunction(lang.lyt.dk)) {
      /*
      *  call user-supplied converter
      */
      res = lang.lyt.dk.call(self,tchr,buf);
    } else if (tchr == "\x08") {
      res = ['',0];
    } else {
      /*
      *  process char in buffer first
      *  buffer size should be exactly 1 char to don't mess with the occasional selection
      */
      var fc = buf.charAt(0);
      if ( buf.length==1 && lang.lyt.dk.indexOf(fc.charCodeAt(0))>-1 ) {
        /*
        *  dead key found, no more future processing
        *  if new key is not an another deadkey
        */
        res[1] = tchr != fc & lang.lyt.dk.indexOf(tchr.charCodeAt(0))>-1;
        res[0] = deadkeys[fc][tchr]?deadkeys[fc][tchr]:tchr;
      } else {
        /*
        *  in all other cases, process char as usual
        */
        res[1] = deadkeys.hasOwnProperty(tchr);
        res[0] = tchr;
      }
    }
    return res;
  }
  /**
   *  Char html constructor
   *
   *  @param {String} chr char code
   *  @param {String} css optional additional class names
   *  @return {String} resulting html
   *  @scope private
   */
  var __getCharHtmlForKey = function (lyt, chr, css) {
    /*
    *  if char exists
    */
    var html = [];
    if (parseInt(chr)) {
      /*
      *  if key matches agains current deadchar list
      */
      if (!isFunction(lyt.dk) && lyt.dk.indexOf(chr)>-1) css = [css, cssClasses['deadkey']].join(" ");

      html[html.length] = "<span ";
      if (css) { 
        html[html.length] = "class=\"";
        html[html.length] = css;
        html[html.length] = "\"";
      }
      html[html.length] = ">"+String.fromCharCode(chr)+"</span>"
    }
    return html.join("");
  }
  /**
   *  Function is used to bind drag and drop stuff to the keyboard, if needed
   *
   *  @scope private
   */
  var __bindDragDrop = function () {
    /*
    *  Setup engine stuff
    */
    __DDI__.setPlugin('fixNoMouseSelect');
    __DDI__.setPlugin('moveIT');
    __DDI__.setPlugin('adjustZIndex');
    __DDI__.setPlugin('fixDragInMz');
    __DDI__.setPlugin('fixDragInIE');

    /*
    *  bind d'n'd itself
    */
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
  /**
   *  Keyboard constructor
   *
   *  @constructor
   *  @access public
   */
  var __construct = function() {
    /*
    *  process the deadkeys, to make better useable, but non-editable object
    */
    var dk = {};
    for (var i=0, dL=deadkeys.length; i<dL; i++) {
      if (!deadkeys.hasOwnProperty(i)) continue;
      /*
      *  got correct deadkey symbol
      */
      dk[deadkeys[i][0]] = {};
      var chars = deadkeys[i][1].split(" ");
      /*
      *  process char:mod_char pairs
      */
      for (var z=0, cL=chars.length; z<cL; z++) {
        dk[deadkeys[i][0]][chars[z].charAt(0)] = chars[z].charAt(1);
      }
    }
    /*
    *  resulting array:
    *
    *  { '<dead_char>' : { '<key>' : '<modification>', }
    */
    deadkeys = dk;

    /*
    *  convert keymap array to the object, to have better typing speed
    */
    var tk = keymap;
    keymap = [];
    for (var i=0, kL=tk.length; i<kL; i++) {
        keymap[tk[i]] = i;
    }
    tk = null;
    /*
    *  create keyboard UI
    */
    nodes.keyboard = document.createElement("DIV");
    nodes.keyboard.id = "virtualKeyboard";
    nodes.keyboard.style.visibility = 'hidden';

    nodes.keyboard.innerHTML = 
      '<div id="kbHeader"><div id="kbHeaderLeft">Virtual Keyboard / '+self.$VERSION$
      +'<a href="#" id="kbHeaderRight" onclick="VirtualKeyboard.close(); return false;" alt="Close">&nbsp;</a></div></div>'
     +'<div id="kbDesk"></div>'
     +'<label class="kbTranslatorLabel" for="virtualKeyboardTranslator"><input type="checkbox" id="virtualKeyboardTranslator" checked="checked" />A->Z</label>'
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
