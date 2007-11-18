/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard plugin for tinyMCE.
 * (C) 2006-2007 Ilya Lebedev <ilya@lebedev.net>
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
 * @author Ilya Lebedev <ilya@lebedev.net>
 * @version $Rev$
 * @lastchange $Author$
 */
// Load plugin specific language pack
tinymce.PluginManager.requireLangPack('jsvk');

tinymce.create('tinymce.plugins.VirtualKeyboard', new function () {
    var self = this
       ,_vk_skin = "winxp"
       ,_vk_layout = ""
       ,_curId = null
       ,loaded

    /**
     *  external method 
     *
     *
     */
    self.VirtualKeyboard = function(ed, url) {
        ed.addCommand("mceVirtualKeyboard", function(){toggleKeyboard(ed)});

        _vk_skin = ed.getParam('vk_skin', _vk_skin);
        _vk_layout = ed.getParam('vk_layout', _vk_layout);
    
        // Register buttons
        ed.addButton('jsvk', 'jsvk.desc', 'mceVirtualKeyboard', {
            image : url + '/images/jsvk.gif'
        });
        ed.onInit.add(_init);
    }

    self.getInfo = function() {
        return {
                longname : 'VirtualKeyboard plugin',
                author : 'Ilya Lebedev AKA WingedFox',
                authorurl : 'http://www.debugger.ru',
                infourl : 'http://www.debugger.ru/projects/virtualkeyboard/',
                version : "1.0"
        };
    }

    var _init = function() {
        if (loaded) return;
        loaded = true;

        var s = document.createElement('script');
        s.src = tinymce.baseURL +'/plugins/jsvk/jscripts/vk_loader.js?vk_skin='+_vk_skin+'&vk_layout='+_vk_layout;
        s.type= "text/javascript";
        s.charset="UTF-8";
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    /**
     *  Toggles keyboard state and moves it between the editors
     *
     *
     *
     *
     */
    var toggleKeyboard = function (ed) {
        var el;
        if (this._curId === ed.editorId) {
            VirtualKeyboard.close();
            this._curId = null;
        } else {
            if (null != this._curId && (el = document.getElementById('VirtualKeyboard_'+this._curId))) {
                VirtualKeyboard.close();
            }
            if (!(el = document.getElementById('VirtualKeyboard_'+ed.editorId))) {
                el = document.getElementById(ed.editorId+"_parent").getElementsByTagName('table')[0];
                el.insertRow(el.rows.length)
                el = el.rows[el.rows.length-1];
                el.id = 'VirtualKeyboard_' + ed.editorId;
                el.appendChild(document.createElement('td'));
            }
            el = el.firstChild;
            VirtualKeyboard.open(ed.editorId+'_ifr',el);
            this._curId = ed.editorId;
        }
    }
});

// Register plugin
tinymce.PluginManager.add('jsvk', tinymce.plugins.VirtualKeyboard);
