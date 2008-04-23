/**
 * $Id$
 * $HeadURL$
 *
 * Virtual Keyboard plugin for Xinha editor.
 * (C) 2007 Ilya Lebedev <ilya@lebedev.net>
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

function Jsvk(editor, args) {
    var self = this;
    var static = arguments.callee;
    /**
     *  Editor config
     *
     *  @type Xihna_Config
     *  @scope private
     */
    var cfg = editor.config;
    /**
     *  Where to place the keyboard
     *
     *  @type String
     *  @scope private
     */
    var panel = editor.addPanel(cfg.Jsvk.panel || "bottom");
    editor.hidePanel(panel);
    /**
     *  Default layout name
     *
     *  @type String
     *  @scope protected
     */
    var layout = cfg.Jsvk.layout || "";
    /**
     *  Default skin
     *
     *  @type String
     *  @scope protected
     */
    var skin = cfg.Jsvk.skin || "";
    /**
     *  Keyboard mode
     *
     *  @type String
     *  @scope protected
     */
    var type = cfg.Jsvk.type || "";
    /**
     *  Reference to the editor, keyboard attached to
     *
     *  @type Xinha
     *  @scope protected
     */
    static.editor = null;
    /**
     *  Personal panel for each editor instance
     *
     *  @type HTMLDivElement
     *  @scope protected
     */
    static.panel = null;

    /**
     *  Changes attach point 
     *
     *
     *
     */
    self.onMode = function (mode) {
        var vk = window[type+"VirtualKeyboard"];
        var act = ['open','attachInput'][vk.isOpen()+0];
        switch(mode){
            case "textmode":
                vk[act](editor._textArea,panel);
                break;
            case "wysiwyg":
                vk[act](editor._iframe,panel);
                break;
        }
    }
    /**
     *  Toggles VirtualKeyboard state and moves between editor instances
     *
     *  @param {Xihna} ed editor instance
     *  @scope protected
     */
    var toggleKeyboard = function (ed) {
        var vk = window[type+"VirtualKeyboard"];
        if (null == static.editor) {
            // attach keyboard
            static.editor = ed;
            static.panel = panel;
            ed.showPanel(panel);
            self.onMode(ed._editMode);
        } else if (ed == static.editor) {
            static.editor = null;
            static.panel = null;
            ed.hidePanel(panel);
            vk.close();
        } else {
            static.editor.hidePanel(static.panel);
            static.panel = panel;
            static.editor = ed;
            ed.showPanel(panel);
            vk.close();
            self.onMode(ed._editMode);
        }
    }
    var _construct = function () {
        cfg.registerButton({ id : "Jsvk"
                               ,tooltip : Xinha._lc("General purpose virtual keyboard","Jsvk")
                               ,image : editor.imgURL("jsvk.gif","Jsvk")
                               ,textMode : true
                               ,action : toggleKeyboard
                              });
        cfg.addToolbarElement("Jsvk", "inserthorizontalrule", 1);
        /*
        *  load files only once
        */
        if (!static.loaded) {
            static.loaded = true;
            Xinha._loadback(_editor_url+"plugins/Jsvk/jscripts/vk_"+(type.toLowerCase()||"loader")+".js?vk_skin="+skin+"&vk_layout="+layout);
        }
    }
    _construct();
}
Jsvk._pluginInfo = {
  name          : "Virtual Keyboard",
  version       : "1.0",
  developer     : "Ilya Lebedev",
  developer_url : "http://debugger.ru/projects/virtualkeyboard/",
  sponsor       : "",
  sponsor_url   : "",
  c_owner       : "Ilya Lebedev",
  license       : "LGPL"
};
/**
 *  Is set when virtual keyboard files are loaded
 *
 *  @type Boolean
 *  @scope protected
 */
Jsvk._loaded = false;

Xinha.Config.prototype.Jsvk={"skin":"","layout":"","panel":"bottom"};
