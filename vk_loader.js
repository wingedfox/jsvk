VirtualKeyboard = new function () {
  var self = this, to = null;
  self.show = self.hide = self.toggle = self.attachInput = function () {
     window.status = 'VirtualKeyboard is not loaded yet.';
     if (!to) setTimeout(function(){window.status = ''},1000);
  }
  self.isOpen = function () {
      return false;
  }
};
(function () {
    var p = (function (sname){var sc=document.getElementsByTagName('script'),sr=new RegExp('^(.*/|)('+sname+')([#?]|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return m[1];if (m[1].indexOf("/")==0) return m[1];b = document.getElementsByTagName('base');if (b[0] && b[0].href) return b[0].href+m[1];return (document.location.href.match(/(.*[\/\\])/)[0]+m[1]).replace(/^\/+/,"");}}return null;})('vk_loader.js');
    var pq = function (q) {if ('string'!=typeof q || q.length<2) return {};q = q.split("&");for (var z=0,qL=q.length,rs={},kv,rkv;z<qL;z++){kv=q[z].split("=");kv[0]=kv[0].replace(/[{}\[\]]*$/,"");rkv = rs[kv[0]];kv[1]=unescape(kv[1]?kv[1].replace("+"," "):"");if (rkv)if ('array'==typeof(rkv))rs[kv[0]][rs[kv[0]].length]=kv[1];else rs[kv[0]]=[rs[kv[0]],kv[1]];else rs[kv[0]]=kv[1];}return rs}
    var q = (function (sname){var sc=document.getElementsByTagName('script'),sr=new RegExp('^(.*/|)('+sname+')([#?].*|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {return pq(m[3].replace(/^[^?]*\?([^#]+)/,"$1"));}}})('vk_loader.js');
    var qs = pq(document.location.search.slice(1));
    var dpd = [ 'extensions/helpers.js'
               ,'extensions/dom.js'
               ,'extensions/objectextensions.js'
               ,'extensions/stringextensions.js'
               ,'extensions/regexpextensions.js'
               ,'extensions/arrayextensions.js'
               ,'extensions/eventmanager.js'
               ,'extensions/documentselection.js'
               ,'extensions/dom/selectbox.js'
               ,'virtualkeyboard.js'
               ,'layouts/layouts.js'
/*
* not used by default
* 
*               ,'layouts/unconverted.js'
*/
    ];
    if (qs.vk_skin) q.skin = qs.vk_skin; 
    else if (!q.skin) q.skin = 'winxp';
    document.write('<link rel="stylesheet" type="text/css" href="'+p+'css/'+q.skin+'/keyboard.css" />')
    for (var i=0,dL=dpd.length;i<dL;i++) {
        document.write('<scr'+'ipt type="text/javascript" src="'+p+dpd[i]+'"></scr'+'ipt>');
    }
})();
