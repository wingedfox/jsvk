/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard.
 * (C) 2006 Vladislav SHCHapov, phprus@gmail.com
 * (C) 2006-2007 Ilya Lebedev <ilya@lebedev.net>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * See http://www.gnu.org/copyleft/lesser.html
 *
 * Do not remove this comment if you want to use script!
 * �� �������� ������ �����������, ���� �� ������ ������������ ������!
 *
 * @author Vladislav SHCHapov <phprus@gmail.com>
 * @author Ilya Lebedev <ilya@lebedev.net>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
/*
*  The Virtual Keyboard
*
*  @class VirtualKeyboard
*  @constructor
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
                9,81,87,69,82,84,89,85,73,79,80,219,221,13,      // TAB to ENTER
                20,65,83,68,70,71,72,74,75,76,186,222,           // CAPS to '
                16,90,88,67,86,66,78,77,188,190,191,16,          // SHIFT to SHIFT
                46,18,32,18];                                    // Delete, Alt, SPACE, Alt
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
     ,VK_CAPS = 8;
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
    // ring above, degree sign
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
    // middle dot
    ["\xb7", "e\u0117 E\u0116 u0131i I\u0130 z\u017c Z\u017b"],
    // breve
    ["\u02d8", "a\u0103 A\u0102 e\u0115 E\u0114 o\0u14f O\0u14e G\u011f g\u011e"],
    // double acute
    ["\u02dd", "o\u0151 O\u0150 U\u0170 u\u0171"],
    // cedilla
    ["\xb8", "c\xe7 C\xc7 g\u0123 G\u0122 k\u0137 K\u0136 l\u013c L\u013b "+
             "n\u0146 N\u0145 r\u0157 R\u0156 S\u015e s\u015f T\u0162 t\u0163"
    ]
  ]
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
  var lang = null;
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
  var layout = {}
  /*
  *  Shortcuts to the nodes
  *
  *  @type Object
  *  @access private
  */
  var nodes = {
      keyboard : null     // Keyboard container @type HTMLDivElement
     ,desk : null         // Keyboard desk @type HTMLDivElement
     ,langbox : null      // Layout selector @type HTMLSelectElement
     ,attachedInput : null// Field, keyboard attached to
  }
  /*
  *  Key code to be inserted on the keypress
  *
  *  @type Number
  *  @access private
  */
  var newKeyCode = null; 

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
    if (!isString(code)) return false;
    var pos = 0;
    for (var i in layout) {
      if (!layout.hasOwnProperty(i) || !layout[i].hasOwnProperty(code)) continue;
      /*
      *  if we have only 1 layout available don't do that;
      */
      if (1==nodes.lytbox.getOptionsCount() && 1==nodes.langbox.getOptionsCount()) return false;

      if (nodes.lytbox.getValue() == code) {
          self.setNextLayout();
          nodes.lytbox.removeSelectedOptions(code,'exact');   
      }
      if (!nodes.lytbox.getOptionsCount()) {
          self.setNextLang();
          nodes.langbox.removeSelectedOptions(i,'exact');
      }
      delete (layout[pos]);
      return true;
    }
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

      /*
      *  add language, if it does not exists
      */
      if (!layout.hasOwnProperty(code)) {
        layout[code] = {};
        nodes.langbox.addOption(code, code, false, false, true);
      }

      /*
      *  convert layout in machine-aware form
      */
      var ca = null
         ,cac = -1
         ,cs = null
         ,csc = -1
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
                  (cac>-1&&ca.hasOwnProperty(i-cac)?ca[i-cac]:null)  // alt chars
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
//      lt.splice(54,0,'ctrl_left');
      lt.splice(54,0,'alt_left');
      lt.splice(55,0,'space');
      lt.splice(56,0,'alt_right');
//      lt.splice(57,0,'ctrl_right');

      lt.dk = deadkeys;

      layout[code][name] = lt;

      return true;
  }
  /**
   *  Set current layout
   *
   *  @param {String} language code
   *  @param {String} layout code
   *  @return {Boolean} change state
   *  @access public
   */
  this.switchLayout = function (code, name) {
    if (null == code) code = nodes.langbox.getValue();
    if (!layout.hasOwnProperty(code) || (name && lang==layout[code][name])) return false;
    /*
    *  select another language, if current is not the same as new
    */
    if (nodes.langbox.getValue() != code) nodes.langbox.selectOnlyMatchingOptions(code,'exact');
    /*
    *  force layouts removal, becase switchLayout could be called outside keyboard
    */
    nodes.lytbox.removeAllOptions();
    for (var i in layout[code]) {
        if (layout[code].hasOwnProperty(i)) nodes.lytbox.addOption(i,i,false,false,true);
    }
    if (!name || !nodes.lytbox.selectOnlyMatchingOptions(name,'exact')) {
        nodes.lytbox.selectOption(0);
        name = nodes.lytbox.getValue();
    }

    if (!layout[code].hasOwnProperty(name)) return false;
    /*
    *  we will use old but quick innerHTML
    */
    var btns = ""
       ,i
       ,zcnt = 0
       ,inp = document.createElement('span');
    /*
    *  inp is used to calculate real char width and detect combining symbols
    *  @see __getCharHtmlForKey
    */
    nodes.keyboard.appendChild(inp);

    lang = layout[code][name];
    for (i=0, aL = lang.length; i<aL; i++) {
      var chr = lang[i];
      btns +=  "<div id=\""+idPrefix+(isArray(chr)?zcnt++:chr)
              +"\" class=\""+cssClasses['buttonUp']
              +"\"><a href=\"#"+i+"\""
              +">"+(isArray(chr)?(__getCharHtmlForKey(lang,chr[0],cssClasses['buttonNormal'],inp)
                                 +__getCharHtmlForKey(lang,chr[1],cssClasses['buttonShifted'],inp)
                                 +__getCharHtmlForKey(lang,chr[2],cssClasses['buttonAlted'],inp))
                                :"")
              +"</a></div>";
    }
    nodes.desk.innerHTML = btns;
    nodes.keyboard.removeChild(inp);
    inp = null;
    /*
    *  restore capslock state
    */
    var caps = document.getElementById(idPrefix+'caps');
    if (caps && mode&VK_CAPS) {
      caps.className += ' '+cssClasses['buttonDown'];
    }
    /*
    *  restore shift state
    */
    var shift = document.getElementById(idPrefix+'shift_left');
    if (shift && mode&VK_SHIFT) {
      shift.className += ' '+cssClasses['buttonDown'];
      shift = document.getElementById(idPrefix+'shift_right');
      shift.className += ' '+cssClasses['buttonDown'];
      this.toggleLayoutMode();
   }
  }
  /**
   *  Toggles layout mode (switch alternative key bindings) 
   *
   *  @param {String} a1 key suffix to be checked
   *  @param {Number} a2 keyboard mode
   *  @access private
   */
  this.toggleLayoutMode = function (a1,a2) {
    if (a1 && a2) {
        /*
        *  toggle keys, it's needed, really
        */
        var s1 = document.getElementById(idPrefix+a1+'_left')
           ,s2 = document.getElementById(idPrefix+a1+'_right')
        if (mode&a2) {
            mode = mode ^ a2;
            s1.className = s2.className = s1.className.replace (new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),'');
        } else {
            mode = mode | a2;
            s1.className = s2.className = s1.className+" "+cssClasses['buttonDown'];
        }
    }
    /*
    *  now, process to layout toggle 
    */
    var bi = -1
       /*
       *  0 - normal keys
       *  1 - shift keys
       *  2 - alt keys (has priority, when it pressed together with shift)
       */
       ,sh = Math.min(mode&(VK_ALT|VK_SHIFT),2);
    for (var i=0, lL=lang.length; i<lL; i++) {
        if (isString(lang[i])) continue;
        bi++;
        var btn = document.getElementById(idPrefix+bi).firstChild;
        /*
        *  swap symbols and its CSS classes
        */
        if (btn.childNodes.length>1) {
            btn.childNodes.item(0).className = !sh||isEmpty(lang[i][sh])?cssClasses['buttonNormal']       // put in the 'active' position
                                                                        :sh&1?cssClasses['buttonShifted'] // swap with shift
                                                                             :cssClasses['buttonAlted']   // swap with alt
            btn.childNodes.item(1).className = !sh?cssClasses['buttonShifted']      // put in the 'home' position
                                                  :sh&1?cssClasses['buttonNormal']  // put in the 'active' position
                                                       :cssClasses['buttonShifted'] // put in the 'home' position
            btn.childNodes.item(2).className = !sh?cssClasses['buttonAlted']        // put in the 'home' position
                                                  :sh&1?cssClasses['buttonAlted']   // put in the 'home' position
                                                       :cssClasses['buttonNormal']  // put in the 'active' position
        }
    }
  }
  /*
  *  Used to rotate langs (or set prefferred one, if legal code is specified)
  *
  *  @access private
  */
  this.setNextLang = function () {
      nodes.langbox.selectNext(true);
      self.switchLayout(nodes.langbox.getValue(),null);
  }
  /*
  *  Used to rotate lang layouts
  *
  *  @access private
  */
  this.setNextLayout = function () {
      nodes.lytbox.selectNext(true);
      self.switchLayout(nodes.langbox.getValue(),nodes.lytbox.getValue());
  }
  /**
   *  Return the list of the available layouts
   *
   *  @return {Array}
   *  @scope public
   */
  this.getLayouts = function () {
      var lts = [];
      for (var i in layout) {
        if (!layout.hasOwnProperty(i)) continue;
        for (var z in layout[i]) {
          if (!layout[i].hasOwnProperty(z)) continue;
          lts[lts.length] = i+"\xa0-\xa0"+z;
        }
      }
      return lts.sort();
  }

  //---------------------------------------------------------------------------
  // GLOBAL EVENT HANDLERS
  //---------------------------------------------------------------------------
  /**
   *  Do the key clicks, caught from both virtual and real keyboards
   *
   *  @param {HTMLInputElement} key on the virtual keyboard
   *  @param {EventTarget} evt optional event object, to be used to re-map the keyCode
   *  @access private
   */
  var _keyClicker_ = function (key, evt) {
      var chr = ""
         ,ret = false;
      key = key.replace(idPrefix, "");

      switch (key) {
          case "caps" :
          case "shift" :
          case "shift_left" :
          case "shift_right" :
          case "alt" :
          case "alt_left" :
          case "alt_right" :
              return;
          case 'backspace':
              /*
              *  is char is in the buffer, or selection made, made decision at __charProcessor
              */
              if (DocumentSelection.getSelection(nodes.attachedInput))
                  chr = "\x08";
              else
                  DocumentSelection.deleteAtCursor(nodes.attachedInput, false);
              break;
          case 'del':
              DocumentSelection.deleteAtCursor(nodes.attachedInput, true);
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
                  /*
                  *  replace is used to strip 'nbsp' base char, when its used to display combining marks 
                  *  @see __getCharHtmlForKey
                  */
                  chr = (el.firstChild.childNodes[Math.min(mode&(VK_ALT|VK_SHIFT),2)]||
                         el.firstChild.firstChild).firstChild.nodeValue.replace("\xa0","").replace("\xa0","");
                  /*
                  *  do uppercase if either caps or shift clicked, not both
                  *  and only 'normal' key state is active
                  */
                  if (((mode & VK_SHIFT || mode & VK_CAPS) && (mode ^ (VK_SHIFT | VK_CAPS)))) chr = chr.toUpperCase();
                  /*
                  *  reset shift state, if clicked on the letter button
                  */
                  if (!(evt && evt.shiftKey) && mode&VK_SHIFT) {
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
          if (!(chr = __charProcessor(chr, DocumentSelection.getSelection(nodes.attachedInput)))) return ret;
          /*
          *  check for .keyIdentifier is added to track Safari (all KHTML based browsers?)...
          */
          if (1 == chr[0].length && !chr[1] && '\n' != chr[0] && evt && !evt.keyIdentifier) {

              try {
                  /*
                  *  IE allows to rewrite the key code
                  */
                  evt.keyCode = chr[0].charCodeAt(0);
                  ret = true;
              } catch (err) {
                  try {
                      /*
                      *  Mozilla implements events interface mostly complete
                      *  also, this code helps to keep input text in the view
                      */
                      var e = document.createEvent("KeyboardEvent");
                      e.initKeyEvent(
                                     "keypress",       //  in DOMString typeArg,
                                     false,            //  in boolean canBubbleArg,
                                     true,             //  in boolean cancelableArg,
                                     null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
                                     false,            //  in boolean ctrlKeyArg,
                                     false,            //  in boolean altKeyArg,
                                     false,            //  in boolean shiftKeyArg,
                                     false,            //  in boolean metaKeyArg,
                                     chr[0].charCodeAt(0),chr[0].charCodeAt(0)
                      );  
                      e.__bypass = true;
                      nodes.attachedInput.dispatchEvent(e);
                  } catch (err) {
                      /*
                      *  this is used at least by Opera9, because it neither support overwriting keyCode value
                      *  nor KeyboardEvent creation
                      */
                      if (DocumentSelection.getStart(nodes.attachedInput) != DocumentSelection.getEnd(nodes.attachedInput))
                          DocumentSelection.deleteAtCursor(nodes.attachedInput);
                      DocumentSelection.insertAtCursor(nodes.attachedInput,chr[0]);
                  }
              }
          } else {
              /*
              *  __charProcessor might return the char sequence
              *  it could not be processed with the standard events, thus insert it manually
              */
              if (DocumentSelection.getStart(nodes.attachedInput) != DocumentSelection.getEnd(nodes.attachedInput))
                  DocumentSelection.deleteAtCursor(nodes.attachedInput);
              DocumentSelection.insertAtCursor(nodes.attachedInput,chr[0]);
              /*
              *  select as much, as __charProcessor callback requested
              */
              if (chr[1]) {
                  /*
                  *  settimeout is used to select text right after event handlers will insert new contents
                  */
                  DocumentSelection.setRange(nodes.attachedInput,-chr[1],0,true);
              }
          }
          /*
          *  check for right-to-left languages
          */
          if (chr[0] && chr[0].charCodeAt (0) > 0x5b0 && chr[0].charCodeAt (0) < 0x6ff)
              nodes.attachedInput.dir = "rtl";
          else if (0 == nodes.attachedInput.value.length) 
              nodes.attachedInput.dir = "ltr";
      }
      return ret;
  }
  /**
   *  Captures some keyboard events
   *
   *  @param {Event} keydown
   *  @access protected
   */
  var _keydownHandler_ = function(e) {
    /*
    *  it's global event handler. do not process event, if keyboard is closed
    */
    if (!self.isOpen()) return;
    e = e || window.event;
    /*
    *  differently process different events
    */
    switch (e.type) {
      case 'keydown' :
        if (e.ctrlKey) mode = mode | VK_CTRL;
        
        switch (e.keyCode) {
          case 8: // backspace
              var el = nodes.desk.childNodes[keymap[e.keyCode]];
              _keyClicker_(el.id.replace(idPrefix, ""), e);
              /*
              *  set the class only 1 time
              */
              if (!e.repeat) el.className += " "+cssClasses['buttonDown'];
              e.returnValue = false;
              if (e.preventDefault) e.preventDefault();
              break;
          case 16://shift
              if (!(mode&VK_SHIFT)) {
                  self.toggleLayoutMode('shift', VK_SHIFT);
              }
              break;
          case 18: //alt          
              if (e.altKey && !(mode&VK_ALT)) {
                  self.toggleLayoutMode('alt', VK_ALT);
              }
              break;
          case 20: //caps lock
              var cp = document.getElementById(idPrefix+'caps');
              if (!(mode & VK_CAPS)) {
                  mode = mode | VK_CAPS;
                  cp.className += ' '+cssClasses['buttonDown'];
              } else {
                  mode = mode ^ VK_CAPS;
                  cp.className = cp.className.replace (new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),'');
              }
              break;
          case 27:
              VirtualKeyboard.close();
              return false;
          default:
              /*
              *  skip keypress if ctrl pressed
              */
              if (keymap.hasOwnProperty(e.keyCode) && !e.ctrlKey) {
                  var el = nodes.desk.childNodes[keymap[e.keyCode]];
                  el.className += " "+cssClasses['buttonDown'];
                  /*
                  *  assign the key code to be inserted on the keypress
                  */
                  newKeyCode = nodes.desk.childNodes[keymap[e.keyCode]].id.replace(idPrefix, "");
              }
              break;
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
        if (!e.ctrlKey && (mode & VK_CTRL)) mode = mode ^ VK_CTRL;
        switch (e.keyCode) {
            case 18:
                self.toggleLayoutMode('alt', VK_ALT);
                break;
            case 16:
                self.toggleLayoutMode('shift', VK_SHIFT);
                break;
            case 20:
                return;
            default:
                if (keymap.hasOwnProperty(e.keyCode)) {
                    var el = nodes.desk.childNodes[keymap[e.keyCode]];
                    el.className = el.className.replace(new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),"");
                }
        }
        break;
      case 'keypress' :
        /*
        *  flag is set only when virtual key passed to input target
        */
        if (newKeyCode && !e.__bypass) {
            if (!_keyClicker_(newKeyCode, e)) {
                e.returnValue = false;
                if (e.preventDefault) e.preventDefault();
            }
            /*
            *  reset flag
            */
            newKeyCode = null;
        }
        return;
    }
    /*
    *  do uppercase transformation
    */
    if (!e.repeat && (20 == e.keyCode || 16 == e.keyCode)) {
        if ((mode & VK_SHIFT || mode & VK_CAPS) && (mode ^ (VK_SHIFT | VK_CAPS)))
            nodes.desk.className += ' '+cssClasses['capslock'];
        else
            nodes.desk.className = nodes.desk.className.replace(new RegExp("\\s*\\b"+cssClasses['capslock']+"\\b","g"),"");
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
    var el = DOM.getParent(e.srcElement||e.target,'a');
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;

    switch (el.id.substring(idPrefix.length)) {
      case "caps":
      case "shift_left":
      case "shift_right":
      case "alt_left":
      case "alt_right":
          return;
    }
    el.className = el.className.replace(new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),"");
    _keyClicker_(el.id);
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
    var el = DOM.getParent(e.srcElement||e.target, 'a'); 
    /*
    *  skip invalid nodes
    */
    if (!el || el.parentNode.id.indexOf(idPrefix)<0) return;
    el = el.parentNode;
    var key = el.id.substring(idPrefix.length);
    switch (key) {
      case "caps":
        var cp = document.getElementById(idPrefix+'caps');
        if (VK_CAPS & (mode = mode ^ VK_CAPS))
          cp.className += ' '+cssClasses['buttonDown'];
        else
          cp.className = cp.className.replace (new RegExp("\\s*\\b"+cssClasses['buttonDown']+"\\b","g"),'');
        break;
      case "shift_left":
      case "shift_right":
        /*
        *  Shift is pressed in on both keyboard and virtual keyboard, return 
        */
        if (mode&VK_SHIFT && e.shiftKey) break;
        self.toggleLayoutMode('shift', VK_SHIFT);
        break;
      case "alt_left":
      case "alt_right":
        /*
        *  Alt is pressed in on both keyboard and virtual keyboard, return 
        */
        if (mode&VK_ALT && e.altKey) break;
        self.toggleLayoutMode('alt', VK_ALT);
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
    if ((mode & VK_SHIFT || mode & VK_CAPS) && (mode ^ (VK_SHIFT | VK_CAPS)))
      nodes.desk.className += ' '+cssClasses['capslock'];
    else 
      nodes.desk.className = nodes.desk.className.replace(new RegExp("\\s*\\b"+cssClasses['capslock']+"\\b","g"),"");
    e.returValue = false;
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
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
    var el = DOM.getParent(e.srcElement||e.target, 'a'); 
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
    var el = DOM.getParent(e.srcElement||e.target, 'a'); 
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
    var el = DOM.getParent(e.srcElement||e.target, 'a'); 
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
    nodes.attachedInput = el;
    return nodes.attachedInput;
  }
  /*
  *  Shows keyboard
  *
  *  @param {HTMLElement, String} input element or it to bind keyboard to
  *  @param {String} holder keyboard holder container, keyboard won't have drag-drop when holder is specified
  *  @param {HTMLElement} kpTarget optional target to bind key* event handlers to,
  *                       is useful for frame and popup keyboard placement
  *  @return {Boolean} operation state
  *  @access public
  */
  self.open =
  self.show = function (input, holder, kpTarget){
    if ( input && !(input = self.attachInput(input))
      || !nodes.keyboard || !document.body || nodes.attachedInput == null) return false;
    /*
    *  check pass means that node is not attached to the body
    */
    if (!nodes.keyboard.parentNode || nodes.keyboard.parentNode.nodeType==11) {
        if (isString(holder)) holder = document.getElementById(holder);
        if (!holder.appendChild) return false;
        holder.appendChild(nodes.keyboard);
        self.switchLayout(nodes.langbox.getValue(), nodes.lytbox.getValue())
        /*
        *  we'll bind event handler here
        */
        if (!input.attachEvent) input.attachEvent = nodes.desk.attachEvent;
        input.attachEvent('onkeydown', _keydownHandler_);
        input.attachEvent('onkeyup', _keydownHandler_);
        input.attachEvent('onkeypress', _keydownHandler_);
        if (!isUndefined(kpTarget) && input != kpTarget && kpTarget.appendChild) {
            if (!kpTarget.attachEvent) kpTarget.attachEvent = nodes.desk.attachEvent;
            kpTarget.attachEvent('onkeydown', _keydownHandler_);
            kpTarget.attachEvent('onkeyup', _keydownHandler_);
            kpTarget.attachEvent('onkeypress', _keydownHandler_);
        }
    }
    /*
    *  special, for IE
    */
    setTimeout(function(){nodes.keyboard.style.display = 'block';},1);

    return true;
  }
  /**
   *  Hides the keyboard
   *  
   *  @return {Boolean}
   *  @scope public
   */
  self.close =
  self.hide = function () {
    if (!nodes.keyboard || !self.isOpen()) return false;
    nodes.keyboard.style.display = 'none';
    nodes.attachedInput = null;
    return true;
  }
  /*
  *  Toggles keyboard state
  *
  *  @param {HTMLElement, String} input element or it to bind keyboard to
  *  @param {String} holder keyboard holder container, keyboard won't have drag-drop when holder is specified
  *  @param {HTMLElement} kpTarget optional target to bind key* event handlers to,
  *                       is useful for frame and popup keyboard placement
  *  @return {Boolean} operation state
  *  @access public
  */
  self.toggle = function (input, holder, kpTarget) {
      self.isOpen()?self.close():self.show(input, holder, kpTarget);
  }
  /**
   *  Returns true if keyboard is opened
   * 
   *  @return {Boolean}
   *  @scope public 
   */
  self.isOpen = function () /* :Boolean */ {
      return nodes.keyboard.style.display == 'block';
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
    if (isFunction(lang.dk)) {
      /*
      *  call user-supplied converter
      */
      res = lang.dk.call(self,tchr,buf);
    } else if (tchr == "\x08") {
      res = ['',0];
    } else {
      /*
      *  process char in buffer first
      *  buffer size should be exactly 1 char to don't mess with the occasional selection
      */
      var fc = buf.charAt(0);
      if ( buf.length==1 && lang.dk.indexOf(fc.charCodeAt(0))>-1 ) {
        /*
        *  dead key found, no more future processing
        *  if new key is not an another deadkey
        */
        res[1] = tchr != fc & lang.dk.indexOf(tchr.charCodeAt(0))>-1;
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
   *  @param {Object} lyt layout object
   *  @param {String} chr char code
   *  @param {String} css optional additional class names
   *  @param {HTMLInputElement} i input field to test char length against
   *  @return {String} resulting html
   *  @scope private
   */
  var __getCharHtmlForKey = function (lyt, chr, css, inp) {
      /*
      *  if char exists
      */
      var html = []
         ,dk = !isFunction(lyt.dk) && lyt.dk.indexOf(chr)>-1
      /*
      *  if key matches agains current deadchar list
      */
      if (dk) css = [css, cssClasses['deadkey']].join(" ");
      /*
      *  this is used to detect true combining chars, like THAI CHARACTER SARA I
      */
      if (isArray(chr)) {
          inp.innerHTML = chr.map(String.fromCharCode).join("");
      } else {
          chr = (parseInt(chr)?""+String.fromCharCode(chr):"");
          inp.innerHTML = chr;
          if (chr && inp.offsetWidth < 4) inp.innerHTML = "\xa0"+chr+"\xa0";
      }

      html[html.length] = "<span ";
      if (css) { 
          html[html.length] = "class=\"";
          html[html.length] = css;
          html[html.length] = "\"";
      }
      html[html.length] = ">"+(chr?inp.innerHTML:"")+"</span>";
    return html.join("");
  }
  /**
   *  Keyboard constructor
   *
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
    nodes.keyboard = document.createElementExt('div',{'param' : { 'id' : 'virtualKeyboard'} });
    nodes.desk = document.createElementExt('div',{'param' : { 'id' : 'kbDesk'} });
    nodes.keyboard.appendChild(nodes.desk);
    /*
    *  reference to layout selector
    */
    nodes.langbox = new Selectbox();
    nodes.langbox.getEl().onchange = function(){self.switchLayout(this.value,0)}; 
    nodes.langbox.getEl().id = 'kb_langselector';
    nodes.lytbox = new Selectbox();
    nodes.lytbox.getEl().onchange = function(){self.switchLayout(null,this.value)};
    nodes.lytbox.getEl().id = 'kb_layoutselector';
    nodes.keyboard.appendChild(nodes.langbox.getEl()); 
    nodes.keyboard.appendChild(nodes.lytbox.getEl()); 

    /*
    *  insert some copyright information
    */
    var copy = document.createElementExt('div',{'param' : { 'id' : 'copyrights'
                                                           ,'nofocus' : 'true'
                                                           ,'innerHTML' : '<a href="http://debugger.ru/projects/virtualkeyboard" target="_blank">VirtualKeyboard '+self.$VERSION$+'</a><br />&copy; 2006-2007 <a href="http://debugger.ru" target="_blank">"Debugger.ru"</a>'
                                                        }
                                               }
                                        );
    nodes.keyboard.appendChild(copy);
    nodes.desk.attachEvent('onmousedown', _btnMousedown_);
    nodes.desk.attachEvent('onmouseup', _btnClick_);
    nodes.desk.attachEvent('onmouseover', _btnMouseover_);
    nodes.desk.attachEvent('onmouseout', _btnMouseout_);
    nodes.desk.attachEvent('onclick', _blockLink_);
    nodes.desk.attachEvent('ondragstart', _blockLink_);

  }
  /*
  *  call the constructor
  */
  __construct();
}
