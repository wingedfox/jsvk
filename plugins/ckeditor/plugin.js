/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard plugin for CKEditor.
 * (c) 2011 Ilya Lebedev <ilya@lebedev.net>
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
(function(){

var pluginName = "Jsvk"
   ,pluginCommand = "Jsvk";


CKEDITOR.plugins.add( pluginName, {
    requires : [ 'dialog' ]
   ,init : function( editor ) {
        var qs = [];
        if (editor.config.jsvk_skin) {
            qs.push("vk_skin="+encodeURIComponent(editor.config.jsvk_skin));
        }
        if (editor.config.jsvk_layout) {
            qs.push("vk_layout="+encodeURIComponent(editor.config.jsvk_layout));
        }
        if (qs.length) {
            qs = "?"+qs.join("&");
        }
        CKEDITOR.scriptLoader.load(CKEDITOR.plugins.get( pluginName ).path + "jscripts/vk_iframe.js"+qs, function() {
        });

        
        var command = editor.addCommand( pluginCommand, new CKEDITOR.dialogCommand( pluginCommand ) );
        command.modes = { wysiwyg:1, source:1 };
        command.canUndo = true;

        editor.ui.addButton(pluginCommand, 
                            { label : pluginName
                             ,command : pluginCommand
                             ,icon : this.path + 'img/jsvk.gif'
                            });

        /*
        *  Special element needs to be used for the temporary storage of keyboard
        */
        var tempHolder = document.createElement('div');
        tempHolder.style.display = "none";
        document.body.appendChild(tempHolder);

        CKEDITOR.dialog.add( pluginCommand, function( editor ) {
        
            var lang = editor.lang.jsvk;

            return {
                title : ""
               ,left : 0
               ,top : 0
               ,minWidth : 0
               ,minHeight : 0
               ,onShow : function () {
                    var input = (editor.container.getElementsByTag("textarea").getItem(0) || editor.container.getElementsByTag("iframe").getItem(0)).$;
                    var holder = this.parts.contents.getFirst().$;
                    IFrameVirtualKeyboard.show(input,holder);
                }
               ,onOk : function () {
                    IFrameVirtualKeyboard.close();
                    editor.updateElement();
                    tempHolder.appendChild(this.parts.contents.getFirst().$.lastChild);
                }
               ,onCancel : function () {
                    IFrameVirtualKeyboard.close();
                    editor.updateElement();
                    tempHolder.appendChild(this.parts.contents.getFirst().$.lastChild);
                }
               ,contents : [
                    { id : 'jsvk'
                     ,label : ''
                     ,title : ''
                     ,expand : false
                     ,padding : 0
                     ,elements : [
                      ]
                    }
                ]
               ,buttons : [ CKEDITOR.dialog.okButton ]
            };
        });
    }
});
})();
