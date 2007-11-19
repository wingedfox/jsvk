/**
 * $Id$
 * Virtual Keyboard plugin for TinyMCE v3 editor.
 * (C) 2006-2007 Ilya Lebedev <ilya@lebedev.net>
 */
tinymce.PluginManager.requireLangPack('jsvk');tinymce.create('tinymce.plugins.VirtualKeyboard',new function(){var i=this,I="winxp",l="",o=null,O;i.VirtualKeyboard=function(c,C){c.addCommand("mceVirtualKeyboard",function(){_(c)});I=c.getParam('vk_skin',I);l=c.getParam('vk_layout',l);c.addButton('jsvk','jsvk.desc','mceVirtualKeyboard',{image:C+'/img/jsvk.gif'});c.onInit.add(Q);};i.getInfo=function(){return{longname:'VirtualKeyboard plugin',author:'Ilya Lebedev AKA WingedFox',authorurl:'http://www.debugger.ru',infourl:'http://www.debugger.ru/projects/virtualkeyboard/',version:"1.0"}};var Q=function(){if(O)return;O=true;var c=document.createElement('script');c.src=tinymce.baseURL+'/plugins/jsvk/jscripts/vk_loader.js?vk_skin='+I+'&vk_layout='+l;c.type="text/javascript";c.charset="UTF-8";document.getElementsByTagName('head')[0].appendChild(c);};var _=function(c){var C;if(this._curId===c.editorId){VirtualKeyboard.close();this._curId=null}else{if(null!=this._curId&&(C=document.getElementById('VirtualKeyboard_'+this._curId))){VirtualKeyboard.close();}if(!(C=document.getElementById('VirtualKeyboard_'+c.editorId))){C=document.getElementById(c.editorId+"_parent").getElementsByTagName('table')[0];C.insertRow(C.rows.length);C=C.rows[C.rows.length-1];C.id='VirtualKeyboard_'+c.editorId;C.appendChild(document.createElement('td'));}C=C.firstChild;VirtualKeyboard.open(c.editorId+'_ifr',C);this._curId=c.editorId}}});tinymce.PluginManager.add('jsvk',tinymce.plugins.VirtualKeyboard);
