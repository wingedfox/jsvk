/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard plugin for FCKEditor editor.
 * (C) 2009 Ilya Lebedev <ilya@lebedev.net>
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
(function () {
    // create shared object for plugin comm
    if (!window.top._FCK_VK_PLUGIN) {
        window.top._FCK_VK_PLUGIN = {};
    }

    // reference to the plugin itself
    var myName = 'Jsvk';

    var command = new function () {
        var self = this;
        var interchange = window.top._FCK_VK_PLUGIN;

        // command execution
        self.Execute = function () {
            if (interchange.activeEditor != FCK) {
                if (!interchange.activeEditor) {
                    window.PopupVirtualKeyboard.open(FCK.EditingArea.IFrame, self.onCloseHandler);
                    interchange.activeEditor = FCK;
                    interchange.vkHandler = window.PopupVirtualKeyboard;
                }
                FCK.Focus();

                // change button states
                interchange.activeEditor.ToolbarSet.RefreshModeState();
            } else {
                interchange.vkHandler.close();
            }
        }

        // button state
        self.GetState = function() {
            return interchange.activeEditor == FCK ? FCK_TRISTATE_ON
                                                   : FCK_TRISTATE_OFF;
        }

        // input area focus handler
        self.focusHandler = function () {
            if (interchange.vkHandler && interchange.activeEditor != FCK) {
                var tmp = interchange.activeEditor;
                interchange.activeEditor = FCK;
                interchange.vkHandler.attachInput(FCK.EditingArea.IFrame);

                tmp.ToolbarSet.RefreshModeState();
            }

            // change button states
            interchange.activeEditor.ToolbarSet.RefreshModeState();
        }

        // keyboard window close handler
        self.onCloseHandler = function () {
                interchange.vkHandler = null;
                var tmp = interchange.activeEditor;
                interchange.activeEditor = null;

                tmp.ToolbarSet.RefreshModeState();
        }

        ;(function () {
            var doc = window.document
               ,path = FCKPlugins.Items[myName].Path+"jscripts/vk_popup.js"
               ,params = "?";

            if (interchange.skin) {
                params += "vk_skin="+interchange.skin+"&"
            }
            if (interchange.layout) {
                params += "vk_layout="+interchange.layout+"&"
            }
            path += params;

            if (doc.body) {
                var script = doc.createElement('script');
                script.type = "text/javascript";
                script.src = path;
                doc.body.appendChild(script);
            } else {
                doc.write("<scr"+"ipt type='text/javascript' src='"+path+"'></scr"+"ipt>");
            }
            // process these events
            FCK.Events.AttachEvent('OnFocus', self.focusHandler) ;

        })();
    }

    // Register the related command
    FCKCommands.RegisterCommand (myName, command);

    // Create the toolbar button
    var button = new FCKToolbarButton (myName
                                      ,FCKLang.UniversalKeyboard
                                      ,FCKLang.UniversalKeyboard
                                      ,null
                                      ,null
                                      ,false
                                      ,[FCKPlugins.Items[myName].Path + 'img/jsvk.gif', 22, 1]);

    // Register the button
    FCKToolbarItems.RegisterItem(myName, button) ;
})();