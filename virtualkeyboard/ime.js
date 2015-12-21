/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * See http://www.gnu.org/copyleft/lesser.html
 *
 * LGPL licence is applicable when you keep copyrights visible on the keyboard UI.
 *
 * Do not remove this comment if you want to use script!
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Ilya Lebedev
 * @copyright 2006-2015 Ilya Lebedev <ilya@lebedev.net>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 * @class VirtualKeyboard.IME
 * @constructor
 *
 *  Simple IME thing to show input tips, supplied by the callback
 *
 *  Usage:
 *   - call VirtualKeyboard.IME.show(suggestionlist); to show the suggestions
 *   - call VirtualKeyboard.IME.hide(keep_selection); to hide IME toolbar and keep selectio if needed
 *
 *  @scope public
 */
define(["underscore", "document-selection", "event-manager", "dom"], function (_, DocumentSelection, EM, DOM) {
    return new function IME () {
          var self = this;
          var html = "<div id=\"VirtualKeyboardIME\"><table><tr><td class=\"IMEControl\"><div class=\"left\"><!-- --></div></td>"
                    +"<td class=\"IMEControl IMEContent\"></td>"
                    +"<td class=\"IMEControl\"><div class=\"right\"><!-- --></div></td></tr>"
                    +"<tr><td class=\"IMEControl IMEInfo\" colspan=\"3\"><div class=\"showAll\"><div class=\"IMEPageCounter\"></div><div class=\"arrow\"></div></div></td></tr></div>";
          var ime = null;
          var chars = "";
          var page = 0;
          var showAll = false;
          var sg = [];
          var target = null;
          var selection = null;
          var targetWindow = null;

          /**
           *  Shows the IME tooltip
           *
           *  @param {Array} s optional array of the suggestions
           *  @scope public
           */
          self.show = function (s) {
              target = VirtualKeyboard.getAttachedInput();
              selection = new DocumentSelection(target);
              var win = DOM.getWindow(target);
              /*
              *  if there's no IME or target window is not the same, as before - create new IME
              */
              if (targetWindow != win) {
                  if (ime && ime.parentNode) {
                      ime.parentNode.removeChild(ime);
                  }
                  targetWindow = win;
                  __createImeToolbar();
                  targetWindow.document.body.appendChild(ime);
              }
              /*
              *  external property, set in the #switchLayout
              */
              ime.className = self.css

              if (s) self.setSuggestions(s);
              if (target && ime && sg.length>0) {
                  EM.addEventListener(target,'blur',self.blurHandler);
                  ime.style.display = "block";
                  self.updatePosition(target);
              } else if ('none' != ime.style.display) {
                  self.hide();
              }
          }

          /**
           *  Hides IME
           *
           *  @param {Boolean} keep keeps selection
           *  @scope public
           */
          self.hide = function (keep) {
              if (ime && 'none' != ime.style.display) {
                  ime.style.display = "none";
                  EM.removeEventListener(target,'blur',self.blurHandler);
                  if (target && selection.getSelection() && !keep)
                      selection.deleteSelection();
                  target = null;
                  selection = null;
                  sg=[];
              }
          }
          /**
           *  Updates position of the IME tooltip
           *
           *  @scope public
           */
          self.updatePosition = function () {
              var xy = DOM.getOffset(target);
              ime.style.left = xy.x+'px';
              var co = selection.getSelectionOffset();
              ime.style.top = xy.y+co.y+co.h-target.scrollTop+'px';
          }
          /**
           *  Imports suggestions and applies them
           *
           *  @scope public
           */
          self.setSuggestions = function (arr) {
              if (!_.isArray(arr)) return false;
              sg = arr;
              page = 0;
              showPage();
              self.updatePosition(target);
          }
          /**
           *  Returns suggestion list
           *
           *  @param {Number} idx optional index in the suggestions array
           *  @return {String, Array} all suggestions, or one by its index
           *  @scope public
           */
          self.getSuggestions = function (idx) {
              return _.isNumber(idx)?sg[idx]:sg;
          }
          /**
           *  Shows the next page from the suggestions list
           *
           *  @param {Event} e optional event to be cancelled
           *  @scope public
           */
          self.nextPage = function (e) {
              page = Math.max(Math.min(page+1,(Math.ceil(sg.length/10))-1),0);
              showPage();
          }
          /**
           *  Shows the previous page from the suggestions list
           *
           *  @param {Event} e optional event to be cancelled
           *  @scope public
           */
          self.prevPage = function (e) {
              page = Math.max(page-1,0);
              showPage();
          }
          /**
           *  Returns the current page number
           *
           *  @return {Number} page number
           *  @scope public
           */
          self.getPage = function () {
              return page;
          }
          /**
           *  Returns char by its number in the suggestions array
           *
           *  @param {Number} n char number in the current page
           *  @return {String} char
           *  @scope public
           */
          self.getChar = function (n) {
              n = --n<0?9:n;
              return sg[self.getPage()*10+n]
          }
          self.isOpen = function () {
              return ime && 'block' == ime.style.display;
          }
          /**
           *  Gets called on input field blur then closes IME toolbar and removes the selection
           *
           */
          self.blurHandler = function (e) {
              self.hide();
          }
          /**
           *  Toggles 'all' and 'paged' modes of the toolbar
           *
           *  @param {Event} e optional event to be cancelled
           *  @scope public
           */
          self.toggleShowAll = function (e) {
              var sa = ime.firstChild.rows[1].cells[0].lastChild;
              if (showAll = !showAll) {
                  sa.className = 'showPage';
              } else {
                  sa.className = 'showAll';
              }
              showPage();
          }
          /**
           *  Shows all IME pages
           *
           *  @return false if already all pages are shown
           *  @scope public
           */
          self.showAllPages = function () {
              if (!showAll) {
                   self.toggleShowAll();
                   return true;
              }
              return false;
          }
          /**
           *  Shows IME in paged mode
           *
           *  @return false if already in paged mode
           *  @scope public
           */
          self.showPaged = function () {
              if (showAll) {
                   self.toggleShowAll();
                   return true;
              }
              return false;
          }

          /**
           *  Shows currently selected page in the IME tooltip
           *
           *  @scope private
           */
          var showPage = function () {
              var s = ['<table>'];
              for (var z=0,pL=Math.ceil(sg.length/10); z<pL; z++ ) {
                  if (showAll || z == page) {
                      s.push('<tr>');
                      for (var i=0,p=z*10; i<10 && !_.isUndefined(sg[p+i]); i++) {
                          s.push("<td><a href=''>")
                          if (z==page) {
                              s.push("<b>&nbsp;"+((i+1)%10)+": </b>");
                          } else {
                              s.push("<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>");
                          }
                          s.push(sg[p+i]+"</a></td>");
                      }
                      s.push('</tr>');
                  }
              }
              s.push('</table>');
              ime.firstChild.rows[0].cells[1].innerHTML = s.join("");
              // update page counter
              ime.firstChild.rows[1].cells[0].firstChild.firstChild.innerHTML = (page+1)+"/"+(0+showAll || Math.ceil(sg.length/10));
              // prevent selection in IE
              var els = ime.getElementsByTagName("*");
              for (var i=0,eL=els.length; i<eL; i++) {
                  els[i].unselectable = "on";
              }
          }
          /**
           *  Inserts selected choice, replacing possible selection and hides IME toolbar
           *
           *  @param {MousedownEvent} e
           *  @scope protected
           */
          var pasteSuggestion = function (e) {
              var el = DOM.getParent(e.target,'a');
              if (el) {
                  selection.insertAtCursor(el.lastChild.nodeValue);
                  self.hide();
              }
              e.preventDefault();
              e.stopPropagation()
          }

          /**
           *  Just the initializer
           */
          var __createImeToolbar = function () {
              var el = targetWindow.document.createElement('div');
              el.innerHTML = html;
              ime = el.firstChild;
              ime.style.display = 'none';
              var arrl = ime.firstChild.rows[0].cells[0]
                 ,arrr = ime.firstChild.rows[0].cells[2]
                 ,arrd = ime.firstChild.rows[1].cells[0].lastChild
              EM.addEventListener(arrl,'mousedown',self.prevPage);
              EM.addEventListener(arrl,'mousedown',EM.preventDefaultAction);
              EM.addEventListener(arrl,'mousedown',EM.stopPropagationAction);
              EM.addEventListener(arrr,'mousedown',self.nextPage);
              EM.addEventListener(arrr,'mousedown',EM.preventDefaultAction);
              EM.addEventListener(arrr,'mousedown',EM.stopPropagationAction);
              EM.addEventListener(arrd,'mousedown',self.toggleShowAll);
              EM.addEventListener(arrd,'mousedown',EM.preventDefaultAction);
              EM.addEventListener(arrd,'mousedown',EM.stopPropagationAction);
              /*
              *  blocks any selection
              */
              ime.unselectable = "on";
              var els = ime.getElementsByTagName("*");
              for (var i=0,eL=els.length;i<eL;i++) {
                  els[i].unselectable = "on";
              }

              EM.addEventListener(ime,'mousedown',pasteSuggestion);
              EM.addEventListener(ime,'mouseup',EM.preventDefaultAction);
              EM.addEventListener(ime,'click',EM.preventDefaultAction);
          }
    }
});