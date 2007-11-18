// Mask Language plugin for Xinha
// Implementation by Udo Schmal
//
// (c) Udo Schmal & Schaffrath NeueMedien 2004
// Distributed under the same terms as HTMLArea itself.
// This notice MUST stay intact for use (see license.txt).

function JsVirtualKeyboard(editor, args) {
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
    var panel = editor.addPanel(cfg.JsVirtualKeyboard.panel || "bottom");
    editor.hidePanel(panel);
    /**
     *  Default layout name
     *
     *  @type String
     *  @scope protected
     */
    var layout = cfg.JsVirtualKeyboard.layout || "";
    /**
     *  Default skin
     *
     *  @type String
     *  @scope protected
     */
    var skin = cfg.JsVirtualKeyboard.skin || "";
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
        var act = ['open','attachInput'][VirtualKeyboard.isOpen()+0];
        switch(mode){
            case "textmode":
                VirtualKeyboard[act](editor._textArea,panel);
                break;
            case "wysiwyg":
                VirtualKeyboard[act](editor._iframe,panel);
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
            VirtualKeyboard.close();
        } else {
            static.editor.hidePanel(static.panel);
            static.panel = panel;
            static.editor = ed;
            ed.showPanel(panel);
            VirtualKeyboard.close();
            self.onMode(ed._editMode);
        }
    }
    var _construct = function () {
        cfg.registerButton({ id : "JsVirtualKeyboard"
                               ,tooltip : Xinha._lc("General purpose virtual keyboard","JsVirtualKeyboard")
                               ,image : editor.imgURL("jsvk.gif","JsVirtualKeyboard")
                               ,textMode : true
                               ,action : toggleKeyboard
                              });
        cfg.addToolbarElement("JsVirtualKeyboard", "inserthorizontalrule", 1);
        /*
        *  load files only once
        */
        if (!static.loaded) {
            static.loaded = true;
            Xinha._loadback(_editor_url+"plugins/JsVirtualKeyboard/jscripts/vk_loader.js?skin="+skin+"&layout="+layout);
        }
    }
    _construct();
}
JsVirtualKeyboard._pluginInfo = {
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
JsVirtualKeyboard._loaded = false;

Xinha.Config.prototype.JsVirtualKeyboard={"skin":"","layout":"","panel":"bottom"};
