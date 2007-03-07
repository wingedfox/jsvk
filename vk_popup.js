/**
 * @author WingedFox
 */

/**
 *  Keyboard constructor
 *
 *  @class DraggableVirtualKeyboard
 *  @constructor
 */

PopupVirtualKeyboard = new function() {
    var self = this;
    /**
     *  popup window handler
     * 
     *  @type {Window}
     *  @scope private
     */
    var hWnd = null;
    /**
     *  path to this file
     * 
     *  @type {String}
     */
    var p = (function (sname){var sc = document.getElementsByTagName('script'),sr = new RegExp('^(.*/|)('+sname+')([#?]|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return m[1];if (m[1].indexOf("/")==0) return m[1];b = document.getElementsByTagName('base');if (b[0] && b[0].href) return b[0].href+m[1];return (document.location.href.match(/(.*[\/\\])/)[0]+m[1]).replace(/^\/+(?=\w:)/,"");}}return null;})('vk_popup.js');
    var pq = function (q) {if ('string'!=typeof q || q.length<2) return {};q = q.split("&");for (var z=0,qL=q.length,rs={},kv,rkv;z<qL;z++){kv=q[z].split("=");kv[0]=kv[0].replace(/[{}\[\]]*$/,"");rkv = rs[kv[0]];kv[1]=unescape(kv[1]?kv[1].replace("+"," "):"");if (rkv)if ('array'==typeof(rkv))rs[kv[0]][rs[kv[0]].length]=kv[1];else rs[kv[0]]=[rs[kv[0]],kv[1]];else rs[kv[0]]=kv[1];}return rs}
    var q = (function (sname){var sc=document.getElementsByTagName('script'),sr=new RegExp('^(.*/|)('+sname+')([#?].*|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {return pq(m[3].replace(/^[^?]*\?([^#]+)/,"$1"));}}})('vk_popup.js');
    var qs = pq(document.location.search.slice(1));
    /**
     *  Tells, if the keyboard is open
     * 
     *  @return {Boolean}
     *  @scope public
     */
    self.isOpen = function () {
        return null!=hWnd && !hWnd.closed;
    }
    /**
     *  Target input
     *
     *  @type {String}
     *  @scope private
     */
    var tgt = null;
    /**
     *  Attaches keyboard to the specified input field
     *
     *  @param {Null, HTMLInputElement,String} element to attach keyboard to
     *  @return {HTMLInputElement, Null}
     *  @access public
     */
    self.attachInput = function(el) {
        if (hWnd && !hWnd.closed && hWnd.VirtualKeyboard) {
            return hWnd.VirtualKeyboard.attachInput(el);
        }
        return false
    }
    /**
     *  Shows keyboard
     *
     *  @param {HTMLElement, String} input element or it to bind keyboard to
     *  @return {Boolean} operation state
     *  @scope public
     */
    self.open =
    self.show = function (target) {
        if (!hWnd || hWnd.closed) {
          if (qs.vk_skin) q.skin = qs.vk_skin; 
          else if (!q.skin) q.skin = 'winxp';
          hWnd = (window.showModelessDialog||window.open)(p+"vk_popup.html?vk_skin="+q.skin,window.showModelessDialog?window:"_blank","status=0,title=0,dependent=yes,resizable=no,scrollbars=no,width=500,height=500");
          tgt = target;
          return true;
        }
        return false;
    }
    /**
     *  Hides keyboard
     *
     *  @scope public
     */
    self.close = 
    self.hide = function (target) {
        if (!hWnd || hWnd.closed) return false;
        if (!hWnd.VirtualKeyboard.isOpen()) hWnd.VirtualKeyboard.hide();
        hWnd.close();
        hWnd = null;
    }
    /**
     *  Toggles keyboard state
     *
     *  @param {HTMLElement, String} input element or it to bind keyboard to
     *  @return {Boolean} operation state
     *  @access public
     */
    self.toggle = function (input) {
        self.isOpen()?self.close():self.open(input);
    }
    /**
     *  Onload callback event, invoked from the target window when onload event fires
     *
     *  @scope protected
     */
    self.onload = function () {
        hWnd.VirtualKeyboard.show( document.getElementById(tgt)
                                  ,hWnd.document.body
                                  ,hWnd.document.body
                                 );
        /*
        *  set class names to add some styling to html, body
        */
        hWnd.document.body.className = hWnd.document.body.parentNode.className = 'VirtualKeyboardPopup';
        hWnd.dialogHeight = parseInt(hWnd.dialogHeight)-hWnd.getClientHeight()+hWnd.document.body.firstChild.offsetHeight+'px';
        hWnd.dialogWidth = parseInt(hWnd.dialogWidth)-hWnd.getClientWidth()+hWnd.document.body.firstChild.offsetWidth+'px';
        if (hWnd.sizeToContent) hWnd.sizeToContent();
        hWnd.onunload = self.close;
    }
    if (window.attachEvent) window.attachEvent('onunload', self.close);
    else if (window.addEventListener) window.addEventListener('unload', self.close, false);

    var p = (function (sname){var sc = document.getElementsByTagName('script'),sr = new RegExp('^(.*/|)('+sname+')([#?]|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return m[1];if (m[1].indexOf("/")==0) return m[1];b = document.getElementsByTagName('base');if (b[0] && b[0].href) return b[0].href+m[1];return (document.location.pathname.match(/(.*[\/\\])/)[0]+m[1]).replace(/^\/+(?=\w:)/,"");}}return null;})('vk_popup.js');
    var dpd = ['/extensions/documentselection.js'];
    for (var i=0,dL=dpd.length;i<dL;i++) {
        document.write('<scr'+'ipt defer="false" type="text/javascript" src="'+p+dpd[i]+'"></scr'+'ipt>');
    }
}
