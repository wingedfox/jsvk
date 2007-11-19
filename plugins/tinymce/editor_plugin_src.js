/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard plugin for TinyMCE editor.
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
// Import plugin specific language pack
tinyMCE.importPluginLanguagePack('Jsvk');
// Singleton class
var TinyMCE_JsvkPlugin = {
    _loaded : false,
    _vk_skin : "winxp",
    _vk_layout : "",
    _curId : null,
    /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @returns Name/value array containing information about the plugin.
     * @type Array 
     */
    getInfo : function() {
            return {
                    longname : 'VirtualKeyboard plugin',
                    author : 'Ilya Lebedev AKA WingedFox',
                    authorurl : 'http://www.debugger.ru',
                    infourl : 'http://www.debugger.ru/projects/virtualkeyboard/',
                    version : "1.0"
            };
    },

    /**
     * Gets executed when a TinyMCE editor instance is initialized.
     *
     * @param {TinyMCE_Control} Initialized TinyMCE editor control instance. 
     */
    initInstance : function(inst) {
        if (this._loaded)
            return;
        this._loaded = true;

        this._vk_skin = tinyMCE.getParam('vk_skin', this._vk_skin);
        this._vk_layout = tinyMCE.getParam('vk_layout', this._vk_layout);

        var s = document.createElement('script');
        s.src = tinyMCE.baseURL +'/plugins/Jsvk/jscripts/vk_loader.js?vk_skin='+this._vk_skin+'&vk_layout='+this._vk_layout;
        s.type= "text/javascript";
        s.charset="UTF-8";
        document.getElementsByTagName('head')[0].appendChild(s);
    },

    /**
     * Returns the HTML code for a specific control or empty string if this plugin doesn't have that control.
     * A control can be a button, select list or any other HTML item to present in the TinyMCE user interface.
     * The variable {$editor_id} will be replaced with the current editor instance id and {$pluginurl} will be replaced
     * with the URL of the plugin. Language variables such as {$lang_somekey} will also be replaced with contents from
     * the language packs.
     *
     * @param {string} cn Editor control/button name to get HTML for.
     * @return HTML code for a specific control or empty string.
     * @type string
     */
    getControlHTML : function(cn) {
        switch (cn) {
            case "Jsvk":
                return tinyMCE.getButtonHTML(cn, 'lang_Jsvk_desc', '{$pluginurl}/img/jsvk.gif', 'mceVirtualKeyboard', true);
        }
        return "";
    },
    /**
     * Executes a specific command, this function handles plugin commands.
     *
     * @param {string} editor_id TinyMCE editor instance id that issued the command.
     * @param {HTMLElement} element Body or root element for the editor instance.
     * @param {string} command Command name to be executed.
     * @param {string} user_interface True/false if a user interface should be presented.
     * @param {mixed} value Custom value argument, can be anything.
     * @return true/false if the command was executed by this plugin or not.
     * @type
     */
    execCommand : function(editor_id, element, command, user_interface, value) {
        // Handle commands
        switch (command) {
            // Remember to have the "mce" prefix for commands so they don't intersect with built in ones in the browser.
            case "mceVirtualKeyboard":
                if (user_interface) {
                    var el;
                    if (this._curId === editor_id) {
                        VirtualKeyboard.close();
                        this._curId = null;
                    } else {
                        if (null != this._curId && (el = document.getElementById('VirtualKeyboard_'+this._curId))) {
                            VirtualKeyboard.close();
                        }
                        if (!(el = document.getElementById('VirtualKeyboard_'+editor_id))) {
                            el = document.getElementById(editor_id+"_parent").getElementsByTagName('table')[0];
                            el.insertRow(el.rows.length)
                            el = el.rows[el.rows.length-1];
                            el.id = 'VirtualKeyboard_' + editor_id;
                            el.appendChild(document.createElement('td'));
                        }
                        el = el.firstChild;
                        VirtualKeyboard.open(editor_id,el);
                        this._curId = editor_id;
                    }
                } else {
                    // Do a command this gets called from the template popup
                    alert("execCommand: VirtualKeyboard could not be called with 'user_interface' set to 'false'.");
                }

                return true;
        }

        // Pass to next handler in chain
        return false;
    }
};

// Adds the plugin class to the list of available TinyMCE plugins
tinyMCE.addPlugin("Jsvk", TinyMCE_JsvkPlugin);
