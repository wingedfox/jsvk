new function () {
    var reNotBLA = /[^aehikmnopstwy]/
       ,remap={
            i:'�-','ᐤi':'ᑯ','ᐨi':'ᒧ','ᘁi':'�-','ᐢi':'ᒍ','ᐡi':'ᖳ','ᔈi':'�-',yi:'ᔪ',wi:'ᖳ'
           ,'ᖳi':'ᖳᐟ','�-i':'�-ᐟ','�-i':'�-ᐟ','ᑫi':'ᑫᐟ','ᑭi':'ᑭᐟ','�-i':'�-ᐟ','ᒣi':'ᒣᐟ','ᒥi':'ᒥᐟ','ᒪi':'ᒪᐟ','ᖿi':'ᖿᐟ','�-i':'�-ᐟ','�-i':'�-ᐟ','ᒉi':'ᒉᐟ','ᒋi':'ᒋᐟ','ᒐi':'ᒐᐟ','ᖿi':'ᖿᐟ','ᖿi':'ᖿᐟ','ᖳi':'ᖳᐟ','ᓭi':'ᓭᐟ','ᓯi':'ᓯᐟ','�+i':'�+ᐟ','ᔦi':'ᔦᐟ','ᔨi':'ᔨᐟ','ᔭi':'ᔭᐟ','ᖿi':'ᖿᐟ','�+i':'�+ᐟ','ᖳi':'ᖳᐟ'
           ,'ᖳo':'ᖳᐠ','�-o':'�-ᐠ','ᑫo':'ᑫᐠ','ᑭo':'ᑭᐠ','ᒣo':'ᒣᐠ','ᒥo':'ᒥᐠ','ᖿo':'ᖿᐠ','�-o':'�-ᐠ','ᒉo':'ᒉᐠ','ᒋo':'ᒋᐠ','ᖿo':'ᖿᐠ','ᖿo':'ᖿᐠ','ᓭo':'ᓭᐠ','ᓯo':'ᓯᐠ','ᔦo':'ᔦᐠ','ᔨo':'ᔨᐠ','ᖿo':'ᖿᐠ','�+o':'�+ᐠ'
        }
       ,submap={
          //s:'Ꮝ'
          //nah:'Ꮐ'
            a:'ᖳ',e:'�-',o:'�-'
           ,'ᐤa':'ᑫ','ᐤe':'ᑭ','ᐤo':'�-'
           ,'ᐨa':'ᒣ','ᐨe':'ᒥ','ᐨo':'ᒪ'
           ,'ᘁa':'ᖿ','ᘁe':'�-','ᘁo':'�-'
           ,'ᐢa':'ᒉ','ᐢe':'ᒋ','ᐢo':'ᒐ'
           ,'ᐡa':'ᖿ','ᐡe':'ᖿ','ᐡo':'ᖳ'
           ,'ᔈa':'ᓭ','ᔈe':'ᓯ','ᔈo':'�+'
           ,ya:'ᔦ',ye:'ᔨ',yo:'ᔭ'
           ,wa:'ᖿ',we:'�+',wo:'ᖳ'
           ,'ᐤy':'ᐤy','ᐨy':'ᐨy','ᘁy':'ᘁy','ᐢy':'ᐢy','ᐡy':'ᐡy','ᔈy':'ᔈy'
           ,'ᐤs':'ᐤs','ᐨs':'ᐨs','ᘁs':'ᘁs','ᐢs':'ᐢs','ᐡs':'ᐡs','ᔈs':'ᔈs'
           ,'ᐤw':'ᐤw','ᐨw':'ᐨw','ᘁw':'ᘁw','ᐢw':'ᐢw','ᐡw':'ᐡw','ᔈw':'ᔈw'
           ,p:'ᐤ',t:'ᐨ',k:'ᘁ',m:'ᐢ',n:'ᐡ',s:'ᔈ',h:'ᑊ'
           ,'ᑊk':'ᐦ'
            //tl:1, dl:1, ts:1, ds:1, qu:1, kw:1, gw:1, hn:1
        }
       ,premap={
            '�-o':'�-�-','�-o':'�-�-','ᒪo':'ᒪ�-','�-o':'�-�-','ᒐo':'ᒐ�-','ᖳo':'ᖳ�-','�+o':'�+�-','ᔭo':'ᔭ�-','ᖳo':'ᖳ�-'
        }

    this.charProcessor = function(chr, buf){
        if (chr=='\u0008') { // backspace
            if (buf.length) {
                return [buf.slice(0,-1),buf.length-1]
            }
        } else if (reNotBLA.test(chr)) {
            return remap[buf+chr] || [buf+chr, 0]
        } else {
            var str,res,cres,h='';

            if (buf.charAt(0)=='ᐦ') {
                h='ᑊ';
                buf='ᘁ'
            }

            str=buf+chr
            if (res=remap[str]) {
                return [h+res,0]
            } else if (res=submap[str]) {
                return [h+res,res.length]
            } else if (res=premap[str]) {
                return [h+res, 1];
            } else if (res=submap[buf]) {
                if (/[ᐤᐨᘁᐢᐡᔈ][syw][aeio]/.test(str)) {
                    res=str.charAt(0)+str.charAt(2)
                    return ([h+(remap[res]||submap[res])+{s:'ᐧ',y:'ᑉ', w:'='}[str.charAt(1)] //chr=='i'?0:1
                            ,0])
                }
                if (cres=remap[chr])
                    return [res+cres,1];
                else
                    return [h+res+chr,1];
            } else {
                return [h+buf + (remap[chr]||submap[chr]||chr), 1]
            }
        }
    }
}
