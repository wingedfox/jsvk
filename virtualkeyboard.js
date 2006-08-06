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
 * @modified WingedFox
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
  *  @type string
  *  @access private
  */
  var idPrefix = 'kb_';
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
  *  Keyboard container
  *
  *  @type HTMLDivElement
  *  @access private
  */
  var keyboard = null;
  /*
  *  Keyboard center coordinates
  *
  *  @type Object
  *  @access private
  */
  var keyboard_coords = {'x':0,'y':0};
  /*
  *  Keyboard desk
  *
  *  @type HTMLDivElement
  *  @access private
  */
  var desk = null;
  /*
  *  Layout selector
  *
  *  @type HTMLSelectElement
  *  @access private
  */
  var langbox = null;
  /*
  *  Shift state
  *
  *  @type Boolean
  *  @access private
  */
  var shift = false;
  /*
  *  Capslock state
  *
  *  @type Boolean
  *  @access private
  */
  var capslock = false;
  /*
  *  Stores current pressed key
  *
  *  @type HTMLAElement
  *  @access private
  */
  var curKey = null;
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
    if (desk == null || 'string' != typeof code || !layout.hasOwnProperty(code) || code == lang) return false;
    /*
    *  we will use old but quick innerHTML
    */
    var btns = "", i;
    for (i=0, aL = layout[code].alpha.length; i<aL; i++) {
      btns += "<a href=\"#\" id=\""+idPrefix+"b"+(parseInt(layout[code].alpha[i])?i:layout[code].alpha[i])+"\" class=\""+cssClasses['buttonUp']+"\""+
              ">"+(parseInt(layout[code].alpha[i])?"<span>"+String.fromCharCode(layout[code].alpha[i])+"</span>"
                                                    :"")+"</a>";
    }
    desk.innerHTML = btns;
    /*
    *  add shiftable elements
    */
    for (i in layout[code].diff) {
      if (parseInt(i) != NaN && layout[code].diff[i] instanceof Array) {
        for (var k=0, sL = layout[code].diff[i].length; k<sL; k++) {
          desk.childNodes[parseInt(i)+k].innerHTML += "<span class=\""+cssClasses['buttonShifted']+"\">"+String.fromCharCode(layout[code].diff[i][k])+"</span>";
          desk.childNodes[parseInt(i)+k].firstChild.className = cssClasses['buttonNormal'];
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
    if (!shift && !force) return;
    for (var i in layout[lang].diff) {
      if (parseInt(i) != NaN && layout[lang].diff[i] instanceof Array) {
        for (var k=0, sL = layout[lang].diff[i].length; k<sL; k++) {
          desk.childNodes[parseInt(i)+k].appendChild(desk.childNodes[parseInt(i)+k].firstChild);
          desk.childNodes[parseInt(i)+k].firstChild.className = cssClasses['buttonNormal'];
          desk.childNodes[parseInt(i)+k].lastChild.className = cssClasses['buttonShifted'];
        }
      }
    }
  
//    if (!kb_shift) {
//      kb_notice('&#1085;&#1072;&#1078;&#1084;&#1080;&#1090;&#1077; &#1085;&#1072; Shift, &#1095;&#1090;&#1086;&#1073;&#1099; &#1086;&#1090;&#1087;&#1091;&#1089;&#1090;&#1080;&#1090;&#1100; &#1077;&#1075;&#1086;');
//    } else {
//      kb_notice('');
//    }
  }
  /*
  *  Update layout selector
  *
  *  @see langbox
  *  @return update state
  *  access private
  */
  var updateLangList = function () {
    if (langbox == null) return false;
    var osel = langbox.selected;
    langbox.options.length = 0;
    for (var i in layout) {
      if (!layout.hasOwnProperty(i)) continue;
      /*
      *  trick to decode possible HTML entities
      */
      var t = document.createElement('span');
      t.innerHTML = layout[i].name;
      langbox.options[langbox.options.length] = new Option(t.firstChild.nodeValue, i, i==osel);
    }
    return true;
  }
/***************************************************************************************
** GLOBAL EVENT HANDLERS
***************************************************************************************/
  /*
  *  Method keeps keyboard in the visible area of document
  *
  *  @param {Event} scroll event
  *  @access protected
  */
  var _scrollHandler_ = function(e) {
    if (keyboard && keyboard.style.visibility == 'visible') {
      var x = getClientCenterX(), y = getClientCenterY();
      keyboard.style.left = ((parseInt(keyboard.style.left) + x - keyboard_coords.x)) + 'px';
      keyboard.style.top = (parseInt(keyboard.style.top) + y - keyboard_coords.y) + 'px';
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
    e = e || window.event;
    switch (e.keyCode) {
      case 16: //shift
        document.getElementById(idPrefix+'bshift_left').fireEvent('onmouseover');
        document.getElementById(idPrefix+'bshift_left').fireEvent('onmousedown');
        document.getElementById(idPrefix+'bshift_left').fireEvent('onmouseout');
        break; 
      case 20://caps lock
        document.getElementById(idPrefix+'bcaps').fireEvent('onmousedown');
        document.getElementById(idPrefix+'bcaps').fireEvent('onmouseup');
        document.getElementById(idPrefix+'bcaps').fireEvent('onmouseout');
        break;
      case 115:
        if (e.altKey) break;
      case 27:
        VirtualKeyboard.close();
        return false;
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
    *  either pressed key or something new
    */
    var el = curKey || getParent(e.srcElement||e.target,'a');
    /*
    *  reset to prevent duplicate clicks
    */
    if (!el || el.id.indexOf(idPrefix)<0) return;
    var chr;
    switch (el.id.substr(4,5)) {
      case 'caps' :
        if (curKey == getParent(e.srcElement||e.target,'a')) el.className += ' '+cssClasses['buttonHover'];
      case 'shift' :
        return;
      case 'backs':
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
        chr = "\r\n";
        break;
      default:
        chr = el.firstChild.firstChild.nodeValue;
        if (shift ^ capslock)
          chr = chr.toUpperCase();
        break;
    }
    if (chr) DocumentSelection.insertAtCursor(attachedInput,chr);
      el.className = el.className.replace(new RegExp("\\b"+cssClasses['buttonDown']+"\\b","g"),"");
    if (curKey)
      curKey.className = curKey.className.replace(new RegExp("\\b"+cssClasses['buttonHover']+"\\b","g"),"");
    curKey = null;
  }
  /*
  *  Handle mousedown event
  *
  *  Method is used to set 'pressed' button state and toggle shift, if needed
  *
  *  @param {Event} mouseup event
  *  @access protected
  */
  var _btnMousedown_ = function (e) { 
    var el = getParent(e.srcElement||e.target, 'a'); 
    if (!el) return;
    el.className = cssClasses['buttonUp']+' '+cssClasses['buttonDown'];

    if (el.id.indexOf(idPrefix+'bshift') == 0) { 
      self.toggleShift(true);
      shift = !shift;
      if (!shift) {
        document.getElementById(idPrefix+'bshift_left').className = document.getElementById(idPrefix+'bshift_right').className = cssClasses['buttonUp'];
        el.className += ' '+cssClasses['buttonHover'];
      } else
        document.getElementById('kb_bshift_left').className = document.getElementById('kb_bshift_right').className = cssClasses['buttonUp']+' '+cssClasses['buttonDown'];
    }
    switch (el.id.substr(4,5)) {
      case 'caps' :
        if (!(capslock = !capslock)) el.className = cssClasses['buttonUp'];
        //if (!kb_shift) // change state of CapsLock led
      case 'shift' :
        var p = getParent(el,'id','kbDesk');
        if (!p) return;
        if (capslock ^ !shift)
          p.className = p.className.replace(new RegExp("\\b"+cssClasses['capslock']+"\\b","g"),"");
        else 
          p.className += ' '+cssClasses['capslock'];
        return;
    }
    /*
    *  save pointer
    */
    curKey = el;
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
    var el = getParent(e.srcElement||e.target, 'a'); 
    if (!el && !(el=curKey)) return;
      el.className = el.className.replace(new RegExp("\\b"+cssClasses['buttonHover']+"\\b","g"),"");
    if (curKey && curKey.id.indexOf(idPrefix+'bcaps') != 0)
      curKey.className = cssClasses['buttonUp'];
  }
  /*
  *  Handle mouseout event
  *
  *  Method is used to remove 'pressed' button state
  *
  *  @param {Event} mouseup event
  *  @access protected
  */
  var _btnMouseover_ = function (e) { 
    var el = getParent(e.srcElement||e.target, 'a'); 
    if (!el) return;
    el.className += ' '+cssClasses['buttonHover'];
  }
  /*
  *  blocks link behavior
  *
  *  @param {Event} event to be blocked
  *  @access protected
  */
  var _blockLink_ = function (e) {
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
    if (!keyboard || !document.body || attachedInput == null) return false;
    if (!keyboard.offsetParent) document.body.appendChild(keyboard);
    keyboard.style.visibility = 'visible';
    var x = getClientCenterX(),
        y = getClientCenterY();
    keyboard.style.left = (x-keyboard.clientWidth/2) + 'px';
    keyboard.style.top = (y-keyboard.clientHeight/2) + 'px';
    keyboard_coords = {'x': x, 'y': y};
    return true;
  }
  /*
  * Закрытие клавиатуры
  */
  self.close = function () {
    if (!keyboard) return false;
    keyboard.style.visibility = 'hidden';
    attachedInput = null;
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
    keyboard = document.createElement("DIV");
    keyboard.id = "virtualKeyboard";
    keyboard.style.visibility = 'hidden';

    keyboard.innerHTML = 
     '<div id="kbHeader"><div id="kbHeaderLeft">Virtual Keyboard'+
      '<a href="#" id="kbHeaderRight" onclick="VirtualKeyboard.close(); return false;" alt="Close">&nbsp;</a></div></div>'+
     '<div id="kbDesk"></div>'+
     '<div id="'+idPrefix+'notice">&nbsp;</div>'+
     '<div id="'+idPrefix+'langselector">&#1071;&#1079;&#1099;&#1082;: <select name="select" onchange="VirtualKeyboard.switchLayout(this.value)"></select></div>';
    /*
    *  reference to keyboard desk
    */
    desk = keyboard.childNodes[1];
    /*
    *  reference to layout selector
    */
    langbox = keyboard.lastChild.lastChild;

    keyboard.attachEvent('onmousedown', _btnMousedown_);
    keyboard.attachEvent('onmouseup', _btnClick_);
    keyboard.attachEvent('onmouseover', _btnMouseover_);
    keyboard.attachEvent('onmouseout', _btnMouseout_);
    keyboard.attachEvent('onclick', _blockLink_);
    keyboard.attachEvent('ondragstart', _blockLink_);

    //Перемещение окна
    __DDI__.setPlugin('fixNoMouseSelect');
    __DDI__.setPlugin('moveIT');
    __DDI__.setPlugin('adjustZIndex');
    __DDI__.setPlugin('fixDragInMz');
    __DDI__.setPlugin('fixDragInIE');
    if (keyboard) {
            keyboard.alwaysOnTop = true;
            // Required, it's just blank event handler to initialize library
            keyboard.__onDragStart = function (e) {
                    if (e.__target.id != 'virtualKeyboard') return;
                    e.__dataTransfer.effectAllowed = 'none';
            }
            // Disallow any drag effects, if any...
            keyboard.__onDrag = function (e) {
                    return false;
            }
            // Initializes move.
            keyboard.__onMoveStart = function (e) {
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
            keyboard.__onMove = function (e) {
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