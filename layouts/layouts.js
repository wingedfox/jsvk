﻿/**
 * $Id: CN.js 546 2009-02-27 08:53:11Z wingedfox $
 *
 * Chinese char processor implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev: 546 $
 * @lastchange $Author: wingedfox $ $Date: 2009-02-27 11:53:11 +0300 (Пт, 27 фев 2009) $
 */
VirtualKeyboard.Langs.CN = new function () {
    var self = this;
    self.INPArr = [];
    /**
     *  Callback to process keyboard input in the current IME style
     *
     *  @see VirtualKeyboard.processChar
     *  @param {String} chr current input char
     *  @param {String} buf actual processing buffer
     *  @return {Array} new buffer contents and length
     *  @scope protected
     */
    self.processChar = function (chr, buf) {
        var num, str, arr
        if (chr=='\u0008') { // backspace
            if (buf && (str=buf.slice(0,-1))) {
                VirtualKeyboard.IME.show(self.INPArr[str.toLowerCase()] || []);
                return [str,str.length]
            } else {
                VirtualKeyboard.IME.hide()
                return ['',0] //total delete; some other cases
            }
        } else { //non backspace
            str=buf+chr
            arr = self.INPArr[str.toLowerCase()] || []
            if (arr.length) { // miao
                VirtualKeyboard.IME.show((typeof arr =='string')? self.INPArr[str.toLowerCase()]=arr.split('') : arr)
                return [str, str.length]
            } else if(VirtualKeyboard.IME.getSuggestions().length) { // not a part of a syllable
                if (isFinite(num=parseInt(chr))) { // miao3
                    str = VirtualKeyboard.IME.getChar(num);
                    if (!str) { //miao9 - no such variant
                        return[buf,buf.length]
                    } else {
                        VirtualKeyboard.IME.hide();
                        return[str,0]
                    }
                } else if ((arr = self.INPArr[chr.toLowerCase()] || []).length) { //nih
                    str=VirtualKeyboard.IME.getSuggestions()[0]
                    VirtualKeyboard.IME.setSuggestions((typeof arr =='string')? self.INPArr[str.toLowerCase()]=arr.split('') : arr)
                    return [str+chr,1]
                } else { // ni,
                    str=VirtualKeyboard.IME.getSuggestions()[0]
                    VirtualKeyboard.IME.hide()
                    return [str+(chr.charCodeAt()==10? '': chr),0]
                }
            }
        }
        return [buf+chr,0] //non-chinese talk
    }
};

VirtualKeyboard.Langs.ET = {
    cons : {
        // e a,i,aa,ee,u,o,oa/wa
        // - aiAeuoWY
        'ህ' : 'ህሀሂሃሄሁሆሇ'                 // h h 
       ,'ል' : 'ልለሊላሌሉሎሏ'                 // l l
       ,'ሕ' : 'ሕሐሒሓሔሑሖሗ'                 // hh H
       ,'ም' : 'ምመሚማሜሙሞሟፙ'              // m m
       ,'ሥ' : 'ሥሠሢሣሤሡሦሧ'                 // sz X
       ,'ር' : 'ርረሪራሬሩሮሯፘ'              // r r
       ,'ስ' : 'ስሰሲሳሴሱሶሷ'                 // s s
       ,'ሽ' : 'ሽሸሺሻሼሹሾሿ'                 // sh S
       ,'ቅ' : 'ቅቀቂቃቄቁቆቋ ቈቊቋቌቍ' // q q
       ,'ቍ' : 'ቍቈቊቋቌ'                          // qw Oq
       ,'ቕ' : 'ቕቐቒቓቔቑቖ  ቘቚቛቜቝ'   // qh Q
       ,'ቝ' : 'ቝቘቚቛቜ'                          // qhw OQ
       ,'ብ' : 'ብበቢባቤቡቦቧ'                 // b b
       ,'ቭ' : 'ቭቨቪቫቬቩቮቯ'                 // v v
       ,'ት' : 'ትተቲታቴቱቶቷ'                 // t t
       ,'ች' : 'ችቸቺቻቼቹቾቿ'                 // c c
       ,'ኅ' : 'ኅኀኂኃኄኁኆ  ኈኊኋኌኍ'   // x x
       ,'ኍ' : 'ኍኈኊኋኌ'                          // xw Ox
       ,'ን' : 'ንነኒናኔኑኖኗ'                 // n n
       ,'ኝ' : 'ኝኘኚኛኜኙኞኟ'                 // ny N
       ,'እ' : 'እአኢኣኤኡኦኧ'                 // glot '
       ,'ክ' : 'ክከኪካኬኩኮ  ኰኲኳኴኵ'   // k k
       ,'ኵ' : 'ኵኰኲኳኴ'                          // kw Ok
       ,'ኽ' : 'ኽኸኺኻኼኹኾ  ዀዂዃዄዅ'   // kx K
       ,'ዅ' : 'ዅዀዂዃዄ'                          // kxw OK
       ,'ው' : 'ውወዊዋዌዉዎ'                    // w w
       ,'ዕ' : 'ዕዐዒዓዔዑዖ'                    // pharyng '
       ,'ዝ' : 'ዝዘዚዛዜዙዞዟ'                 // z z
       ,'ዥ' : 'ዥዠዢዣዤዡዦዧ'                 // zh Z
       ,'ይ' : 'ይየዪያዬዩዮ'                    // y y
       ,'ድ' : 'ድደዲዳዴዱዶዷ'                 // d d
       ,'ዽ' : 'ዽዸዺዻዼዹዾዿ'                 // dd D
       ,'ጅ' : 'ጅጀጂጃጄጁጆጇ'                 // j j
       ,'ግ' : 'ግገጊጋጌጉጎጏ ጐጒጓጔጕ' // g g
       ,'ጕ' : 'ጕጐጒጓጔ'                          // gw Og
       ,'ጝ' : 'ጝጘጚጛጜጙጞጟ'                 // gg G
       ,'ጥ' : 'ጥጠጢጣጤጡጦጧ'                 // th T
       ,'ጭ' : 'ጭጨጪጫጬጩጮጯ'                 // ch C
       ,'ጵ' : 'ጵጰጲጳጴጱጶጷ'                 // ph P
       ,'ጽ' : 'ጽጸጺጻጼጹጾጿ'                 // ts [
       ,'ፅ' : 'ፅፀፂፃፄፁፆፇ'                 // tz ]
       ,'ፍ' : 'ፍፈፊፋፌፉፎፏፚ'              // f f
       ,'ፕ' : 'ፕፐፒፓፔፑፖፗ'                 // p p
       ,'ⶥ' : 'ⶥⶠⶢⶣⶤⶡⶦ'                    // ss Os
       ,'ⶭ' : 'ⶭⶨⶪⶫⶬⶩⶮ'                    // cc Oc
       ,'ⶵ' : 'ⶵⶰⶲⶳⶴⶱⶶ'                    // zz Oz
       ,'ⶽ' : 'ⶽⶸⶺⶻⶼⶹⶾ'                    // cch Ov
       ,'ⷅ' : 'ⷅⷀⷂⷃⷄⷁⷆ'                    // QY
       ,'ⷍ' : 'ⷍⷈⷊⷋⷌⷉⷎ'                    // KY
       ,'ⷕ' : 'ⷕⷐⷒⷓⷔⷑⷖ'                    // XY 
       ,'ⷝ' : 'ⷝⷘⷚⷛⷜⷙⷞ'                    // GY
    }
   ,conv : {'ቀ':'ቅ','ወ':'ው','ረ':'ር','ተ':'ት','የ':'ይ','u':'','i':'','o':'','ፐ':'ፕ','ጸ':'ጽ','ፀ':'ፅ'
           ,'ሰ':'ስ','ደ':'ድ','ፈ':'ፍ','ገ':'ግ','ሀ':'ህ','ጀ':'ጅ','ከ':'ክ','ለ':'ል','አ':'እ'
           ,'ዘ':'ዝ','ኀ':'ኅ','ቸ':'ች','ቨ':'ቭ','በ':'ብ','ነ':'ን','መ':'ም'
           ,'ቐ':'ቕ','ጠ':'ጥ','ጰ':'ጵ','ሸ':'ሽ','ዻ':'ዽ','ጘ':'ጝ','ሐ':'ሕ','ኸ':'ኽ','ዐ':'ዕ'
           ,'ዠ':'ዥ','ሠ':'ሥ','ጨ':'ጭ','ኘ':'ኝ'
           ,'ቈ':'ቍ','ቘ':'ቝ','ጐ':'ጕ','ኰ':'ኵ','ዀ':'ዅ','ኈ':'ኍ'
           ,'ⶠ':'ⶥ','ⶨ':'ⶭ','ⶰ':'ⶵ','ⶸ':'ⶽ'
           ,'ⷀ':'ⷅ','ⷈ':'ⷍ'
    }
}

/**
 * $Id$
 *
 * Inuktitut IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
VirtualKeyboard.Langs.IKU = new function () {
    var reNotIKU = /[^acefghijklłmnopqrstuvwxyᖃᐁᕋᑕᐂᐅᐃᐸᐊᓴᖕᒐᕼᔭᑲᓚᖤᕙᓇᒪ]/
       ,remap={
            'ᐊi':'ᐁ','ᐃi':'ᐄ','ᐅu':'ᐆ','ᐊa':'ᐋ'
           ,'ᐸi':'ᐯ','ᐱi':'ᐲ','ᐳu':'ᐴ','ᐸa':'ᐹ'
           ,'ᑕi':'ᑌ','ᑎi':'ᑏ','ᑐu':'ᑑ','ᑕa':'ᑖ'
           ,'ᑲi':'ᑫ','ᑭi':'ᑮ','ᑯu':'ᑰ','ᑲa':'ᑳ'
           ,'ᒐi':'ᒉ','ᒋi':'ᒌ','ᒍu':'ᒎ','ᒐa':'ᒑ'
           ,'ᒪi':'ᒣ','ᒥi':'ᒦ','ᒧu':'ᒨ','ᒪa':'ᒫ'
           ,'ᓇi':'ᓀ','ᓂi':'ᓃ','ᓄu':'ᓅ','ᓇa':'ᓈ'
           ,'ᓴi':'ᓭ','ᓯi':'ᓰ','ᓱu':'ᓲ','ᓴa':'ᓵ'
           ,'ᓚi':'ᓓ','ᓕi':'ᓖ','ᓗu':'ᓘ','ᓚa':'ᓛ'
           ,'ᔭi':'ᔦ','ᔨi':'ᔩ','ᔪu':'ᔫ','ᔭa':'ᔮ'
           ,'ᕙi':'ᕓ','ᕕi':'ᕖ','ᕗu':'ᕘ','ᕙa':'ᕚ'
           ,'ᕋi':'ᕃ','ᕆi':'ᕇ','ᕈu':'ᕉ','ᕋa':'ᕌ'
           ,'ᖃi':'ᙯ','ᕿi':'ᖀ','ᖁu':'ᖂ','ᖃa':'ᖄ'
           ,'ᖓi':'ᙰ','ᖏi':'ᖐ','ᖑu':'ᖒ','ᖓa':'ᖔ'
           ,'ᙱi':'ᙲ','ᙳu':'ᙴ','ᙵa':'ᙶ'
           ,'ᖠi':'ᖡ','ᖢu':'ᖣ','ᖤa':'ᖥ'

           ,'ᐂ':'ᐂ','ᐧ':''
           ,'ᐊᐃ':'ᐁ','ᐃᐃ':'ᐄ','ᐅᐅ':'ᐆ','ᐊᐊ':'ᐋ','ᐃᐧ':'ᐄ','ᐅᐧ':'ᐆ','ᐊᐧ':'ᐋ'
           ,'ᑉᐂ':'ᐰ','ᑉᐁ':'ᐯ','ᐸᐃ':'ᐯ','ᐱᐃ':'ᐲ','ᐳᐅ':'ᐴ','ᐸᐊ':'ᐹ','ᐱᐧ':'ᐲ','ᐳᐧ':'ᐴ','ᐸᐧ':'ᐹ'
           ,'ᑦᐂ':'ᑍ','ᑦᐁ':'ᑌ','ᑕᐃ':'ᑌ','ᑎᐃ':'ᑏ','ᑐᐅ':'ᑑ','ᑕᐊ':'ᑖ','ᑎᐧ':'ᑏ','ᑐᐧ':'ᑑ','ᑕᐧ':'ᑖ'
           ,'ᒃᐂ':'ᑬ','ᒃᐁ':'ᑫ','ᑲᐃ':'ᑫ','ᑭᐃ':'ᑮ','ᑯᐅ':'ᑰ','ᑲᐊ':'ᑳ','ᑭᐧ':'ᑮ','ᑯᐧ':'ᑰ','ᑲᐧ':'ᑳ'
           ,'ᒡᐂ':'ᒊ','ᒡᐁ':'ᒉ','ᒐᐃ':'ᒉ','ᒋᐃ':'ᒌ','ᒍᐅ':'ᒎ','ᒐᐊ':'ᒑ','ᒋᐧ':'ᒌ','ᒍᐧ':'ᒎ','ᒐᐧ':'ᒑ'
           ,'ᒻᐂ':'ᒤ','ᒻᐁ':'ᒣ','ᒪᐃ':'ᒣ','ᒥᐃ':'ᒦ','ᒧᐅ':'ᒨ','ᒪᐊ':'ᒫ','ᒥᐧ':'ᒦ','ᒧᐧ':'ᒨ','ᒪᐧ':'ᒫ'
           ,'ᓐᐂ':'ᓁ','ᓐᐁ':'ᓀ','ᓇᐃ':'ᓀ','ᓂᐃ':'ᓃ','ᓄᐅ':'ᓅ','ᓇᐊ':'ᓈ','ᓂᐧ':'ᓃ','ᓄᐧ':'ᓅ','ᓇᐧ':'ᓈ'
           ,'ᔅᐂ':'ᓮ','ᔅᐁ':'ᓭ','ᓴᐃ':'ᓭ','ᓯᐃ':'ᓰ','ᓱᐅ':'ᓲ','ᓴᐊ':'ᓵ','ᓯᐧ':'ᓰ','ᓱᐧ':'ᓲ','ᓴᐧ':'ᓵ'
           ,'ᓪᐂ':'ᓔ','ᓪᐁ':'ᓓ','ᓚᐃ':'ᓓ','ᓕᐃ':'ᓖ','ᓗᐅ':'ᓘ','ᓚᐊ':'ᓛ','ᓕᐧ':'ᓖ','ᓗᐧ':'ᓘ','ᓚᐧ':'ᓛ'
           ,'ᔾᐂ':'ᔧ','ᔾᐁ':'ᔦ','ᔭᐃ':'ᔦ','ᔨᐃ':'ᔩ','ᔪᐅ':'ᔫ','ᔭᐊ':'ᔮ','ᔨᐧ':'ᔩ','ᔪᐧ':'ᔫ','ᔭᐧ':'ᔮ'
           ,'ᕝᐂ':'ᕔ','ᕝᐁ':'ᕓ','ᕙᐃ':'ᕓ','ᕕᐃ':'ᕖ','ᕗᐅ':'ᕘ','ᕙᐊ':'ᕚ','ᕕᐧ':'ᕖ','ᕗᐧ':'ᕘ','ᕙᐧ':'ᕚ'
           ,'ᕐᐂ':'ᕅ','ᕐᐁ':'ᕃ','ᕋᐃ':'ᕃ','ᕆᐃ':'ᕇ','ᕈᐅ':'ᕉ','ᕋᐊ':'ᕌ','ᕆᐧ':'ᕇ','ᕈᐧ':'ᕉ','ᕋᐧ':'ᕌ'
           ,'ᖅᐂ':'ᕾ','ᖅᐁ':'ᙯ','ᖃᐃ':'ᙯ','ᕿᐃ':'ᖀ','ᖁᐅ':'ᖂ','ᖃᐊ':'ᖄ','ᕿᐧ':'ᖀ','ᖁᐧ':'ᖂ','ᖃᐧ':'ᖄ'
           ,'ᖕᐁ':'ᙰ','ᖓᐃ':'ᙰ','ᖏᐃ':'ᖐ','ᖑᐅ':'ᖒ','ᖓᐊ':'ᖔ','ᖏᐧ':'ᖐ','ᖑᐧ':'ᖒ','ᖓᐧ':'ᖔ'
           ,'ᙱᐃ':'ᙲ','ᙳᐅ':'ᙴ','ᙵᐊ':'ᙶ','ᙱᐧ':'ᙲ','ᙳᐧ':'ᙴ','ᙵᐧ':'ᙶ'
           ,'ᖠᐃ':'ᖡ','ᖢᐅ':'ᖣ','ᖤᐊ':'ᖥ','ᖠᐧ':'ᖡ','ᖢᐧ':'ᖣ','ᖤᐧ':'ᖥ'
        }
       ,submap={
            p:'ᑉ',t:'ᑦ',k:'ᒃ',g:'ᒡ',m:'ᒻ',n:'ᓐ',s:'ᔅ',h:'ᔅ',l:'ᓪ',j:'ᔾ',v:'ᕝ',r:'ᕐ',q:'ᖅ','ᓐg':'ᖕ','ᓐn':'ᓐᓐ', 'ᓐᓐg':'ᖖ','ł':'ᖦ','ᓪh':'ᖦ', 'x':'ᖦ'
           ,i:'ᐃ','u':'ᐅ','a':'ᐊ'
           ,'ᑉi':'ᐱ','ᑉu':'ᐳ','ᑉa':'ᐸ'
           ,'ᑦi':'ᑎ','ᑦu':'ᑐ','ᑦa':'ᑕ'
           ,'ᒃi':'ᑭ','ᒃu':'ᑯ','ᒃa':'ᑲ'
           ,'ᒡi':'ᒋ','ᒡu':'ᒍ','ᒡa':'ᒐ'
           ,'ᒻi':'ᒥ','ᒻu':'ᒧ','ᒻa':'ᒪ'
           ,'ᓐi':'ᓂ','ᓐu':'ᓄ','ᓐa':'ᓇ'
           ,'ᔅi':'ᓯ','ᔅu':'ᓱ','ᔅa':'ᓴ'
           ,'ᔅi':'ᓯ','ᔅu':'ᓱ','ᔅa':'ᓴ'
           ,'ᓪi':'ᓕ','ᓪu':'ᓗ','ᓪa':'ᓚ'
           ,'ᔾi':'ᔨ','ᔾu':'ᔪ','ᔾa':'ᔭ'
           ,'ᕝi':'ᕕ','ᕝu':'ᕗ','ᕝa':'ᕙ'
           ,'ᕐi':'ᕆ','ᕐu':'ᕈ','ᕐa':'ᕋ'
           ,'ᖅi':'ᕿ','ᖅu':'ᖁ','ᖅa':'ᖃ'
           ,'ᖕi':'ᖏ','ᖕu':'ᖑ','ᖕa':'ᖓ'
           ,'ᖖi':'ᙱ','ᖖu':'ᙳ','ᖖa':'ᙵ'
           ,'ᖦi':'ᖠ','ᖦu':'ᖢ','ᖦa':'ᖤ'

           ,'ᐸ':'ᑉ','ᑕ':'ᑦ','ᑲ':'ᒃ','ᒐ':'ᒡ','ᒪ':'ᒻ','ᓇ':'ᓐ','ᓴ':'ᔅ','ᓚ':'ᓪ','ᔭ':'ᔾ','ᕙ':'ᕝ','ᕋ':'ᕐ','ᖃ':'ᖅ','ᓐᒐ':'ᖕ','ᓐᓇ':'ᓐᓐ', 'ᓐᓐᒐ':'ᖖ','ᖤ':'ᖦ','ᓪᕼ':'ᖦ'

           ,'ᐸᐃ':'ᐯ','ᑉᐃ':'ᐱ','ᑉᐅ':'ᐳ','ᑉᐊ':'ᐸ'
           ,'ᑦᐃ':'ᑎ','ᑦᐅ':'ᑐ','ᑦᐊ':'ᑕ'
           ,'ᒃᐃ':'ᑭ','ᒃᐅ':'ᑯ','ᒃᐊ':'ᑲ'
           ,'ᒡᐃ':'ᒋ','ᒡᐅ':'ᒍ','ᒡᐊ':'ᒐ'
           ,'ᒻᐃ':'ᒥ','ᒻᐅ':'ᒧ','ᒻᐊ':'ᒪ'
           ,'ᓐᐃ':'ᓂ','ᓐᐅ':'ᓄ','ᓐᐊ':'ᓇ'
           ,'ᔅᐃ':'ᓯ','ᔅᐅ':'ᓱ','ᔅᐊ':'ᓴ'
           ,'ᓪᐃ':'ᓕ','ᓪᐅ':'ᓗ','ᓪᐊ':'ᓚ'
           ,'ᔾᐃ':'ᔨ','ᔾᐅ':'ᔪ','ᔾᐊ':'ᔭ'
           ,'ᕝᐃ':'ᕕ','ᕝᐅ':'ᕗ','ᕝᐊ':'ᕙ'
           ,'ᕐᐃ':'ᕆ','ᕐᐅ':'ᕈ','ᕐᐊ':'ᕋ'
           ,'ᖅᐃ':'ᕿ','ᖅᐅ':'ᖁ','ᖅᐊ':'ᖃ'
           ,'ᖕᐃ':'ᖏ','ᖕᐅ':'ᖑ','ᖕᐊ':'ᖓ'
           ,'ᖖᐃ':'ᙱ','ᖖᐅ':'ᙳ','ᖖᐊ':'ᙵ'
           ,'ᖦᐃ':'ᖠ','ᖦᐅ':'ᖢ','ᖦᐊ':'ᖤ'
        }

       ,premap={
            'ᔾj':'ᑦᔾ'
           ,'ᔾᔾ':'ᑦᔾ'
        }

    this.charProcessor = function(chr, buf){
        if (chr=='\u0008') { // backspace
            if (buf.length) {
                return [buf.slice(0,-1),buf.length-1]
            }
        } else if (reNotIKU.test(chr)) {
            return remap[buf+chr] || [buf+chr, 0]
        } else {
            var str=buf+chr
               ,res,cres,h='';

            if (res=remap[str]) {
                return [res,0]
            } else if (res=submap[str]) {
                return [res,res.length]
            } else if(res=premap[str]){
                return [res, 1];
/*
            } else if (res=submap[buf]) {
                if (cres=remap[chr])
                    return [res+cres,1]
                else
                    return [res+chr,1]
*/
            } else {
                return [buf + (remap[chr]||submap[chr]||chr), 1]
            }
        }
    }
}

/**
 * $Id: JP.js 546 2009-02-27 08:53:11Z wingedfox $
 *
 * Japanese IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev: 546 $
 * @lastchange $Author: wingedfox $ $Date: 2009-02-27 11:53:11 +0300 (Пт, 27 фев 2009) $
 */
VirtualKeyboard.Langs.JP = new function () {
    var self = this
       ,INPArr = {a:"日会四上合開明相当海安挙朝在空有足愛英赤歩悪登編厚我称充荒網揚阿遇麻浴亜芦吾晶遭唖娃逢宛或粟庵厭蛙敢窪鹸昂朱讐飽亞會呀哇嗟堊婀惡扛擧舉猗當痾稱辮翕翹褪襾覯覿逅遘邂錏鐚閼齏韲驤鴉",aa:"悪於乎于吁咨嗚嗟噫惡憙猗羌",aba:"発暴發訐",abara:"肋",abu:"危虻蛇炙炮焙煬熹",abumi:"鐙",abura:"油脂膏腴膩",aburaaka:"膩",aburamusi:"蜚",aburana:"薹",ada:"徒仇讐冦婀寇綽讎",ade:"艶艷",ae:"饗喘",aemono:"齏韲",aga:"何我吾崇",agana:"贖",agari:"東揚",agata:"県縣",age:"上",agito:"顎",ago:"顎腮諤頤頷顋齶",agu:"倦",ahiru:"鴨鶩",ahu:"溢",ai:"会合間東相和愛英秋娃哀挨姶逢鮎饗乃廼藍會哇噫埃曖欸瞹矮穢胥藹迺阨隘靄靉鞋",aida:"間",aite:"対對",aka:"明赤厚紅赫垢朱緋淦絳",akagane:"銅",akagire:"皸皹胝",akago:"嬰",akai:"赫",akane:"茜蒐",akara:"赧",akari:"灯燈",akaru:"耀",akarui:"熹",akasi:"証験證驗",akatuki:"暁曉",akatuti:"赭",akaza:"莱藜",ake:"明陽暁朱緋",akebono:"曙",aki:"日明成商天光白秋右清喜昭之陽章照哲徹旭輝啓昌朗鑑鏡晃彰祥顕晶亮穐叡瑛且亨尭暁倦昂燦嗣朱詮爽聡旦諦寧彬斌呆飽璃諒玲奐惘曉曄朖皓睿龝飫",akina:"商估賈",akira:"明現公成審映光史融央昭陽章智哲旭輝啓昌朗鑑晃彰顕晶亮卯瑛侃亨暁慧昂翠聡旦諦瞳彪彬諒玲昶熹皓聰",akiraka:"煕晃顕亮瞭冏杲晄晤晟晢晰暸曠昿渙炯烱炳煥熈顯熙",akitarinai:"歉",akitariru:"慊",akizora:"旻",ako:"赤",akoga:"憧憬",akome:"衵袙",akou:"榕",aku:"悪握唖渥飽堊幄惡扼軛阨鷽齷",akubi:"欠",akuta:"芥",akutu:"圷垰",ama:"海天赤余雨甘剰尼奄甜剩塰蜑餘",amadare:"霤",amane:"周普遍",amanesi:"普弥彌徇洽浹溥",amari:"羨衍贏",amaru:"余",amatu:"天",amatusae:"剰剩",amazake:"醴",ame:"天雨飴穹",ami:"網畢网罔罟罠罨",amigasira:"网",amo:"天",an:"行合安案暗庵按闇鞍杏厭晏殷罨菴諳閹餡鮟黯黶",ana:"穴窟孔坎塹壙嵌竅竇篏",anado:"侮傲妛狎謾",anagura:"窖",anazu:"侮",ane:"姉姐",ani:"兄哥豈",aniyome:"嫂",anzu:"杏",ao:"青仰襖煽蒼碧呷",aoga:"黽",aogiri:"梧",aoguro:"黝",aoi:"上葵",aomono:"蔬",appare:"遖",ara:"新表有非荒洗粗疏匪旌沐沽洒浣滌澣澡瑕盪蘯笨糲麁",aragane:"鉱砿礦鑛",arai:"洗",arakazi:"予豫",araragi:"蘭",arare:"霰",arasi:"嵐悍",araso:"争弁闘辨辧爭瓣諍辯鬪",arata:"改灼悛",aratama:"璞",arato:"砺礪",arawa:"表現著顕顯",areru:"蕪",ari:"家在有順蟻",ariduka:"垤",aru:"有歩",arui:"或",aruiha:"或儻",aruzi:"主",asa:"生朝漁浅麻旦晁晨淺苴",asagao:"蕣",asagara:"莇",asahi:"旭暾",asari:"蜊鯏",ase:"新焦汗",asi:"足愛茨脚芦葦疋葺葭蘆趺",asia:"亜亞",asibue:"笳",asige:"騅",asikase:"桎鐐",asinae:"蹇",asinoura:"跖蹠",asioto:"跫",asita:"旦晨",asiura:"蹠",aso:"朝遊敖游遨",asobime:"娼",asu:"明安足飛遊",ata:"中応防与辺熱仇傭估應沽與邊邉",atai:"価値價",ataka:"宛恰",atama:"頭顱",atara:"新",atarasi:"新",ataru:"中斉齊",atata:"温暖嫗煦煖",atataka:"暄燠",ate:"宛",ategi:"椹",ato:"後跡痕蹟址墟趾蹤踪迹阯",atu:"会集得熱圧安厚",atu:"徳温純充宏昌淳暑敦鳩渥斡纂蒐輯鍾篤惇睦湊亶會壓扎攅聚腆萃軋輳遏閼",atui:"醇",atuka:"扱",atumari:"集",atumono:"羹羮",atumu:"伍侑",atura:"誂",atusi:"温毅淳敦渥竺惇",au:"合",awa:"併阿淡哀粟慌泡沫怜憐勠并怱恊恤愍澹矜粱遽醂閔",awabi:"蚫鮑鰒",aware:"憫",awase:"袷",awatada:"遽",awati:"莱",aya:"理文史危順恵章礼錦奇彩怪紋絢綾郁苑琢斐彪妖冉竒恠愆綺綵黻黼",ayaginu:"綵",ayaka:"肖",ayama:"過誤謝謬繆訛譌",ayamatu:"跌",ayatu:"操",ayaui:"殆",ayu:"歩鮎",aza:"字鮮浅麻痣",azake:"嘲",azami:"莇薊",azamu:"欺詑紿詒誣謾",azana:"字糺",aze:"畦畔畛",azi:"味鯵蝋鰺",azika:"簣",azu:"安預阿",azuka:"与與",azuki:"荅",azuma:"東春",azusa:"梓"
       ,ba:"場発化張映馬羽庭栄晴峡婆罵芭蕃塲麼旛瑪痲發碼薔蟇蟆鷭",baa:"婆",baba:"婆",bai:"売買倍枚梅賠培貝唄殻媒楳煤狽陪昧殼瑁眛苺莓賣邁霾黴",baku:"博暴爆幕麦曝漠縛莫駁貌摸寞瀑狢獏皃藐貘驀麥",ban:"万判番満馬板伴盤幡晩鰻播挽磐蕃蛮蔓卍曼幔悗滿瞞礬縵萬蠻謾輓鈑鑁鬘鷭",bara:"散払茨輩",baru:"原",bas:"罰",base:"橋",basi:"啄矼",bata:"端俣",batake:"畑",bate:"終",bati:"罰撥枹桴秡罸",batta:"蝗",batu:"末抜閥罰伐筏沫拔秣罸茉袙襪跋靺韈魃",be:"部米家可辺弁志倍缶瓶琶罐裴邊邉",bei:"米皿謎塀吠榠袂麑",beki:"冖冪幎汨羃覓",bekikanmuri:"冖",ben:"面弁便勉釆娩鞭緬麺俛冕辨辧卞宀抃汳泯湎瓣眄瞑辮辯麪黽",beni:"紅臙",bentou:"餉",besi:"志",betu:"別捌瞥蔑襪韈鼇鼈",bi:"日引備美火未尾老敏微梶弥鼻傍枇毘琵眉媚寐嵋麼弭彌濔瀰糒糜縻茯薇鞴麋靡黴",bibi:"周",bii:"為",biki:"引曳曵",bikko:"跛",bin:"備便敏貧瓶秤壜岷愍憫旻檳泯紊緡罎罠閔鬢黽",bira:"開",bita:"鐚",bitu:"蜜備",bo:"母模募暮干簿彫墓姥牡蒲惚莫慕戊菩呆摸姆媽拇毋糢謨",boka:"暈",bokasi:"暈",boko:"凹",boku:"目福木撲牧僕黙墨朴曝卜睦穆樸濮瀑默繆苜蹼雹鶩",bokudukuri:"攴攵",bokunoto:"卜",bokunyou:"攴攵",bon:"犯盆煩凡梵瞞笵",bora:"鯔",bori:"掘",boro:"繿襤",bosi:"星",botan:"釦鈕",boti:"点伐筏垈點",botu:"没勃勿孛悖歿沒渤坊",bou:"防望貿亡暴房夢忘膨妨忙冒謀乏傍坊帽棒紡牟矛霧虻卯牡茅畝戊剖某肪貌鉾妄孟蒙儚勗夘厖厶梦尨惘懋旁旄昴曚朦楙榜氓滂瀑瑁甍畆皃眸矇磅网罔耄冐膀艨芒茆茫莽蒡蚌蠎蟒袤謗鋩髦魍鴾黽",bu:"分部不保海打無夫武振歩豊舞歓奉峰霧蒲蔀舛汎賦侮撫葡蕪鮒蓬鵡嘸廡憮无毋豐錻鵐鶩",buka:"深",buki:"雪",buku:"袋茯",bun:"分文聞豊蚊吻紊馼",bune:"舟",bunnyou:"文",buri:"鰤",busa:"纈",busi:"節",busuki:"宿",buta:"豚",buti:"駁駮",buto:"蚋",butu:"物仏勿佛孛",buyo:"蚋",buyu:"蚋",byaku:"百白柏檗蘗甓闢",byou:"平病秒描妙猫苗鞄謬廟錨鋲屏杪渺皰眇緲苹藐蚌鉋",byuu:"謬繆"
       ,da:"出立建打達伊抱妥那炊駄雫蔀蛇詑唾堕惰柁舵楕陀騨儺兌墮娜懦拏拿朶梛橢沱默糯荼蠕逹陏駝鴕",daasu:"打",dai:"大内代題第台提奈袋弟鵜醍悌梯乃廼眤睇臺迺餒鹹",daidai:"橙",dainomageasi:"尢",daira:"平",daka:"高瀉",dakari:"渠",dake:"丈",daku:"諾濁搦",dama:"神玉黙瞞騙",dan:"団男断談段玉弾壇暖敦灘蔀騨旦檀椴楠團彈斷煖葮",dana:"棚灘",dao:"倒",dare:"垂誰",date:"立",datu:"韃脱奪捺妲怛獺",de:"出田豊弟泥兌",dei:"泥禰祢臑袮",dekaguramu:"瓧",dekameetoru:"籵",dekarittoru:"竍",deki:"条溺嫋條滌",dekimono:"瘻",deko:"凸",deku:"塑",den:"田電伝典殿淀鮎佃纏澱傅傳甸奠拈畋沺癜臀鈿",desiguramu:"瓰",desimeetoru:"粉",desirittoru:"竕",detu:"涅",'do':"百度取道水止土退友遠努撮怒豆澱奴曇呶孥帑弩迹駑",dobato:"鴿",dobu:"溝",dobuga:"蚌",doitu:"独",doki:"時",dokoro:"所",doku:"独読毒獨讀髑",doma:"地",dome:"止",domo:"共供吃吶訥謇",don:"殿鈍呑曇壜嫩緞罎飩",donburi:"丼",donguri:"杼",dono:"殿",doo:"通遠",doori:"通",dora:"鐃鑼",doro:"泥淤",doru:"取弗",dotu:"独",dou:"同百動道藤導働答登脳堂童桐洞銅吋寓竣憧撞瞳胴萄嚢膿仂僮儂呶嬲嫐恫慟曩橈檸潼獰瞠耨腦臑艟衲鐃閙鬧",dougamae:"冂",dousi:"通",dozyou:"鰍鯲鰌",duke:"付漬附",duki:"付築筑",duku:"作造",dukuri:"作造",dume:"都詰",dura:"辛",duta:"伝",duto:"勤",dutu:"砲宛"
       ,e:"会生回家海画計重村得戸愛映英風衛吉央江図永植壊栄恵絵依笑誉獲飯衣柄也兄枝殖懐荏餌瑛頴詠榎廻隈慧潰歪會囘匯哇圖壞彗徊惠懷柯榮淮畫穢繪衞迴錏鐫",eba:"餌",ebara:"茨",ebi:"老蝦戎蛭蛯鰕",ebira:"箙",ebisu:"夷胡戎蛮戉狄羌蠻貊",eda:"条枝朶條",edati:"徭",ee:"詠",ega:"画描畫",egu:"刔刳剔抉",ei:"営映英影衛永栄泳鋭叡嬰曳洩瑛盈穎頴詠丿兌咏營塋暎曵楹榮殪泄潁瀛瑩瓔珱睿縊纓罌翳蠑衞裔贏郢霙饐",eki:"役益易駅液浴疫伯亦奕懌掖繹腋蜴蝪覓謚諡驛鯣",ekubo:"靨",emi:"笑蝦",emisi:"夷",en:"円演援園渉延圧遠沿塩炎煙縁垣媛渕堰鉛宛咽厭奄宴怨掩焔燕猿艶苑薗鴛俺羨鳶淵偃冤嚥圓圜壓娟婉嫣寃悁捐掾椽檐櫞衍涎淹渊湮湲烟焉爰筵篶簷罨臙艷茆莚蜒蜿袁覃讌豌轅鋺閼閻閹隕魘鹽黶",enagamae:"冂",enisi:"縁",ennyou:"廴",eno:"榎",enoki:"榎",enzi:"槐",enzyu:"槐",era:"選択豪偉撰掏揀擇柬腮顋鰓",eri:"衿襟",esa:"餌",eso:"鱠",eti:"越",etu:"越悦閲咽謁兌噎戉曰粤鉞饐",eu:"徭",eyami:"瘟癘"
       ,ga:"勝書画夏賀我掛雅芽狩伽珂俄峨牙臥蛾餓駕瓦閑呀哦姜娥峩畫礒莪衙訝鵝鵞",gae:"谷",gaenzi:"肯",gai:"外害谷街垣概刈涯亥凱劾咳崖慨碍蓋該鎧骸苅乂倪儿剴匯啀喙垓孩乢崕崔愾榿漑皚盖睚磑礙葢豈駭鮠",gakari:"係掛",gake:"崖垳崕崔",gaki:"書城",gaku:"学額楽岳顎鍔鰐咢壑學斈嶽愕樂瘧萼蕚覺諤鄂鶚齶",gakusi:"隠",gama:"蒲",gami:"頭模耳尻",gan:"元含丸顔岩岸願頑眼巌玩癌翫贋雁偐嵒巖狠芫莟頷顏鴈鳫龕",gandare:"厂",gane:"金",gara:"潟柄殻搦",gasa:"笨",gase:"瀬",gasira:"頭",gata:"方県難形型潟堅髪縣",gati:"歹鞨",gatu:"月歹合",gatuhen:"歹",gawa:"代側",gaya:"谷",ge:"下外解夏芸植削殖霞蝦牙崖碍戯乂偈戲皚礙觧訝鮠",gei:"児芸迎鯨詣倪兒囈猊睨艾藝貎霓鯢麑黥",geki:"撃激劇逆戟隙屐檄覡郤闃鬩鵙鷁",gen:"現言原元減限験厳源彦嫌眼玄幻弦拳硯絃舷諺這偐儼呟咸嚴广愿狠痃眩芫衒阮驗",geti:"杰",getu:"月綴囓蘖齧",gi:"十議子決調切疑義着技親極儀岐貴犠衣偽裂伎毅宜欺蛾崖妓戯擬祇蟻誼其鰭僞嵬嶬嶷巍戲曦沂犧皚礒羲艤萓魏",gihunohu:"阜",gimi:"君",gin:"銀吟圻垠岑崟很憖沂齦",ginu:"被",giri:"切",giwa:"際",go:"五後期午語護越降互砂拒御豪誤牛悟剛棋呉吾后禦糊胡伍娯梧檎瑚碁醐冴其冱唔圄圉寤忤晤朞棊沍牾珸篌茣蜈衙麌齬",goe:"越",gokoro:"心",goku:"極獄",gome:"込篭籠",gomi:"芥塵埖",gon:"金言権厳勤僅欣檎艮嚴垠懃權",goo:"合",gori:"鮴",goro:"来殺頃",gose:"生",gosi:"越",goto:"毎如",gou:"業合強格楽号豪郷剛旺噛彊昂劫壕拷濠轟傲刧哈嗷囂抂敖樂毫熬藕螯遨鰲鷙鼇",gouri:"群",goya:"越",goza:"厶蓙",gu:"工求木宮供具居弘群呉臼仇倶愚虞寓吽嵎柩禺藕裘颶鬨麌",gui:"食",gumi:"実組",gumo:"雲",gun:"軍郡群羣",gura:"椋掠",gurai:"位",guramu:"瓦",gurasi:"暮",gure:"博暮",guri:"群",guro:"畔",guru:"苦",gusa:"種草枝",gusiku:"城",gusuku:"城",guu:"宮功遇偶隅寓嵎禺藕",gya:"伽",gyaku:"逆虐瘧謔",gyo:"漁御魚禦圄圉衙馭",gyoku:"玉嶷閠",gyou:"業行形刑仰凝尭暁僥嶢曉澆爻翹蟯迥餃驍堯",gyouninben:"彳",gyuu:"生牛"
       ,ha:"二長生八米派半果土食南番張葉映針欧波破羽爆栄端晴歯覇刷掃跳幡芳刃恥把萩伯履牙捌腫頗穿馳脹填貼吐禿巴播杷琶芭這矧剥簸佩刄刎匍哈喀咯嘔坡垪嵌怕拊撥暎霸榮歐瀉爬犇玻碆笆篏羈羇耙耻菠葩袙覊跛迸陂霽駛齒",haba:"幅阻巾掵沮",habaka:"憚",habe:"侍",habiko:"蔓衍滔",habu:"省略畧",hada:"肌膚秦",hadagi:"襦襯",hadaka:"裸",hadanu:"裼",hadasi:"跣",hae:"蝿蠅鮠",hagane:"鋼鉅",hage:"激励烈蒋禿勵",hagi:"作萩矧脛骭",hagu:"逸",haguki:"矧齦齶",haguku:"育哺孚毓",hagusa:"莠",haha:"母姉媽毋",hahaso:"柞",hahuri:"葬",hai:"入配敗廃抜背排杯俳肺輩灰拝榛盃牌狽蝿誹稗箆吠孟佩坏孛廢徘怫悖憊拔抔拜擺旆朏沛湃焙珮琲癈碚祓篦糒胚蠅裴霈",haitaka:"鷂",haka:"高経権画計量図博測略称諮墓謀諏猷仞仭咨圖塋忖揆揣權畧畫稱經詢謨銓",hakado:"捗",hakama:"袴",hakana:"儚",hakari:"秤",hakarigoto:"画略謀猷揆畧畫籌",hakimono:"屐",hako:"運箱函笥漕箪凾匣匳奩椢筐筺筥篋",hakogamae:"匚",haku:"白博迫薄覇泊拍伯柏鞄栢狛剥箔粕舶駁亳佰岶帛怕搏擘霸樸檗蘗溥瀑狢珀璞膊貉貊陌雹駮魄",hama:"浜濱",hamaguri:"蛤蚌",hamasuge:"莎",hamati:"鰤",hamo:"鱧",han:"府判反阪半販般坂版犯板伴範飯繁幡漢搬班翻榛播叛帆斑氾汎畔藩釆煩頒磐蕃扮焚凡卞拌攀旛旙槃樊泛潘燔瘢礬笵絆繙飜胖膰范蟠袢蹣鈑鐇鷭",hana:"発話放英花離端華鼻畠塙咄洟發纐葩",hanabira:"弁辨辧瓣辯",hanabusa:"英",hanada:"縹",hanadi:"衄衂",hanaha:"甚",hanahada:"已",hanaiki:"嚊",hanamuke:"贐餞",hanare:"放",hanasi:"話噺咄譚",hanawa:"渕塙淵渊",hane:"羽翰翅",hanebou:"亅",hani:"埴",hanzou:"楾",hara:"原払源服腹妊姙孕拂攘祓禊禳肚胚襄",harai:"払秡",harami:"孕胚",haranomusi:"蛔",hararago:"鯡",harawata:"臓腸腑膓臟",hare:"晴",haremono:"腫癰",hari:"治張針榛播梁箴鍼",harinezumi:"彙蝟",harituke:"桀磔",haru:"東開明問治元美春温陽晴玄榛孟遥脩迢遙",haruka:"玄遼夐杳迥",has:"罸",hasa:"迫挟挿夾挾插箝襭鋏",hasama:"迫",hasami:"螯鋏",hase:"騁驟",hasi:"橋階走端趨啄箸梁嘴枦觜赱",hasibami:"榛",hasigo:"梯",hasika:"疹",hasike:"艀",hasira:"柱楹",hasiri:"走",hasitame:"婢",hasu:"荷泰斜芙蓉蓮",hasunone:"藕",hasya:"燥",hata:"機果将端旗畑幡傍秦叩畠將幢拮旃旆旌旛旙礑籏",hataasi:"旒",hataboko:"纛",hatagasira:"覇霸",hatahata:"鰰",hatake:"畑畠圃疥",hatara:"働仂",hatasu:"毅",hatato:"礑",hate:"涯崖垓",hati:"八平鉢捌蜂椀甌盂釟",hatigasira:"八",hatisu:"蓮",hato:"鳩鴿",hatoba:"埠",hatu:"八発初抜法白服削泊罰髪鉢捌廿肇溌醗伐筏叭垈撥癶發秡罸跋釟髮魃",hatugasira:"癶",haya:"早速勇逸捷隼囃湍趾駛鮠",hayabusa:"隼鶻",hayai:"斉夙蚤齊",hayao:"駿",hayase:"湍",hayasi:"林駿",haza:"狭硲挾陌",hazama:"迫峡硲峽",haze:"櫨枦鯊",hazi:"初始創弾恥垢肇甫剏彈忸愧慙慚羞耻詬",hazikami:"椒薑",hazime:"一大元創啓哉肇甫孟弌俶",hazu:"外弾筈彈",hazukasi:"辱愧詬",hazumi:"勢",he:"日経平減戸兵圧閉剥壓屁經舳",hebi:"蛇它",heda:"距隔鬲",hei:"平病兵並恵併閉柄瓶陛坪丙塀幣弊蔽僻箆餅俾凭娉嬖屏幤幵并憊敝斃枋炳睥砒秉竝篦聘苹萍蓖薜閇閖餠髀鮃",heki:"壁僻癖碧劈擘璧甓襞躄辟闢霹",heko:"凹",hekutoguramu:"瓸",hekutomeetoru:"粨",hekutorittoru:"竡",hen:"平変返辺弁編片偏逸扮篇遍鞭辨辧卞扁變旛旙汳瓣辮翩胼蝙褊諞貶辯邊邉駢騙",hena:"埴",hera:"箆篦",heri:"縁",herikuda:"遜",hesaki:"舳艫舮",heso:"臍",heta:"蒂蔕",heti:"暼",hettui:"竃竈",hetu:"蔽瞥丿暼鼈",hetura:"諂諛",heya:"曹",hezu:"剥",hi:"日一理平引費井比常英被退春火非飛否批冷等彼避秘陽弾悲旭似皮干輝陳肥孫灯披疲乾妃碑氷曳轡牽冴惹燈挽匪卑庇扉斐泌緋罷誹樋簸枇毘琵稗桧僻婁丕俾冱冰匕嚊坡妣婢屁彈彎弯怫拏拿掎掣攣暃曵朏杼檜梭榧沍狒痞痺砒碾祕秕粃紕絅羆翡脾腓臂茯菲蓖蜚裴裨譬貔豼賁贔跛輓轢辟鄙陂霏鞁鞴髀鯡鵯靡",hibi:"響皴皸皹罅",hibiki:"韵",hida:"摺襞",hidari:"左",hide:"任英栄秀豪偉嗣",hideri:"旱",hidesi:"秀",hido:"酷",hidume:"蹄",hie:"肥稗",higa:"東僻",higai:"鰉",higasi:"東",hige:"須髪髭髯鬚",higuma:"羆",higurasi:"蜩",hihi:"狒",hii:"秀",hiiragi:"柊",hika:"光控煕扣熈爍皓熙",hikagami:"膕",hikari:"光晶耀洸燿耿",hikaru:"輝晃",hike:"引",hiki:"引率匹抽曳挽疋逼蟇蟆",hikii:"将將",hikiri:"燧",hikitu:"痙",hikituke:"癇",hiko:"人光彦勉",hikobae:"蘖",hiku:"低矮",hima:"暇隙遑釁",hime:"媛姫嬪",himo:"綬紐",himogori:"膰",himono:"鱶",himorogi:"胙膰",himoto:"繙",himusi:"蛾",hin:"品浜貧頻秤彬斌瀕賓牝嬪擯梹檳殯濱稟禀繽蘋顰鬢",hina:"雛鄙",hine:"捻撚拈",hineku:"弄",hinoe:"丙",hinoki:"桧檜",hinokuti:"閘",hinosi:"熨",hinoto:"丁",hira:"開成平波枚啓拓衡挨擺攤豁辟闢",hirabi:"曰",hiraku:"拆磔",hirame:"閃鮃",hiratai:"扁",hire:"鰭",hiro:"大公海広容展太洋周央欧博拡幸普彦宇緩弘陽敬宗裕宏浩仁煕啓聖泰宙倫嘉寛祥尋拓弥郭拾伯祐丑恢紘氾汎凡廣擴敞汪洸滉瀚熈皓碵禮胖豁闊濶熙",hiromu:"弘",hiron:"寛",hirosi:"大海洋豊宇弘裕宏浩礼煕寛祐紘汎洸皓",hiru:"昼怯蒜蛭晝",hiruga:"翩飜飄飃",hirugae:"翻",hisa:"長教史久央永宣亀寿恒剛尚弥桐粥玖壽廂彌鬻",hisagi:"楸",hisago:"瓢匏瓠蠡",hisame:"霈",hisasi:"九永亀寿恒尚弥庇亘壽廂廡彌恆梠檐簷龜",hisi:"西菱拉犇蔆",hisihisi:"犇",hisikui:"鴻",hisio:"醤醢",hiso:"密秘潜窃潛濳竊顰",hissa:"挈",hissori:"闃",hisyaku:"杓",hita:"常浸淫婬涵溲",hitai:"額",hitaki:"鶲",hiti:"七篳",hitigi:"柩",hitikudo:"諄",hito:"一人民準独史等智仁斉匡傭弌凖獨疇畴薺鈞齊",hitoasi:"儿",hitoe:"単單襌褝",hitomi:"瞳眸睛",hitomosi:"鐙",hitori:"孑",hitorimono:"煢",hitosi:"平整均斎仁斉倫欽齊",hitotu:"一壱弌壹",hitoya:"牢圄圉",hitu:"必払筆匹泌疋弼畢逼匱拂櫃篳謐蹕鵯",hitugi:"柩",hitugiguruma:"轜",hituzi:"未羊",hituzisaru:"坤",hiuti:"燧",hiwa:"鶸",hiya:"涼凉",hiyodori:"鵯",hiyoko:"雛",hiyorinotori:"酉",hiza:"膝",hizamazu:"跪",hizi:"土泥肱肘臂",hiziki:"枅欒",hiziri:"聖",hizu:"歪",ho:"法保反補種捕火賞歩豊浦秀欲緒布宝誉掘干舗穂彫灯怖芳乾輔峰蒲惚讃畝捗燈帆埠葡鮒鋪圃甫蜂褒吠匍匏吼咐咆哮哺埔堡娉恍枋枹畆穗脯舖苹菠葆褓襃譽讚逋鐫雕餔鮑鯆黼",hobasira:"檣艢",hobi:"統",hobo:"略畧",hoda:"絆",hodo:"解程觧",hodoko:"施",hoe:"吠吽",hoga:"朗敞朖",hogi:"祝",hogo:"夸",hoho:"頬",hohu:"屠",hoi:"穂",hoka:"外他佗",hoke:"惚呆",hoko:"誇矛戟鋒鉾侘戈戛戞桙槊殳矜鉈",hokodukuri:"戈",hokora:"祠",hokori:"埃",hokoro:"綻",hokosaki:"鋩",hokotukuri:"殳",hoku:"北剥曝匐攴攵樸濮瀑蔔蹼",hokuro:"痣黶",hokuso:"樮",homa:"誉",homare:"誉",home:"称誉稱頌",hon:"本品反誉幡翻洪叛汎焚奔夲濆犇畚笨繙飜賁",hone:"骨",hono:"仄",honoo:"炎焔",hoo:"朴頬",hootuki:"面",hora:"洞",hori:"堀壕濠塹隍",horo:"亡幌滅泯袰",horobo:"殲殱",horoguruma:"輜",hos:"欲",hosaki:"穎頴",hosi:"星干",hosii:"糒",hosiimama:"淫亶婬恣擅肆",hoso:"細",hota:"榾",hotaru:"蛍螢",hoti:"弗",hoto:"程辺邊邉",hotoba:"迸",hotogi:"缶甌罌",hotohoto:"殆",hotoke:"仏佛",hoton:"殆",hotori:"阿瀕滸濆陲",hotu:"上発北払勃拂渤發法堀",hou:"方法保北報放防訪並豊崩抱邦宝包封砲庄胞芳棚奉峰縫朴逢鞄亨蔀鴇汎豹倣俸呆峯庖捧朋泡烹萌蓬蜂褒鋒飽鳳鵬勹匏匚咆垉堋堡娉寶寳幇弸彭彷怦抔抛旁枋枹榜泛泙滂澎瀑炮烽焙琺疱皰硼磅竝篷絣繃膀舫苹苞萠葆蒡蚌蚫袍裹褓襃謗豐迸鉋靤髣髱魴鮑麭",houdate:"楔",houki:"荘帚彗箒莊菷",houmu:"葬",hourensou:"菠薐",hozisi:"脩脯膊",hozo:"臍",hu:"二五生部化不文府増付福夫負風振船婦歩富降父踏普浮老更触阜布吹敷腐双缶殖怖伏噴釜践冨符膚赴輔嘘嬰臥蒲拭耽斑埠扶斧芙譜賦附撫葺鮒鋪圃甫仆俘俛俾俯偃傅吩咐坿孚孵巫拊枹柎桴榑殍殕溥牴畉罐罘脯腑艀苻藉蜉觝觸訃誣賻趺跋踐蹂蹈躔躙躪躡逋郛酖釡餔馮鯆鳧鳬麩麸黼",huda:"二札牒牌榜槧牘箋",hude:"筆翰聿",hudedukuri:"聿",hue:"笛笙簫籟籥鰾龠",huge:"鳳",hugo:"畚",hugu:"鮭鰒",huigo:"鞴",huiito:"呎",huka:"外深泓浤潭鱶",huki:"福吹葺蕗擽苳",huku:"福副含復幅服複腹膨伏覆巾脹逼匐哺愎箙茯蔔蝠蝮袱輻輹鞴馥鰒",hukube:"瓢",hukurahagi:"腓",hukuro:"袋嚢梟",humaki:"帙",humi:"人文史章訓冊郁翰册",humoto:"麓梺",humuto:"梺",hun:"分紛噴粉雰墳奮彬斌吻憤扮焚糞刎吩忿枌氛汾濆芬賁",huna:"船舟鮒舩",hunabata:"舷",hunabei:"舷",hunayosooi:"艤",hundosi:"褌襠",hune:"船舟槽舩舸艘",huran:"法鞦",hurebumi:"檄",huri:"振降",huru:"古旧降震揮奮慄掉篩舊顫",hurutori:"隹",huruzake:"酋",husa:"方総角房亮欝塞惣填妬杜堙壅悒鬱湮總錮閼雍",husaga:"阨",husagu:"梗",huse:"防伏臥禦扞捍",husego:"篝",husi:"節伏樶",husidukuri:"卩",husu:"熏燻",husuma:"襖衾麩麸",huta:"二再双蓋弐弍雙盖葢貳貮",hutamono:"盒",hutata:"二再弍",hutatu:"二両双兩雙",huti:"縁渕淵禄渊潯潭祿",hutido:"縁",huto:"太肥",hutokoro:"懐懷",hutu:"払仏弗沸蔽佛彿怫拂祓髴黹黻福富",huu:"夫風富豊阜封冨汎楓鳳梵瘋諷馮",huyu:"古冬",huyugasira:"夂",huzi:"藤",huzoro:"徭",huzyu:"藤",hyaku:"百柏栢碧佰劈怕擘襞霹",hyakume:"匁",hyan:"香",hyatu:"百",hyoku:"逼愎溽皀雹馥",hyou:"表平票評兵標拍俵氷漂杓彪瓢豹餅冫冰凭剽嫖并怦慓憑殍澎縹繃苞萍迸雹飄飃飆餠馮驃髟鮃鰾",hyousigi:"柝",hyuku:"百",hyuu:"彪髟"
       ,i:"一十会五出市上生行合入子相意要言以指府委活告井容位比違医良風去好移衛易遺伊異維囲角善為居射依埋魚飯威衣斎寝慰往祖肥凍唯李緯胃炊胆函癒娃葦飴庵偉夷尉惟椅畏萎謂亥郁壱卯蔚云莞幾忌蛇壬煎詑陀鋳猪斑斐鮪冶揖倭佗倚凾噫囗圍壹姨寢已帷幃彝彜彙徃怡恚懿檍欹洟渭炒熨熬爲猗痍痿瘉眤瞋矣縊譱肄苡藺蝟詒諱豬貽逶醫鑄靉韋頤餒饐鰄",ibara:"茨荊楚棘",ibari:"溺溲",ibiki:"鼾",ibitu:"歪",ibo:"疣肬贅",ibu:"指熏燻",ibuka:"訝",ida:"抱懐懷",ide:"出",ido:"挑誂",ie:"家宇厦廈廬",iedo:"雖",iga:"歪毬",igamu:"啀",igata:"熔范鎔",igeta:"韓",igurumi:"弋",ihaya:"窟",ihori:"庵",ii:"飯謂粲",ika:"争厳怒嗔嚴忿恚慍爭瞋",ikada:"筏桴槎",ikade:"怎",ikaduti:"霆",ikame:"儼",ikan:"奈那",ikanobori:"凧",ikari:"碇錨忿",ikaru:"鵤",ikaruga:"鵤",ikazuti:"雷",ike:"生池垳",ikenie:"犠犧",iki:"生行気域息伯或粋气氣粹閾",ikidoo:"憤",ikio:"勢",iko:"憩偈憇",iku:"生行育城征郁粥幾墺拗毓澳燠礇鬻",ikuha:"的",ikusa:"戦戰",ikusabune:"艟艨",ima:"今未",imasi:"警戒勅飭敕箴誡",imawa:"忌",imina:"諱",imo:"芋薯藷蕷",imomusi:"蜀",imoto:"姨",imouto:"妹姨",'in':"員院引音印因飲隠陰允咽姻淫胤蔭韻寅吽堙婬尹廴恁慇飮殞殷氤湮筍笋茵蚓贇酳隕隱霪韵鸚",ina:"員引否辞稲稻",inada:"鰍",inago:"蝗螽",inaka:"田",inana:"嘶",ine:"稲禾稻",inisie:"往徃",innyou:"廴",ino:"井稲祈猪祷",inoko:"豕",inosisi:"猪猯豬",inoti:"命",inti:"吋",inu:"犬狗戌",inui:"乾",io:"庵廬菴",iori:"庵廬菴",ira:"郎",irada:"苛",iraka:"甍",irezumi:"黥",iri:"入西飯煎圦杁",irie:"湾灣",iro:"色",irodo:"彩",irodori:"采釆",irori:"炉爐鑪鈩",irotuti:"堊",iru:"日一入",iruka:"鯆",isa:"石功砂威勇諌勳諍諫",isagiyo:"潔屑",isaka:"諍",isamu:"勲",isao:"功勲勣勳悳",isara:"小",isasaka:"些聊",ise:"竜",isi:"石眥眦",isibumi:"碑碣",isidatami:"甃",isiduki:"鐓",isiyama:"岨",isiyumi:"弩",isizue:"礎",iso:"急勤磯汐礒",isoga:"忙惣匆",isu:"石",ita:"分労傷致板痛至潮到惨悼詣戚俎勞廸怛恫悵惻愴慘摯炒疼臻迪",itada:"頂戴",itadaki:"頂顛巓",itama:"愴",itamu:"悽",itaru:"格之暢迪",itati:"鼬",itawa:"労勞",itazura:"徒",iti:"一市壱姪弌壹櫟檪聿",itigo:"苺莓",itinoku:"九",ititahen:"歹",itiziku:"九",itiziru:"著",ito:"内愛伊糸厭絃穉絲綸縷褸",itogasira:"幺",itoguti:"緒",itokenai:"稚",itoma:"暇遑",itona:"営營",itu:"一五厳逸壱溢乙姪揖稜弌佚噎壹曷汨聿軼鎰鴪鷸",ituki:"樹斎",ituku:"慈",itukusi:"厳嚴憮",itutu:"伍",ituwa:"偽詐佯僞詭譎",iu:"誘",iwa:"石況岩祝巌矧磐况嵒巖曰",iwao:"巌磐巖礒",iwasi:"鰯鰮鰛",iwata:"瀬",iwaya:"窟",iwayuru:"謂",iya:"否嫌弥癒厭賎卑俚彌瘉賤鄙陋",iyasiku:"苟",iyoiyo:"弥愈彌逾",iza:"蹇躄",izana:"誘",izi:"苛弄",iziku:"弄",izu:"出和泉厳",izuku:"焉",izukuni:"悪惡",izukunzo:"悪烏渠惡曷",izumi:"泉湶",izure:"孰"
       ,ka:"日十三上合高回県代開下化家川勝支和加海書交変価神果過何可課個科花買白歌火積河鹿突夏賀換替貨香彼欠坂鳥巨借描我掛懸貸仮荷華兼甲雅駆偽克也稼鶴梨嘉暇刈飼掃佳嫁架菓霞葛冠勘靴圭桂枯哉狩鍋伯翔郁渦瓜榎伽寡珂禍禾箇苛茄蝦嘩迦蚊駕馨且樺噛萱苅駈卦袈繋乎跨咋斯曾掻鍛賭薙伐耶蘭猟个乂假僞價囘凅厦呀呵咀咥咬咼哥嗅嗄噬嚼囓囮堝夥夭夸孵崋廈彁戈挂搗變枷柯柧槁歟涸渮滓爬獵珈瑕痂窩笳縣缺罅胯舁舸艾芟葭萪虧蚋蝸蝌裹訛訶謌譁譌谺賈跏踝軻遐錵鍜闕顆馥驅鰕黴齧",kaba:"椛樺蒲庇",kaban:"鞄",kabe:"壁",kabi:"黴",kabu:"株被蕪",kabura:"鏑蕪",kaburaya:"鏑",kaburi:"頭",kabuto:"甲兜冑胄",kado:"門角圭稜楞",kae:"反返帰替却還卻栲歸皈",kaede:"楓槭",kaeri:"省顧眄眷",kaeru:"蛙",kaga:"利各鏡屈傴僂暉曄焜煌縢跼",kagami:"鑑鏡鑒",kagamidai:"魴",kagamitai:"魴",kagan:"鏡",kagari:"篝",kagaribi:"燎篝",kagaya:"輝旺赫耀燿",kage:"景影陰蔭翳",kagi:"画限鈎劃鍵勾亅畫鉤鎰鑰",kago:"駕輿篭筐筺籠簽籃轎",kagu:"神",kaho:"薫",kahoru:"馨薫",kai:"会回開海改界画解階競介壊街届絵掛戒械快悔皆刈飼怪懐拐灰貝堺柏亥頴塊廻恢魁晦芥蟹凱咳蓋鎧骸粥苅卦罫鮭詮潰桧丐乂乖价會偕傀囘剴匯哇咼喙喟垓壞夬孩屆峽嵬廨徊恠懷懈挂揩枴檜椢楷楫槐榿橈櫂欸歇淮漑獪瑰畍畫疥皚盖鬻繪膾艪艾茴葢薤薈薊蛔蠏褂觧詼誨誡諧豈迴邂醢醯隗鞋駭鮠鱠",kaibaoke:"櫪",kaigarabone:"胛",kaiko:"蚕蠶",kaina:"肱",kairi:"浬",kaityuu:"蛔",kaiyone:"糴",kaka:"関各係掲抱隠拘繋嬶罹關",kakaa:"嚊嬶",kakame:"嚊",kakari:"係掛",kakato:"踵",kake:"掛翔賭",kakeba:"齔",kakehasi:"桟棧",kakehi:"筧",kakei:"筧",kaki:"上書垣柿蛎堵墻牆硴籬蠣",kakimono:"帖牘",kako:"囲託圏喞圈圍埒埓",kakotu:"託寓詫",kakou:"蓋盖葢",kaku:"画各革格確客閣蔵核拡覚角秘隠獲較鶴隔脚潜渕穫郭碓劃嚇廓撹殻赫掴塙淵凅喀咯埆壑幗恪愨挌攪擱擴攫桷梏椁槨殼渊涸潛濳烙狢瓠畫癨矍硅祕竄膈膕茖藏螫蟄蠖覈覺貉钁隱霍馘駮骼鬩鬲鷽",kakuma:"匿",kakusigamae:"匸",kama:"構畑缶釜鎌竃蒲窯冓炯竈窰罐釡鑵",kamabisu:"嘩喧噌呶嗷囂聒諠譁讙",kamado:"竃爨竈",kamasu:"叺鰤",kamati:"框",kame:"亀瓶瓷甌甕缸罌龜",kami:"上神頭守紙髪侍帋髮",kamigasira:"髟",kamikanmuri:"髟",kamikazari:"彡珈",kaminari:"雷",kamisimo:"裃",kamo:"神甘樺鴨醸酎醗釀鳧鳬",kamome:"鴎",kamosika:"羚",kamozi:"髢",kamu:"齟",kamuro:"禿",kan:"上間金関官感神館幹監管環観韓完換康患刊巻緩還勧看簡甲慣歓肝喚干甘貫陥寒寛缶艦鑑乾冠勘汗漢菅函斡樺苅侃堪姦憾敢柑桓棺款澗潅竿翰莞諌閑舘串鹸湛亙亘丱凵凾刋勸卷厂咸啣喊圜坎坩奐奸姜嫺嫻宦寰嵌悍愃慳懽戡扞拑捍揀撼旱杆柬栞桿橄樌檻歉歡浣涵淦渙湲灌澣瀚煥煖燗疳癇皖盥眩瞰稈箝篏綸緘繝罐罕羹羮艱莟蒄蚶觀諫讙豢轗遑邯酣鉗銜鐶鑒鑵關陷頷顴餡駻驩骭鬟鰔鰥鸛鹹鼾龕",kana:"金神銀愛適奏称悲敵哉哀叶乎恊稱縢諧",kanae:"中鼎鬲",kanamari:"鋺",kaname:"要",kanara:"必",kanba:"芳樺",kane:"金銀兼包錦懐鎌謙鐘矩鉦鍾摂攝釛",kanegura:"帑",kanezasi:"矩",kanga:"考鑑稽攷鑒",kani:"蟹蠏",kanmuri:"冠冕",kanna:"鉋",kannagi:"巫覡",kannohaha:"毋",kannuki:"関閂關",kannyou:"凵",kano:"彼叶",kanoe:"庚",kanohoko:"戈",kanoko:"麑",kanoto:"辛",kanou:"叶",kanzasi:"簪釵鈿",kanziki:"橇",kanzou:"萱",kao:"顔香馨薫顏馥",kaori:"馨薫芬",kaorigusa:"鬯",kaoru:"芳郁馨薫彪",kappu:"冠",kara:"方空韓絡柄辛唐殻樺搦殼縢辣鹹",karada:"体躯躰軆體",karageru:"紮",karai:"苛",karaka:"揶",karakuri:"関枢樞關",karamusi:"苧",karanasi:"奈",karansi:"苧",karasi:"芥",karasu:"烏鴉",karatati:"枳",karazao:"枷",kare:"伊彼渠儂",karei:"餉鰔鰈",kari:"権仮滑刈狩苅雁猟假甸畋權獵藉鴈鳫",karigane:"雁厂鴈鳫",karimogari:"殯",karizumai:"寓",karo:"軽唐藐輕",karu:"軽剤苅佻劑嫖輕",kasa:"重襲笠傘畳蓋嵩套暈疊疉疂痂疽痒瘍瘡瘻盖葢",kasane:"褶",kasasagi:"鵲",kase:"械稼枷綛",kasi:"傾貸柏樫橿槝爨",kasiko:"賢畏俐",kasima:"姦囂",kasira:"頭魁頁孟仟顱",kasiwa:"柏栢膳怕槲",kasizu:"傅",kasizuku:"俾",kasu:"春微霞糟粕掠",kasugai:"鎹",kasui:"鷆鷏",kasumi:"霞",kasuri:"絣綛纃緕",kata:"議方交容語難形型固像傾片潟堅硬肩賢剛渕鎌塙淵牢渊糢艱騙",katabu:"傾",katado:"象",katadoru:"貌皃",katagata:"旁",katai:"鞏",kataki:"敵仇",kataku:"頑",katamari:"団塊團",katame:"瞎",katami:"互匪筐筺",katamu:"傾仄昃",katana:"刀釖",katanu:"袒",katasiro:"尸",katati:"体形貌皃躰軆頌體",katatumuri:"蝸",katawa:"傍",katawara:"旁",katayo:"偏頗",katazikena:"忝",kate:"糧粮",kati:"勝徒葛",katidoki:"凱",katu:"一勝和活割担雄達健合河刈葛恰将功括滑克曽桂巧喝渇褐轄且嘗捷曾筈刮剋劼尅戛戞戡擔拮揩曷歇猾甞瞎磆禊羯聒蛞蝎蠍豁闊濶鞨頡鶻黠",katuo:"鰹",katura:"葛桂蘰鬘",katuri:"和将",katute:"曽",kau:"耗",kawa:"代川交側革河皮煕乾渇逓楊巛晞渝熈獺躱遞銷熙",kawagoromo:"裘",kawagutu:"鞨",kawara:"瓦甎甓磧磚",kawarage:"駱",kawasemi:"翠翆",kawauso:"獺",kawaya:"厠廁溷",kawazu:"蛙",kaya:"茨栢茅萱榧茆",kayo:"通",kayowa:"孅",kayu:"粥痒癢鬻餬",kaza:"風飾翳餝",kazari:"文錺餝",kazasi:"釵",kaze:"風",kazi:"梶柁舵囓楫榜橈櫂齧",kazika:"鰍鮖",kazo:"数數",kazu:"一上員万千主数和計量憲昭宗寿嘉葛壱胤壽數萬",kazumi:"昭",kazunoko:"鯑",kazura:"葛鬘",kazutori:"籌籤籖",ke:"子明化気家外計価消宅花異希恵敬懸仮華慶毛怪圭葵瓜嘩迦塊恢芥稀卦袈祁罫蹴笥亟假價卉咼廨恠愾懈挂旡气氣痂罅膾薊褂襾譁銷閨餉鱠",keba:"毳",keda:"蓋盖葢",kedamono:"獣獸",kega:"汚涜溷穢褻黷",kegawa:"皮",kei:"京経計係警景境形型競系継刑軽契恵掲掛傾敬携慶兄啓鏡径佳圭桂馨卿珪慧憩渓畦稽繋罫茎荊蛍詣頚鶏頃鮭亰偈竸兮冂冏剄勁勍匸哇夐奎奚彑彗徑惠憇憬挂挈攜枅檠溪炯烱煢瓊痙盻眤矜硅磬禊笄絅經綮繼脛莖薊螢袿褂謦谿蹊蹶輕迥逕醯閠閨竟頸髻鴃鷄黥",keigamae:"冂",keigasira:"彑",keki:"隙屐檄覡郤闃鬩鴃鵙",kemi:"閲",kemono:"獣獸",kemu:"煙烟",kemudasi:"窓窗",kemuri:"煙烟",ken:"見間県権建件検研験監鉄券憲健献険欠遣巻懸勧兼圏堅剣嫌犬肩賢軒玄鎌乾謙顕菅絢鰹萱姦澗串倹倦喧拳捲牽硯絹鍵鹸狽繭丱俔儉劍劔劒剱劵勸卷圈夐妍娟嶮悁惓愆愃慊慳拑掀揀搴暄柬椦權檢歉涓煖狷獻甄痃眷瞼筧箝綣縣繝缺羂腱臉艱蒹虔蛯蜆蜷衒諠謇譴讙豢蹇釼鉗鉉險顯顴騫驗鵑黔",kena:"穴",kenu:"鑷",kenuki:"鑷",kera:"螻",keri:"鳧鳬",kesa:"畩",kesi:"岸",kesika:"嗾",keta:"桁",keti:"結决劼夬纈頡",ketu:"決結欠血穴潔桔傑訣頁蕨亅偈决刔厥囓夬孑抉拮挈杰桀楔歇獗碣竭纈缺羯袂襭覈訐譎蹶闕靹頡鴃齧",kewa:"険峨巌峻陀峩峭嵒嶇嶢嶮巖隗險",keyaki:"欅",kezu:"削創剤刋刪刮劑戮梳",ki:"生子決気公期来機記利次企切木聞基空置消規崎起着器帰材極効吉城寄危紀芸喜聴棄樹岐希貴季酒甲埼揮犠己茂雲旗既慶煕黄畿輝亀虫舗奇磯伎机棋毅祈軌鬼宜峡桐刃刀伯肌妃姫葵窺嬉幾忌汽稀徽飢騎妓祇桔杵玖祁乞碕斬訊其揃槻如伐鰭鮪箕亟來倚僖冀决几刄刋剞剪匯匱卉咥唏喟噐圻毀竒奎屎屓嵜幃弃悸愾愧憙截掎揆效斫旡晞暉曁曦朞杞枳棊槎櫃欷欹歸麾气氣沂淇熈熄熹燬犧畸癸皈瞶祺禧稘簣籏綺羈羇羲耆耒聽薊虧蟲覊覬詭諱譏豈跂跪逵鐫鑽鑚雉餽饋饑馗騏驥鮨麒龜熙",kiba:"牙",kibahen:"牙",kibi:"厳黍嚴峭禝稷踵",kibisi:"凛凜",kigamae:"气",kihada:"檗蘗",kii:"基給砥",kike:"乞",kikime:"効效",kiko:"樵",kikori:"樵蕘",kiku:"聴菊掬鞠麹椈聆鞫",kikuimusi:"蠹蠧",kimi:"公君仁卿辟",kimo:"肝胆膽",kimu:"金",kin:"金今京公近均禁勤緊筋琴訓堅亀錦菌僅巾斤欣欽禽芹衿襟謹檎亰听噤忻憖懃掀擒槿瑾皸皹矜窘箘箟腱菫衾覲釁鈞釿饉麕黔龜",kine:"杵",kiniiri:"嬖",kinoe:"甲",kinoko:"茸蕈",kinoto:"乙",kinu:"衣絹繭帛",kinugasa:"翳",kinuta:"砧碪",kinyou:"几",kira:"明現北嫌燦煌",kirame:"燦煌",kire:"巾",kiri:"切桐霧錐",kirigirisu:"蛬",kirimi:"臠",kiroguramu:"瓩",kiromeetoru:"粁",kirorittoru:"竏",kiru:"吉",kisa:"象",kisaki:"后妃",kisasage:"楸",kisi:"岸崖垠墺軋輾轢",kiso:"競竸埆",kissaki:"鋩",kisu:"鱚",kita:"来北阿鍛來徠",kitana:"汚",kiti:"吉詰佶",kitu:"切吉詰喫吃桔橘乞迄佶屹愾拮訖譎頡髻",kitune:"狐",kiwa:"際究谷極窮倪",kiwada:"檗蘗",kiyo:"清精貴誠聖浄恭圭潔淳澄馨匡瀞廉冽洌淨瀏皎",kiyon:"慶",kiyosi:"忠圭潔淳靖渙",kiza:"兆刻萌剞萠雕",kizahasi:"階",kizasi:"萌",kizi:"樸雉",kizu:"築傷創瑕疵痍瘢",kizuna:"紲絆緤縻",kko:"児",ko:"国東高金子小川来込木古神放戸個去好児呼請史処河庫故超越幸香固康居混樹彦巨拠雇顧己娘湖焦濃黄孤懲肥虚誇粉恋弓桑枯嘘箇堪鋸凝乎姑弧狐糊袴股胡菰虎跨鈷鼓瑚醐乞漉此冴蚕仔樵裾漕壷篭丐个估倨兒冱凅處刳呱哥國壺夸媚峺怙憮戀捏據杞柧桍棹楜沍沽涸滬滸濾炬琥瓠痼瞽箍籠粐罟胯葫虍乕蛄蝴蠱蠶觚詁谺賈踞踰辜逾扈錮餬鴣皷",koba:"拒",kobako:"筺",kobati:"碗",kobe:"首",kobi:"媚",kobo:"零溢毀",kobu:"瘤",kobura:"腓",kobusi:"拳",kodama:"谺魎",kodomo:"竪豎",koe:"声越肥聲腴",kogarasi:"凩",koge:"芝",kogo:"凍凝跼",koha:"神",kohada:"樸",kohaze:"鞐",kohituzi:"羔",koi:"肥恋鯉醇戀",koinega:"冀",koisi:"礫",koke:"苔鱗蘚",kokera:"柿苔鱗",koko:"此爰茲",kokoni:"云斯于曰焉粤聿",kokono:"九",kokoro:"心試嘗",kokoroyo:"快",kokoroza:"志",kokorozasi:"志",koku:"国告石可谷黒刻克穀酷或殻掬鵠剋哭囗圀國尅斛梏槲殼膕轂釛",kokubi:"衽袵",koma:"細困駒狛齣",komaka:"緻",komakai:"苛",komane:"拱",komanu:"拱",kome:"米罩",komegura:"稟禀",komi:"込",komiti:"径徑逕",komo:"薦菰篭籠",komogomo:"交",komono:"厮廝",komura:"腓",kon:"金今近建根献婚混困懇魂柑欣欽衿坤墾恨昏昆梱痕紺艮壼崑很悃棍棔淦渾溷滾焜狠獻琿緡菎蒟袞褌諢跟轗鯀鯤鰥鶤齦",kona:"粉",konamoti:"麭",konida:"輜",kono:"九金近楽好之斯這嗜憙樂",konosiro:"鮗",konzu:"漿",koo:"向光香弘群浩耕凍氷冴冱冰凅沍涸",koori:"織群凍氷冫冰",koorogi:"蛩",kora:"怺繆",kore:"伊維之是惟斯寔焉雖",kori:"織梱",koro:"転殺夷頃劉戮誅轉轆",korogi:"蛬",koromo:"衣頃衲",kosame:"濛",kosi:"後吉越腰輿",kosikake:"榻",kosiki:"甑轂",kosira:"拵",koso:"社刮",kosu:"擦狡",kota:"対応答堪對應荅",kote:"鏝鐺",koti:"乞鮴鯒",koto:"事言異功琴殊亊箏筝縡",kotobu:"寿壽",kotobuki:"寿壽",kotogoto:"尽悉盡",kotogotoku:"畢侭儘",kotoho:"寿壽",kotowa:"断斷",kotowari:"理",kotowaza:"諺",kotu:"骨滑窟糊乞忽惚兀圀榾汨笏鶻",kou:"日上行合後高小公区続工校岡向交考広口格神確港構好光河候効江航講興降拡攻皇厚幸抗香康更功弘控孝甲購項豪綱荒鋼較宏浩硬貢鉱黄稿絞穂幌狭恒拘晃紅耕郊剛尻渕峡仰后巧溝衡袷杏蓋鈎撹恰噛亨享怯狗桁佼侯倖勾喉坑垢孔巷庚慌昂杭梗洪糠紘肯肱腔膏酵砿閤鴻劫壕濠轟鵠梱肴皐鮫斯縞糟叩匂虹塙蛤淵釦岬耗亙亘藁亢伉佝倥傚冓冦凰刧匣區吽吭吼咎呷咬哄哽哮啌嚆嚮堽壙夾姜媾嫦寇岫峇峽崗廣很徨恆恍惶慷扣扛拱搆攪撓擴攷效敲杲昊昴晄晧曠昿杠枸栲棡椌槁槓槹歃毫汞洽洸浤渊淆湟溘滉滬烋煌熕爻犒狎狡狹猴甦畊皀皋皎皓盍盖盒睾矼礦磽稾窖箜篁篌篝簧粳絋絳絖絎續纐缸羔羹羮耿肛肓胛胯胱膠芒苟葢蒿薑薨號蚣蛟蝗覯訌詬誥軣逅遑遘鉤鍠鎬鏗鑛閘閧闔陜隍靠頏餃餝鬨鰉鱇鵁鴿鵺黌",kouba:"芬",kougai:"莱笄",koumori:"蝙",koumu:"被蒙",kounotori:"鸛",kouri:"郡梱",kousi:"犢",kouzi:"麹糀",kouzo:"楮",kowa:"強声壊恐怖毀壞聲",kowasi:"毅",koyomi:"暦",kozi:"抉拗",kozika:"麑",koziri:"鐺",kozisi:"脯",kozo:"挙擧舉",kozue:"梶梢槙杪槇",ku:"日九六子公家区来組工口空宮食球究供久庫苦繰功暮句駆訓貢仁悔奇駒紅呉鳩鈎幾朽汲灸倶狗玖矩躯駈喰袴勾垢咋酌腫韮釦于佝來傴刳劬區吁吼啖啗嘔竒崋嶇廾徠怐惧懼戮抒摎斟枸柧栩毆煦瞿窶箜絎耒苟蒟衢詬鉤韭颶餔驅齲",kuba:"配",kubi:"首頚縊跟踵頸",kubiha:"刎",kubikase:"箝鉗",kubiki:"剄軛馘",kubo:"凹窪",kuda:"下管降砕拉摧瀉碎",kudan:"件",kudo:"諄",kudokudo:"諄",kuga:"陸",kugi:"釘",kugiri:"閾",kugu:"潜潛濳",kugui:"鵠",kuguma:"跼",kugurido:"閤",kui:"杭咋懺懴杙",kuki:"茎岫莖",kuku:"括馥",kuma:"神熊奥阿隈奧嵎暈澳",kume:"粂",kumi:"組与汲伍與",kumo:"雲蜘曇翳",kumori:"翳",kun:"江君訓勲薫馴勳桾熏燻皸皹葷裙醺麕",kuna:"国",kuni:"国都正州有城邦郷訓薫晋邑圀國",kunigamae:"囗",kunigi:"椚",kunitukami:"祇",kuno:"訓",kunu:"功",kunugi:"橡栩椢椚櫟檪櫪",kura:"車比庫蔵倉夢暗較闇鞍晦昏咋餐沌昧冥蒙儚竸梦峅廩杳暝曖曚溟眩眛瞑矇祚藏黯",kurai:"位蔑",kuran:"蔵",kurasi:"蔵",kurawa:"啖",kure:"紅呉昏莫榑",kurenai:"紅",kuri:"作来繰栗",kuriya:"厨庖廚",kuro:"黒患玄緇黎黔",kurodake:"篶",kurogane:"鉄銕鐵鐡",kurogome:"糲",kurokibi:"秬",kuroma:"車",kurou:"蔵",kuru:"来苦包栗狂胡偬猖",kurubusi:"踝",kuruma:"車俥輅",kurume:"眩",kurumi:"生楜",kuruo:"狂",kurusi:"窘",kuruwa:"郭廓郛",kusa:"日種草腐臭卉艸苡莽",kusabi:"轄楔",kusabuki:"茨",kusagi:"耘耨",kusakanmuri:"艸",kusame:"嚔嚏",kusami:"嚔嚏",kusamura:"叢",kusari:"鎖瑣鏈鐺",kuse:"癖",kusi:"筆奇釧串櫛箆竒",kusige:"匳奩",kusikezu:"櫛梳",kusiro:"釧",kuso:"糞屎",kusu:"樟楠熏燻",kusugu:"擽",kusunoki:"梢楠",kusuri:"薬藥",kususi:"医醫",kusyami:"嚔嚏",kute:"湫",kuti:"口啄",kutibasi:"喙嘴觜",kutibiru:"唇脣",kutigayugamu:"咼",kutihige:"髭",kutinasi:"梔",kutisaki:"吻",kutisoso:"漱",kutisusu:"嗽漱",kutiwaki:"吻",kutu:"堀掘屈靴朽窟沓倔厥崛鞋鞜",kutugae:"覆",kuturo:"寛",kutusita:"韈",kutuwa:"轡啣銜勒",kuu:"空宮供咼啌",kuwa:"加詳桑鍬錆鋤啣耨",kuwada:"企",kuwai:"徊",kuwanomi:"椹",kuya:"悔",kuyu:"熏燻",kuzi:"挫抉籤籖鬮",kuzira:"鯨",kuzu:"崩葛屑堕楠墮頽",kya:"脚伽",kyaku:"格客却脚隙卻硅謔郤钁",kyan:"侠",kyo:"挙去許居巨拠拒距虚据嘘渠鋸裾倨墟據擧舉欅歔炬秬筥苣踞遽醵鉅",kyoku:"局極曲旭亟勗棘洫膕蕀跼閾馘髷",kyou:"京経教強協続校共境況供響橋競興香恐敬孝胸郷驚脅兄叫狭鏡脇凶峡恭狂亮袷杏旺馨橿恰叶窮亨享侠僑兇匡卿喬彊怯挟矯蕎饗暁茎佼梗劫頃匝頬亰僥僵兢竸冂冏况刧匈嚮囂夾姜嬌峽廾徼恟恊慊戮抂拱挾撓曉框梟橇歙洶炯烱烋狡狹畊疆皀皎矜磽穹窖竅筐筺筴篋經繦續羌膠莢莖薑蛩蛬蛟襁誑趙跫躬轎鋏鍄陜鞏竟餃驕驍",kyu:"究久喜",kyuu:"九求宮球急究久休給旧及級救吸亀丘泣弓鳩臼厩鞠仇朽汲灸窮笈糾僑玖韮咎嗅岌廐廏恷摎柩樛歙毬烋疚皀穹糺繆翕舅舊苙蚯裘貅赳躬逑邱韭鬮龜",kyuura:"厳"
       ,ma:"十部間万目正先交増士松真番待負丸満益未舞馬曲混巻誠牧摩麻豆磨珠魔澗捲勾撒播麿麗俟卷嘛麼枉淆痲眞糅茉萬蟇蟆",maa:"真麻",maba:"疎踈",mabara:"稀疏",mabe:"米",maborosi:"幻",mabu:"眩",mabusi:"蔟",mabuta:"瞼",madara:"駁斑駮",madarausi:"犖",madare:"广",made:"迄",mado:"円真惑窓圓眩窗",madoka:"円欒",mae:"前",maga:"擬紆",magaki:"樊篳籬",magari:"勾",magarigawa:"巛",magata:"曲",mage:"髷",magemono:"椦",magi:"紛",mago:"孫",magokoro:"悃",maguro:"鮪",magusa:"秣芻蒭",magusakau:"秣",mai:"前米参舞毎枚埋牧妹鞠詣蒔舛剃煤昧參瑁眛苺莓邁黴",maiasi:"舛",maina:"賂",mairu:"哩",maka:"任蒔罷",makana:"賄",makase:"委",maki:"巻牧蒔薪填槙卷槇",makigamae:"冂",mako:"真誠眞",makomo:"菰蒋",makoto:"一実理信真良周慎誠賢丹淳胆亮允紳諦惇諒實忱恂愨洵眞詢",makotoni:"実涼諒凉寔",maku:"幕膜捲蒔莫摸寞幔繃",makura:"枕",mama:"海継畑侭儘圸墹壗盡繼",mame:"豆荳菽",mami:"塗猯覲逅遘",mamo:"護守戍掫衞",mamori:"戍衞",mamoru:"衛葵衞",mamusi:"蝮",man:"政万満茨幡慢漫鰻蔓卍曼幔悗懣滿瞞縵萬謾蹣鏝饅鬘",mana:"学真愛學斈",manabiya:"庠",manaita:"俎爼",manako:"眼",manaziri:"眥眦睚",mane:"招",manimani:"随隨",manuga:"免",manuka:"免",manzi:"卍",mara:"厩",mare:"希稀罕",mari:"鞠毬",maro:"円理転麿圓轉",maru:"円団丸圓團圜摶",marui:"肱欒",masa:"大政方全当理公成勝多和正容応真幹優存将順甲充雅誠仁賢昌聖剛庄祥征晶稚祐允款匡傑暢柾愈諒倭夛將橸當眞",masaka:"作",masakari:"戉鉞",masaki:"柾",masame:"柾",masani:"応祇應祗",masaru:"大超甲豪克賢冠將",masasi:"理正雅仁昌奨匡",mase:"柵",masi:"増況益猿况",masimasu:"坐",masu:"増益倍升舛斗鱒桝枡桀裨",masura:"丈",mata:"復街岐也俣股跨叉亦又椏殳胯",mataga:"跨",matata:"瞬",mate:"蟶鮴",mati:"海町待街襠陌韈",mato:"本的鵠纏繆繚纒",matou:"綢繞",matta:"全",matu:"松待末祭茨須奉真纏祷抹沫奠枩枌眞祀秣竢纒茉靺",matuge:"睫",maturi:"祭祀",maturigoto:"政",maturu:"祠",mawa:"回周廻囘繞",mawari:"仗",maya:"厩",mayo:"迷",mayu:"真眉繭",mayumi:"檀",mayuzumi:"黛",mazi:"交雑駁爻襍雜",mazina:"呪咒",mazinai:"咒",maziwaru:"参參爻",mazu:"貧",me:"五明目米海売女馬妻免眼銘芽雌召牝匁瑪碼聘辟",meawa:"娶",mebae:"萌萠",mebaru:"鮴",medogi:"筴筮蓍",meetoru:"米",megu:"愛恵巡芽斡廻匝寵匯圜徼恤惠紆繞繚輾遶邏",megumi:"愛恩潤慈",megumu:"萠",meguru:"流",mei:"明名命盟迷鳴銘謎冥姪暝溟瞑茗螟酩",mekake:"妾",mekki:"鍍",meku:"捲",mekura:"盲瞎",mema:"眩",memai:"暈",meme:"爻",men:"校面免毛綿雌牝棉緬麺俛冕宀泯湎眄瞑粫緜麪黽",meoto:"娚",mesi:"飯瞽矇",mesu:"雌牝",meto:"娶",metu:"滅",meziri:"眥眦",mezura:"珍奇竒珎瑰",mi:"三五生見民明実務海水利省男参宮神果規農身美視造味観望光深満江未薬皇績臨恵君純看顧御充診己湖臣微聖魅覧銘弥毅珠澄妃稔溢盈塞爾蛇桃眉巳箕實寳已麼弭彌滿瀰睥睹瞰瞿瞻矚縻胥茉覩覽觀躬靡黴",mida:"乱淫撹擾妄濫亂婬攪撓溷猥紜紊",midara:"姦",midare:"婬",midari:"淫猥",midarini:"叨",midaru:"妛",midori:"緑翠碧翆",midorigo:"嬰",miga:"磨瑳琢砥砺礪磋",migarini:"漫",migi:"右",migiri:"砌",migiwa:"汀",migomo:"妊姙",miha:"瞠",mihari:"哨",mika:"甕",mikado:"帝",mikaduki:"朏",miki:"幹寸",miko:"巫覡",mikoto:"尊",mikotonori:"詔勅敕",mima:"薨",mimami:"南",mimeyo:"娥",mimi:"耳",mimidama:"珥",mimiki:"馘",miminagusa:"苓",mimisii:"聾",mimizato:"聡聰",mimizu:"蚓蚯",min:"三民明水眠岷愍憫旻泯瞑緡罠閔黽",mina:"水南波源皆汎凡僉咸胥",minagi:"漲",minagoro:"鏖",minami:"南波",minamoto:"源",minato:"港湊",mine:"峰峯嶺岑岫崟嶂巒",miniku:"醜妛",minna:"皆",mino:"実稔箕蓑實簑簔",minori:"稔",minoru:"稔穣聡酉穰",mio:"澪",miri:"粍",miriguramu:"瓱",mirimeetoru:"粍",miririttoru:"竓",misa:"水操",misago:"鶚",misaki:"崎埼碕岬岫嵜",misao:"操",misasagi:"陵",mise:"店鋪廛肆",misogi:"禊",misoka:"晦",misona:"臠",misu:"簾",mit:"三",mitamaya:"寝廟寢",miti:"行方通実理治道導真路達満陸途康充慶至往倫径芳亨享實廸徃徑甼衢蹊迪逕闡陌隧",mitibi:"導",mito:"認",mitu:"三円道水参光満密弘充慎貢晃弥瑞苗允盈舜蜜參實樒櫁",mitugu:"諠",miturou:"蝋",mituru:"満暢",miu:"苗",miuti:"戚",miya:"都宮雅",miyabiyaka:"嫺嫻",miyako:"京都畿亰",miyakogae:"遷",miyuki:"幸",mizi:"惨慘",mizika:"短",mizo:"溝渠涜洫",mizore:"霙",mizu:"水端瑞",mizugane:"汞",mizuka:"自",mizukaki:"蹼",mizumori:"準凖",mizunoe:"壬",mizunoto:"癸",mizura:"髻鬟",mizutade:"薔",mizutamari:"瀦潴",mizuti:"鮫蛟",mizuumi:"湖",mo:"三方百最持文面木真門若守望母模盛馬輪燃茂喪毛添漏妹姥洩裳畝藻莫溌萌摸姆媽麼捩揉泄畆糢萠謨",moda:"黙悶懣默",modae:"悶",modo:"戻擬",moe:"萌",moenokori:"燼",mogasa:"疱",mogu:"潜潛濳",mogusa:"艾",mokko:"畚簣",moku:"目工木牧黙睦穆杢沐默苜",momi:"紅粟籾樅",momizi:"椛栴",momo:"百李股腿桃髀",momu:"蟐",mon:"問主文聞郎門紋悶們懣捫瞞馼",mondo:"百",monme:"匁",mono:"者物桃",monoimi:"斎齋",monoui:"嬾慵懶",monu:"蛻",moppa:"専專",moppara:"醇",mora:"貰",mori:"月保護守衛森盛晦杜傅籠銛",moro:"両師諸艶脆",moromi:"醪",moromoro:"烝",mosi:"儻",mosuso:"裳裙",mot:"以",mota:"凭擡抬齎靠",motai:"瓮甕罅罌",mote:"茂",moteaso:"玩翫弄",motena:"饗",moti:"用以持望須餌勿餅韈餠黐",motiaso:"玩",motiawa:"朮",motigome:"糯",motii:"餅餠",motinoki:"橿",moto:"大本東下意産元資求職始木基幹質森旧紀素許源順宗智須礎亙亘剌夲孕很忤悖愎狠舊覓貭邀",motodori:"髻",motoi:"基",motomu:"須",motoo:"回廻囘",motoru:"乖",motou:"繞",motte:"将將",motto:"最尤",mottomo:"尢",motu:"持物没沒縺",mou:"生設申望亡網毛忙帽猛盲卯詣摸妄孟耗蒙儲儚惘旄曚朦檬濛瑁矇网罔耄艨芒莽蠎蟒髦魍",mouke:"儲",mousen:"氈",moya:"舫霏靄",moyaibune:"舫",moyoo:"催",moyou:"催",mozi:"綟",mozu:"鴃鵙",mu:"生六務産向無武陸浮群夢茂慶虫謀蒸牟矛霧畝剥撫蕪鉾睦鵡厶噎嘸梦无旡毋烝畆眸羣鵐鶩",mugi:"麦麥",mugiko:"麺麪",mugo:"惨慘",mugura:"葎",mui:"六",muka:"対向迎逢這嚮對邀",mukabaki:"逼縢",mukae:"迎",mukai:"向",mukasi:"昔",mukatu:"嘔",muko:"向甥婿壻聟",mukou:"向",muku:"報酬讐椋讎",mukuge:"椴槿毳葮蕣",mukuinu:"尨",mukuro:"骸躯",muna:"空宗胸棟皆虚曠昿",munagai:"鞅",mune:"統順宗胸旨棟臆睦膺",munyou:"无",mura:"党西村群邸叢邑簇羣邨黨",murasaki:"紫",murazi:"連",mure:"羣",muro:"室榁窩",musabo:"昧婪貪餮饕",muse:"咽哽噎饐",musi:"虫寧毟蟲",musiatu:"溽",musiba:"蝕齲",musiro:"席筵莚蓆",musu:"結掬",musume:"娘嬢孃",mut:"六",muta:"村",muti:"鞭笞",mutiu:"捶",mutiutu:"鞭撻",mutu:"六陸睦",mutuka:"難",mutuki:"繦褓襁",mutuyubi:"跂",muzina:"狢貉",muzinahen:"豸",muduka:"難",myaku:"脈獏脉覓貊貘",myou:"明名命妙苗茅廟錨冥孟暝甍眇瞑緲茗螟",myuu:"謬"
       ,n:"金武",na:"長生八方七今名成和女向済投無流農南難字並奈亡為樹納稲阿慣鳴穴菜那泣葦萎嘗凪薙馴楠撫做儺哭啾啼嚶娜拏拿拊捫梛涕濟爲狃狎甞痿竝糯綯舐褻齏韲",naba:"生",nabe:"辺鍋銚邊邉鎬鐺",nabebuta:"亠",nabi:"並靡",nabu:"嬲嫐",nada:"洋灘宥",nade:"撫",nadesi:"撫",nado:"等抔",nae:"苗秧",naga:"長流良修永栄寿亨暢眺酉乍呂曼脩",nagaame:"霖",nagae:"轅",nagare:"流",nagasa:"袤",nagasime:"睥",nage:"嘆歎唏哭喟嗟慟",nageku:"欷",nageu:"抛擲",nagi:"柳渚凪薙梛椥",nagisa:"渚汀沚瀲",nago:"和",nagu:"殴擲毆",nagusa:"慰",nai:"内奈袋没泥禰祢乃廼莫无毋沒罔迺靡",naigasiro:"蔑",naisi:"尚",naka:"中半史央仲莫勿毋",nakama:"党黨",nakare:"毋",nakatu:"仲",nakihaha:"妣",nakoudo:"妁",nama:"生天怠鈍艶妖膾艷訛譌",namagusa:"羶腥",namaku:"鈍",namameka:"嬌",namari:"鉛",namasu:"鱠",namazi:"憖",namazu:"鮎癜鯰",name:"行滑靼鞣",nameri:"滑",namesigawa:"靼鞣韋",nami:"行南波浪涛蔑甫凡濤瀚瀾",namida:"涙泗泪涕",nan:"男南何難納軟灘楠喃娚煖",nana:"七斜",naname:"陀",nani:"何難那浪渠曷",nanigasi:"某",nannanto:"垂埀",nano:"七",nanzi:"爾而汝乃廼尓迺",nanzo:"那烏渠胡奚怎曷瑕盍遐",nao:"治作成直有真順温巨忠尚猶仍犹矗胖",nara:"対効並均習楢倣伉傚嫺嫻對并效狃竝肄駢",narabu:"双儷雙",nare:"汝",naresika:"麋",nari:"業百体成済形城就芸為斉鳴也礼尚稔爲",naru:"成徳鳴稔",nasa:"情",nasi:"梨莫勿无旡",nata:"方屶鉈",natu:"夏懐捺懷納",natume:"棗",nawa:"輪縄苗綯緡繩",nawate:"畷",naya:"悩惱懊艱蹇",nayami:"悩惱艱",nayo:"嫋",nazo:"謎",nazora:"準凖",nazu:"懐",nazuna:"薺",ne:"十人年合子値音根婦練称寝眠峰稔如禰祢捻峯嶺煉錬寐寢捏捩柢殕袮",neba:"粘黏",nebu:"舐",neesan:"姐",nega:"願覦",negai:"願",negi:"葱",negira:"労勞犒",negura:"塒",nei:"苗寧嚀佞侫檸濘獰聹蚋",neko:"猫",nemu:"眠",nemunoki:"棔",nen:"年然念燃縁粘稔鮎楠捻撚冉拈棯蠕輾鯰黏",nengo:"懇諄",nengoro:"懃",nera:"狙",neri:"練",neta:"嫉妬悋猜",neti:"捏蚋",netu:"熱捏涅子",neya:"閨",nezi:"捻拗捩",nezu:"鼠鼡",nezukuri:"艮",nezumi:"鼠鼡",ni:"日二合新入理児逃荷似仁丹煮尼泥餌爾而煎弐迩烹弍于兒尓岻膩貳貮迯邇",nibe:"膠",nibu:"鈍駑",nie:"贄錵",niga:"苦",nigana:"荼",nigi:"和握賑",nigo:"汰濁渾溷",nigori:"濁",nigorizake:"醪",niguruma:"輜",niho:"薫",nii:"二新",nikawa:"膠",nikibi:"皰靤",niku:"難悪肉宍嫉憎惡蓐",nin:"人任認仁刃妊忍稔荏壬靭儿刄姙恁荵衽袵靫靱",nina:"担螺擔蜷蠡",ninniku:"蒜",ninnyou:"儿",nio:"臭匂鳰",nira:"韮盻眈睨薤韭",niragu:"淬",nire:"楡",nise:"偽贋僞",nisi:"西錦螺襾",nisiki:"錦",nisin:"鯡鰊",nisui:"冫",nita:"似",niti:"日",nitu:"日新",niu:"生",niwa:"庭圃",niwaka:"卒俄頓卆怱猝遽霍驟",niwakaame:"瀑",niwakani:"勃",niwatazumi:"潦",niwatori:"鶏鷄",niwazakura:"棣",nizi:"虹滲躙躪霓",nizyuu:"廿廾",nizyuuasi:"廾",no:"入野能農乗退述延及伸載之納飲泉布典濃篠咽洩餐呑乃廼埜箆丿乘舒喃嚥抒飮洵熨篦迺饒",nobe:"延",nobi:"信暢燹",nobiru:"蒜",nobo:"上登昇躋陞陟隲",nobori:"上登幟",noboru:"宣昂升敲陟",nobosi:"登",nobu:"業円経進信収常展史修延喜伸順宣房充誠至寿陳寛恒宜辰敦靖惟允薫晋暢寅庸亙亘脩頌",nobun:"攵",noburu:"辰暢",nodo:"咽喉吭臙頏",noga:"逃遁佚竄迯逋遯",nogan:"鴇",noge:"芒",nogi:"穎頴禾芒",nogihen:"禾",nogome:"釆",nokanmuri:"丿",noki:"軒宸檐",noko:"残鋸殘",nokogiri:"鋸",noku:"奥",nome:"雲",nomi:"爾蚤尓已鐫鑿",non:"音暖嫩",nonosi:"罵詈詬",noo:"直",nora:"苗",nori:"議学度理法経成教知記利統格式研能規義乗真準親展師憲周登織賀紀芸永順則徳儀載昇宣令功敬宗智裕孝慎仙典律雅哲範訓至祝仁礼賢寿穂倫寛祈宜敦尭矩糊孔詔暢勅禎乃凖笵經藝",noro:"呪咒詛麕",norosi:"烽燧",noru:"駕",nosi:"師熨",notama:"宣曰",notamu:"宣",noti:"後内",notto:"則節浬",nottoru:"糢",nou:"直能応農脳王納悩濃嚢膿儂惱曩瑙碯腦衲",nouzuru:"脳腦",nozo:"望除臨希覗莅覘",nozoku:"窺",nozomi:"希",nu:"野抜脱貫怒塗縫忽挺擢奴濡孥拔搴渟繹耨褪",nue:"鵺",nugu:"拭揩",nui:"縫",nuitori:"繍黹",nuka:"額糠糟倥濘粳",nukazuku:"頓",nukegara:"蛻",nuki:"抜貫緯擢樌",nuku:"温炎貫",numa:"沼",nume:"絖",nunawa:"茆蓴",nuno:"布",nunoko:"褞",nura:"濡",nure:"濡",nusa:"幣幤",nusi:"主",nusu:"盗窃偸攘盜竊",nuta:"垈汢",nuu:"饒黹",nya:"若",nyaku:"若搦蒻",nyo:"女如茹",nyou:"女尿溺仍嚀橈繞聶遶鐃鑷饒",nyu:"茸濡蠕",nyuu:"生入敷乳柔廿鞣"
       ,o:"大長生百下小保和府億面男置終応士夫起落武郎渡追負音推史処雄悪青央織越降尾圧押帯遠居卒老汚房隆弘折措奥緒御隠雅包阿穂麻勇朗怖芳仰惜烏於翁牡乎堕苧捺乃邑佩處卆唹嗚堊塢壓帶悋惡擱擠淤穗穉訖趁飫",oba:"姑姨",obasima:"檻",obi:"帯怯帶",obidama:"佩珮",obie:"怯",obitada:"夥",obito:"首",obiya:"脅劫刧剽",obo:"思覚没溺沒湎覺",oboro:"朦朧",oda:"穏煽穩",oderu:"稚",odo:"躍威脅踊嚇縅踴",odori:"躍",odoro:"驚愕駭",odoroku:"咢",oga:"拝拜",ogi:"荻蒹",ogina:"補裨",ogo:"汰侈倨傲僭僣奢敖驕",ogoso:"厳荘嚴莊",ogosoka:"儼",ohituzi:"羝",oi:"生種追及老於甥笈姪耆",oibo:"耄",oite:"之于",oka:"田岡陸犯略阜侵阿岳丘冒傍峻坏壟奸崗畧冐邱隴",oke:"置桶",okera:"朮",oki:"置修興沖順居煕冲澳燠",okina:"翁叟",okite:"掟",okitu:"沖冲",oko:"行発起興怒煽勃熾發",okona:"行",okori:"瘧",okota:"怠嬾懈",okotaru:"懶",okotu:"興",oku:"後億屋送帰遅奥贈憶臆沃噫奧檍歸澳皈穉貽遲餽饋",okubi:"噫",okubuka:"邃",okugaki:"跋",okumi:"衽袵",okurina:"謚諡",okusuru:"臆",okute:"稚",omi:"臣",omo:"主思重面沢想懐惟謂侖懷",omoera:"思",omoga:"羈羇覊",omokage:"俤",omomu:"趣徐赴趨",omomuki:"況趣况",omone:"阿佞侫",omonpaka:"慮",omonpaku:"慮",omori:"権錘權",omote:"表面",on:"音園雄遠温飲奥御隠恩穏闇蔭厭怨苑薗鴛牡吽慍飮瘟穩薀袁褞諳隱鰮鰛",ona:"同女翁",onagazaru:"禺",onamomi:"葹",onara:"屁",oni:"遠鬼",oniyarai:"儺",onna:"女",ono:"自斤斧",onono:"戦慄戰",ononoku:"栗",onoono:"各",onore:"己",oo:"大多正近松被太衆欧王皇巨奥覆仰帽姶奄掩蓋巾碩庇蔽蒙邑丕冢凰嚶夛媼嫗屏枉殃汪泱泓瓮甌盍盖稠蓊葢閹鸚",oodate:"櫓",ooduna:"紘",ooga:"頁",oogame:"鰲鼇",oogi:"扇",oogo:"朸",oogoto:"瑟",ookami:"狼",ooki:"浩傀厖",ookimi:"王",oomune:"梗",oonira:"茘",oosi:"繽",ooti:"樗楝",ootori:"鴻鳳鵬凰",ooyake:"公",ooyumi:"弩",oozato:"邑",oozi:"逵",oozika:"麈",ore:"俺",ori:"織折澱匂檻滓",oro:"卸愚",oroga:"拝拜",oroka:"痴呆魯妛癡",orosi:"卸颪",oroti:"蠎蟒",osa:"長治収修蔵圧押略乱納抑按厭酋摂綜孟乂亂佰壓尹扼攝撥收斂熨畧穉筬脩艾藏釐",osae:"鎮鎭",osaka:"刑",osamu:"理修紀攻順磨靖乃脩",osana:"幼",osanai:"稚孺",osi:"教押排訓忍唖鴛吝嗇慳誨",osidori:"鴛",osikiuo:"魴",oso:"教遅恐襲怖忙畏兇怯兢怕恟惧悚惶惴慄慴懼懾晏瞿竦輓遲",osore:"虞",ossya:"仰",osu:"足雄押牡",osya:"長",osyaberi:"嗹",oti:"落墮殞隕",otii:"陥陷",oto:"二月音劣乙貶",otogai:"頤",otoko:"男郎",otokodate:"侠",otokoyomogi:"蔚",otori:"囮",otoro:"衰",otosi:"貶",otosiana:"穽",otosii:"陥陷",otouto:"弟",otozu:"訪",otto:"夫",otu:"越乙榲膃",ou:"大相区近応横央欧王玉皇圧押奥桜往黄殴鷹姶逢厭凹旺翁襖鴬鴎鴨匡扇邑凰區嘔嚶墺壓夭奧媼嫗尢徃怏懊應拗枉櫻歐殃毆汪泱泓澳燠狎瓮甌甕秧罌膺蓊謳鏖鞅鴦鶯鸚黌",ougi:"扇",ougo:"朸",oumu:"概",ouna:"媼嫗",outi:"樗楝欒",ouyo:"凡",ouzi:"皇",owa:"終竣畢竟",owasu:"坐",oya:"親押",oyayubi:"拇",oyazi:"爺",oyo:"及泳凡迄曁游",oyobi:"及",oyogu:"泅",ozika:"麌",oziru:"怯"
       ,pa:"童",pai:"牌",pe:"部瓶",peezi:"頁",pi:"妃",pitu:"比",po:"暮",pon:"先椪",pondo:"听磅",ppana:"放"
       ,ra:"原村楽英良等乱願荒柄羅螺裸蘭喇罹拉瘰薇蘿蠡邏鑼騾",rai:"来頼塁瀬洗礼雷狸莱來儡壘徠懶擂櫑瘰癘癩磊禮籟罍耒莉蕾藾蠡貍賚醴",raisuki:"耒",raki:"滝",rakkyou:"薤",raku:"楽落絡洛酪擽樂烙犖珞駱",ran:"乱卵覧嵐欄濫藍蘭漣亂儖婪嬾巒懍懶攬欒欖瀾燗爛籃繿纜羝襤襴覽醂鑾闌鸞",ras:"拉",rati:"埒埓",ratu:"剌喇埒埓拉溂糲辣",rau:"劉",re:"連列令礼伶玲禮黎",rehu:"猟獵",rei:"例冷戻令齢鈴礼黄励零涙霊祈蛎砺伶嶺怜玲苓隷麗儷冽勵唳囹捩櫺泪洌澪犂犁癘礪禮糲綟羚聆茘莅莉藜蛉蠣蠡醴隸靈驪鱧鴒黎齡龕",reidukuri:"隶",reki:"歴暦擽櫟檪櫪瀝癧礫轢轣靂鬲",rekki:"歴",ren:"連練恋鎌怜廉憐漣煉簾聯蓮錬匳嗹奩戀攣斂楝歛濂瀲縺聨臉臠茘賺輦鏈鰊",renzi:"櫺",retu:"列律裂劣烈冽唳埒埓捩洌",ri:"人合理成利美離裏里荷梨栗李履亥浬鯉抄狸哩莱吏璃痢裡麗俚俐悧罹漓犂犁籬茘莅莉蜊蠡詈貍釐驪黎黐",rie:"江",rii:"力利",riki:"力働仂篥",riku:"六陸勠戮淕蓼",rin:"林輪臨鈴隣倫綾厘淋燐琳鱗麟侖凛吝廩悋懍棆淪痳稟禀綸罧菻藺襴躙躪鄰醂釐霖凜",riri:"入",rissinben:"心",riti:"律篥",rittoru:"立",ritu:"立率律栗葎慄篥",riu:"竜",ro:"事路郎納露炉朗芦虜鷺櫨蕗侶呂魯櫓賂婁廬枦梠櫚滷濾瀘爐盧粐絽膂臚艢艪艫舮蘆褸輅轤鑢鑪鈩閭顱驢髏鱸鹵",roku:"六働録鹿陸緑漉麓禄肋仂戮淕碌祿轆勒",ron:"論乱亂侖崙崘淪",roo:"郎",rotu:"六",rou:"労郎良蔵老桜露竜龍朗浪漏糧滝廊摺瀧稜婁弄楼榔牢狼篭聾蝋僂勞咾哢喨壟拉撩撈朖朧柆楞槞樓櫟檪潦琅瑯瓏瘻癆窶籠簍粮縷臘臈莨薐蘢螂螻褸踉醪鏤鑞陋隴",rousoku:"蝋",ru:"十流路児留塁屡蕗劉琉瑠婁弄篭僂嚠榴璢畄瘤瘻窶籠簍縷螻褸鏤鰡",rugi:"動",rui:"類塁涙累壘泪瘰縲羸耒莅誄",rumata:"殳",ruri:"瑠",rutubo:"堝",ruuburu:"留畄",ryaku:"略掠擽畧",ryo:"良旅慮虜侶涼呂廬梠櫚濾絽膂臚鑢閭驢",ryoku:"力働緑仂朸",ryou:"料領両郎量良療僚漁養令了菱貞竜龍糧霊亮寮陵綾杏椋掠凌梁涼猟瞭稜諒遼伶嶺怜玲苓倆兩凉喨壟寥崚廖撩撈暸楞榴櫺燎獵簗粱粮繆繚羚聊聆蔆蓼裲踉輛輌鐐隴靈鬣魎鷯",ryu:"龍嶐鉚",ryuku:"働仂",ryuu:"生立流留隆柳竜龍笠粒劉溜琉硫瑠嚠戮旒榴毓游澑瀏犂犁璢畄瘤窿苙鏐霤餾鰡"
       ,sa:"十三五生山決相下小作来道指点査任止割提再楽沢佐然早差注去左冷覚避射酒里砂刺謝茶鎖桜舎浅裂摩寒狭彩咲唆詐笹粧猿些叉嵯沙瑳裟坐挫冴桟紗抄靭醒挿乍捺蓑做决冱剳厦呰嗟嗄娑寤嵳廈扠扨插搓摧擘柤梭槎沍渣灑炸狹瑣磋磔箚簑簔縒苴莎螫覺蹉釵鍼靫靱鮓鯊鷦點齟",saba:"裁鯖捌",sabi:"寂錆淋寞寥銹鏥",sabu:"三纉",sada:"定断尊貞禎奠斷",sae:"三斎朗彩冴",saegi:"遮",saeru:"冴",saezu:"哢囀",saga:"相性捜探搜",sagan:"目",sagesu:"蔑",sagi:"鷺匂",sagu:"探",sai:"三最西済際税切歳井裁再崎財細材催採殺債妻載災祭埼斎斉菜彩栽柴哉宰才砕紫叉塞采犀砦碕晒偲靭凄殆蓑倅伜儕嵜崔截搓摧擠寨樶洒淬淒滓濟灑犲猜眥眦砌碎齋篩簑簔綵縡纔腮臍萃萋蔡豺戝賽齎躋釵隹雜霽靫靱齏韲顋骰鰓齊",saina:"苛嘖",saiwa:"幸倖禎禄祚祺祿禧釐",saka:"下作阪境早積盛逆坂栄酒賢祥圻垠榮櫑",sakadaru:"罍",sakaduki:"尽盡",sakae:"栄昌",sakai:"境堺畍疆",sakaki:"榊",sakamiti:"嶝",sakan:"目属昌壮旺壯奘屬弉殷熾",sakana:"魚肴",sakanobo:"遡溯",sakanoboru:"泝",sakara:"忤",sakazuki:"杯鍾盃卮巵盞觚觴",sake:"号酒叫鮭喊嘖嚆號",sakenotukasa:"酋",saki:"前東先崎幸埼往輝咲笹碕尖岬嵜徃曩",sakibarai:"蹕",sakigake:"魁",sakini:"嚮",sakka:"目属",sako:"迫浴硲逧",saku:"作数策昨削索冊錯咋搾朔柵窄酢雀遡捉乍做册劈嘖愬拆數柞槊溯炸筴筰簀胙薊醋鑿齪",sakura:"桜櫻",sakusa:"咋",sama:"様樣",samata:"妨碍礙",samayo:"彷徊徘徨",same:"雨鮫鯊",sami:"寂淋",samu:"寒凄淒皚",samurai:"士侍",san:"三山産参算残様散賛杉操酸尽寒傘惨柵撒桟燦珊纂蚕讃餐斬撰蒜刪參簒孱嶄巉彡慘懺懴戔攅棧槧汕潺潸爨疝盞盡竄簪粲繖纉纔芟蔘蠶衫讒讚贊跚鏨鑽鑚閂霰饌驂",sana:"真實眞",sanada:"絛",sanagi:"蛹",sanbongawa:"川",sandukuri:"彡",sane:"実重真實",sansyouuo:"鯢",santi:"珊",sanu:"讃",sanzyuu:"世卅丗",sao:"操竿棹",sara:"更皿晒曝攫浚渫濬盒",saragi:"佛",sarasi:"晒",saru:"申猿猴",sasa:"支朝笹篠捧",sasara:"筅簓",sasaya:"囁聶",sasi:"指蔵幸刺緡",sasigane:"矩",sasihasa:"挟挾縉",sasimane:"麾",sasiwatasi:"径徑逕",sasizubata:"麾",saso:"誘哘",sasori:"蝎蠍",sasu:"指剽戡",sasuga:"遉",sat:"颯",sata:"定聡",sate:"偖扠扨",sati:"幸祥祐薩禎",sato:"前理知解識達央覚恵里智誠哲郷仁啓賢聖諭悟暁慧聡吏怜喩嶷怱惺曉聰覺觧閭黠",satoi:"智敏慧",satoru:"理知解識了智哲勘暁慧聡學",satosi:"省説恵智哲敏訓啓賢聖慧詔聡怜聰",satoukibi:"蔗",satu:"五察札殺撮刷冊擦作早幸粟薩拶薩撒靭册刹剳囃扎箚紮靫靱颯",satuka:"目",satuki:"皐皋",sawa:"川沢早障触騒澤猿爽噪觸譟躁醂隰騷",sawaga:"閙騷鬧",sawan:"沢",sawara:"椹鰆",saya:"明清鞘莢",sayaka:"明",saza:"小貞",sazanami:"漣",sazi:"匙匕",sazinohi:"匕",sazo:"嘸",sazokasi:"嘸",sazoya:"嘸",sazu:"授",se:"所戦数世勢施谷競清責攻背迫瀬稲兄聖妹堰灘咳畝脊竸丗數灑畆眥眦訶誅誚謫蹙",seba:"狭狹",sebone:"呂膂",segare:"倅伜悴忰",seguku:"跼",sei:"政生制性成正世西済省歳情井勢製声整請青清盛静精背星瀬剤晴誠斉牲聖浄征蒸姓誓靖甥芹犀鯖錆汐鉦凄棲栖逝醒脆脊栴瀞畷婿貰丼倩儕劑丗嘶壻彁彗悽惺掣撕擠旌晟晢橇毳洒淨淒濟猩眥眦睛砌穽筬筮聟聲腥臍萋菁薺蛻蜻贅齎躋霽靜齏韲齊",seisyu:"鹹",seki:"関石席積赤責績跡折夕潟析籍舎釈昔堰寂隻惜咳汐尺錫戚斥脊蹟碩勣喘拆晰槭淅炙瘠皙碵磧簀腋舍蓆藉蜥螫裼跖蹐蹙蹠迹釋鉐關髢鶺齣",sekku:"石",seko:"迫逧",seku:"齪",sema:"迫狭窄拶逼狹褊遒逎阨陋陜隘齪",seme:"譴鬩",semi:"蝉蜩",semusi:"佝傴瘻駝",sen:"選山千川戦先線専船鮮占宣染泉薦仙銭浅洗繊潜釧践茜串鹸桟斬蝉尖扇撰栓栴煎煽旋穿箭羨腺舛詮賎遷銑閃禅膳揃苫鱒亘亶仟倩僉僊僭僣刋剪簒吮喘塹嬋孅專尠孱巛彡悛戔戰拈摶擅擶旃暹栫棧槧槫殲殱氈沾洒涎淺湶潺潛濳澹濺燹牋甎疝痊癬盞瞻磚禪笘筌筅箋簽籤籖綫纖纎羶翦臉舩芟荐蘚蟾譖譛譫賤贍跣踐銓銛錢鐫閂闡阡陝雋霰韆顫餞饌",senti:"珊糎",sentiguramu:"甅",sentimeetoru:"糎",sentirittoru:"竰",sento:"仙",seri:"芹糴糶",seti:"節刹緤",setu:"設切説接殺折節雪瀬洩屑脆拙摂窃鱈刹卩啜截掣攝晢椄楔毳泄浙渫竊紲絏緤膤薛褻鑷鞨",seu:"尠憔",sewa:"忙",si:"十市四自後新七子治氏思強支指知初資信次使始住示死私止石士施視試仕守姿紙史師林清司占締志執之染誌酒宗閉刺祉茨己芝敷茂至歯是也矢絞旨枝糸詩滋脚姉諮飼柴凍磯孜紫肢脂詞梓飴夷柿祇欣此嵯匙晒仔伺嗣屍斯獅賜雌侍蒔宍偲笥只弛痴漬砥覗髭巳吏亊侈俟卮厠厮厶呰咨咫啻嗜嗤嘴址塒孳尸屎妛岻巵帋幟廁廝弑徙恣恃懋揣摯撕朿枳梔檮殞沚沁泗滓滲熾瓷畤疵痣癡眥眦祀祠祗稠竢笶篩粢絲緇縒翅耆耜肆舐苡茲葆葹蓍蚩觜誣謚諡豕貲贄齎趾趺輜釶錙閇阯駟駛鮨鯔鰓鰤鴟鵄鷙齒",siawa:"幸倖",siba:"芝柴縛",sibara:"暫頃",sibaraku:"姑",sibasiba:"数屡亟數",sibe:"標蕊蘂蕋",sibi:"鮪痺痲",sibo:"絞葦萎搾凋皺",sibori:"纈",sibu:"信渋澁澀",sibuki:"沫",side:"幣椣",sidu:"静",siga:"信",sigara:"柵",sigarami:"柵",sige:"成重順樹栄恵瀬誠茂滋繁鎮欝薫慈穣茸蕃咸孳廡鬱",sigeru:"重滋卯蕃楙",sigesi:"縟",sigi:"鴫鷸",siguma:"羆",siha:"芝",sii:"後椎弑罔誣",siina:"秕粃",siita:"虐",sika:"然鹿色飾爾而叱呵咄咤聢訶詆顰",sikabane:"屍尸",sikabanekanmuri:"尸",sikari:"爾兪尓",sikaruni:"而",sikato:"聢",siki:"式識城色織敷頻拭鋪軾閾餝",sikigamae:"弋",sikigawara:"甃甎",sikii:"閾",sikimi:"梱樒櫁軾",sikirini:"仍荐",siko:"色而醜",sikoro:"錏錣鐚",siku:"鋪衍",sima:"島嶋洲縞嶌嶼陦",sime:"示観湿諜濕觀",simo:"下霜",simobe:"僕隷僮隸",simogasa:"痔",simoto:"楚笞",simoyasiki:"墅",simu:"占俾",sin:"新進心信参神身真親審申深請振針森清津伸震普慎診侵寝臣沈浸辛辰宍唇娠晋榛疹秦紳芯薪訊賑矧槙枕僭僣參呻哂嗔宸寢岑忱怎愼抻斟晉晨椹沁滲瀋甄畛眞瞋箴簪縉脣臻蓁蔘蓼蕈蜃袗襯譖譛讖贐軫酳鍼鐔駸鷆鷏齔槇",sina:"信品科姿階級葦萎靭撓粃綽靫靱",sinaya:"嫋",sine:"稲",sinigamae:"歹",sinnotatu:"辰",sino:"東信笹篠忍偲凌筱",sinobigoto:"誄",sinobu:"仁荵",sinogi:"鎬",sinogu:"駕",sinu:"歿",sinyou:"支",sio:"塩潮葦萎汐撓鹵鹽",siokara:"醢",siokarai:"鹹",sioke:"鹹",siori:"栞",sioti:"鹵",sira:"調検白按檢覈",sirami:"虱蝨",sirase:"訃",sire:"知",siri:"後知尻臀",sirigai:"紂鞦",siringu:"志",sirizo:"退却斥卻屏擯逡黜",siro:"代白城皎皓皙皚",sirogane:"銀",siroginu:"縞",siroko:"錏",sirotuti:"堊",siru:"記印汁",sirube:"標",sirusi:"験印標徴瑞徽驗",sisi:"鹿穴獅宍",sisibisio:"醢",sita:"下設親舌慕簧",sitaga:"従随遜馴隷倭从婉徇從隨扈隸",sitagaki:"稿稾",sitagau:"順",sitagi:"襦",sitata:"認滴溜澑瀝",siti:"七質叱悉貭",sito:"下淑",sitogi:"粢",sitomi:"蔀",sitone:"茵蓐衽袵褥",situ:"実質室失執湿櫛七叱嫉悉漆疾膝蛭嘯實桎濕瑟虱蝨蟋貭躾隲隰",situke:"躾",siwa:"吝皴皺襞",siwabu:"咳",siwabuki:"咳謦",siyau:"精",sizi:"榻",sizimi:"蜆",sizu:"静沈没鎮靖賎湛填汨沒淪湮湎賤鎭靜",sizuka:"禅禪謐闃靜",sizuku:"雫滴",so:"十生組初反夫訴想早殺左素削狙染草措宗沿曽礎祖添庄征阻磯逸疎粗荘姐且杵鋤噌塑岨曾楚疏租蘇遡鼠惣其柘剃疋俎做剔咀囎徂怎愬柤梳泝沮涅溯爼甦疽砠祚胥胙苴蔬蘓蛆詛踈酥麁鼡齟",soba:"側傍蕎岨",sobada:"屹峙崛欹",sobame:"妾",sobi:"聳",soda:"育毓",sode:"袖",soe:"副添弐貳貮",soeuma:"驂",sogi:"枌",soi:"副襲",soko:"損底椢",sokona:"残損殘",soku:"数側職足速則測息束促即粟塞燭趨戚捉仄喞嗾嗽惻數昃熄矚簇鏃齪",soma:"仙杣",some:"染",somu:"背舛伐叛乖韋",son:"成村存損尊孫噂餐遜巽樽鱒忖拵栫洒蹲邨齔",sona:"備供具膳饌",sone:"嫉妬",sono:"園彼苑爾厥囿尓茆",soo:"宗",sora:"空昊穹諳諷霄",sore:"厥",soregasi:"某",sori:"反刀橇膤艝轌釖",soro:"対算斉揃對齊",sos:"卒卆",sosi:"誹毀詆謗譏譖譛讒",soso:"注潅溌沃漑灌澆濺灑盥",sosonoka:"唆嗾",soti:"倅伜",soto:"外",sotu:"率卒倅伜卆埣猝",sou:"十三生相総世送争想早捜走蔵装将倉層繰創草葬奏宗贈操窓騒双喪曽箱奨庄掃巣桑僧壮槽荘遭滝鯵粟甥竃甑捷蒋鞘諏噌曾叢爽宋匝惣挿掻曹槍漕燥痩糟綜聡蒼藻鎗霜瀧蛸爪葱蚤湊薮偬冏剏剿勦匆卅丗雙叟哈嗾嗽噪囃壯奘奬妝娵嫂孀將崢帚廂弉怱愡愴憔懆找抓搜掫插搶棕椶棗樔歃淙滄溲漱澡炒爭爿牀猩獎瘡稍窗竈笊笙箒箏筝簇籔粽總聰臧艙艘艚艸莊菷蔟薔藪藏裝諍譟贓賍赱蹌踪躁輳銷錚鏘鐺霎颯騷髞鬆鮹鰺鰤",soukou:"艸",sourou:"候",souzite:"惣",soyogu:"戦戰",sozoroni:"坐",su:"日月子代主数総首西済直統住空州過助守好周素角為棄吸捨窓透酸釈刷寿須摩巣陶磨妹擦珠洲据菅澄寸隙漉朱鋤笥諏酢崇雛摺棲栖蘇叢綜剃簾鷲吮呷壽娵拗捐掏搨擂數梳樔歙漱澂濟爲窗笊箝簀總耡芻蒭蘓醋釋饐鬚麈",subaru:"昴",sube:"全総術滑凡渾總辷",subekara:"須",subesi:"須",subo:"窄",sudama:"魑",sudare:"箔簾",sude:"既已",sudenotukuri:"旡",sue:"末居季陶甄",suga:"管清菅縋",sugame:"眇",sugata:"姿",suge:"菅",sugi:"生杉椙叩軼",sugiru:"宕",sugo:"菅凄淒",sugu:"勝直優傑駿儁儻杰雋",suguru:"英豪俊卓",sui:"出水推塁剤吹穂遂垂炊衰酔瑞氷帥睡粋翠錐錘誰椎劑埀壘夊崔彗悴忰惴捶揣榱燧瘁祟穗邃粹綏翆隋膵萃雖觜醉陲隧隹騅",suinyou:"夊",suka:"賺",suke:"相資佐助右介賃裕典昌哉輔祐亮允丞弼甫佑",suki:"次銭鍬隙鋤犂犁罅耒耜耡耨釁銛錢",suko:"少健",sukobu:"頗",sukosi:"毫",suku:"済少城宿救句粛掬匡淑丞抔拯樔濟竦肅贍",sukumo:"粭糘",sukumomusi:"蝎",sukuna:"尠",suma:"澂",sumi:"住清速角純炭寿隅澄墨隈栖綴陬",sumire:"菫",sumiyaka:"亟遽",sumomo:"李",sumu:"済",sun:"寸吋駿",suna:"砂沙",sunao:"淳",sunawa:"即乃廼迺",sunawati:"曽而曾輒輙",sune:"強脛臑",suno:"春墨",sunori:"規",suppon:"鼇鼈",suru:"駿摺",surudo:"鋭尖",surume:"鯣",susa:"荒凄淒",susi:"鮓鮨",suso:"裾裔",susu:"進薦勧奨澄晋膳濯煤侑勸啜嗽奬廸慂慫晉歃洒漱獎迪邁陟",susuki:"薄芒",susume:"羞",susumi:"晋迪",susumu:"将奏晋侑迪",susurina:"歔",suta:"廃廢",sute:"弃",sutu:"出寿",suu:"数崇嵩枢趨雛數樞皺芻菘蒭鄒陬",suwa:"座坐",suwae:"楚",suzi:"線条筋脈條綫脉",suzu:"鈴紗錫鐸涼凉篶鑾",suzuki:"鱸",suzume:"雀",suzuri:"硯",sya:"社者車予左写射砂捨謝舎釈卸煮斜姐些叉沙裟赦紗遮柘這貰豫偖冩嗟奢娑寫洒瀉灑炙畭舍苴莎蔗藉赭鉈鯊鷓麝",syabe:"喋",syaga:"嗄躑",syake:"鮭",syako:"積",syaku:"石赤借釈昔錯勺尺杓灼爵酌錫雀蹟勣呎嚼妁斫晰爍癪皙笏筰綽芍蜥迹釋鑠鵲齣",syamo:"鶤",syan:"上",syao:"小",syati:"鯱",syatihoko:"鯱",syo:"所野書初松処署諸狙緒曙暑庶疎且杵黍渚薯藷恕鋤岨楚疏鼠埜疋舒俎處咀墅嶼抒杼沮爼疽砠絮胥苴蔗蔬蛆蜍詛踈雎鼡齟",syoku:"続職食色織植属触飾殖粟嘱埴拭燭蝕厠喞囑嗇寔屬廁惻昃昵矚禝稙稷穡續薔蜀觸謖贖軾餝",syou:"政上生相小性勝正省井少商消証乗松声象様請賞青接登渉障清従装将昭精償傷昇焼星招創扱秀承訟症称章笑唱紹衝床照焦昌沼詳聖咲奨尚庄彰祥篠匠晶粧鐘姓荘翔甥且挟鍬甑鯖錆腫升召哨嘗妾娼宵廠抄掌捷梢樟樵湘硝礁肖菖蒋蕉裳詔醤鉦鍾鞘丞摺摂噌槍鎗蛸憧橡瀞秤丼从倡剏剿劭勦厰燮嘯囁囎墻奬妝將峭嶂庠廂從悚悄愀慫慴慯慵憔懾拯挾搶攝敞旌枩杪枌椒椄楫樅樣橦檣歃歙殤浹淞湫漿瀟炒烝燒爿牀牆猖猩獎璋甞瘡瘴睫睛稍稱竦笙筱箏筝簫聳聲聶腥舂艘艟艢莊菁蕭薔蚣裝襄褶觴誦誚諍證踵蹌蹤踪逍邵鈔銷鏘陞霄霎韶頌顳餉驤驫鬆鮹鱆鱶鷦",syouhen:"爿",syouzyou:"猩",syu:"手主取最数首輸株種守修周衆捜酒秀趣須殊掃狩珠酬鰍朱腫呪鍾諏枢趨痩鋳撞柊侏咒娵娶戍搜數棕椶樞橦殳洙溲繻聚茱蛛鄒銖銹鑄鬆鬚鰌麈",syuku:"宿縮祝粛粥蹴叔夙淑俶槭倏矗鬻肅菽蓿謖蹙齪",syun:"春旬俊瞬淳峻竣舜駿醇訊惇遁馴隼儁吮墫徇恂悛惷洵浚濬皴筍笋荀蓴蕣蠢詢諄蹲逡雋駲鰆鶉",syutu:"出率卒卆恤朮蟀齣",syuu:"主集州終収修周秋衆捜週就習羽執昇秀宗襲渋祝寿湿拾洲臭舟酬萩穐鰍鍬呪囚愁繍蒐讐蹴輯酋醜什厨嵩摺痩袖鋳楢柊葺揖鷲叟咒售啾嗽壽夂娵岫帚廚愀慴搜掫收楸楫泅湫溲漱澁澀濕甃皺龝箒籀綉緝羞聚脩艘芻菘菷蒭蓚螽褶讎躊遒逎鄒銹鏥鑄陬隰鞦駲驟鰌齪",syuuto:"姑舅",syuutome:"姑"
       ,ta:"大発高手立田度経原多海点女向建反屋裁食足起断楽種太天他馬絶閉貯泰丹耐垂炊駄堪矯仔汰詑唾柁舵楕陀騨竪誰焚溜詫佗侘咫咤哮埀夛它岔憚斷朶樔殄沱澑發經綏隋荼誑謖豎躱閇闌駝鴕點",taba:"抱束煙把繃",tabaka:"謀誑",tabako:"莨",tabi:"度旅羈羇覊韈",tabo:"髱",tabu:"椨",tabura:"誑",tabusa:"髻",tada:"三政内理正直真質督伊縄弾忠斉聖征唯宰惟祇糾匡只但禎董飭啻尹彈爛糜糺繩貭",tadasi:"理公正規義真督端雅忠貞侃匡矩旦禎肇",tadasu:"紀匡擶",tadatini:"径徑逕",tadayo:"漂汎漾",tade:"蓼",tado:"辿",tadori:"辿",taduna:"轡羈羇覊",tae:"成妙耐紗栲",taga:"違互畊箍靠",tagaini:"逓遞",tagane:"鏨",tagau:"爽",tagaya:"耕畉",tagi:"滾",tagosi:"輦",tagu:"類伉",tagui:"双雙疇畴",tahu:"椨",tai:"大対代体当来平台態待太退隊逮替帯貸滞袋泰耐怠敦夷碓秦汰堆岱戴胎腿苔黛鯛醍鎚梯諦殆來兌對帶擡抬棣歹滯炬玳紿臺蒂蔕薹蛻褪詒詆豸躰軆鐓隶靆頽颱駘體",taimai:"玳",taira:"平坦砥",taka:"学高京公挙考能応宅太好登延就将竹貴隆宇敬宗顧孝誉臣岳賢聖尊剛尚卓廷銘宜鷹享喬尭昂峻崇嵩琢寶岌崛巍敞杲陟魏堯",takaburu:"亢",takadono:"楼樓",takamu:"崇",takamura:"篁",takamusiro:"簟",takanna:"筍笋",takara:"用財宝珍寶寳珎貲",takasi:"大長天岐貴隆節敬孝律丘尚卓享喬尭昂皐峻崇嵩巍敞髞",takatuki:"鐙",take:"長全和建宅武雄健竹敬豪誉威岳丈尊剛毅穀猛傑虎嵩茸彪斌孟嶽蕈赳",takeki:"彪",taken:"武岳",takenawa:"酣闌",takenoko:"筍笋",takeru:"猛",takesi:"武健豪威剛毅猛彪孟壯悍洸赳驍",taki:"滝瀧嶽瀑",takigi:"薪掫蕘",tako:"凧蛸鮹鱆",taku:"度沢宅択託卓拓巧澤啄托濯琢鐸擢詫倬啅戳拆擇柝棹櫂炸磔謫躅鈬魄",takuma:"逞",takumi:"工巧匠倆",takuwa:"貯蓄儲薀",tama:"球環給玉弾霊偶圭魂珠瑞堪玖珪賜錫碧溜玲彈澑瑰瑶璧瓊賚靈魄瑤",tamago:"卵孚",tamaki:"環鐶",tamamono:"賚",tamari:"溜澑",tamasii:"魂",tamato:"袂",tamawa:"賜",tamaya:"廟",tame:"試験為溜澑爲驗",tameiki:"愾",tamera:"躇躊",tamesi:"験驗",tami:"民丹氓",tamo:"保給賜",tamoto:"袂",tamotu:"維",tamusi:"癬",tan:"田反担谷段単短探端弾炭誕丹淡壇嘆胆唐灘堪騨但坦旦歎湛箪綻耽蛋鍛檀椴丼亶啖啗單壜彈彖怛愽慱憚憺擔揣摶攤槫檐殫毯湍潭澹猯疸痰眈站簟緞罎膽葮蕁蜒蜑袒襌褝覃譚譫貪賺赧鄲酖鐔靼餤",tana:"店棚屶廛",tanagokoro:"掬掌",tane:"種胤稙",tani:"谷澗渓壑峪溪谿",tanigawa:"渓溪谿",tanimizu:"澗",tano:"楽頼嬉嘱托愉倚囑怙恃憑樂馮",tanosi:"煕佚熈熙",tanuki:"狸貍",tao:"倒顛仆僵垰嫋乢嵶斃殪蹶",taoyaka:"婀",tara:"平鱈槃鰔",tarai:"盥",tarasi:"足",tare:"誰孰",taregami:"髦",tari:"谷渡為爲",taru:"善垂樽弛",taruki:"桷椽榱",tasi:"確碓慥",tasina:"嗜窘",tasu:"助賛輔祐丞毘弼扶佑侑幇掖裨贊",tasuki:"襷",tasuku:"輔祐亮弼佑",tata:"賛称忠畳讃叩湛彳扣敲毆疊疉疂祟稱讚贊頌",tataka:"戦闘戰鬪",tatakaigamae:"鬥",tatami:"畳疊疉疂",tatara:"鑪",tatazu:"佇竚",tate:"立建館健帯賢縦盾舘楯竪縱豎鹵",tategami:"鬣",tatehuda:"榜",tateito:"経經",tatematu:"献奉亨獻",tati:"日立館質達城陸舘朔貭逹闥靼",tatibana:"橘",tatiki:"樹",tatima:"忽乍",tatimati:"奄倏",tatimotoo:"裴躑",tato:"例俔喩譬",tatto:"貴尊",tatu:"立建達樹竜龍辰蔦怛截撻燵獺逹闥靼韃",tatumi:"巽",taturu:"樹",tawa:"垰乢嵶懈撓橈",tawagoto:"譫",tawamu:"戯弄戲謔",tawamure:"詼",tawara:"俵",tayo:"便頼",tayu:"弛",tazi:"但",tazu:"訪鶴尋訊",tazune:"繹",tazusa:"携攜",te:"手守天達豊因稲照殿弟勅汀樋弖稻逹",tegata:"劵",teguruma:"輦",tei:"定体第提庁低程丁締聴停底庭滞袋弟抵邸貞帝廷訂亭堤艇鵜醍綴偵剃呈悌挺梯汀碇禎諦蹄逓鄭釘鼎砥薙畷俤剔叮啼嚔嚏奠姨幀廳廰掟柢梃棣楴洟涕渟滯牴疔眤睇羝蒂蔕蟶裼觝詆躰軆逞遉遞酊酲錣霆騁體髢",tekase:"梏",teki:"的摘適敵荻杓嫡擢滴笛鏑俶剔廸彳擲滌狄糴覿躑迪逖",teko:"杆杠桿梃槓",ten:"一出点店転展伝天典殿添淀蚕騨辿佃填纏甜貼顛澱槙丶傳甸唸囀壥奠巓廛忝恬掾畋椽殄沾癜癲碾篆簟纒腆蠶覘諂貂躔輾轉鈿銛霑靦鷆鷏點槇",tenmado:"窓窗",tenohira:"掌",tera:"寺衒",tero:"得",teru:"両映光央昭栄曜照旭輝晃瑛暁暉皓",tesuri:"欄檻闌",teti:"綴",tetu:"鉄達撤哲徹",tetu:"綴轍迭畷姪佚咥啜鉄哲徹垤屮捏耋跌軼輟銕錣鐵鐡餮",tetun:"哲",ti:"十五市地内千治都和知置質形値津丁散池遅血致盤智徴乳刃恥稚刀茅些陀弛痴蜘馳砥薙仟夂癡眞穉笞緻耻胝褫豸貭踟躓輊遲雉魑黐黹",tibi:"禿",tidi:"縮",tidori:"鵆",tiga:"違",tigaya:"茅",tigi:"契",tigo:"兒",tii:"小",tiisa:"小瑣",tiisai:"幺",tika:"近元朝義親史周央慎隣哉誓鎮允慈爾峻悌迩睦尹邇",tikadu:"昵",tikara:"力",tikasi:"迩",tiki:"飭",tikiri:"巾",tiku:"竹築筑蓄竺畜逐矗舳",timaki:"粽",timata:"巷",tin:"清丁賃沈珍陳鎮椿亭砧疹塵湛朕填枕戡抻椹狆珎碪趁酖鍖鎭闖鴆",tina:"因",tinba:"跛",tinomigo:"孩孺",tinu:"釁",tiri:"塵埃",tiriba:"鏤",tiru:"生散",tis:"蟄",tisuzi:"胄",tisya:"苣",titi:"父乳秩爺",titu:"秩窒蛭姪帙膣腟蟄鷙",tiya:"茶",to:"十人時問度取外名勝都利解藤止土石研夫説戸頭渡門音捕訪階融吉登図博飛採富津豊等留永徒途執停鳥闘閉撮臣仁泊遂跳溶刃塗刀冨翔兜采訊摂綴兎吐堵妬屠斗杜菟賭鍍砥砺涛釆樋熔兔咤圖抖搴攝搏攬斛梳樢畄當睹礪秉緘聘肚荼莵蚪蠹蠧覩觧跿遏銷鎔鐺鑠閇闍",tobari:"幌帳帷幄幃幎",tobi:"飛鳶鴟鵄鵈",tobira:"扉闔",tobiranoto:"戸",tobiti:"溌",tobo:"点乏恍點",toboso:"枢樞",tobuhi:"烽",tobura:"弔",todo:"止留届稽逗椴屆渟畄遏閼鯔",todokoo:"滞滯",todoro:"轟軣驫",toga:"尖栂尤咎愧謫",toge:"刺朿棘薊",togi:"時伽",toguro:"塒",toi:"樋",toisi:"砥",toka:"爍",tokage:"蜥",toke:"解",toki:"時言信常説秋斎辰穐鴇晨齋龝閧鬨鴾",toko:"所常床",tokoro:"所処處攸",tokosibari:"輹",toku:"得特独督読徳釈竺啄匿涜禿篤悳慝牘犢獨竇纛讀釋陟髑黷",toma:"苫篷",tomari:"泊",tomasu:"斗",tomata:"攴",tome:"留",tomi:"福富智臣冨頓",tomo:"大公作和知点共朝基視与供友具紀興幸伴智誠丈那倫寛灯珠奉乏允倶悌禎塘燈寅巴朋侶呂舳艢艫舮鞆點",tomoduna:"纜",tomoe:"巴",tomogara:"輩曹們儕儔",tomona:"伴",tomoni:"与偕與",tomosibi:"灯燭燈",tomura:"弔",ton:"通問団富敦噸屯惇沌豚遁頓呑丼團暾燉瓲臀褪貪遯飩齔",tona:"称唱隣倡徇稱誦鄰",tonari:"隣鄰",tonbi:"鳶",tone:"舍",tono:"殿",too:"十東通遠柔疏茫藐逖遐",tooi:"弥彌",tooru:"理達宣徹透亨享暢",tooruhu:"亨",tora:"捕虎囚捉寅彪擒乕",toragasira:"虍",torakanmuri:"虍",tori:"部取鳥舎禽鶏酉隹鷄",toride:"塁廓塞砦柵堡壘寨",torihen:"酉",toriko:"虜禽俘擒",toriku:"虜",toro:"蕩瀞盪蘯銷鑠",tose:"歳",tosi:"年明要世利福歳好史健紀厳順載齢季功敬宗智俊敏寿鋭毅哉稔慧淑峻駿聡惇肇甫禄壽彗齡",tosikatu:"寿",tosiyori:"耋",tote:"迚",totemo:"迚",toti:"構栃橡杤",totono:"調整薺",totu:"帰突嫁凸鳥頓吶咄柮歸皈肭訥",tou:"十党東田当道島投任統藤頭郎答討登読丁等倒踏闘逃納盗稲冬透嶋到棟湯凍灯筒豆陶騰桐酬刀唐塔悼糖洞吋桶兜沓逗喋斗杜塘套宕搭桃梼淘涛燈痘祷董蕩謄鐙憧撞瞳萄涜肇樋亠俑偸僮儻兪剳叨啅嘲嶌嶝帑幀幢恫慟抖掏掉掟搗搨撓擣朷档檮棹棠椡榻橙橦櫂盜濤淌滔滕溏潼當疼盪蘯瞠磴礑稻竇箚籐籘粡綉絛綢綯縢纛罩艟苳荅荳蓊薹螳蟷襠譫讀蹈迯酘釖鍮鐺閙陦鞜鞳韜饕骰鬧鬪鰈鶇鶫黨鼕",tougamae:"鬥",touge:"峠垰",toumaru:"鶤",toumi:"江",touru:"亨暢亘",touto:"貴尊",towa:"樋",toya:"塒",toyo:"豊樋豐",toza:"鎖",tu:"四子連通都水点告次付土着注積接摘突司津就継塚詰奥衝徹即尽鶴亜拓釣悉漬柘吊貼兎吐妬菟撞附葎亞偸兔兪剪憑抓搶搗擣攣椄痙盡綉繼纉舂莅莵薀蘊誥踵鉉顆鶇鶫點",tuba:"椿唾鍔鐔",tubaki:"椿唾沫",tubakura:"燕",tubakuro:"燕",tubame:"燕",tubasa:"翼翅",tubo:"窄坪壷坩壺",tubomi:"莟蕾",tubone:"局",tubu:"粒潰瞑",tubura:"円圓",tubusa:"備審具悉",tubute:"礫",tubuya:"呟",tuda:"伝",tudo:"集",tudu:"続綴續",tuduki:"仲續",tudumayaka:"倹儉",tudumi:"鼓皷",tudura:"葛",tuduri:"綴",tue:"杖仗枴梃棍",tuga:"番栂樛",tuge:"柘",tugi:"調次族亜胤嗣",tugomori:"晦",tugu:"二続次維承紹序亜尋胤嗣噤拑續鉗韶頌",tugumi:"鶇鶫",tuguna:"償",tui:"対立費終追築序遂叙堆墜椎槌鎚潰對敍敘縋隧",tuiba:"啄喋",tuide:"序叙敍敘",tuini:"卒卆訖竟",tuitati:"朔",tuka:"事発家支使労仕捕司塚遣束柄尽疲倦掴杷埠亊冢劬勞壟憊憑拏拿攫瘁發羸閊",tukae:"痞",tukai:"徭",tukasa:"務台司嗣曹宦臺",tukasado:"司",tuke:"野付",tuki:"月女付属築尽槻坏欟殄殫",tuku:"作土造属築為創筑啄做傅屬捏殄殲殱爲竭鏗",tukuba:"蹲",tukuda:"佃",tukue:"案机几",tukuri:"旁",tukuro:"繕",tuma:"最妻撮倹嬬爪儉抓褄",tumabasa:"襭",tumabi:"審詳",tumabiraka:"諦",tumada:"翹跂",tumako:"孥",tumami:"鈕",tumazu:"頓跌蹉蹶躓",tume:"冷爪",tumi:"積罪辜",tumo:"妬",tumu:"摘紡錘紬勣瞑緝",tumugi:"紬",tumuri:"頭",tumuzikaze:"飄飃飆",tuna:"之綱繋紘婁絆緤羈羇覊",tunagu:"紘",tunbo:"聾",tune:"経常毎典恒矩庸彝彜恆抓經",tuneni:"恒",tuno:"角募",tunza:"劈",tura:"連面貫辛聯緜聨肆",turanu:"貫串",turanuku:"琲",turatura:"倩",ture:"連",turea:"対對逑",tureai:"仇儷",turi:"釣",turiito:"緡",turu:"鶴弦敦吊蔓寉霍",turugi:"剣劍劔劒剱釼鋏",tusa:"橲",tusi:"対對",tuta:"伝蔦傳樢蘿",tutae:"伝",tutana:"拙",tute:"伝傳",tuti:"土壌坤椎槌鎚壤",tutihuru:"霾",tutika:"培",tutikure:"塊",tutinoe:"戊",tutinoto:"己",tuto:"務勤努勉孜劭勗懋苴苞黽",tutomu:"力功茂惇孟",tutoni:"夙",tutu:"包筒啄兢勹坡裹韜",tutuga:"恙",tutumi:"堤塘陂",tutumigamae:"勹",tutusi:"慎斎粛欽謹恪愨愿愼矜祗齋竦肅虔",tuu:"通痛",tuwamono:"兵戎仗",tuya:"沢彩澤艶艷",tuyo:"強剛毅侃彊倔勁勍遒逎",tuyosi:"幹雄剛毅壮彊彪",tuyu:"露汁",tuzi:"辻",tya:"茶楪茗",tyaku:"役着著嫡箸擲磔謫躇",tyan:"頭荘莊",tyo:"著緒貯樗瀦猪苧屠箸儲佇墸杼楮潴竚紵豬躇迢",tyoku:"直勅捗飭敕矗稙躅陟隲",tyou:"長場調町重朝提張庁条登超丁聴塚鳥兆徴敏挑潮懲帳彫跳頂釣畳澄敦恰杓鯛樗凋喋寵帖弔暢牒眺脹腸蝶諜銚蔦吊挺釘貼肇傭仗佻冢剳嘲塲姚幀廳廰悵掉掟昶晁條梃樢沾渫漲澂甼疊疉疂疔稠窕笘箚糴糶聽膓萇蜩褶誂貂趙輒輙迢陦雕髫鬯鰈齠",tyouzame:"鰉",tyu:"厨酎丶廚蛛誅躊",tyun:"仲椿",tyutu:"朮黜",tyuu:"中住注沖仲駐忠柱昼宙虫抽丑厨痩衷註酎鋳紬肘紐偸儔冑冲廚惆晝狆疇畴稠籌籀紂綢胄舳蟄蟲誅躊鈕鍮鑄"
       ,u:"生産保受売府得打有武防優守失請討撃右友芸羽植雨浮遊宇承布埋御雅熟綿憂祐芋烏迂卯鵜碓瓜苑餓飢享饗倦胡蒔椎笛菟膿伐佑于侑傴夘吁售嗚塢嫗孳抃挌挧掫搨搏擣擽桙沽燠盂磑碾禹糴紆茹藝謳賈賣餒饉饑齲",uba:"奪姥簒姆褫",ubu:"生産幼",ude:"腕",udewa:"釧",udon:"饂",ue:"上植樹殖筌",uezini:"殍",uga:"穿鑿",ugai:"漱",ugo:"動揺蕩搖盪蘯蠢蹌",ugoka:"撼",ugome:"蠕",ugui:"鯏",uguisu:"鴬鶯",uhu:"大",ui:"外初黄茴",uka:"泛",ukaga:"窺伺諜覗俔覘遉闖",ukanmuri:"宀",uke:"請筌",ukebako:"凵",uketamawa:"承",uki:"浮",ukibukuro:"鰾",ukikusa:"萍蘋",uma:"午馬甘旨巧甜",umai:"生",umaka:"圉",umare:"生",umaya:"厩廐廏",ume:"梅楳呻",umeki:"呻",umi:"海湖膿溟瀛",umu:"惓",umusa:"茂",un:"海運銀芸雲欝云怨吽慍暈殞紜繧耘薀藝蘊褞隕饂鶤",una:"海唸髫魘",unaga:"促",unagi:"鰻",unari:"唸",unazi:"項",unazu:"頷",une:"畦畝釆壟畆疇畴",uo:"魚",ura:"占浦裏怨憾恨卜裡麗怏惆悵慍慊",urakata:"卦",urami:"怨",urana:"占卜筮",uranai:"卜",urasi:"嬉",uraya:"羨",ure:"憂嬉愁戚邑恤悄悒憫閔",ureerusama:"忙",urei:"騒騷",uresi:"嬉",uri:"売瓜",uriyone:"糶",uroko:"鱗",uru:"売潤漆",uruo:"沢湿潤澤渥濡沾洽濕霑",urusakusyabe:"譫",urusi:"漆",uruti:"粳",uruu:"閏閠",uruwa:"彬斌麗",us:"欝鬱",usa:"総",usagi:"兎菟兔莵",usagiami:"罘",usagiuma:"驢",usi:"後牛丑",usina:"失",usio:"潮汐",usiro:"後",usitora:"艮",uso:"嘘獺鷽",usobu:"嘯",usu:"薄碓臼涼凉漓菲",usudu:"臼舂",usuginu:"紗繻",usugu:"腰",usutu:"舂",uta:"歌欧詩謡唄詠宴賦咏哥嘔歐謌謠謳",utaga:"疑",utage:"宴讌",utaime:"妓",utata:"転轉",utena:"台柎臺萼蕚",uti:"中内家打蔚裡",utibari:"梁",utigi:"袿",utikake:"袿褂裲",utiki:"袿褂",uto:"疎疏踈",utta:"訴愬諍",utu:"空転映移写虚欝蔚遷槍冩寫徙拊暎鬱熨轉",utubari:"梁",utubo:"靭笂靫靱",utuku:"美娃佼倩妍姚婉窕",utukusi:"旺",utumu:"俯",utuo:"靫靱",utuwa:"器噐",uwa:"上",uwabami:"蠎蟒",uwagoto:"譫",uwagusuri:"釉",uwasa:"噂",uyama:"敬",uyauya:"恭",uzi:"氏牛蛆",uzu:"水埋渦填疼",uzuku:"踞",uzukuma:"蹲",uzumaki:"巴",uzura:"鶉",uzutaka:"堆"
       ,wa:"十二大分発方話和際別割早葉環花訪丸久弁速波破羽王輪房盤我華把娃蛙劃窪詑杷琶磐沸湧涌倭鷲詫佗侘辨辧哇啝夥夬洶滕濆瓣窩苡萵辯鐚鐶靡",wabi:"詫佗侘",wadakama:"蟠",wadako:"和",wadati:"轍",wadatii:"轍",waga:"我吾綰",wage:"髷鬟",wai:"合賄隈歪匯淮猥矮穢薈",waka:"判解別若幼稚頒夭嫩觧",wakanmuri:"冖",wakare:"訣",wakazini:"夭殀殤",wake:"分訳脇譯",waki:"脇刀傍湧腋",wakibasa:"挟挾掖",wakigi:"輒輙",wakima:"弁辨辧瓣辯",wakka:"稚",wako:"若",waku:"若沖惑枠稚或湧冲蠖",wame:"喚諤",wan:"湾腕椀碗彎弯灣綰蜿豌",wana:"罠羂",wanana:"戦",wani:"丸鰐",wara:"原春笑稿穣藁听呵哂嗤稈稾穰",warabe:"童竣僮",warabi:"蕨",warawa:"竣妾",warazi:"鞋",warazimusi:"蟠",ware:"台我吾俺臺",wari:"割張",warihu:"質劵卩貭",waru:"悪兇惡慝獰",warugasiko:"狡猾獪黠",wasa:"沢",wase:"鷲",wasi:"儂雕",wasu:"忘諠",wata:"原済渡渉乱幡弥綿棉亙亘亂彌濟絖絮緜蹊竟",wataire:"袍",watakusi:"私厶",watana:"渡",watanabe:"競",watara:"渡",watari:"渡",wataru:"海済航超弥杭亘恆",watasi:"済私",watu:"斡和",waza:"業技態芸伎藝",wazaogi:"伎妓伶倡",wazawa:"災妖",wazawai:"禍夭殃",wazuka:"僅纔",wazura:"患擾煩",wazurawa:"数數",wo:"乎于"
       ,ya:"三合八田野家安屋止病宅谷夜央辞遣焼養草柳寝也矢露泰亜弥悦哉乎蛇箭痩埜罷焚冶爺耶墅寢已弭彌揶椰歇歟烙煬熄燒燔燬疚窶蠱輟輻辭鵺",yaado:"碼",yaaru:"碼",yabu:"敗破壊薮毀壞敝硅籔藪",yabusa:"吝嗇",yabusaka:"悋",yado:"宿舎舍",yagate:"軅軈",yagi:"柳",yagura:"櫓艪",yahazu:"筈",yai:"焼柳",yaiba:"刃刄",yaito:"灸",yakai:"輩",yakama:"喧",yakara:"属輩屬",yakata:"館舘",yake:"宅宿",yaki:"焼燒",yakigari:"焚",yakko:"奴",yaku:"約役益薬訳躍疫灼亦厄喊奕扼櫟檪籥繹葯藥譯軛鑰阨隘龠",yakusyo:"庁廨廳廰",yama:"山岾疚",yamadori:"翰",yamaguwa:"柘",yamai:"病痾",yamainu:"犲豺",yamanasi:"杜棠",yamanire:"梗",yamanokatati:"嶐",yamato:"倭",yami:"闇",yamome:"孀鰥",yamoo:"鰥",yan:"山陽",yana:"柳柵楊梁簗",yanagi:"柳楊",yanai:"柳",yano:"山",yara:"萢",yarai:"柵",yari:"槍鎗鑓",yasa:"優易",yase:"憔瘠",yasi:"椰",yasiki:"邸廛",yasina:"養飴豢",yasiro:"社廟",yasu:"保和安育楽易休健康彦恵裕妥慶仁寿泰那祥芳恭鳩奉靖烈宴匡秦賎坦悌寧又庸倭恬綏賤",yasura:"恬",yasuri:"鑢",yasusi:"保健康純泰恭靖欣悌寧",yat:"八",yati:"八萢",yato:"雇傭",yatu:"八勉奴扮悴忰憔",yawa:"和柔軟輯穆燮諧",yawara:"雍",yawaragu:"凱廱",yaya:"稍",yaziri:"鏑鏃",yo:"四上代米世予止能由夫与葉良好洋呼夜吉寄除読余因善避拠陽依預誉隠訓嘉弥酔詠於寓乎撚輿羊蓉豫仍倚凭丗咏憑搓據攀歟淤畭籀綯縒譱臾舁與蕷誦譽讀醉閼隱靠飫餘饒馮",yobina:"号號",yoboru:"伸",yobu:"呼",yodare:"涎",yodo:"淀澱",yogo:"汚",yoi:"生嘉酔誼宵俶懿臧",yoikane:"鉚",yoko:"横",yokogi:"軫",yokoito:"緯",yokome:"网",yokosi:"邪",yokosima:"咼佞侫",yoku:"抑欲翌浴翼臆慾沃峪弋杙翊閾",yoma:"米",yome:"嫁娵",yomi:"読嘉詁",yomigae:"蘇甦蘓",yomo:"智",yomogi:"蓬艾蒿蕭",yon:"四鎔",yona:"米汰淘",yonageru:"沙",yone:"米",yonedo:"粐",yonkasira:"网",yono:"米",yori:"自和寄従賀頼順依於閑撚于从從",yoro:"寄宜鎧蹌蹣",yoroi:"鎧冑",yoroko:"喜歓慶煕悦欣僖兌忻怡憙懌懽歡熈驩熙",yorozu:"万萬",yoru:"夜仍仗",yose:"寄",yosi:"新理意成勝和元次福領能由義可美優愛英良好洋吉憲伊賀喜幸香順善徳儀彦栄貴宣功純敬宗孝充雅哲快慶克至仁兄啓昌詳泰嘉剛祥芳芦悦佳宜恭圭桂巧祐亮惟允艶馨巌欣欽芹薫慈叔淑膳悌禎如寧彬甫睦麗禄巖譱艷葭萬蘆",yosimi:"美嘉誼媾",yosoo:"装扮妝裝",yosuga:"縁",yot:"四",yoti:"頼",yotu:"四",yotugi:"胄",you:"八用要容領応葉様洋雄養栄陽曜揚揺桜腰菜幼踊擁溶鷹謡瑛厭桶暢銚蝿湧涌猷傭妖庸楊熔窯羊耀蓉遥沃丿佻佯俑咬壅夭姚孕幺廱徭徼怏恙慂慵應拗揄搖杳昜暎暘曄榮榕樣櫻殀殃漾瀁煬燿犹瑶瓔珱甬痒瘍癢癰穃窈窕窰纓罌膺臾蛹蠅謠踰踴邀酊酩醺鎔雍霙靨鞅頌飫魘鱶鷂鸚遙瑤",youhen:"幺",youyaku:"稍",yowa:"齢弱歯嬬孱懦羸齒齡",yowai:"歳歯脆齒",yozi:"捩",yu:"行百世結有輸由優与雄友油幸温遊裕夕揺露往宙湯諭唯猶弓癒憂逝愉愈佑悠揖柚湧涌侑兪喩彌徃徂揄搖楡渝瑜疣瘉肬腴臾茹萸蕕蝓覦諛踰逾邁閖雍鼬",yubi:"指",yubukuro:"韜",yuda:"委",yudame:"弼檠",yue:"故",yuga:"歪咼",yugi:"靭靫靱",yuha:"弭",yui:"結由遺維唯惟",yuka:"床牀",yukari:"縁紫",yuki:"行千元世展歩介将維喜志幸順徳之敬雪祥征恭亨晋靭如侑夊裄",yuku:"行之",yukuha:"的",yume:"夢梦",yumi:"歩之弓",yumibukuro:"韜",yuri:"岼",yuru:"万許聴緩釈寛恕弛宥綽聽萬釋",yuruga:"忽",yurusu:"允",yusu:"濯梼嗽",yuta:"豊寛豐",yutaka:"豊温裕浩泰寛穣穰胖饒",yuu:"結有由夫優雄融右友油熊遊郵裕誘夕諭勇猶輔憂祐郁厭酉楢鮪又尤愉佑宥幽悠揖柚湧涌猷邑侑俑囮囿岫悒拗揄攸梍游犹疣肬莠蕕蚰蛔蝣迪釉黝鼬",yuumesi:"餔",yuwai:"祝",yuzu:"譲禅遜柚禪讓",yuzuri:"譲",yuzuriha:"杠"
       ,za:"三座蔵坂謝戯坐挫蓙",zabu:"三",zae:"三",zai:"在財材罪剤劑薺戝",zakana:"魚",zaki:"咲鷽",zako:"廻",zaku:"雀",zakuro:"榴",zan:"残暫惨斬鱒塹嶄巉慙慚懺懴槧殘竄纔讒鏨",zaru:"猿笊",zatu:"雑襍雜",ze:"慮是膳",zei:"税勢説城泉脆噬橇毳筮蚋蛻",zeki:"関",zen:"前全然善泉銭斬蝉賎漸禅繕膳楠冉喘懦禪譱苒蠕襌褝賤髯",zeni:"銭湶錢",zenisasi:"緡繦",zenmai:"薇",zero:"零",zeti:"鞨",zetu:"絶舌蚋",zi:"二人出事自時地治道持次示路仕良字値児除寺締辞遅樹染智茨似仁滋耳寿磁芽稚餌茅侍慈爾璽痔而蒔甚陀馳弐迩冶亊弍兒塒壽孳尓岻峙怩恃珥畤穉膩臑茲貳貮轜辭邇雉",zii:"爺",zika:"直",zikara:"力",ziki:"直食境喰寔",ziku:"軸竺宍柚忸肭舳衄衂",zime:"占",zin:"人神志陣臣仁尽沈珍尋刃辰鎮妊稔荏塵壬甚腎訊迅靭侭仞仭儘儿刄姙恁椹潯潭燼盡糂荵蕈蕁衽袵靫靱",zine:"笹",zinkou:"樒櫁",ziretta:"懊",zirusi:"印",zisya:"轜",ziti:"姪",zitu:"日実實昵衵十",zizi:"爺",zizii:"爺",zo:"三初染沿須",zoi:"添",zoki:"位",zoku:"続族財属俗粟賊嗾屬簇續蔟蜀戝鏃",zome:"染",zon:"存",zono:"園薗",zore:"嵐",zou:"三増藤造象蔵雑像贈臓曽篠曾曹憎橡慥筱臟臧艢藏襍雜",zu:"事手主都集済住頭図津鈴刷尽鶴尋豆擦瑞厨逗杜弗亊圖廚荼荳蚓誦連付積詰漬",zubon:"袴",zui:"泉随瑞髄蕊惴隋膸蘂蕋隨陏髓",zuimusi:"螟",duka:"塚使遣疲",duke:"付漬附",duki:"付築筑",duku:"造作",dukuri:"造作",dume:"詰都",dura:"辛",duta:"伝",duto:"勤",dutu:"砲宛",zuke:"野",zuki:"月附",zukin:"帽",zuma:"妻瀦",zumi:"水済積角泉棲曇",zumo:"雲",zuna:"網",zura:"面",zure:"連",zuri:"刷摺",zuru:"狡",zusa:"総總",zya:"写邪戯蛇惹耶闍麝",zyaku:"着若弱寂廻惹雀柘嫋搦擲瘠簀蒻藉鉐鵲鶸",zyan:"雀",zyo:"受女助除序徐藷叙恕鋤汝如舒抒敍敘絮耡茹莇",zyoi:"高",zyoku:"辱濁搦溽縟耨蓐褥",zyou:"上生場定成情状常乗門条城盛静縄譲娘丈剰浄壌畳蒸靖尉允嘗丞冗嬢擾杖穣醸錠茸帖牒鄭溺捻肇乘仍仗佻剩塲壤奘嫋嫦嬲嫐孃弉拯掟掾撓攘晟條橈淨滌烝犹甞疊疉疂禳穰絛繞繩聶蕘蟐蟯襄諚讓趙躡遶釀鑷靜饒驤",zyu:"入数受住授従就習樹需寿儒呪綬酋雛竪嬬濡鷲从儔咒壽孺從懦戍洳籀臑蠕襦誦豎躊頌",zyuku:"塾熟粥孰耨",zyun:"準順旬純巡准淳潤盾絢閏循楯殉遵醇惇馴隼凖徇恂洵筍笋荀詢閠鶉",zyutu:"術述恤戌朮十",zyuu:"十重住従充銃渋寿柔縦拾汁什戎獣瀞廿紐从從忸戉揉澁澀狃獸糅絨絛縱蹂鈕鞣",zyuumata:"支"}

    /**
     *  Look-up hash with transliteration sequences for getKanaFromRomaji method
     *
     *  @type Object
     *  @scope private
     */
       ,Rom = {}
    /**
     *  RegExps for romaji syllables' matching
     *
     *
     */
       ,reRomHira
       ,reRomKata
     /**
     *  Replaces transliteration with corresponding kanas
     *
     *  @param {String} s
     *  @return {Array, Null} null if nothing matches or array with hiragana and katakana substitutions
     */
    var getKanaFromRomaji = function (s) {
        var h,k,rez
    if(rez=Rom[s]) return rez;
        h=s.replace(reRomHira, function($0){
                return Rom[$0][0]
        })
        k=s.replace(reRomKata, function($0){
            return Rom[$0][1]
        })
        return [h,k]
    }
    /**
     *  Builds suggestions list for the current buffer
     *
     *  @param {String} str string for checking matches
     *  @return {Array} new buffer and size of the selection
     *  @scope private
     */
    var prepareIME = function (str){
        var kz
        ,rePTKSC = /.[ptksc]$/
        ,lc = str.toLowerCase()
        ,lcslice;
        var arr = getKanaFromRomaji(lc);
        if (arr==null)
            return [str,str.length];
        if (rePTKSC.test(lc)){
            lcslice = lc.slice(0,-1);
            kz = INPArr[lc = lcslice +'tu'] || INPArr[lc = lcslice +'ku']
        }else{
            kz = INPArr[lc]
        }
        VirtualKeyboard.IME.show( !kz ? arr
                                      : arr.concat((typeof kz =='string') ? INPArr[lc]=kz.split('') : kz)
        )
        return [str,str.length]
    }
    /**
     *  Callback to process keyboard input in the current IME style
     *
     *  @see VirtualKeyboard.processChar
     *  @param {String} chr current input char
     *  @param {String} buf actual processing buffer
     *  @return {Array} new buffer contents and length
     *  @scope protected
     */
    self.processChar = function (chr, buf) {
        var num, str, arr, kz
          ,IME=VirtualKeyboard.IME
          ,reABC=/[A-z']/
        if (chr=='\u0008') { // backspace
            if (buf && (str=buf.slice(0,-1))) {
                return prepareIME(str)
            } else {
                IME.hide()
                return ['',0] //total delete; some other cases
            }
        } else if (chr.charCodeAt()==10) { //non backspace
            if (buf=='')
                return[chr,0]
            str = IME.getChar(1)
            if (!str) { //no such variant
                return[buf+chr,0]
            } else {
                IME.hide();
                return[str,0]
            }
        } else if (isFinite(num=parseInt(chr))) { // hira/kata/kanzi
            if(buf=='')
                return[chr,0]
            str = IME.getChar(num);
            if (!str) { //no such variant
                return[buf,buf.length]
            } else {
                IME.hide();
                return[str,0]
            }
        } else if(reABC.test(chr)) { //abc input
            str=buf+chr
            return prepareIME(str)
        } else { //"blanks"
            str=(IME.getSuggestions()[0]||'')+chr
            IME.hide()
            return[str,0]
        }
    }
    /**
     *  IME constructor
     *
     *  @scope private
     */
    var _construct = function () {
        var RomSum=[]
           ,aChoon=[]
           ,aSokuon=[]
           ,aChoonSokuon=[]
           ,dbi, dbi0
           ,vowel, hiraVowel
           ,kz, kzNew
           ,sRomN = "n'(?=[aeiouy])|n(?=$|[^yaeiou])|"
           ,sxtu = "|la|xa|li|xi|lu|xu|le|xe|lo|xo|lya|xya|lyu|xyu|lyo|xyo|ltu|xtu"
           ,reNihonSiki=/sy|si|zy|zi|dy|di|du|ty|ti|tu|hu/g
           ,hashNihonSiki={sy:"sh",si:"shi",zy:"j",zi:"ji",dy:"j",di:"ji",du:"zu",ty:"ch",ti:"chi",tu:"tsu",hu:"fu"}
           ,dbRom2Kana=[["a","あ","ア"],["i","い","イ"],["u","う","ウ"],["e","え","エ"],["o","お","オ"],["ka","か","カ"],["ki","き","キ"],["ku","く","ク"],["ke","け","ケ"],["ko","こ","コ"],["sa","さ","サ"],["shi","し","シ"],["si","し","シ"],["su","す","ス"],["se","せ","セ"],["so","そ","ソ"],["ta","た","タ"],["chi","ち","チ"],["tsu","つ","ツ"],["te","て","テ"],["to","と","ト"],["na","な","ナ"],["ni","に","ニ"],["nu","ぬ","ヌ"],["ne","ね","ネ"],["no","の","ノ"],["ha","は","ハ"],["hi","ひ","ヒ"],["fu","ふ","フ"],["he","へ","ヘ"],["ho","ほ","ホ"],["ma","ま","マ"],["mi","み","ミ"],["mu","む","ム"],["me","め","メ"],["mo","も","モ"],["ya","や","ヤ"],["yu","ゆ","ユ"],["yo","よ","ヨ"],["ra","ら","ラ"],["ri","り","リ"],["ru","る","ル"],["re","れ","レ"],["ro","ろ","ロ"],["wa","わ","ワ","ウァ","うぁ"],["n","ん","ン"],["ga","が","ガ"],["gi","ぎ","ギ"],["gu","ぐ","グ"],["ge","げ","ゲ"],["go","ご","ゴ"],["za","ざ","ザ"],["ji","じ","ジ"],["zi","じ","ジ"],["zu","ず","ズ"],["ze","ぜ","ゼ"],["zo","ぞ","ゾ"],["da","だ","ダ"],["di","ぢ","ヂ","でぃ","ディ"],["du","づ","ヅ"],["de","で","デ"],["do","ど","ド"],["ba","ば","バ"],["bi","び","ビ"],["bu","ぶ","ブ"],["be","べ","ベ"],["bo","ぼ","ボ"],["pa","ぱ","パ"],["pi","ぴ","ピ"],["pu","ぷ","プ"],["pe","ぺ","ペ"],["po","ぽ","ポ"],["kya","きゃ","キャ"],["kyu","きゅ","キュ"],["kyo","きょ","キョ"],["sha","しゃ","シャ"],["shu","しゅ","シュ"],["sho","しょ","ショ"],["sya","しゃ","シャ"],["syu","しゅ","シュ"],["syo","しょ","ショ"],["cha","ちゃ","チャ"],["chu","ちゅ","チュ"],["cho","ちょ","チョ"],["tya","ちゃ","チャ"],["tyo","ちょ","チョ"],["nya","にゃ","ニャ"],["nyu","にゅ","ニュ"],["nyo","にょ","ニョ"],["hya","ひゃ","ヒャ"],["hyu","ひゅ","ヒュ"],["hyo","ひょ","ヒョ"],["mya","みゃ","ミャ"],["myu","みゅ","ミュ"],["myo","みょ","ミョ"],["rya","りゃ","リャ"],["ryu","りゅ","リュ"],["ryo","りょ","リョ"],["gya","ぎゃ","ギャ"],["gyu","ぎゅ","ギュ"],["gyo","ぎょ","ギョ"],["ja","じゃ","ジャ","ぢゃ","ヂャ"],["ju","じゅ","ジュ","ぢゅ","ヂュ"],["jo","じょ","ジョ","ぢょ","ヂョ"],["zya","じゃ","ジャ"],["zyu","じゅ","ジュ"],["zyo","じょ","ジョ"],["dya","ぢゃ","ヂャ"],["dyu","ぢゅ","ヂュ"],["dyo","ぢょ","ヂョ"],["bya","びゃ","ビャ"],["byu","びゅ","ビュ"],["byo","びょ","ビョ"],["pya","ぴゃ","ピャ"],["pyu","ぴゅ","ピュ"],["pyo","ぴょ","ピョ"],["ye","いぇ","イェ"],["we","うぇ","ウェ","ヱ"],["wi","うぃ","ウィ","ヰ"],["wo","ウォ","うぉ"],["kwa","くぁ","クァ"],["kwi","くぃ","クィ"],["kwe","くぇ","クェ"],["kwo","くぉ","クォ"],["kwa","くぁ","クァ","くゎ","クヮ"],["she","しぇ","シェ"],["che","ちぇ","チェ"],["tsa","つぁ","ツァ"],["tsi","つぃ","ツィ"],["tse","つぇ","ツェ"],["tso","つぉ","ツォ"],["tsyu","つゅ","ツュ"],["ti","てぃ","ティ","ち","チ"],["tyu","てゅ","テュ","ちゅ","チュ"],["tu","とぅ","トゥ","つ","ツ"],["nye","にぇ","ニェ"],["hye","ひぇ","ヒェ"],["hu","ふ","フ","ホゥ"], ["fa","ふぁ","ファ"],["fi","ふぃ","フィ"],["fe","ふぇ","フェ"],["fo","ふぉ","フォ"],["fye","ふぃぇ","フィェ"],["fya","ふゃ","フャ"],["fyu","ふゅ","フュ"],["fyo","ふょ","フョ"],["mye","みぇ","ミェ"],["rye","りぇ","リェ"],["vu","ゔ","ヴ"],["va","ゔぁ","ヴァ","ヷ"],["vi","ゔぃ","ヴィ","ヸ"],["ve","ゔぇ","ヴェ","ヹ"],["vo","ゔぉ","ヴォ","ヺ"],["vye","ゔぃぇ","ヴィェ"],["vya","ゔゃ","ヴャ"],["vyu","ゔゅ","ヴュ"],["vyo","ゔょ","ヴョ"],["gye","ぎぇ","ギェ"],["gwa","ぐぁ","グァ","げょ","グヮ"],["gwi","ぐぃ","グィ"],["gwe","ぐぇ","グェ"],["gwo","ぐぉ","グォ"],["geo","げぉ","ゲォ"],["geyo","げょ","ゲョ"],["je","じぇ","ジェ"],["dyu","でゅ","デュ"],["du","どぅ","ドゥ","ず","ズ"],["bye","びぇ","ビェ"],["pye","ぴぇ","ピェ"]]

        i=0;
        for(kz in INPArr){
            if(reNihonSiki.test(kz)){
                i++;
                kzNew=kz.replace(reNihonSiki,function($0){ return hashNihonSiki[$0] })
                if(INPArr[kzNew]) INPArr[kzNew] += INPArr[kz]
                else INPArr[kzNew]=INPArr[kz]
            }
        }
        INPArr.aduma= "東";
        INPArr.du   = "連付頭積図詰尽鶴漬";
        INPArr.idu  = "出厳";　
        INPArr.kadu = "一和";
        INPArr.di   = "治痔";
        var addKanas = function (hira, kata, sokuon){
            var kanas　= [dbi[1]+hira, dbi[2]+kata]
            if(dbi.length > 4) kanas.push(dbi[3]+hira, dbi[4]+kata)
            else if(dbi.length > 3) kanas.push(dbi[3]+kata)
                    Rom[dbi0+'k']=Rom[dbi0+'s']=Rom[dbi0+'t']=Rom[dbi0+'p']=Rom[dbi0+'c']= kanas
                    sokuon.push(dbi0+'k(?=k|$)', dbi0+'s(?=s|$)', dbi0+'t(?=ch|t|$)', dbi0+'c(?=ch|$)', dbi0+'p(?=p|$)')
        }
    
        for (var i=0, drkL=dbRom2Kana.length; i < drkL; i++){
            dbi=dbRom2Kana[i]
            dbi0=dbi[0]
            Rom[dbi0] =dbi.slice(1)
            if (dbi0 != 'n') {
                addKanas('っ', 'ッ', aSokuon)
                RomSum.push(dbi0)
                vowel = dbi0.slice(-1)
                if(vowel=='o') vowel='u'
                dbi0 += vowel
                hiraVowel = Rom[vowel][0]
                Rom[dbi0]=[dbi[1]+hiraVowel, dbi[2]+'ー']
                if (dbi.length > 4) 
                    Rom[dbi0].push(dbi[3]+hiraVowel, dbi[4]+'ー')
                else if (dbi.length > 3)
                    Rom[dbi0].push(dbi[3]+'ー')
                aChoon.push(dbi0)
                addKanas(hiraVowel+'っ', 'ーッ', aChoonSokuon)
            }
        }
        Rom["n'"]=Rom.n;
        Rom.wo.unshift("を","ヲ");
        Rom.la=Rom.xa=["ぁ","ァ"];
        Rom.li=Rom.xi=["ぃ","ィ"];
        Rom.lu=Rom.xu=["ぅ","ゥ"];
        Rom.le=Rom.xe=["ぇ","ェ"];
        Rom.lo=Rom.xo=["ぉ","ォ"];
        Rom.lya=Rom.xya=["ゃ","ャ"];
        Rom.lyu=Rom.xyu=["ゅ","ュ"];
        Rom.lyo=Rom.xyo=["ょ","ョ"];
        Rom.ltu=Rom.xtu=["っ","ッ"];
        reRomHira = RegExp(sRomN
                          +aSokuon.join("|")
                          +"|"+RomSum.join("|")
                          +sxtu
                          ,"g");
        reRomKata = RegExp(sRomN
                          +aChoon.join("|")
                          +"|"+aSokuon.join("|")
                          +"|"+aChoonSokuon.join("|")
                          +"|"+RomSum.join("|")
                          +sxtu
                          ,"g");
    }
    _construct();
};

/**
 * $Id$
 *
 * Korean IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
VirtualKeyboard.Langs.KR = new function () {
    var self = this;
    self.Jamo = {'ㄱ':[14,44032,1],'ㄲ':[6,44620,2],'ㄳ':[4,-1,3],'ㄴ':[14,45208,4],'ㄵ':[4,-1,5],'ㄶ':[4,-1,6],'ㄷ':[6,45796,7],'ㄸ':[2,46384,0],'ㄹ':[14,46972,8],'ㄺ':[4,-1,9],'ㄻ':[4,-1,10],'ㄼ':[4,-1,11],'ㄽ':[4,-1,12],'ㄾ':[4,-1,13],'ㄿ':[4,-1,14],'ㅀ':[4,-1,15],'ㅁ':[6,47560,16],'ㅂ':[14,48148,17],'ㅃ':[2,48736,0],'ㅄ':[4,-1,18],'ㅅ':[14,49324,19],'ㅆ':[6,49912,20],'ㅇ':[6,50500,21],'ㅈ':[6,51088,22],'ㅉ':[2,51676,0],'ㅊ':[6,52264,23],'ㅋ':[6,52852,24],'ㅌ':[6,53440,25],'ㅍ':[6,54028,26],'ㅎ':[6,54616,27],'ㅏ':[1,0,0],'ㅐ':[1,28,0],'ㅑ':[1,56,0],'ㅒ':[1,84,0],'ㅓ':[1,112,0],'ㅔ':[1,140,0],'ㅕ':[1,168,0],'ㅖ':[1,196,0],'ㅗ':[1,224,0],'ㅛ':[1,336,0],'ㅜ':[1,364,0],'ㅠ':[1,476,0],'ㅡ':[1,504,0],'ㅣ':[1,560,0]}
    self.VV2V = [0,0,0,0,0,0,0,0,0,224,224,224,0,0,364,364,364,0,0,504,0]
    self.V2VV = [0,0,0,0,0,0,0,0,{'ㅏ':252,'ㅐ':280,'ㅣ':308},0,0,0,0,{'ㅓ':392,'ㅔ':420,'ㅣ':448},0,0,0,0, {'ㅣ':532},0,0]
    self.CV2C = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('')
    self.C2CC = {'ㄱ':'ㄲ','ㄷ':'ㄸ','ㅂ':'ㅃ','ㅅ':'ㅆ','ㅈ':'ㅉ'}
    self.CC2C = {'ㄲ':'ㄱ','ㄸ':'ㄷ','ㅃ':'ㅂ','ㅆ':'ㅅ','ㅉ':'ㅈ'}
    self.PP2P = [0,0,1,1,0,4,4,0,0,8,8,8,8,8,8,8,0,0,17,0,19,0,0,0,0,0,0,0]
    self.PP2PC= [0,[0,44032],[0,44620],[1,49324],[0,45208],[4,51088],[4,54616],[0,45796],[0,46972],[8,44032],[8,47560],[8,48148],[8,49324],[8,53440],[8,54028],[8,54616],[0,47560],[0,48148],[17,49324],[0,49324],[0,49912],[0,50500],[0,51088],[0,52264],[0,52852],[0,53440],[0,54028],[0,54616]]
    self.P2PP = [0,{'ㄱ':2, 'ㅅ':3},0,0,{'ㅈ':5, 'ㅎ':6},0,0,0,{'ㄱ':9,'ㅁ':10,'ㅂ':11,'ㅅ':12,'ㅌ':13,'ㅍ':14,'ㅎ':15},0,0,0,0,0,0,0,0,{'ㅅ':18},0,{'ㅅ':20},0,0,0,0,0,0,0,0]

   /**
    * 1 -sh
    * 2 -jot
    * 4 -w
    * 8 -
    * 16 -
    */
    self.flags = 0 //for some crosstalk

    self.parseHangul = function (bufchar) {
        if(bufchar=='' || bufchar.length>1) return null
        var code=bufchar.charCodeAt()
        if(code<0x3131 || code >0xD7A3) return null // non Korean buffer
        else if(code<0x314F && code>0x3130) return [self.Jamo[bufchar][1],-1,0] // consonant in buffer
        code -= 44032
        var arr=[]
        arr[0]=44032+588*(code / 588 >>0)
        code %= 588
        arr[1]= 28*(code / 28 >>0)
        arr[2]= code % 28
        return arr
    }
    self.charProcessor  = function (chr, buf, CVC, rukbd) {
        var jamo=self.Jamo[chr]
        if (!CVC) CVC=self.parseHangul(buf)
        if (CVC==null) {
            if (!jamo) {
                return [chr,0]
            } else {
                if(jamo[0] & 2) return [chr,1] //can start a syllable
                else return [chr,0]
            }
        } else { // full buf
            if (chr=='\u0008'){
                if (CVC[2]) {
                    return [ String.fromCharCode( CVC[0]+CVC[1]+self.PP2P[CVC[2]]), 1] 
                } else if(CVC[1]>-1){
                    var VV2V=self.VV2V[CVC[1]/28]
                    if(VV2V) 
                        return [String.fromCharCode(CVC[0]+VV2V), 1]
                    else 
                        return [self.CV2C[(CVC[0]-44032)/588], 1]
                } else if(self.CC2C[buf]) {
                    return [self.CC2C[buf],1]
                } else {
                    self.flags=0
                    return['',0] 
                }
            } else if(!jamo){
                self.flags=0
                return [buf+chr,0]
            } else if(CVC[2]) { // [CVC]
                if (jamo[0] & 2) { //[CVC] +C
                    var P2PP = self.P2PP[CVC[2]][chr]    
                    if(P2PP) return [ String.fromCharCode( CVC[0]+CVC[1]+P2PP), 1] // [CVCC]
                    else return [buf+chr, 1] // CVC, [C]
                } else if (jamo[0] & 1) {// [CVC] +V
                    if(rukbd && CVC[2]==21) 
                        return [buf+String.fromCharCode(50500+jamo[1]),1]

                    return [ String.fromCharCode( CVC[0]+CVC[1]+self.PP2PC[CVC[2]][0])
                            +String.fromCharCode( self.PP2PC[CVC[2]][1]+self.Jamo[chr][1])
                            ,1] // CV(P) [PV]
                } else { // [CVC] + PP
                        return [buf+chr, 0]
                }
            } else if(CVC[1]>-1) { // [CV]
                self.flags &=~ 3
                if (jamo[0] & 4) { // [CV] +P
                    return [String.fromCharCode(CVC[0]+CVC[1]+jamo[2]), 1] // [CVC]
                } else if(jamo[0] & 1) { // [CV]+V
                    if (rukbd) {
                        var vow
                        if (self.flags & 4 && (vow='\u3153\u3154\u3163'.indexOf(chr))!=-1) {//weo, we, wi
                            self.flags &=~4
                            return [String.fromCharCode(CVC[0]+[392,308,448][vow]),1]
                        }
                    }
                    var V2VV = self.V2VV[CVC[1]/28][chr]
                    if (V2VV) {// [CVV]
                        //self.flags &=~7
                        return [String.fromCharCode(CVC[0]+V2VV), 1] 
                    } else {// CV,[V]
                        if (rukbd) {
                            //self.flags &=~7
                            return [buf+String.fromCharCode(50500+jamo[1]),1]
                        }
                        else return [buf+chr, 0] 
                    }
                }
                else return [buf+chr, 1] //CV [C]
            } else if(jamo[0] & 1) {// [C] +V 
                return [String.fromCharCode(self.Jamo[buf][1]+jamo[1]), 1]
            } else { //[C]+C
                if(buf==chr && self.C2CC[buf]) return [self.C2CC[buf],1]
                else return [buf+chr, 1]
            }
        }
    }
};

/**
 * $Id$
 *
 * Lakhota IME implementation
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
VirtualKeyboard.Langs.LA = new function () {
    var self = this;
    var remap1 = {
 ga:'ǧa',ge:'ǧe',gi:'ǧi','go':'ǧo',gu:'ǧu',Ga:'Ʀa',Ge:'Ʀe',GI:'Ʀi',Go:'Ʀo',Gu:'Ʀu',GA:'ƦA',GE:'ƦE',GI:'ƦI',GO:'ƦO',GU:'ƦU'
,pha:'p\u021fa',pho:'p\u021fo',Pha:'P\u021fa',Pho:'P\u021fo',PHA:'P\u021ea',PHo:'P\u021eo'
,tha:'t\u021fa',tho:'t\u021fo',Tha:'T\u021fa',Tho:'T\u021fo',THa:'T\u021ea',THo:'T\u021eo'
,kha:'k\u021fa',kho:'k\u021fo',Kha:'K\u021fa',Kho:'K\u021fo',KHa:'K\u021ea',KHo:'K\u021eo'
,"a'":'á',"A'":'Á',"e'":'é',"E'":'É',"i'":'í',"I'":'Í',"u'":'ú',"U'":'Ú',"o'":'ó',"O'":'Ó'
    }

    ,remap4c = {
 'phun':'pȟuŋ','Phun':'Pȟuŋ','PHUN':'PȞUŊ'
,'thun':'tȟuŋ','Thun':'Tȟuŋ','THUN':'TȞUŊ'
,'khun':'kȟuŋ','Khun':'Kȟuŋ','KHUN':'KȞUŊ'
,'phún':'pȟúŋ','Phún':'Pȟúŋ','PHÚN':'PȞÚŊ'
,'thún':'tȟúŋ','Thún':'Tȟúŋ','THÚN':'TȞÚŊ'
,'khún':'kȟúŋ','Khún':'Kȟúŋ','KHÚN':'KȞÚŊ'
,'an':'aŋ','An':'Aŋ','AN':'AŊ'
,'in':'iŋ','In':'Iŋ','IN':'IŊ'
,'un':'uŋ','Un':'Uŋ','UN':'UŊ'
,'án':'áŋ','Án':'Áŋ','ÁN':'ÁŊ'
,'ín':'íŋ','Ín':'Íŋ','ÍN':'ÍŊ'
,'ún':'úŋ','Ún':'Úŋ','ÚN':'ÚŊ'
,'h':'\u021f', 'H':'\u021e'
    }

    ,remap0 = {
 'phúŋ':'pȟúŋ','Phúŋ':'Pȟúŋ','PHÚ':'PȞÚŊ'
,'thúŋ':'tȟúŋ','Thú':'Tȟúŋ','THÚŊ':'TȞÚŊ'
,'khúŋ':'kȟúŋ','Khúŋ':'Kȟú','KHÚ':'KȞÚŊ'
,'phúŋ':'pȟúŋ','Phúŋ':'Pȟú','PHÚ':'PȞÚ'
,'thúŋ':'tȟúŋ','Thúŋ':'Tȟú','THÚŊ':'TȞÚ'
,'khúŋ':'kȟúŋ','Khúŋ':'Kȟú','KHÚŊ':'KȞÚ'
,"p'":'pʼ',"P'":'Pʼ'
,"k'":'kʼ',"K'":'Kʼ'
,"t'":'tʼ',"T'":'Tʼ'
,"c'":'cʼ',"C'":'Cʼ'
,"s'":'sʼ',"S'":'Sʼ'
,"š'":'šʼ',"Š'":'Šʼ'
,"\u021f'":'\u021fʼ',"\u021e'":'\u021eʼ'
,"h'":'\u021fʼ',"H'":'\u021eʼ'
    }

    ,remap2 = {
 ph:'ph',Ph:'Ph',PH:'PH'
,th:'th',Th:'Th',TH:'TH'
,kh:'kh',Kh:'Kh',KH:'KH'
,an:'an',An:'An',AN:'AN'
,'in':'in',In:'In',IN:'IN'
,un:'un',Un:'Un',UN:'UN'
,'án':'án','Án':'Án','ÁN':'ÁN'
,'ín':'ín','Ín':'Ín','ÍN':'ÍN'
,'ún':'ún','Ún':'Ún','ÚN':'ÚN'
    }

    ,remap3 = {
 phu:'phu',Phu:'Phu',PHU:'PHU'
,thu:'thu',Thu:'Thu',THU:'THU'
,khu:'khu',Khu:'Khu',KHU:'KHU'
,"phu'":'phú',"Phu'":'Phú',"PHU'":'PHÚ'
,"thu'":'thú',"Thu'":'Thú',"THU'":'THÚ'
,"khu'":'khú',"Khu'":'Khú',"KHU'":'KHÚ'
    }

    ,remap4 = {
 'phun':'phun','Phun':'Phun','PHUN':'PHUN'
,'thun':'thun','Thun':'Thun','THUN':'THUN'
,'khun':'khun','Khun':'Khun','KHUN':'KHUN'
,'phún':'phún','Phún':'Phún','PHÚN':'PHÚN'
,'thún':'thún','Thún':'Thún','THÚN':'THÚN'
,'khún':'khún','Khún':'Khún','KHÚN':'KHÚN'
    }

    ,remap = {};

    var __construct = function() {
        var i,k
        var cons ="ǧwštypsdghȟkl'zžčbnmǦWŠTPSDGH\u021eKLZŽČBNM".split('')
        var punct =" .,<>;:\"?`~1!2@3#4$5%6^7&8*9(0)-_=+\|\u00A0".split('')
        for(k in remap0) remap[k]=[remap0[k],0]
        for(k in remap1) remap[k]=[remap1[k],1]
        for(k in remap2) remap[k]=[remap2[k],2]
        for(k in remap3) remap[k]=[remap3[k],3]
        for(k in remap4) remap[k]=[remap4[k],4]
        for(k in remap4c) {
            for(var i=0,cL=cons.length; i<cL; i++) 
                remap[k+cons[i]]=[remap4c[k]+(cons[i]=="'"? "ʼ": cons[i]),1];
            for(var i=0,pL=punct.length; i<pL; i++)
                remap[k+punct[i]]=[remap4c[k]+punct[i],0];
        }
        // clear come memory
        remap0=remap1=remap2=remap3=remap4=remap4c = null
        self.remap = remap;
    }
    __construct();
};
VirtualKeyboard.addLayoutList(
{code:'SQ-AL'
,name:'Albanian'
,normal:'\\1234567890-=]qwertzuiopç@asdfghjklë[yxcvbnm,./'
,shift:{0:'|!"#$%^&*()_+}',25:'\'',36:'{',44:';:?'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|',24:'÷×',27:'đĐ[]',33:'łŁ$ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsştţCÇSŞTŢ ¸'}},
{code:'AR-SA'
,name:'Arabic (101)'
,normal:'ذ1234567890-=\\ضصثقفغعهخحجدشسيبلاتنمكطئءؤرىةوزظ'
,shift:{0:'ّ!@#$%^&*)(_+|ًٌَُلإإ‘÷×؛<>ٍِ][لأأـ،/:"~ْ}{لآآ’,.؟'}},
{code:'AR-SA'
,name:'Arabic (102) AZERTY'
,normal:'>&é"\'(-è_çà)=ذضصثقفغعهخحجدشسيبلاتنمكطئءؤرىةوزظ'
,shift:{0:'<1234567890°+ًٌَُّلإإ‘÷×؛}{\\',28:'][لأأـ،/:"~ٍِْلآآ’,.؟'}
,alt:{4:'¤',14:'َّًّُّٌّ',39:'ِّٍّ'}},
{code:'AR-IQ'
,name:'Arabic'
,normal:'ذ1234567890-=\\ضصثقفغعهخحجدشسيبلاتنمكطئءؤرﻻىةورظ'
,shift:{0:'ّ!@#$%^&*)(_+|ًٌَُﻹإ‘÷×؛<>ٍِ[]ﻷأـ،/:"~ْ{}ﻵآ’,.؟'}},
{code:'HY-AM'
,name:'Armenian Eastern'
,normal:'՝:ձյ՛,-.«»օռժ\'խւէրտեըիոպչջասդֆքհճկլթփզցգվբնմշղծ'
,shift:{0:'՜1',4:'349և()',13:'՞'}},
{code:'HY-AM'
,name:'Armenian Western'
,normal:'՝:ձյ՛,-.«»օռժ\'խվէրդեըիոբչջաստֆկհճքլթփզցգւպնմշղծ'
,shift:{0:'՜1',4:'349և()',13:'՞'}},
{code:'AZ'
,name:'Azeri Latin'
,normal:'`1234567890-=\\qüertyuiopöğasdfghjklıəzxcvbnmçş.'
,shift:{0:'~!"Ⅶ;%:?*()_+/',21:'İ',46:','}},
{code:'AZ'
,name:'Azeri Cyrillic'
,normal:'`1234567890-=\\јүукенгшһзхҹфывапролджҝәчсмитғбө.'
,shift:{0:'~!"№;%:?*()_+/',46:','}},
{code:'BE-BY'
,name:'Belarusian'
,normal:'ё1234567890-=\\йцукенгшўзх\'фывапролджэячсмітьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}},
{code:'FR-BE'
,name:'Belgian (Comma)'
,normal:'²&é"\'(§è!çà)-µazertyuiop^$qsdfghjklmùwxcvbn,;:='
,shift:{0:'³1234567890°_£',24:'¨*',36:'%',43:'?./+'}
,alt:{1:'|@#{[^',9:'{}',13:'`',16:'€',24:'[]',36:'´',46:'~'}
,dk:{'^':'eêuûiîoôaâEÊUÛIÎOÔAÂ ^','¨':'eëuüiïyÿoöaäEËUÜIÏOÖAÄ ¨','´':'eéuúiíyýoóaáEÉUÚIÍYÝOÓAÁ ´','`':'eèuùiìoòaàEÈUÙIÌOÒAÀ `','~':'nñoõaãNÑOÕAÃ ~'}},
{code:'FR-BE'
,name:'Belgian French'
,normal:'²&é"\'(§è!çà)-µazertyuiop^$qsdfghjklmùwxcvbn,;:='
,shift:{0:'³1234567890°_£',24:'¨*',36:'%',43:'?./+'}
,alt:{1:'|@#{[^',9:'{}',13:'`',16:'€',24:'[]',36:'´',46:'~'}
,dk:{'^':'eêuûiîoôaâEÊUÛIÎOÔAÂ ^','¨':'eëuüiïyÿoöaäEËUÜIÏOÖAÄ ¨','´':'eéuúiíyýoóaáEÉUÚIÍYÝOÓAÁ ´','`':'eèuùiìoòaàEÈUÙIÌOÒAÀ `','~':'nñoõaãNÑOÕAÃ ~'}},
{code:'NL-BE'
,name:'Belgian (Period)'
,normal:'²&é"\'(§è!çà)-µazertyuiop^$qsdfghjklmùwxcvbn,;:='
,shift:{0:'³1234567890°_£',24:'¨*',36:'%',43:'?./+'}
,alt:{1:'|@#{[^',9:'{}',13:'`',16:'€',24:'[]',36:'´',46:'~'}
,dk:{'^':'eêuûiîoôaâEÊUÛIÎOÔAÂ ^','¨':'eëuüiïyÿoöaäEËUÜIÏOÖAÄ ¨','´':'eéuúiíyýoóaáEÉUÚIÍYÝOÓAÁ ´','`':'eèuùiìoòaàEÈUÙIÌOÒAÀ `','~':'nñoõaãNÑOÕAÃ ~'}},
{code:'BN-IN'
,name:'BN Inscript Improved'
,normal:'‍১২৩৪৫৬৭৮৯০-ৃ\\ৌৈাীূবহগদজড়োে্িুপরকতচটৎংমনবলস,.য়'
,shift:{0:'‌',9:'()ঃঋ|ঔঐআঈঊভঙঘধঝঢঞওএঅইউফঢ়খথছঠ?ঁণ',43:'শষ।য'}},
{code:'BN-IN'
,name:'Bengali (Inscript)'
,normal:'১২৩৪৫৬৭৮৯০-ৃৌৈাীূবহগদজড়োে্িুপরকতচটংমনবলস,.য়'
,shift:{1:'!@',4:'র্জ্ঞত্রক্ষশ্র()ঃঋ',14:'ঔঐআঈঊভঙঘধঝঢঞওএঅইউফ',33:'খথছঠ',38:'ঁণ',43:'শষ',46:'য'}},
{code:'BN-IN'
,name:'Probhat Phonetic'
,normal:'‍১২৩৪৫৬৭৮৯০-=‌দূীরটএুিওপেোাসডতগহজকল;\'য়শচআবনম,।্'
,shift:{0:'~!@#৳%^ঞৎ()_+॥ধঊঈড়ঠঐউইঔফৈৌঅষঢথঘঃঝখং:"যঢ়ছঋভণঙৃঁ?'}},
{code:'BN-BD'
,name:'Unijoy'
,normal:'‌১২৩৪৫৬৭৮৯০-=ৎঙযডপটচজহগড়ৃুিা্বকতদ;\'্োেরনসম,./'
,shift:{0:'‍!@#৳%÷ঁ×()_+ঃংয়ঢফঠছঝঞঘঢ়',26:'্রূীঅ।ভখথধ:"',38:'ৌৈলণষশ<>?'}},
{code:'BN-IN'
,name:'Bengali'
,normal:'1234567890-ৃৌৈাীূবহগদজড়োে্িুপরকতচটংমনবলস,.য'
,shift:{3:'্রর্জ্রত্ষক্রশ্র()ঃঋ',14:'ঔঐআঈঊভঙঘধঝঢঞওএঅইউফ',33:'খথছঠ',38:'ঁণ',43:'শষ{য়'}
,alt:{1:'১২৩৪৫৬৭৮৯০',12:'ৢ',14:'ৗ',17:'ৣ',24:'ড়',26:'৴৶৸ৢ',32:'ৰ',38:'৺'}
,shift_alt:{12:'ৠ',17:'ৡ',24:'ঢ়',26:'৵৷৹ঌ',32:'ৱ'}},
{code:'BLA'
,name:'Blackfoot Phonetic'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,᙮/'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,'cbk':/**
 * $Id$
 *
 * Blackfoot char processor
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
new function () {
    var reNotBLA = /[^aehikmnopstwy]/
       ,remap={
           i:'ᖱ','ᐤi':'ᑯ','ᐨi':'ᒧ','ᘁi':'ᖽ','ᐢi':'ᒍ','ᐡi':'ᖹ','ᔈi':'ᓱ',yi:'ᔪ',wi:'ᖵ'
           ,'ᖳi':'ᖳᐟ','ᖰi':'ᖰᐟ','ᖲi':'ᖲᐟ','ᑫi':'ᑫᐟ','ᑭi':'ᑭᐟ','ᑲi':'ᑲᐟ','ᒣi':'ᒣᐟ','ᒥi':'ᒥᐟ','ᒪi':'ᒪᐟ','ᖿi':'ᖿᐟ','ᖼi':'ᖼᐟ','ᖾi':'ᖾᐟ','ᒉi':'ᒉᐟ','ᒋi':'ᒋᐟ','ᒐi':'ᒐᐟ','ᖻi':'ᖻᐟ','ᖸi':'ᖸᐟ','ᖺi':'ᖺᐟ','ᓭi':'ᓭᐟ','ᓯi':'ᓯᐟ','ᓴi':'ᓴᐟ','ᔦi':'ᔦᐟ','ᔨi':'ᔨᐟ','ᔭi':'ᔭᐟ','ᖷi':'ᖷᐟ','ᖴi':'ᖴᐟ','ᖶi':'ᖶᐟ'
           ,'ᖳo':'ᖳᐠ','ᖰo':'ᖰᐠ','ᑫo':'ᑫᐠ','ᑭo':'ᑭᐠ','ᒣo':'ᒣᐠ','ᒥo':'ᒥᐠ','ᖿo':'ᖿᐠ','ᖼo':'ᖼᐠ','ᒉo':'ᒉᐠ','ᒋo':'ᒋᐠ','ᖻo':'ᖻᐠ','ᖸo':'ᖸᐠ','ᓭo':'ᓭᐠ','ᓯo':'ᓯᐠ','ᔦo':'ᔦᐠ','ᔨo':'ᔨᐠ','ᖷo':'ᖷᐠ','ᖴo':'ᖴᐠ'
        }
       ,submap={
         //s:'Ꮝ'
         //nah:'Ꮐ'
           a:'ᖳ',e:'ᖰ',o:'ᖲ'
           ,'ᐤa':'ᑫ','ᐤe':'ᑭ','ᐤo':'ᑲ'
           ,'ᐨa':'ᒣ','ᐨe':'ᒥ','ᐨo':'ᒪ'
           ,'ᘁa':'ᖿ','ᘁe':'ᖼ','ᘁo':'ᖾ'
           ,'ᐢa':'ᒉ','ᐢe':'ᒋ','ᐢo':'ᒐ'
           ,'ᐡa':'ᖻ','ᐡe':'ᖸ','ᐡo':'ᖺ'
           ,'ᔈa':'ᓭ','ᔈe':'ᓯ','ᔈo':'ᓴ'
           ,ya:'ᔦ',ye:'ᔨ',yo:'ᔭ'
           ,wa:'ᖷ',we:'ᖴ',wo:'ᖶ'
           ,'ᐤy':'ᐤy','ᐨy':'ᐨy','ᘁy':'ᘁy','ᐢy':'ᐢy','ᐡy':'ᐡy','ᔈy':'ᔈy'
           ,'ᐤs':'ᐤs','ᐨs':'ᐨs','ᘁs':'ᘁs','ᐢs':'ᐢs','ᐡs':'ᐡs','ᔈs':'ᔈs'
           ,'ᐤw':'ᐤw','ᐨw':'ᐨw','ᘁw':'ᘁw','ᐢw':'ᐢw','ᐡw':'ᐡw','ᔈw':'ᔈw'
           ,p:'ᐤ',t:'ᐨ',k:'ᘁ',m:'ᐢ',n:'ᐡ',s:'ᔈ',h:'ᑊ'
           ,'ᑊk':'ᐦ'
          //tl:1, dl:1, ts:1, ds:1, qu:1, kw:1, gw:1, hn:1
        }
       ,premap={
            'ᖲo':'ᖲᖲ','ᑲo':'ᑲᖲ','ᒪo':'ᒪᖲ','ᖾo':'ᖾᖲ','ᒐo':'ᒐᖲ','ᖺo':'ᖺᖲ','ᓴo':'ᓴᖲ','ᔭo':'ᔭᖲ','ᖶo':'ᖶᖲ'
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
}},
{code:'BS-BA'
,name:'Bosnian'
,normal:'¸1234567890\'+žqwertzuiopšđasdfghjklčćyxcvbnm,.-'
,shift:{0:'¨!"#$%&/()=?*',44:';:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',24:'÷×',29:'[]',33:'łŁ',36:'ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsşCÇSŞ ¸'}},
{code:'BG'
,name:'Bulgarian (Latin)'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}},
{code:'BG'
,name:'Bulgarian'
,normal:'`1234567890-.(,уеишщксдзц;ьяаожгтнвмчюйъэфхпрлб'
,shift:{0:'~!?+"%=:/_№ІV)ы',25:'§'}},
{code:'FR-CA'
,name:'Canadian French (Legacy)'
,normal:'°1234567890-=àqwertyuiop^çasdfghjkl;èzxcvbnm,.é'
,shift:{1:'!"#$%?&*()_+',35:':',44:'\''}
,alt:{0:'¬¹@³¼½¾{[]}|¸`',17:'¶',19:'¥',22:'øþ°~æßðª',35:'´',37:'«»¢',43:'µ<>/'}
,shift_alt:{1:'¡²£¤',9:'±',11:'¿',17:'®',25:'¨',27:'§',39:'©',43:'º'}
,dk:{'¸':'cçCÇ','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'EN-CA'
,name:'Canadian French'
,normal:'#1234567890-=<qwertyuiop^¸asdfghjkl;`zxcvbnm,.é'
,shift:{0:'|!"/$%?&*()_+>',25:'¨',35:':',44:'\''}
,alt:{0:'\\±@£¢¤¬¦²³¼½¾}',22:'§¶[]',35:'~{',43:'µ¯­´'}
,dk:{'^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','¸':'cçCÇ ¸','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´'}},
{code:'EN-CA'
,name:'Canadian Multilingual Standard'
,normal:'/1234567890-=àqwertyuiop^çasdfghjkl;èzxcvbnm,.é'
,shift:{0:'\\!@#$%?&*()_+',24:'¨',35:':',44:'\'"'}
,alt:{0:'|',4:'¤',7:'{}[]',12:'¬',16:'€',24:'`~',35:'°',37:'«»',44:'<>'}
,dk:{'^':'cĉaâhĥjĵgĝsŝwŵeêuûiîyŷoôCĈAÂHĤJĴGĜSŜWŴEÊUÛIÎYŶOÔ ^','¨':'aäeëuüiïyÿoöAÄEËUÜIÏYŸOÖ ¨','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~'}},
{code:'CE'
,name:'Chechen Cyrillic'
,normal:'ё1234567890-ъэяшертыуиопющасдфгчйкльжзхцвбнм,.І'
,shift:{1:'!@#$%^&*()_',44:'<>'}},
{code:'CE'
,name:'Chechen Latin'
,normal:'äċçġẋöņşü-ƶqwErtyuiopǝasDfghjkl;\'zxCvbnm,./'
,shift:{3:'Ç̇',6:'Q̇',8:'ŋ',11:'_',13:'UO',24:'ƏIE',35:':"',44:'<>?'}},
{code:'CHR'
,name:'Cherokee Phonetic'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,'cbk':/**
 * $Id$
 *
 * Cherokee char processor
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
new function () {
    var reNotCHR = /[^adeghik-oqs-wyz]/
       ,remap = {
            a:'Ꭰ',e:'Ꭱ',i:'Ꭲ',o:'Ꭳ',u:'Ꭴ',v:'Ꭵ'
           ,ga:'Ꭶ',ka:'Ꭷ',ge:'Ꭸ',gi:'Ꭹ',go:'Ꭺ',ge:'Ꭻ',gv:'Ꭼ',ke:'Ꭸ',ki:'Ꭹ',ko:'Ꭺ',ke:'Ꭻ',kv:'Ꭼ'
           ,ha:'Ꭽ',he:'Ꭾ',hi:'Ꭿ',ho:'Ꮀ',hu:'Ꮁ',hv:'Ꮂ'
           ,la:'Ꮃ',le:'Ꮄ',li:'Ꮅ',lo:'Ꮆ',lu:'Ꮇ',lv:'Ꮈ'
           ,ma:'Ꮉ',me:'Ꮊ',mi:'Ꮋ',mo:'Ꮌ',mu:'Ꮍ'
           ,hna:'Ꮏ'
           ,na:'Ꮎ', ne:'Ꮑ',ni:'Ꮒ',no:'Ꮓ',nu:'Ꮔ',nv:'Ꮕ'
           ,qua:'Ꮖ',que:'Ꮗ',qui:'Ꮘ',quo:'Ꮙ',quu:'Ꮚ',quv:'Ꮛ'
           ,kwa:'Ꮖ',kwe:'Ꮗ',kwi:'Ꮘ',kwo:'Ꮙ',kwu:'Ꮚ',kwv:'Ꮛ'
           ,gwa:'Ꮖ',gwe:'Ꮗ',gwi:'Ꮘ',gwo:'Ꮙ',gwu:'Ꮚ',gwv:'Ꮛ'
         //,sa:'Ꮝ',se:'Ꮞ',si:'Ꮟ',so:'Ꮠ',su:'Ꮡ',sv:'Ꮢ'
           ,'Ꮝa':'Ꮜ','Ꮝe':'Ꮞ','Ꮝi':'Ꮟ','Ꮝo':'Ꮠ','Ꮝu':'Ꮡ','Ꮝv':'Ꮢ'
           ,da:'Ꮣ',ta:'Ꮤ',de:'Ꮥ',te:'Ꮦ',di:'Ꮧ',ti:'Ꮨ','do':'Ꮩ',du:'Ꮪ',dv:'Ꮫ',to:'Ꮩ',tu:'Ꮪ',tv:'Ꮫ'
           ,dla:'Ꮬ',tla:'Ꮭ',tle:'Ꮮ',tli:'Ꮯ',tlo:'Ꮰ',tlu:'Ꮱ',tlv:'Ꮲ',dle:'Ꮮ',dli:'Ꮯ',dlo:'Ꮰ',dlu:'Ꮱ',dlv:'Ꮲ'
           ,tsa:'Ꮳ',tse:'Ꮴ',tsi:'Ꮵ',tso:'Ꮶ',tsu:'Ꮷ',tsv:'Ꮸ'
           ,dsa:'Ꮳ',dse:'Ꮴ',dsi:'Ꮵ',dso:'Ꮶ',dsu:'Ꮷ',dsv:'Ꮸ'
           ,wa:'Ꮹ',we:'Ꮺ',wi:'Ꮻ',wo:'Ꮼ',wu:'Ꮽ',wv:'Ꮾ'
           ,ya:'Ꮿ',ye:'Ᏸ',yi:'Ᏹ',yo:'Ᏺ',yu:'Ᏻ',yv:'Ᏼ'
        }
       ,submap = {
            s:'Ꮝ'
         //,nah:'Ꮐ'
           ,tl:1, dl:1, ts:1, ds:1, qu:1, kw:1, gw:1, hn:1
        }

   this.charProcessor = function(chr, buf) {
        if (chr=='\u0008') { // backspace
            if (buf.length) {
                return [buf.slice(0,-1),buf.length-1]
            } 
        } else if (reNotCHR.test(chr)){
            return remap[buf+chr] || [buf+chr, 0]
        } else {
            var str=buf+chr
               ,res,cres;
            if (res=remap[str]) {
                return [res,0];
            } else if (res=submap[str]) {
                switch (res) {
                    case 1:
                        return [str, 2];
                    default:
                        return [res,1];
                }
            } else if (res=remap[buf]){
                if (cres=remap[chr])
                    return [res+cres,1]
                else 
                    return [res+chr,1]
            } else {
                return [buf + (remap[chr]||submap[chr]||chr), 1]
            }
        }
    }
}},
{code:'ZH-CN'
,name:'Chinese Cangjie'
,normal:'`1234567890-=\\手田水口廿卜山戈人心[]日尸木火土竹十大中;\'重難金女月弓一,./'
,shift:{0:'~!@#$%^&*()_+|QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?'}
,'cbk':/**
 * $Id$
 *
 * Chinese Cangjie IME
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
{'load' : function () {
     /*
     *  List of the chinese IME suggestions
     */
     var simpList="的一是不了人我在有他这中大来上国个到说们为子和你地出道也时年得就那要下以生会自着去之过家学对可她里后小么心多天而能好都然没日于起还发成事只作当想看文无开手十用主行方又如前所本见经头面公同三已老从动两长知民样现分将外但身些与高意进把法此实回二理美点月明其种声全工己话儿者向情部正名定女问力机给等几很业最间新什打便位因重被走电四第门相次东政海口使教西再平真听世气信北少关并内加化由却代军产入先山五太水万市眼体别处总才场师书比住员九笑性通目华报立马命张活难神数件安表原车白应路期叫死常提感金何更反合放做系计或司利受光王果亲界及今京务制解各任至清物台象记边共风战干接它许八特觉望直服毛林题建南度统色字请交爱让认算论百吃义科怎元社术结六功指思非流每青管夫连远资队跟带花快条院变联言权往展该领传近留红治决周保达办运武半候七必城父强步完革深区即求品士转量空甚众技轻程告江语英基派满式李息写呢识极令黄德收脸钱党倒未持取设始版双历越史商千片容研像找友孩站广改议形委早房音火际则首单据导影失拿网香似斯专石若兵弟谁校读志飞观争究包组造落视济喜离虽坐集编宝谈府拉黑且随格尽剑讲布杀微怕母调局根曾准团段终乐切级克精哪官示冲竟乎男举客证苦照注费足尔招群热推晚响称兴待约阳哥惊吗整支古汉突号绝选吧参刊亚复伤类备欢另港势刻星断陈掌农夜般念价脑规底故省妈刚句显消衣陆器确破具居批送泽紧帮线存愿奇害增杨料州节左装易著急久低岁需酒河初游严铁族除份敢胡血企仍投闻斗纪脚右苏标饭云病医阿答土况境软考娘村刀击仅查引朝育续独罗买户护喝朋供责项背余希卫列图室乱刘爷龙咱章席错兄暗创排春须承案忙呼树痛沉啊灵职乡细诉态停印笔夏助福块冷球姑划既质巴致湾演木韦怪围静旁园否副辑采食登够赛米假较姐楼获孙宣穿诗歌速忽堂敌试谢央怀顾验营止姓养丽属景郭依威按恶慢座罪维渐胜藏皇街激异摘角瞧负施模草某银露阵值班层修差味织药馆密亮律习田简免毒归波型屋换救寄帝退洋丝湖睡劳妇伯尼皮祖雄婚康评追哈络店翻环礼跑超叶压占均永烈奖婆赶富兰录画遇顿艺普判源亿素船继尚嘴察雨优您险烟阶担散板钟访妹伸佛限讨临吴摇跳曲练构玩玉犯厂肯协幸挥效齐封温疑肉攻纸策充顶寻宁沙防抓例股卖顺警梦剧善蒙票良范坚端靠杂贵怒稿拍率旧掉啦莫授守油恩积益县哭罢庭窗扬忘午卡雪菜牌牛脱博丈弹洲松坏邓鲜短毕置楚欧略智岛抗妻抱载败枪适虚预睛刺爹纷介括销降鱼奔忍宗盘耳野讯配禁索赵默徒架灯峰状款移爸托洪升伙订毫狐镇床互套旅逃骂输唱靖秘词困泪熟财鬼骨申欲征私舞秋巨迎秀搞丁吸审遍墙朱圣避跃忌桌执悲域晓弄亡桥辈闪隐劲闹恐呀付敬监厅库震材冰醒庆绿腿述徐尊硬额误借纳折售遗暴缺迷鲁探货童缓伟君庄凡危烧彩抢控胸戏篇趣束谓概射课洞麻杯透邮荣懂拥献洗休迫叹狗偷阴汽拜横鼓健厚签丹洛喊蓉轮岸奶淡潮训圆卷释诸妙唯夺逐燕呆测浪抽盖偏阅购途纵耶摸挂航择恨舍拳竹唐誉乘弱检宫仪旗含袁址摆奥番混灭握牙虑召猛宽盛核袋绍补典圈丰雅吉赞茶亦谷稳汇厉届迹雷序寒附鸡遭挑肩忆柔戴惜隔豪诚瑞减播麼针棋竞臂挺操腰狂替梅固伦宋钢诺残延虎迅灾悄岳乔川仇季吹粮聚译珠叔谋础仁损融辆净敏伊仙巧零累享伴荡珍勇末奋胆弃烦糊犹税培抵僧锋乃遥摩坦後眉餐惯凭冠抬碰币启码冒汗俗灰督穷颇倾尖韩贸仿孤飘漫予紫侧沿拔袖梁赏幕壁旦晨纯闭凉扫尤炮碗贴插滚缘寺贝润氏冬扩栏荒哲逼吓堆撞郎俩蓝闲辛镜陪骑蛋促羊宜嘛颜贫幅驻萍污杰扑壮萨刑忧貌狱塞凤孔触恋岂森繁碎津侠隆迟辉狠析缩穴萧怨磨伏辞泥龄径鼻赖仰愤慕俄映询惨麦宿倍粗腾稍截染乌愈岗柳铺涉疾挡奉踏忠伍躲籍努朗箱裁帐兼彼霞猪悉扎劝薄筑俊鞋距侵欣挤媒吐魂洁枝盈阻陷甲郑鸣倘剩颗拖舒惠昏振戒丧焦爬凌慧偶晃桃赤烂骗措页凶泰尸坡勒疗塔尘躺殊慰坛甘咬拒彪炸井崇饮祝汪牢桂尾漂聊撒恰凝矛於宾绪彭肚匆描粉贼乏盾愁斜裂滑斐废寂涌详汤彻玄斤轰奸怜朵佳皆鸟邦扶毁聪辩瓶饿蛇捕搬沈枫舅幽魔琴挣聘弯墓欺悟蒋臣返违亏丢援赫魏耐佩酸盟胖傻绕哼秦屈辱昨瘦暂箭署赴递猜潜鸿绩耀涂割豆闷亭祥励宇泛狼悔搭舰浮牵符肃奴爆姊幼夹邀疯允恼租椅尺侍腐颤扭菲瓦擦辣奏殷埋摔盼吟渡衫跨醉艰掩荷苍旋揭桑仗莲钻宏幻刃峡辽娃凯患障丐衡猫丑涛暖溜锅奈罚拾浓键脉锁邻臭芳垂捉恢姆砍驾恭挨祸曹慈抖泉览澳脏疼铜羞档抛苗惑肥驱窝裤估胞柄阔杜勤舟帽玛撤频禅柯莱堪寸哀熊腹尝敲勃巡盗筹扣池浅柴埃嫁枚稀雕厌瓜寿跌扯董锦鉴刷趋捐傲贯殿拨逊踢赔姿迁黎祭滴袭慌鞭茫逢屠昆柏驶咐植惧纽捷圳牲踪丛漠锐喇乾霍湿睁仔吵悠沟墨串俱陶贡浑赢屁驰棒匹拼恒邪脆糟扮贤饰偿拆缠摄拟滋嘿旨闯贺翠缝饱劫抚挖册叛肖熙炼宪庙碧盒谊储冯唤贪卧翼扰胁跪碑呵甜洒谱莎娜阁庸鹏覆玲侯抹卢碍综丘晕拦燃昌吞嫌狄押舌琳雾曼耻柜摊削戚杆岩喂扔逝诞悬爽崔廷凑痴盆御酷艾唉姥笼颠姻携愧芬穆扇郁掷怔芯鼠纠疆曰傅袍唇稣捧勾牧儒慨筋柱卑咽吨虫绳厨冤涨皱疲赌饶矿畅煤腕喷遣浩翁咨镖屏仲嘻吩棉孟撑炉泄葬搜添遵迪伪兆欠谅炎氛杖瞎钓肠披剥誓赚役泡逆矮吊填嘉烛厦夕衰液薛仆迈齿谨呈昂抄弥渴梯疏耗瞪斥夸蒂剪娶痕弗姚债妥璃掏刹晶衷肤鹿拓卓症糖钦绵哩诱枯歇塑妨豫抑珊棍晋淋悦敦艳玻砸嚷盲辨葛罕矩泳宅贷膀捏颈践脖贾轿脾堡娇浙劣潇赐陀蓄坟颂漏杭茅砖瞬鹤辟渔乖霸襄炒哑浦饼牺滩钉吁锡赠哄铃顽殖鹰蔡催芙彬拚轨哟歉盯硕惹契愚帅惶憾懒姨喘兽陌罩猎嵩盐饥凄喉宴腔翰膝陵蜂逻劈廉裹骄贩绘崖辰涯戈坑遮擒蛮芷堵雇挽眠吻孝泊撕虹叙粹勉竭歪慎棵朴械溪莉斑磕寡循斩掠吕昔郊爵徽磁俯谭鼎拂俺嫂帕嗯冻婉桐骆泼匠艇谦妓菩厕俘毅岭丫畏湘桶嗓煌鲍粒巷帘秃腊仓拐绑啥荐倪瑟廊鸭蜜诊棚掀筒媳纹秒沾庞蹲骚歧艘芝哗亩券趟巾淫谎寞灌篮妄搁侄厢叉俞伐宰瞒宙肿漆怖吾吼侨叠啸罐肆裙泣胀赋熬趁咳愉恳辜肌婴羽躬毙拘叮哇晴谜淮旺逸琼姜呜窜颁薪寨尿颊逮卜昭浸刮宛嘱囊寓驳倡浴咕挪搏蓬晌渠兜喃夷沪贱魄舵晰僵糕裔秩倚塌恍钩嘲傍裕煮乳勿竖惩睹株绣妖讶咖纲胎滨耕嗤舱娱匪鸦胃躁狮砰妮凛龟裸嫣甫窑塘纤宠链拱尹掘坝狭铭淳沐馨潘甩榜渊羡侮卿兀喧履猴枉衬畔凳缅弦畜粞溢搂乞旬缚灿舆雁倦酬韵媚堤攀窃嫩遂澄侦陕陋笨匙沫耸踩酱壶啡碌痒鄙壳贞霉蠢芦胳矣焰脊囚辅账佐僚雀撰耍枕捡涵逗粪朦肝蒸滥筷溃隶烤缸弓潭旷哎峻爪怯茂芒肢稻兔圾喻框缴蹈哨颖菊喀妆淹瓷淀蜡嚼剂逛骤暑襟庐苹晒悼昧拢函胧胶抒乒讽歹旱葡惟拣耿廿桩乙谣坠滞孕诵梳冈肺丸霜汁纱衔腻甸啤坎稼禾愣脂萄捞搅屑伞蝶铸躯稚腥藤陡烫梨哦浆僻坊焉隙淘垮滔酿鹅兹捣栋瑰敞癌缆烁玫诈煞膜焚粘摧疫幢汝毯挫纺朽锤兑辫堕笛觅蔽谐氓蔑沸藉卸熄扁炭慷篷眨譬叨蔬绸婿寥浇乓膏膛琢啪淑叭弊灶醋斌奠屯膨沦缕壤冶暇揉萝翔蛛栗荫讥葱巩粥斋迄帜菌铅贿绒侣锻谴汹敷宵讳锣撼亨淌扛杉燥匀渺碟嵌沃剖姬绰嗦绞轴垒噪蕴邵咋坪佣卵昼憋奎捂煎瞅蚀熔虾谬绅镶聋募垄彦翘趴杏彰阐讼枢崭蒲泻俭橡溶瀑扒琛丌丕丙丞丬乇乍乜乩亍亓亘亟亢亥亳亵亸仂仃仄仉仑仕仝仞仟仡仨仫仳仵伉伎伛伢伣伥伧伫伲伶伺伽佃佑佗佘佚佝佞佟佤佥佧佬佯佰佴佶佻佼佾侃侈侉侏侑侔侗侥侩侪侬俅俎俏俐俑俚俜俟俣俦俨俪俫俳俸俾倌倏倔倜倥倨倩倬倭倮偃偈偌偎偕偬偻偾傀傈傣傥傧傩傺僖僦僬僭僮僳儆儇儋儡兕兖兢兮冀冁冉冕冗冢冥冫冱冼冽凇凋凫凰凵凸凹凼凿刁刂刈刍刎刖删刨刬刭刳刽刿剀剁剃剌剐剔剜剞剡剽剿劁劂劐劓劢劬劭劾勋勐勖勘勚勰勺匈匍匏匐匕匚匝匡匣匦匮匾匿卅卉卒卞卟卣卤卦卩卮卯卺厄厉厍厐厘厝厣厥厩厮厶叁叟叩叱叵叻叼叽吆吏吒吖吝吠吡吣吭吮吱吲呃呋呐呒呓呔呕呖呗呙呛呤呦呱呲呶呷呸呻咀咂咄咆咎咏咒咔咙咚咛咝咣咤咦咧咩咪咫咭咯咴咸咻咿哂哆哉哌哏哐哒哓哔哕哙哚哜哝哞哧哮哳哺哽哿唁唆唏唑唔唛唝唠唡唢唣唧唪唬唰唳唷唼唾唿啁啃啄啉啐啕啖啜啧啬啭啮啴啵啶啷啻啼啾喁喈喋喏喑喔喙喟喱喳喵喹喽喾嗄嗅嗉嗌嗍嗑嗒嗔嗖嗜嗝嗟嗡嗣嗥嗨嗪嗫嗬嗯嗲嗳嗵嗷嗽嗾嘀嘁嘈嘌嘎嘏嘘嘞嘟嘣嘤嘧嘬嘭嘶嘹噌噍噎噔噗噘噙噜噢噤噩噫噬噱噶噻噼嚅嚆嚎嚏嚓嚣嚯囔囗囝囟囡囤囫囱囵囹囿圃圄圉圊圜圩圪圬圭圮圯圹圻坂坌坍坜坞坤坨坩坫坭坯坳坶坷坻坼垃垅垆垌垓垛垠垡垢垣垤垦垧垩垫垭垱垲垴垸埂埏埒埔埕埘埙埚埝埠埤埭埯埴埸埽堀堇堋堍堑堙堞堠堰塄塍塥塬塾墀墁墅墉墒墚墟墩墼壅壑壕壬壸壹夂夔夙夤夥夭夯夼奁奂奄奕奘奚奢妁妃妊妍妒妗妞妣妤妩妪妫妯妲妾姒姗姘姝姣姹娄娅娆娈娉娌娑娓娟娠娣娥娩娲娴娼婀婊婕婢婧婪婳婵婶婷婺媛媪媲媵媸媾嫉嫒嫔嫖嫘嫜嫠嫡嫦嫫嫱嬉嬖嬗嬲嬴嬷孀孑孓孙孚孛孜孢孥孪孬孰孱孳孵孺孽宄宓宕宥宦宸寅寇寐寝寤寮寰尉尕尜尢尥尧尬尴尻屃屉屎屐屙屡屣屦屮屹屺屿岈岌岍岐岑岔岖岘岙岚岜岢岣岫岬岱岵岷岽岿峁峄峋峒峙峣峤峥峦峨峪峭崂崃崄崆崎崛崞崤崦崧崩崮崴崽崾嵇嵊嵋嵘嵚嵛嵝嵫嵬嵯嵴嶂嶙嶝嶷巅巍巛巢巫巯巳巽帆帏帑帔帖帙帚帛帧帱帷帻帼幂幄幌幔幛幞幡幺庀庇庋庑庖庚庠庥庳庵庶庹庾廑廒廓廖廛廨廪廴廾弁弈弋弑弘弛弧弩弪弭弼彀彐彖彗彘彝彡彤彳彷徂徇徉徊徕徘徙徜徨徭徵徼忉忏忐忑忒忖忝忡忤忪忭忮忱忸忻忾忿怂怃怄怅怆怊怍怏怙怛怠怡怦怩怫怵怼怿恁恂恃恕恙恚恝恣恤恧恪恫恬恸恹恺恻恽恿悃悌悍悒悖悚悛悝悫悭悮悯悱悴悸悻惆惋惕惘惚惝惦惫惬惭惮惰惴惺愀愆愍愎愕愠愦愫慊慑慝慵憎憔憝憧憨憩憬憷懈懊懋懑懔懦懵懿戆戊戋戌戍戎戕戗戛戟戡戢戤戥戬戮戯戳戽戾扃扈扉扦扪扳扼抉抟抠抡抨抻抿拄拇拈拊拌拎拗拙拧拭拮拯拴拶拷拽挈挎挚挛挜挝挞挟挠挢挦挲挹捃捅捆捋捌捍捎捝捩捭捱捶捺捻掂掇掊掎掐掖掣掬掭掮掰掳掴掸掺掼掾揄揆揍揎揖揞揠揣揩揪揲揶揸揽揾揿搀搋搌搐搓搔搛搠搡搦搪搴搽搿摁摅摈摒摞摭摹摺撂撄撅撇撖撙撩撬撮撵撷撸撺擀擂擅擎擐擗擘擞擢擤攉攒攘攥攫攮攴攵攸敉敕敖敛敝敫斓斛斟斡斧斫旃旄旆旌旎旒旖旭旮旯旰旸昀昃昊昕昙昝昱昴昵昶昽晁晏晔晖晗晟晡晤晦晷晾暄暌暝暧暨暮暹暾曙曛曜曝曦曩曳曷朊朐朔朕札杈杌杓杞杠杩杪杲杳杵杷杼枇枋枘枞枣枥枧枨枭枰枳枵枷枸柁柃柑柒柘柙柚柝柞柠柢柩柬柰柽柿栀栅栈栉栊栌栎栓栖栝栩栲栳栽栾桀桁桄桅桉桊桎桓桔桕桠桡桢桤桦桧桨桫桴桷梃梆梏梓梗梢梧梭梵梼梾梿棁棂棕棘棠棣棰棱棹棺棼椁椋椎椐椒椟椠椤椭椰椴椹椽椿楂楔楗楝楞楠楣楦楫楮楱楷楸楹榀榄榅榆榇榈榉榍榔榕榘榛榧榨榫榭榱榴榷榻槁槊槌槎槐槔槚槛槟槠槭槲槽槿樊樗樘樟樨樯樱樵樽樾橄橇橐橘橙橛橥橱橹橼檀檄檎檐檑檗檠檩檫檬欤欷欹歃歆歙歼殁殂殃殄殆殇殉殍殒殓殚殛殡殪殳殴毂毋毓毖毗毡毪毳毵毹毽氅氆氇氍氐氕氖氘氙氚氟氡氢氤氦氧氨氩氪氮氯氰氲氽汀汆汊汐汔汕汛汜汞汨汩汰汲汴汶汾沁沂沅沆沌沏沓沔沛沣沤沥沧沩沭沮沱沲沼沽泅泌泐泓泔泖泗泞泠泫泮泯泱泵泶泷泸泺泾洄洇洌洎洙洚洧洫洮洱洳洵洹洼洽浃浈浊浍浏浐浒浔浚浜浞浠浣浯浼涅涎涑涓涔涕涝涞涟涠涡涣涤涧涩涪涫涮涸涿淄淅淆淇淖淙淝淞淠淤淦淬淼渌渍渎渑渖渗渚渝渣渤渥渫渭渲湃湄湍湎湓湔湛湟湫湮溅溆溉溏溘溟溥溧溯溱溲溴溷溺溻溽滁滂滇滏滓滕滗滟滠满滢滤滦滪滹漉漓漕漤漩漪漭漯漱漳漶漾潆潋潍潞潢潦潲潴潸潺潼澈澉澌澍澎澜澡澧澶澹濂濉濑濒濞濠濡濮濯瀚瀛瀣瀵瀹灏灞灬灸灼炀炅炊炔炕炖炙炜炝炫炬炯炱炳炷炻炽烀烃烊烘烙烨烩烬烯烷烹烽焊焐焓焕焖焘焙焯焱煅煊煜煦煨煲煳煴煸煺煽熏熘熠熨熳熵熹燎燔燠燧燮燹爝爨爰爻爿牍牒牖牝牟牡牦牮牯牾牿犀犁犄犊犋犍犏犒犟犬犰犴犷犸狁狃狈狍狎狒狙狝狞狡狨狩狯狰狲狳狴狷狸狺狻猁猃猊猓猕猖猗猝猞猡猢猥猩猬猱猷猸猹猾猿獍獐獒獗獠獬獭獯獾玎玑玖玚玟玢玮玱玳玷玺珀珂珈珉珏珐珑珙珞珥珧珩珰珲琅琉琊琏琐琚琥琦琨琪琬琮琰琵琶瑁瑕瑗瑙瑚瑛瑜瑭瑶瑷瑾璀璁璇璋璎璐璜璞璧璨璩璺瓒瓞瓠瓢瓣瓤瓮瓯瓴瓿甄甍甏甑甓甙甥甬甭甯町甾畀畈畋畎畚畛畦畲畴畸畹畿疃疋疔疖疙疚疝疟疠疡疣疤疥疬疭疮疰疱疳疴疵疸疹疽痂痃痄痈痉痊痍痔痖痘痞痢痣痤痦痧痨痪痫痰痱痹痼痿瘀瘁瘃瘅瘆瘊瘌瘐瘕瘗瘘瘙瘛瘟瘠瘢瘤瘥瘩瘪瘫瘭瘰瘳瘴瘵瘸瘼瘾瘿癀癃癍癔癖癜癞癣癫癯癸皂皈皋皎皑皓皖皙皤皱皲皴皿盂盅盍盎盏盔盥盱盹眄眇眈眍眙眚眢眦眩眬眭眯眵眶眷眸眺睃睇睐睑睚睢睥睦睨睫睬睽睾睿瞀瞄瞆瞌瞍瞑瞟瞠瞢瞥瞩瞰瞳瞵瞻瞽瞿矍矗矜矢矧矫矬矶矸矽矾砀砂砉砌砑砒砗砘砚砜砝砟砣砥砦砧砩砬砭砷砹砺砻砼砾硁硅硇硌硎硐硒硖硗硙硝硪硫硭硷硼碇碉碓碘碚碛碜碡碣碥碱碲碳碴碹碾磅磉磊磋磐磔磙磬磲磴磷磺礁礅礓礞礤礴礻祀祁祃祆祈祉祎祓祗祚祛祜祟祠祢祧祯祷祺禀禄禊禚禧禳禹禺禽秆秉秕秣秤秧秫秭秸秽秾稂稃稆稔稗稞稠稷稹稽穑穗穰穸穹窀窄窆窈窍窎窒窕窖窘窟窠窥窦窨窬窭窳窿竣竦竺竽竿笃笄笆笈笊笋笏笕笙笞笠笤笥笪笫笮笱笳笸笺笾筅筇筌筏筐筘筚筛筜筝筠筢筮筱筲筵筻筼箅箍箐箓箔箕箜箝箢箦箧箨箩箪箫箬箴箸篁篆篌篑篓篙篚篝篡篥篦篪篱篼篾簇簋簌簏簖簟簦簧簪簸簿籀籁籴籼籽粑粕粜粝粟粢粤粱粲粳粼粽糁糅糇糈糌糍糗糙糜糠糨糯糸紊絮絷綦綮縻繇纂纛纟纡纣纥纨纩纫纬纭纮纰纴纶纻纼纾绀绁绂绉绊绋绌绎绐绔绖绗绚绛绠绡绢绤绥绦绨绫绬绮绯绱绲绶绷绹绺绻绽绾缀缁缂缃缄缇缈缉缊缋缌缍缎缏缑缒缔缗缙缛缜缞缟缡缢缣缤缥缦缧缨缪缫缬缭缮缯缰缱缲缳缵缶罂罄罅罔罘罟罡罨罱罴罹罾羁羌羔羚羝羟羧羯羰羲羸羹羼羿翅翊翌翎翕翟翡翥翦翩翮翱翳耄耆耋耒耔耖耘耙耜耠耢耥耦耧耨耩耪耱耵耷耽聂聃聆聍聒聩聱聿肀肄肇肋肓肘肛肜肟肪肫肭肮肱肴肷肼肽肾胂胄胍胗胙胚胛胝胤胥胨胩胪胫胬胭胯胰胱胲胴胺胼脍脎脐脒脓脔脘脞脬脯脲脶腆腈腋腌腑腓腙腚腠腧腩腭腮腱腴腺腼腽膂膈膊膑膘膣膦膪膳膺膻臀臁臃臆臊臌臜臧臬臻臼臾舀舁舂舄舐舔舛舜舡舢舣舨舫舭舯舳舴舶舷舸舻舾艄艉艋艏艚艟艨艮艴艽艿芄芈芊芋芍芎芏芑芗芘芜芟芡芤芥芨芩芪芫芭芮芰芴芸芹芽芾苁苄苇苈苊苋苌苎苑苒苓苔苕苘苛苜苞苟苠苡苣苤苧苫苯苴苷苻茁茄茆茇茈茉茌茎茏茑茔茕茗茚茛茜茧茨茬茭茯茱茳茴茵茸茹茺茼荀荃荆荇荏荑荔荙荚荛荜荞荟荠荤荥荦荧荨荩荪荬荭荮荸荻荼荽莅莆莒莓莘莛莜莞莠莨莩莪莰莳莴莶莸莹莺莼莽菀菁菅菇菏菔菖菘菝菟菠菡菥菪菰菱菸菹菽萁萃萆萋萌萎萏萑萘萜萤萦萱萸萼葆葑葙葚葜葩葫葭葳葵葶葸葺蒇蒈蒉蒌蒎蒗蒜蒡蒯蒴蒹蒺蒽蒿蓁蓊蓍蓐蓑蓓蓖蓟蓠蓣蓥蓦蓰蓼蓿蔂蔌蔓蔗蔚蔟蔫蔷蔸蔹蔺蔻蔼蕃蕈蕉蕊蕖蕙蕞蕤蕨蕰蕲蕹蕺蕻蕾薅薇薏薜薤薨薮薯薰薷薹藁藐藓藕藜藩藻藿蘅蘑蘖蘧蘩蘸蘼虍虏虐虑虔虞虢虬虮虱虺虻虼虿蚁蚂蚊蚋蚌蚍蚓蚕蚜蚝蚣蚤蚧蚨蚩蚪蚬蚯蚰蚱蚴蚵蚶蚺蛀蛄蛆蛉蛊蛎蛏蛐蛑蛔蛘蛙蛞蛟蛤蛩蛭蛰蛱蛲蛳蛴蛸蛹蛾蜀蜃蜇蜈蜉蜊蜍蜒蜓蜕蜗蜘蜚蜞蜢蜣蜥蜩蜮蜱蜴蜷蜻蜾蜿蝇蝈蝉蝌蝎蝓蝗蝙蝠蝣蝤蝥蝮蝰蝴蝻蝼蝽蝾螀螂螃螅螈螋螓螗螟螨螫螬螭螯螳螵螺螽蟀蟆蟊蟋蟏蟑蟒蟓蟛蟠蟥蟪蟮蟹蟾蠃蠊蠓蠕蠖蠛蠡蠲蠹蠼衄衅衍衙衢衩衮衲衽衾衿袂袄袅袆袈袒袜袢袤袯袱袷袼裆裈裉裎裒裘裟裢裣裥裨裰裱裳裴裼裾褂褊褐褒褓褙褚褛褡褥褪褫褰褴褶襁襞襦襻覃觃觇觊觋觌觍觎觏觐觑觖觚觜觞觥觫觯觳訇訚訾詈詹誊謇謦讠讣讦讧讪讫讬讱讴讵讷讹讻诀诂诃诅诇诋诌诎诏诐诒诓诔诖诘诙诛诜诟诠诡诣诤诧诨诩诪诫诬诮诰诲诳诶诹诼诽诿谀谂谄谆谇谌谍谏谑谒谔谕谖谗谘谙谚谛谝谞谟谠谡谤谥谧谩谪谫谮谯谰谲谳谵谶豁豇豉豌豕豚豢豮豳豸豹豺貂貅貉貊貔貘贠贬贮贰贲贳贶贻贽赀赁赂赃赅赆赇赈赉赊赍赎赑赒赓赕赗赘赙赜赝赟赡赣赦赧赪赭赳趄趑趔趱趵趸趺趼趾趿跄跆跋跎跏跖跗跚跛跞跣跤跫跬跶跷跸跹跺跻跽踅踉踊踌踔踝踞踟踣踬踮踯踱踵踹踺踽蹀蹁蹂蹄蹇蹉蹊蹋蹑蹒蹙蹦蹩蹬蹭蹯蹰蹴蹶蹼蹿躅躇躏躐躔躜躞軎轧轩轪轫轭轱轲轳轵轶轷轸轹轺轼轾辀辁辂辄辇辊辋辌辍辎辏辐辒辔辕辖辗辘辙辚迂迓迕迢迤迥迦迨迩迭迮迳迸逄逅逋逍逑逖逞逡逦逭逯逵逶逾遁遄遏遐遑遒遘遛遢遨遴遽邂邃邈邋邑邕邗邙邛邝邡邢邬邯邰邱邳邴邶邸邹邺邾郄郅郇郏郐郓郗郛郜郝郡郢郦郧郫郯郴郸郾鄂鄄鄞鄢鄣鄯鄱鄹酂酃酆酉酊酋酌酎酏酐酗酚酝酞酡酢酣酤酥酦酩酪酮酯酰酲酴酵酶酹酽酾醅醇醌醍醐醑醚醛醢醣醪醭醮醯醴醵醺釉釜銎銮鋈錾鍪鎏鏊鏖鐾鑫钅钆钇钊钋钌钍钎钏钐钑钒钔钕钖钗钘钙钚钛钜钝钞钠钡钣钤钥钧钨钪钫钬钭钮钯钰钲钳钴钵钶钷钸钹钺钼钽钾钿铀铂铄铆铇铈铉铊铋铌铍铎铏铐铑铒铓铔铕铖铗铘铙铚铛铝铞铟铠铡铢铣铤铥铦铧铨铩铪铫铬铮铯铰铱铲铳铴铵铷铹铻铼铽铿锂锃锄锆锇锈锉锊锌锍锎锏锑锒锓锔锕锖锗锘锚锛锜锝锞锟锠锢锥锧锨锩锪锫锬锭锯锰锱锲锳锴锵锶锷锸锹锺锼锽锾锿镀镁镂镃镄镅镆镈镉镊镋镌镍镎镏镐镑镒镓镔镕镗镘镙镚镛镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镵闩闫闬闰闱闳闵闶闸闺闼闽闾闿阀阂阃阄阆阇阈阉阊阋阌阍阎阏阑阒阓阕阖阗阘阙阚阛阜阝阡阢阪阮阱阼阽陂陇陉陔陛陟陧陨陬陲陴隅隈隋隍隗隘隧隰隳隹隼隽雉雌雍雎雏雒雠雩雯雳雹霁霄霆霈霎霏霓霖霡霪霭霰霹霾靓靛靡靥靳靴靶靼鞅鞍鞑鞒鞔鞘鞠鞣鞫鞯鞲鞴韧韨韪韫韬韭韶顷顸顼颀颃颅颉颋颌颍颎颏颐颒颓颔颕颙颚颛颞颟颡颢颥颦颧飏飐飑飒飓飔飕飖飗飙飚飧飨餍餮饔饕饣饤饦饧饨饩饪饫饬饯饲饳饴饵饷饸饹饺饻饽饾馀馁馂馃馄馅馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕馗馘馥驭驮驯驲驴驵驷驸驹驺驼驽驿骀骁骃骅骇骈骉骊骋骍骎骏骐骒骓骔骕骖骘骙骛骜骝骞骟骠骡骢骣骥骦骧骰骱骶骷骸骺骼髀髁髂髅髋髌髑髓髟髡髦髫髭髯髹髻鬃鬈鬏鬓鬟鬣鬯鬲鬻魁魃魅魇魈魉魍魑鱽鱾鱿鲀鲂鲃鲄鲅鲆鲇鲈鲉鲊鲋鲌鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳚鳛鳜鳝鳞鳟鳠鳡鳢鳣鸠鸢鸤鸥鸧鸨鸩鸪鸫鸬鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鹀鹁鹂鹃鹄鹆鹇鹈鹉鹊鹋鹌鹍鹎鹐鹑鹒鹓鹔鹕鹖鹗鹘鹙鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹱鹲鹳鹴鹾麂麇麈麋麒麓麝麟麴麸麽麾黉黍黏黔黛黜黝黟黠黡黢黥黧黩黪黯黹黻黼黾鼋鼍鼐鼗鼙鼢鼬鼯鼷鼹鼽鼾齄齑龀龁龂龃龅龆龇龈龉龊龋龌龚龛龠㑩㔉㖞㛿㟆㧑㧟㨫㱩㱮㲿㶶㻏䁖䅉䇲䌷䌸䌹䌺䌼䌽䌾䍀䍁䓕䗖䙊䙓䜣䜧䞌䞍䞐䩄䯅䲞䴓䴔䴕䴖䴗䴘䴙"
.split('')
     var cjList="HAPI M AMYO MF NN O HQI KLG KB OPD YYK L K DT YM WMGI OL MGLN IVCRU OLS IKSI ND HDR ONF GPD UU YTHU PD ADI OQ HOAMI YFIKU SQNL MWV MY VIO HQM OMMI HBU TQBU GI INO YDI JMSO FBND EDI MNR VPD WG HMR NC HI P NINI MK MBLL IBPP VND JANL BKF EHNE A MD GORU YMF VIHE IHS JLLN RC OHS FSM DUP HQBU YK MKU MT Q J BQ YG HOMMN YHS NK VR TBLN HSHML DM BLU VMNOM YK MWYL CI BMR MMM SU JKP OO MIKS MOOB LHMO OKR RVP DTQ MGBHU CSH LMNII NIY OAM HXH YPMM YSM YRBR YTAP YTT QAU EGI YMP JYK WR MM MGWG TGK YRF B AB TMMC HDL GAH OMG MLM SU IVHJR LU JKA HBR PQMB YRNL MYLM NIR JMYO V LSR KS DHN VMOMR HGDI HN HOAV TC ASJE ISA YDHML OJ QMN OMLK OYT WK HJWG LDHE GYO LWU WC HNLH ILS DBU IMNO KD MMOK EOWY R OJLK JDOK MCW MGB MFJ JBMC RHML PT OMN OYMR LMP FH TK TT XOB KSR OP LW GISL OIP BKQ YTH OH HGHU U MDM KI E MS YLB BUAV ODM XRSLN HEY CRP DH GNSH LLMB IDS PP OYG RBO KN HHK PHQM YNIB BU OPJ QSLE YT NVSM OMRL NPO EHJR EOG IFLWL FVOK OHQ JV QMV MHAF JQ HA IFM RMHER TCB RVL MNP FBRLB QAMO IRP C OMNR MLWK HE OMR YSOK OJRK HVIF IVJ IRM SMR HDLN BBE FMU MG WD YTD WOLL NHE OIN YRF HEKS HBLN NBSHQ HER OHG MIG EQMB HQPHH IR NAPO IVSU YKS TC HNK YRI MJ QYTV JP IVOJ HO HQGDI FBBHU YBHG JBMM BSLE HQU DD AOMBO NKLQ JBTJ ITE VMYIU NAU JND IVQMB YCK BBKE IVYM IVO HBUT IVOP MA RON IK HDYJ HSP MMU IFG ID VMGR YC MKS QPA WP LMYYY EYIU OWYI QMB HJRR QO YKQ YMMU IOBO NLO RMAV TJBLB TOP PDK HED NLJMU YCE SJTK YMMR DE HOYG STV IVYVO OIMBO OQNI YHML HHW VMM EIR IMDK BGR ORD YK KSC YMMI MPYLM FQ OLNK JU PH GIHS CK NRLI YLMH JMMU TLJ EBCD SK AISL IJE RRR JM KQQNI AMWG JCM TMMV OOO QJE KQNOM HDRHG HGR EM IVMMR TLBK TCG EHHV 0 IPM DND HUP BYSM RSP IVRC DNHE OINI TLWC HOJWP VLOK BOMM CIJ FBRHU OMGN JD QGDI SJE IVHNE VIR LLHE EE XMKS GOIV LK YCBR HJ LLML JCOR MRMT ONAO QI KE NDYVO YTYR XI SUOK IVIK MTHHH HDV AJ HSYHS YTA F NLMMF BOLN THBU CWJ QSJR RUDI AFHHH HQO OMRQ BKK HDA OVIO TCHML QNI MR TKR OMC CNLH IVOG DYCK IVJNK GP NO EBHU NSD JCKN PRU VMBM YHGR TEHR IFBHU EYKL GRTR YUKB RLMI OOG OGD VMISB JMGI IVFF IODI QYT WGF BM NLYKB DHER SOY OMLN IVTT KLB XKD HOUUK PHA WYI IVBGR SSR DAV CWA IMOG WDH HJHNE VMHEY HVD PSH VMNHE JRHU FDQMB RSQL JRLR MMF IML YTAHU HFD WKS FCQ JHER IVMYM TJR ARF EYG LNBO RYO NF QSHR SRTQ QIF QOG ANAU RHBR HDNF FMC HOGDI VMPI NLA MRNR PYRF RNVM DKMYM JE JR EE JCIK RMVS VMNAU YHGU RAU IKHHH MJLN MTC OAHE OOKS FDK HEW ENO RKS ETCU QIKS YOLN AHQM VDHML NLKD FBRQ LBV YONK HYHNE OINP OOLL BYUK QOBHU IHPM JROK FHBU VNVM BKLN PR ATC EFB YHV NLQU RRIKR MRNBG MRDHE BMMC SJR QPP YTK EEQ LEVIF QLLB VMIJ KLND MFP KMNR JQMR GCWA DNSH FDYJ ILIL TSL KM IGYHV APHH TJKA NSP NO OHPM UNI MBMBL EMCW EMNR LSH EYSD MTCH OVHQO YSOOK NLOMD OCSH MJOK JRB HBT OYLM ONHS QHNE LSSJ YJ VMSU BGIL KR TKSC DMMF NVHE MMI KMOB SOK NLMNR HOMR G IMRHU GYTU KQNO JKYS VIAV DDI SH QU OE DAM NL JJB YIB VMJNK KHLMI WLNI NYK IS QIS RAPV BB OTC QMBO MMBO LPB OMD KKLB SLM MNLN WHEY JMIG HRU YKLN CKSL IKP RHBU YTAJ ITLB XCTA RHU AYTA OULN QLMY QKA HHMBO NNQO JVD PYV RHFD DEDI KNIB EBHU RNLR SMF SJRC VVH VMW IVHMY KIP OYRN HPSL HHQU MUHE BMKS IFMRW GDK IMOII MGIJE VJR ILN AIMVU HJBO AU MGOK EYCN EJMC D QS PEG WQS QBNSD YBYHS WMMU MFR MWLN KQRSJ BD OIAV NOMRT PRNIN JTCO FD ORYE KQYCK VBM DFDV TKHK 0 JMAM JCMVH IVGDI MRNO YDL PHP FBRG XHROK IVIPM IVHHI LBK PMF MUMBO NMOMM TBRR YLM VHQM TOLL MMBB SHLB AYRF YDNL OYHV IHMV QJV MCP PAWE IOOG WLLMY VMOG EKQL BHQM TIMS HAMG HOGGN EHSK SUT QYCB NBG BUOGF NBO YSOPD DTAK TAJ TMD OVAV MBRMR NLKQ OJBM MGILG SMMI OLOH TQM RJD VMRC TVMI NVJRR JPHU YRBU HOLQ SIM W HLSA NAHU QMWYI LLSM EDHE MNG SMIG XQNBK IEOK JKMR YBLB YAV ETQ VVM EJRB BUHJM TBKS VSM OHA SP DHE IFBM KIOG VHPA ILE IVMFJ YHRR ROMR VMHER IYR HWSMM MGMF IFU RMPRU GOSHR RJ XMGI YR GPIM INE MNF LNK EEV GOMJ JMRW TMM NMME MUW YWLB PUMBO TN TCA FQLN EMHF ON QMVIF HYCR VMVFD FBR RYPB JBOF MLBY OIKU OFP NLOMM FWK NLOLL QAM TBOK DHE OVL IVYHS VJD OLWL OLLN NLAV IVDI LLOA RMK XQBOU RMLMO TW VMKVC DPI MGMMU MGI KHSU MH YMB JKSC GTJ QBKQ YKOK YKLL GGDI EABT PKNIO OBO MOK VMHVP HDB YIHU MNMBO SMDI JMN EFH NLYHS QHLO OMNN BHNE JNYK LLLO TKYMR DDNI SRLN TGTR TBMO MWMMF IAV TESU LEG YTUMB HGRLY KND LMBO VEP HDYRB QHA YIOJ LA QYAJ RQYT TAK QBBE JDI ELW WKP HDRC TCBT BMI RRIK WLGI INKG JCHWK QNSH YVP OJ YMY MBSM TBD LLHHJ HQ BCRU JIBI JK NCWJ EILL DCI GMF ENL NMTQ OKMRT PPJ WLJBM DDNYO SKNO WHER ORA PYSU QYHN JLV QPRU JIKQ BOOK DOSU YHJR YPTC NNMBO BUQMB DBLN CKNIN VMCSH OLL QHJR XCFB NLHEQ NWM KJT SIP JMMF HYBT SJ WGNIN IVNJ MWSU DDMMF JBVIF GOK WFIK HOGYO KRD FMN UHEJ LMIK GFNO HDNIN CKAU QHP ETC HT OF IVMN YRBU KHHVO OVJBC ID MVNM KSMI YSOHV YLMO RRNVM JQOMN RAA YTQMB HDPH IVSMR WD EBU YIF BODH HI BBB LWL CRNO HOMYM HDI OTNIQ HDF SS YHVL HDNHS QYRB MN RNHE JLWL YHSB GGCW HJD EG YSRJ RMHK SUP YAD QKNI LYP GIRM APHU MGT YV DHKL LYKQ LSO NLNSP NMKS LSYLB MNP RMVH ODI TROK LIBT MMN IKQ MBMMV DDH IME MWAHM IK VMNME BYAV YIJC HOOMD TWDI MRMLK JRMBO IVRMK OTA VMOB QHML OGR YLMO ATCE OUDK YFD NWMA QBCD OPBO YTWG VMBME OQS SKR IG HNI NMSU FJPU BDHHH QOSU QJCM BPUK EI HHSB GOSJE DL IVWB DAIU HHDI IVWD EBMR IJCC DMF YHDS LWNL TBD PTHG QBQ JBIK EHGU OD YHA RE KHPR OOMN NLB EOMN HQMQJ DTLC GTJE ONKQ MAND HOMM BY EHER RIHR TJCR JQOP UMMJ VNHS EFF EJJB IVLLL WRBO FQSU HDEQ IVJKA VFH ROG KDI YMSO TLPF RD EBON EIAV QLW TGBT OHSB LSCRU BOPI YOMD VMOO SJNL QTAK QGG HYYHN QEQ PAV OMJR FQQ H ILR FCYMR HDLP NMNIM DOMM JRR OIK YSOTC OINR GRHV GYLM QWLI HBK HDW EAPP XMF QSMG MVDH 0 SHR KHNDT XJTBU ISBT DYVO OPYHV VMSHR LY TBC WFQU QJ MHOG GR HUBO TOD YLNC COR HDNSP ES 0 SLW YYLC MBW ININ JTCY NLODI EPYM YTWA QLMO HSB PN NHD JIWTC PTA NLMRB YRBO IVIHS MGUMB IMIHR QHDW 0 XCJ DTMC YTRHU SJB QNKG QRRD BMWV KHMG QOA DOWY WJR OOP JD OVBK IVTKR MNIJ NKHYM YPHU YNJ JF PFB OMU HKLL LLL OKN HDND RNO FDIAV SEOOO IVEQ MGHJD YFE IVTMD MRUU OMM QRBO MBLMI KQMOB IMNSD OYOK OSK OU MMVS MBOII WVIF YRND OFQ TENH MGOHH NBKS DJ KW BAM YIT FMBO FDJRB KHIKU XHDCR GYTR QHPM OCWA XCHEJ NHS YBOU IDQ GAM HOVIE AHBU YEOIV PWJO OGHN BMUI QIR MRTTC HLB ISR MRNVM ABU EMJ OCOR KF YEBU JCKS DEMBO OPMO FK JJQS HHBO OYHS NDHVO MFHNK EAWE NINN YPVIF OBON ECR QIKK LLW EID FBRBO TAKB SJG AM AMMV VMPU LSDH IMYRF QSM IKU FPRU MRJNU BOYR QHJX EYCV VMVNO GDI BO ELSG HVP HEY XQI DTMM TYVU QLR YMRW RMY GOG QYTG IINL OMOB TLIT LSD YTJ XCYTU NLYTR NMKMR NOLMI ORYO TQ JBM RIJC YHMBO CSHO LBMRW NMYG TEMJ EMMS DF QY LMG TNLH MTLN PIKU BHHAU KHIVK JTCG HNE NDU NBLMI YCP USU DDD OKVIF MRYOJ ELQ OKT NLHEM YSO FUBKQ KHAV DHML VMJOA JC XTLX NUP IDMR OIK HRYTJ ESP YUOII HONOM HUWML DLNBO OHVL PJTO TAKP OHQI ALBK IVPA PIKH QMHE JOMA OYTR FDBM BFQM HDFB JIOG END PVSM OMBP UBK DHHL XCIJB EYLH KOK QFSM QKQ RMEA LP OMDM HHHND HQDA VEKS IIB HDBU JIYHV LBPO TXC HODHE MBRYE KHJKA HDP QU EKS TEII HMNJ OICE TJGG RMSS OSME HLNO QYKL VTMD RG MIHI EGR DJE NSBT NLBM NLNHX WL XTKNL RPYM OFBR HPLN WDMBO QOPD ORNIN JIP HPA QMMV IT GCV OGF HOAU IMGCE QJSMP OWLB AFMU DLMO GLNC FTMM NMISB QTA MBO UK QKE S GDHE TJKS KNN GTOR XFG HHFBR MNHJD SIP GMMI TM RYCK QSS YUHHH FHS TT UJMF NVNO IFRHU EMG JHQ DGG SHQU EMWF SJHHL QTBK POMR IMPKO NINH YSOY JOMC VMJKA GTHHH BG PKK QTW FDCSH BOIJ HINO HJBU HFP ODYJ MNYHV EBBB LYYK IIVE JYFE ENIB IVTQ ENSH HOPSH YVI HML KQEE VMJ POII HND OGG PPHA HVSM QJNL QQO HMHNE SJCRP YJIVJ TTMVN NVHQI LIJP QIJB QHYE ELBU DHNK HXWKS UVII IDHI MGOIN QNSD SJLWS YCN TAKG TCNO PMMR TLMI SLSL YHE YQS XMMVS HGI QBME GCGLC HVHI MBDI OHNB MWICE ABBT BFQ OHCE VMJPU RYRN QKHD SUU MVDI AHS KHXE KLA HTBN WLJKA GOY YCNH KHQMB EQOA EMPM VMQMO FUSMG EOMD JRLN MRT LSP YRBN IFTQ MSKS JMD EHIO KHIAV POWY QTOR HYBHU EBND KBHQ HODI XLX VE FATE VLXH VIKS KT YHSK KHNK IHU PYUK HDBM DKMR SO OGDI IIOBO YMMBO QNG TLMY MVNI QJBF YJDL QKHK HSHNE GWG QYIJ BUCSH ROIN EITE LHHH RMKMS MWYOJ EAV QKLU TOMR TOSU YSONO QAPV EEED OJK TYKQ XCYR JKI VIS SHI UKT YNN VGG UUHN LLP NLYTJ MYVS HONKN KHTW NG EQKI ABME EHHW CROB KMMF WLIVN QOMR EHBV XCNKQ BINE CFBO OINL HUIK TYHS HJTM QRYO PKF VWYI MRNO KRNVM TCP QIOK IFROB TWA TVIP QYJ HAE LIBHU EHBK BIG KHEY OVBMR TQNG DFSM QKNS TW IMP BAU NMSK JCROB LIKQ OJR BPRU DMOB LSEHR DG TMKS HBYI LBABU MGNVM QYBK YHMBO IFCWJ DMNR TDT GTMV DI YRHV IPF BOAE FBMMI YBYE JDKS YVVV IOBT HQKI QR EPD EIJ YPD GIOK VJMO DOK HDKKB BROG MIK HVIO QKDI RMHQO QYLM THJG XCHAB LIC SBLN GONSM QRB OGSK WJBO SCHNE QIVE YNDF RMAPH BOYTR IOV YHJ HHOE BOMMF EYCB IPYHV PTYU TJOMK TEYV YHEJ SJKA APP DHA NMLK RODI DJBM PBMC VMNG QJLO GLLL HQHQM RMJMF OOM ETAK XCCRU RDLN JJON MBOG EATC BUNSD OND RFH OKP EPI WGFG LL OBMC NLPOU XMBO EBKQ YNBO SPP NMPD DQKQ SC QTT PMAM MHNL BNMU FDTWA QCSH LEBO NVOLB OFBI QHMY VMIWG XQSJE QVIO ETVI RWGF PA LSNVM KRBO SMYOJ VMYHJ NVPRU GIKS QMKU QJCN BBM FQHE FB SUF FJVD JHGU ILW MAMR OMRT IVJBM OIVA IMNVM XRNBK XOINO SLY SMWTC QIKU BKSC RMNMU MRHHJ RMNR HRTM EMCW IVTCA TEFH VSQL LSHER ILB BBPM MWHOE MGOII ONMK QDJ YS MRAMI VMJMF OM ABKQ QTMM FBKF AA HKR VTXC KHF QWL HJR MGDD MBHES AWLE SJYLM DSS QEOG FBLN IHYMF DMJ UMR RWMV QNHS YQHL IVNKV BIP KKKK UOG NKHG IMQKK KOKR CSHT HOOML MWHGR TK RIOK VJKP HIKP JCMBO VWK QOGS PHI TCSH HDHAH HSSMM KBNL XQTKL PMYM TP HXVYV VMVL NGMWM A OIBI LPRU MVR NMHD QQKQ PI HQOK OMBB PAIU HBKS DYG HHJ RWK RPU LMI VMRLU MMTI BNUI ENPO 0 KDHE BOJKA NVJPU MRI LLNSH FTMD BJNU RJTO YLMR EHGR CISM IOR XCMWF STT OL RGRR RCSH DHAB NDBT QFBQ FIS EPT TMPT QHXE EHKP YTWI YLW OIKS LMUO NO IVYRF FF ONCSH DJK BUJQR XCPI BNSH QDHE NELN QLYMR BOTXC HOHNE EPRU YTU OKHDV RLB GJBC GRTR FLMI MMUE NI YWMV EYOK THRJ OY YMS YMUO IVTLM RHG AHVL QFH NOF EAPV DCNH NMYIU QDHQU BUNOT HMY KMMS TYBB TBNH SEV KAV LLN VLMO OQMO BV MGYUB QPOU XKDLN AAA YLHV BQO IXP QMR YAJ KMYM FDILR XCNO VMHAB RWG IVHDS DJR AVNO TBG VYHS NNNAO QHVL MGBT DAPP MCA EDD XPCRU YDOK QJNAU MGDHE MRSLB RYRV YVBU YJILJ TAPV BCMJ OKSS EINE JHP XOPBO BYBS QHXM NMMBO RMIJ BJBD MWBO KQHKL BHHJ ODG VHKL EQHL FHKS XETLX BOAPH NLJP TYVW GYK CIMBO ESMB DYHN TNIH MRQNI BUBBQ OGPYM SRYTJ ENWM HJLP MBTJB YRRV FFH RMTC EIJB NVTT HQMCW EEOG XCMN RMD XCAPH BOCWA RTC OVOII XMUMB MNJBM IOGM TBOF OUOG TQO DDHH QIT KQKN RVMI TCNO BUMN MRMBO TKRP QHK WBP LLLB PHAG PIRP PDLO VKN RUMB CWMR NLMA WLYAJ KHTA UYRB GYBT NVHN IMJLV RONK JAV BJCM JJOSM BDOE NLGCE LIHEJ YWLN SJSH ITXC YWDV NMHKL BOHE VMOMI UMGG MMMV EMGG I GYHN YITF QOYB YCLMI TYLM GJKA HSOG QNAU BURVP RPHH JKND EHA QTCL LIM ODE FDYOJ NUKS YTAPV MFMYM PJBC DWD DY DIT EBVK THDN MGYKG MRGIT JMCH HOHJU KQHML QYRF RR TA YKNL BWLI HOUFK MRTVI OIOI IVMWJ BUVML QLLN OKLU VHXE LBHA 0 IMKD VJNU DBMR NMHER EIVE SHML HYNKG IVTXC VJE TYTR MBON OBND YOHNE UOII CL WMV EDBU DNIB REED FHAG NMPRU FDYT TCRU JCLB HDHN BTA OSU QRSH VMQJL ROMR TKLD OHXU MGPH IIIL WLPYM JPHI IVOHH DBB QHLO HBMR VHUP VMYK HDFH EYR IIKP RMTWI NMEII YMJE HYHXE TINO ROPJ YW FQSH GOFBR LB EBHG IVTYU JTAK ETRG HLIT YVV QLSR OMIG MDBU EI OMBN OI JYTJ BUTMB JLW BL EDOE PKLB MMR RNDU OHKL EEEM XRLX OUTRG SILQ LSKR EYT BPO BOMPM GKF GOOHH RYVO POMN AVP JRYTJ BHN BOV SMSIM HHN PPMNP QPR RMN RGG AQMB IVYFD EOG AMG YNUI MGYRF TGV RPVM JCLL CHMBO TYDL JTCD SE KTMBO YLE Y ASHR ESME HRLN JNIU RSHB JBRRV JWLB NMKK OAA ECOR RJR QSQL QIBI TYHJ AHBR ESD HVHU RJBJ KN EIS XBOIJ HAHI HYJP ADHL OMWM FDTGF YVBCR HDHQO OKMR GASM PFMU XXXCP RJJB OYBS LCOR JAF BDU PHH LEYT HMP BUJKA DHJD VMHDS VHK IVMVH RKSR VMBK BIR EJOC QDTT RUMI HYOSU VRMK SLMY MHPYM WB RMRRD KHLLB MRMFJ VSP IMYWF NWU LWD VMYF IJB JCOJU GILR VMHJ JIKP CYKQ QTC SK QSUU GBO KHKT XCNIR EYRD ED GEHDA EHDW BQU DYBS ELFL TGIMO OOWY HHAIL MU RJMM SHOE KHONK DMG LDI WFQ NOMRN VMMWL NYVI YVIW FDMCW ETCT QFDV ON PA VMIBI FU HXKC MOOG OFQU MWILL YAPIM VAHU GAMO DDKQ JCPSH VDLK YTPO ENOT OYBO NLKT NLMBV HDM AOP EDJ OOSJ RMBD LNMCW GBTC RLMY MRVNE KTQ RWNL GBHN YBO MBOWY QKALI TIS BHER IOK FNHX FCB WO KQIJB BOPO OKM OKCF FOG QRUC MBV DLBU QOMM ENUE YMRT FDTC BTBO BMJ TNEF ELIT HPDK XELMO LE FJKS OUM N EMWJ AI RTK UICE HLO PGI TIH TYV BJE HDBHX NUI GNHE ROMN DSMG VMHSK RMBHX RFB PDMBO TPFD RJHR LMV EKLU IOMVN EJMO LITA RBWI YLLN YKHG NMSEO AJKA LDDF IIS TMFJ AMCW PYAJ AJD QIKP NUE BIKP BYCK QNIN OMH IVHNK MNI AMJ TPIB POG QKVC SJF T DIG NU IVBOU XNOG ETJB NSND IVNIB DYIU BK BJB KNI MBDBU EJ VMFH XHOCM BIPO PW RHHJ GNO HDJMO HD PWLS BPA TPOU QTBS QFBU SFB OFJ LIPTD XCQKI HHSK HDOG BAHM TBFE NLGYO XEHF HND RHQI LNE OSRJ GYHS MYLF NLFHF EPOU GKMS EBHX MWIAV HIPYM TVII QPYU DKD MGHI FBOK KRRU VMLIU FHVD MGOK IVOS NKF BTAK DDF FDYR QUOG KHNE LBYTG EV HUFF QOOG VMYHS DMVS XCHJM XCRHU YJVMJ XXNBG HLW BBHU TFBK IVPPA YVRVP TWLI ELLN TQDA OMSL FHUP HSBT UMF PILE HYHJ BUHIO SJYMR RSH TNMU VMBGR VNOB JSMH EJPU OMI YRBB BFBG MGMSO RQHA EYFE RC FKT FG MWTA YKMPM TWK PU BGTH EOP VMFDV GYRV IMIR ARYE QNHD XTWLN TQSMM LIHJD MWD TNLB IVHN TPKP MHNI NFDN YKMBL YON LBRC TWHD XCHNR BOKB XVMIJ ORR XCHJE IVYLR EUK ISOK JFB IVQS CWLN QIRP YRNN EFBR QM DHHH FRRD PIM EBUH MRPTD UTMO EHK YRLN VSLL VMYAJ RJBF VMYCK KQLW IIIG RRRD TVMT SRNL RHS GMFJ OBQ HHSLI SOAM FKP KGG QMMR TBNF BUHDF NVLMI FJCR LIMY IVSMH VMLWL XCYRV IPSJ TAKS XIPG YHHHH JUSMM RMC DR YJHHH LSCWJ IVCI DSK UKQL TEIB EBYM OOMM DNAO EJCR EATE QC MGBCD ML MFM MOB NEM IML HP HS PN YRU MMN MML MAM MEM YHN YVHO YRBP YQIV YDCWJ OKS OMN MO OHN XXOP OG OM OSHI OHJ OON OMMM OHI OPP OOJ OYHN OJE XOSK OMVH XOBHU OPO OOSU OJM OSP OOII OSMR OKSR OW OKR OJP OMMF OHQO OPR OMMV OHEY OMVN OMFM OYMY OJKP OTQ OMA OSJ OGR OLMO OYCK OCB ORHU ONIN OKMS OHJD OKB OIHQ OBMR OJPU OOMI OYKL OHBV OIJE OOBM OFB OHDN ONIB OWG OLWS OIOK ORMK OQKI OMTH XOMBB ODT OLMY OQKQ OHHJ OJRR OLOK OSUU OBGR OJCM OSJR OQMB OYAJ OHDV OWD OSAV OAPV OTKR OWMV OPPA OPKP OFDV OJTO OHI OMWD OQKE OFBU OJOC OEOG OBOF OGRR OYFU OOGF OMUA OYTG OMWD OTRK OWLV ONCR OWWW SUHU YCIU JUJRU CMVS LPWTC CJSTV GB ANAU BHN BMMO BAYC IM IMMVM IMHGU IMMNN IMDCI IMBGR PYSN HNHAG VL BSS SSU UE TCTU SM LN KLN NSM PHLN BLN BTLN PULN IJLN NMLN KSLN OILN UNLN UULN HDLN CHLN DLLN RBLN AHLN JULN KRLN FFLN MFLN VDLN OFLN MOLN TELN HLLN XMSKS PRKS SRKS YOKS ROKS NTKS AUKS TVKS POKS KSWP PI PUK PIJB KSPRU PMRW UH MV SLB SMG SWL SKQN SLMO SHSB STKR TJ JT YOOJ YY RY YWS YWK GGY SL HMSU HHSL NEMSU MSU 0 XMKQ MIKP MWG MTA MIKL MTUO MAIU MTCL VI IKMMM HXLE RSL RP SR RKS RSM RHN RVI JLK RHP RCL YKR RIK RPP RP RYHN RIHU RJE RNL RMSU RQO XROB RMKU RTN RKI RSK RMKS XRBO XXROB ROSU ROII RVIS RHVO RYMP RVE RWL RMFM RLWL RBM RSLB RUU RPRU HOR RINE RRHN RYMY RIKP RHEY RJMN RVVM RFMU RJHP RKN RMNN RTQ RFD SORC RGR RHER RKF IHMR ROD ROSK RMCW RNIN JIR RHHV RAV RSMG XRYK RJPU RPPJ RUNI ROMI RHND RYKL RHBV RIHQ RGLC RJKD RQHL RIJB RMLK KRMNR RYMR RICE RKKB ROOG RMMR RQME RMBO RTBS RMOB RFBO RHAP RAIL RQKQ RYPU RSBN RHSK RYIB RYTV RHJM RPHP RBGR RYMB RMSO RDD RYOJ RPOU RFF REEE RQMO GCWR RKQI XRYMU RCWJ REDE RJMO RIIL YBLBR RYBB RHDF RWLB RPPA RPTD RTKR RYTA RSMG RVNO RWB RMWG RDAM RTW RKGG RFDV FBHGR RMUE RHUK RQMF RTCT RTUB RGIT RTOR RJBC RHXE RJPA RMRB RTQM RCIM RBSMR RHAJ REOY RQKD RSJE RTOR RWKP RCKN XRBBE RYNB RGSK RDLO RYSK RYCB RIHF RTWA RMWF RMUI JRRYE RYPC RTJS RJAL RUBB RBOV RJPU RASE RGTH RTCL RKCF RCWA ROGF RGBT RNOT RTCO RMTO ROYB XRNWA RHBK RDDF MGRR RYTP RHMO RYPO RTAV RJTG RSRJ RMBB RTYB RYRO RJBO RJBF RRMOR RMBG RJBV BM WND HWK WV WPU WPHH HWNK WOP WOII WKB WIJB WMMR WGTJ WQMB WWLV GMD GON GMMS GG GSU GRU XGI GHML GHE CSHG GBY GMKS GPVM GLWL GJP GTM GYR GSP GMFM GVIS GWYI GMNR GHPM GHMY GYT GIKP GYS GBMR GYVO GHND GAV OIG GHMR GMAM GMIG AVG GHBR MCG QIG GMTC GFSM GUSU GYUK GJMU GMLK GNKM GBDI GIJB GRHG GADI GRBO GROB GOIP GHRJ GHHJ GLE GKLU GJBM GAPH GSMB GSUU TLQM GBB GNUI XKLG GMWG GPTD GONK GSAV GWLS BFQG GMRB GMHF YIG GSYQ GAWE WNG GILB GYCB GEID GYPM GYDK JEG YVGG YEG GYRO HG XGBMC GBMT HE TCHE HNMNI NIJMC WDNIN HK KKS KLLL KSK XNBK KLWU YCK VGK BVIK KJKA VPI VSU VHG VMT VHS VOIN VNG VPP VNIN VMKU VSK XVIKS VLW VAM YTV VVIO VBBM VTT VHJD VYCK VJHP XFDV VMTC VJPU YCV VLWS VWG EHV VSHU VRB VMMV VCNH VHQI VNAU VROB VLSD VAA VNLR VQMV VJLO VHHJ VQMB DDV VMUW VCWJ VJLL VYRN NKV VBME VABT VHWP BFQV VUMI VTTB VKOK XVBBE VJOC VMWF VWVF VYTJ JKMV VYCB VFBB VTAK VGCW VGRR SJV VYWM WSVWS YRBVN VIDI VMBU NNM NNO 0 BND JBND NDOK NDPRU VEND YCND MFVND YDKNI SNDD TVID HHSLD NDMBB THJD JKN JPH JMR JKB JSLL JMMV JMLC JMUE JVMD JLME JVMR JKCF JWLV SFDI NSF FKF KU KUPI JPMU KUOLL KULIT SKN SBO SPT SFD SHOE SNLR SFDV SHOO XSHOV UL UON USU UYSM UMVH UNHE UMT UJE UOIN CSHU USK UBHU HKU UHNK UAU UMNR UPR ULW UWL OPU UJR URVP UKD ULLS UHHL UEQ UPA UBMR UGDI UJPU UHKL UNSD YCU UHQI UCOR UFB UTBS UDT UOMM UJCM UKMR USUU UYRD UKKB UKLU UDCI UBB UWJR UIHV UWP UMWV HDIUU UHDP UAHU UTBD XUCNO UOMN UFDV UTVI UHI UTQM UFCB UYTJ UFDQ UNOT UPKO UJCO UHVI VVV VVWD MOO XNMYI RU RUTC LBHNI LBQS VELB LBDHE LBYR LBHQO SMBLB HALB LBYBO LBQKI LBOG LBQMO LBWMI BAKB LBSMG LBAFU LBAWE LBYTJ LBTCO LBHDW VI IP IPP IJE IMKU IPRU ILO ITQ IOD IHHJ IKLU ITF ITSO IHXO ITLM IGSK IYDL ISMH IWCG INBQ IYWF NK JJ IT YCT IP KDIPM NI NPD NHVO VEN NNOM NSJ NMAN GNHNE NMM VNMO QJSM VMPOP VMFFT HHH BYHHH HO HOYHS HOBM HOPA HOTQ HOWR HODT HOLMY HOYLO HOFBR HOHAG HOBOU HOUGK HOHSK PSH PHJ YMP MYP IPP PDI HKP PL POJ PCI PYY PJE PLBU PNG PHML XPOMN CSHP XOOP PMKU PSK PPO POSU PSHR PHS PLBK PJR PAM IRP PIR PMFJ PSP PLLN PIJC EIP PEQ OGP PPA PGDI VRP TGP GGP QHP IOP PHBT MBP PHER PBMR PHJR PMIS PMIK PUSU PBON PBKQ NBP PWD PCNH PAMJ PRAU PJBD PDL PICE PWG GBHP PLEG PRMK PLSK PLMY PYOJ PHDD PGTJ PBGR PJNU PAPH PBTV PPHP PFBR PIYR HEWP PSKT PKQL PCWJ PKMB PUMB PAHM PHDF HNP RKP POAE PRRS PABT PLMO PQMF PTXC PSJE SRP PILB PCWA POGF YKP PYTG MKP HUP PAYF PDDO PNBQ PHBK DDP XEBP PYWF PMBB PTWU GTIOP YOP IH XIJ IHM IHI IJ VMI OUI MUI JJI TVI RJI NTI AMI MAI SHI YCI SGI HSYJ HSIK HSBR HSRAU HSLMY QHJ QLS QHE QMSU QDK QQNI QSK QOP QMFJ QLWL QRVP QYG QWYI QYR QODI QFQ QOII QVIS QUU QJMN QIPM QGR QNEM QOMG QVVN QJKS QLWP QHQ QKMS QIQ YCQ QMTC QYDI XQYK QKT QJPU QHKL XQSMI EHQ QRAU QSKR QNIB QWD QBDI QRSN QAMJ QFB XQCRU QHSK QHHJ QMGG QHJM QKMF QOIP QIYR QEEE QYTR QKMR QNHX QYOK HNQ QPFD QHKP QHSB QCHQ XQYPS QWMI QCWJ QIKH QWJO QVNO QOMN QNOK QQKK QJMM QRSJ QYTA QSAV QUMB QPPA QHDF QPTD QSJL QDAM QLIU QABT XQCNO QNUY QHYU QSTV QYVW QTQM QEII QTXC QTUB QEED QNMM QILR JTCQ QTOD QORQ QWKP XQYPP QJOC QSTT QWVF QITF TAKQ QSMA QWHR QBOV QMTO QFBK QMJK QTWI QKCF QHUU QASE QQOQ QGRO XQNWA QJCL QJJJ QMBW QYWM TKQ QWLV QSRJ SJQ QFVK QSMG QHUL QMBG XQHUO QYRV QHBF QBUE QJBV YE OK OLOK FDOK DLOK GSOK OMOK FBOK HSOK YKLSW NBYJ TVYJ JJOYJ CKHML MRHML YSOBY YSOHU YSOJB YSOHM YSOSP YSOYU YSOKR KNA KNA AKN AMJ ANSH APIM AMO AMK AHML AMMI HOA AYT AHHL ASP IEA AIKP ALMO AJV AOPJ XABKQ AOIR AIHS AIJB AMMR AOWY AHOR AYRF AJMM ANOK ABAC XABBE AUAM TAKA YAOG AYDK AWLA AHGF ASMG AATE ATGS AYRV LWP APVO BMMU BPR TUB BTK DU DEI DMU DPI DSU DM DNVM DFH AD DA DOJ DAU DNIN DPP DYHS DOB XDOO DBY DMKS DBHU DPO PYSD DMFJ DRC DRMS DKSR DPR DJP DOII DTM EPD DMR DWL DLW DHMY DHS DJMN DHPM DSNO DWF DMMF DEG DYLB DHMU DBBM DIJ DTSL DIKP DYS DHVD DOMG DMCW DHJR DSMM DJKS DJKP JID YCD NQD DHON DFMU DNMU DJV FQD DMIG DMAM DGR DHX DMTC XDJPU DYBO DUSU DOPJ DOMI LND DEFH DBND DNBG DNKG DQJL DHGR DYTJ DMLK DFB DMMR DICE DDHNI DQKI DDT DYKQ XDCRU DSMF DJMF DBDB FBRD DLE DHJM DGCE DYAJ DJRR DDCSH DYRD DYRF DOG DSJR DYFE DJNK KLD DWLN XDNLB DSJL DHJE DTMV DVNO DQKA DDAM DQHK DNKQ DDWF DWLS DJBJ DAHU DJMM DRSJ DJKA DQKK DPPA DHDF DNST DRRR DLIU DABT DOMN DYTD DLSR DFCQ DSFB DIIL DJCR OSD DQKD DSLY DJCS DOGJ DHHI DYWV DHHW DOBG DASM DYRB TBD DYHR DTQM DHI DHAJ DMWO DLIT DJOC DIVA DIHF DNBJ DTWA DTLM DDK DMBS DFBG DYTJ DSYQ DGCW DBOV DOGF DTWI DGOV DMJK DHUU JBMRD DNHB DNOT DMTO KAD DMMI XDNWA DVMO DYWM DHSK DOYB DNCR DMBW SJD TKD DYWF DJBF DTBO YMNO KBNO KRNO HXNO YANO OMNO XMNHJ MNHNE MNBM MNLBK MNOHH MNIR MNONH MNPA MNBND MNRBO MNOMM MNCWJ MNMEM MNJOC MNGBT HNE SKHNE GQHNE WJ OYYIU PPPH WPP HUYR HUIHQ HUHUU XIHHQ ONHQU HUNKQ FKHQU HUTCA XHUNW BGHQU HPM ONL ONNHS ONLL ONU ONLLL ONLLN ONHEY ONNOM ONWK ONYVO ONTQ ONJV ONMTC ONJRU ONFF ONVNE ONQMB ONABT OE EMN OE EEI ENI EON EU ENJ ERU ME EA EA EKI ENHE EYY EYK ECSH EP EHML EMMU EYHN EPU EPSH EA EMLS EJB EQJ ESK EMKS EOSU EIKS EIJC EBM EJP EOPD ESHR EJR EWO EPH ENLS ENI ETM EHHL EWC EJMN EOII EYVI EFQ ERVP ELBK MRE FBE EIKP EYS EHVD ENOM EWR EWK EMNN EHBU EHJD EHEQ EKB EHBT ELMO ESJ EVR EPA EMAM EGG EOMR EKT EYBO ELMI EOMI EYKN EYTH EIVJ XESMI EICE EOMC ERYO EKKB EJMU EMMR ENAU EAG ENKM EDL ERB EUON ECNH ETBS EDT EYKQ EWQS EROB XENBK EHED ELSA XESIM EYTR EJRR ESBN EWJR EMSO EVVW EDHL EKKB ETMC EYAJ EJMF EBAU EDCI EWML EYSY EC EYOJ EEE ENME EQMO EJNK ERLU EJLL EIKH EJKA EOMN EDAM EJDS ESMG EPTD EWB EJMM EHQJ EAHU EUMB EMWL ECST ETBN ETMV EHAG EHDF EMWG EBOJ EODE EAIU EILR EGIT EBAC EIBI EMWD ETUB EQKD ESQF EHUK EWMO ENMM EASM EMVI ENLD EYBS EJBC EMIA EJYJ BFQE EHHU EQJU ESJE 0 ETBG XEYPP EYCD ENNO EYPD EIXP EYUB ETWA EDDV EYSO EKHR ETIT EWVF EDLO EYTJ ELLP ETGE ETBF EOMK EVMG ERMR ETMC EKCF EHDB EKHA EJCB ESND EYTG EYBK EMJK ETCL EGTI EGTH ELSW ERRD ETWT EYWM ENCR EITC EBUG EDLO EYHO EHUL EYRO EMBB EOTO ESMG EJJM EYRN EYEM EFDC EOMB EAFO EMBB XF NOF FPI FNSH AF FNO FDK FYHN FPU BF FQS FOSU FYVI FSS FBR IRF FMOB FYG FMR FRC FHFD FNOM FTQ FTC FHER FOPJ FOMI FSOY FKKB FJMU YRNF FHEJ FAMJ FMMR FOIR XFNBK FLSP XQIF FYTR FYAJ FFF FHJE FJMM FAYT ARF FWMV FWB FJRB FABT FTLK FYAV FHSM HGF FHHW FSMA SIF FAWE FYCB GRTF FKCF FHDW FHBK FYTO FFE MOF FBWI HBDDF BMKE KK VLM LNJNK LLPTD LLHSB HQP IHQ HQG HQHQU OPHQ HQJR HQMMR HQHGR SYYQ HNHQ HQKMR HQJNK HQBMC KHHXE HQISB HQYRB NIHQ IK KHKN KHMJ KHI KHNVM KHIHU KHNG KHBO KHPRU KHWL KHLLN KHBM KHNF KHJMN KHYCK KHIJ KHJDI KHOMI KHNSD XKHND KHOMD KHPPG KHRB KHWG KHYMR KHICE KHHDN KHOMM KHHXU KHWD KHNNF KHAA KHKMR KHYOJ KHOMR KHWLN KHJRB KHWMV KHAHM KHWB KHNHD TWIK KHAHU KHDAM KHBBB KHGRV KHYTU KHYTJ GKIK KHMTO KHKCF KHNBQ KHDLO KHHGF KHTRG MGMN MGHN MGNO MGNSH MGYK MGCSH MGQS MGOSU MGOIP MGYR NFMGI MGHA MGMNR MGKSR MGRVP MGMGI MGGI MGIKP MGTC MGHER MGSJ MGLMO MGHON MGFSM MGBKQ MGIAV MGYIU MGMHL MGYKQ MGFBO MGSJR MGYPU MGKMR MGAPP MGTMC MGJNU MGJMF MGFF MGPP MGAU MGABU MGRYE GJHVO MGVVW MGJRB MGTLK MGOMN MGILR MGBOU XMGBB MGTLM MGUOG MGHWP MGYSO MGYTJ MGBOV MGRMR MGTMC MGTCO SJMGI MGYED MGYPO HBMGI MGHUO HOHQO KSHVO MFHVO YJHOJ YVHVO CIMN SKMVN OIMVN KMSO MGMVN TWLN GHMVN CAMVN SJMVN IPTM HMWKS NIBQ MFBQ JPBQ WMN VVW WML WHE WOK WIK IKW WOHH WGG OFW WQKI WKMR WJNU VIW WYTG NYO KMN KSL KON KNO KU KSM KMS KNSH KIKU KAU KOLL KMKS XKOO KOSU KYG KPRU KTM KMNR KYMP KAM KOHH KBM KKSR KYVI KHS KBQ KNOM KOMG KKN KGDI KMTC KMRT KMFR KHDN KGP KOOG KMMR KEFH KTBS XKNBK KLSD KFF KLMY KWML KWJR KHDV KYSY KYOJ KMSO KCWJ KIKH KONK KDLN KHXO KRYE KKTG KFDV KEII KQHP KWOT KFCB KHYE KHHW KTQM KTOR XKHUP KEOG KMWF KWVF KSMH KYTJ KBOF KKRB KTAK XKNLP KBOV KTMC KNLM KMGG KYTP KSRJ KSCE XKDLO KNMQ KJCO KBUG NOMK HAP HAHE HAKJ HAYCK HAUSU HAHGR HAJMU HLHA HAHDW 0 BQDHE IEDHE BT MDBT LBT GIBT LKBT IJBT KFBT HXBT BUMD BUPU BUMLS BUFH BULBU BUSK BUIR HMBU NUBU BUYMP BUYVI BUIKP BUGG BUFD BUNIN BUSMG FQBU BUIHQ BULMO BUICE BUCNH BUDT BUOMM BUMGG BUOG BUHHJ BUGCG BUHXU BUJLO BUBD BUNOK HWGTI YBMCU NKBU BUTW XBULM BUGIT BUHXE BUBAC BUMWF BUFBG TWLU FKBU BUSHB BUMJK BUYTG BUFDQ BUNCR GEBU BUOG BUOGE JMJMM NHOIN OK OKNL OKHKL OKOOG MRHN MRMJ MRNI MRHNI MRNSH MRFH QJMR MRPSH MRMVH MRPP MRKQ MRPU MRBHU MRHNK MRGI MRHS MRJP MRHPM YPMR MRYR MRLLN MRYT MRHIO MRLWL MRTK MRMMS IPMR MROM MRHVD MRNOM MRGG MRHWK MRHER MRMTN MRBMR MRMCW MRKT MRJPU MRUSU MRFB MRHQI MRYIU MRTYV MROMM MRBB MRJMO MRBGR MROG MRTBC MRYTR MRQMO MRIKH MRQMY MRAPV MRHSB MRIHR MRYBB MRUMF MRDAM MRJMM MRSTV MRYBS MREED MRMRR MRTQM HEMR MRNQD MRYCV GEMR MRESD MRNOT MRFDQ MRTMC MROGF MRYDK MRMWM MRTBO MRTBF MRTEI IF IFRU IFNL IFNVM IFMK IFHML IFYLM IFQS IFIKK IFHPM IFHS IFGI IFJR UUMMF IFSMR IFNF IFLMO IFYBO IFQKI IFTMC YWMMF IFNME IFQHK IFTGF IFGRR IFYRV HLBI WLBI OYUB HDMJ HDL HDPP HDDJ HDMFJ HDLBK HDIJC HDLXH HDGR HDUNI HDHBV HDIAV HDBND HDRHR HDOIP HDHHJ HDWD HDBGR HDWCE HDJBC HDIUA HDGCW HDJIP HDYRV JCNI JCN JCPU JCHS JCHIO JCVIS JCMMS JCPYM JCMIG JCLMO JCHGR JCSKR JCSUU JCWD XJCQO JCJNK JCYTA JCOMN JCFDV JCHOO JCNLM YTICE YTDL HMM HMD HMJ HNVM HMT HAU HNHE HHLO HSK HPHH HBHU HHQM HIR HYT HSHR HSMR HAM HLXH HHS HPR HKSR HSR HIJ HYKS HHGU HMNL HOMG HOI HSMG HQR HPPJ HLLB HFSM HNSD HGPM HQAU HMOO HOLK HFB HNKM HMLK HRBO HWML HQSB HQMB HNME HEHA HTMC HJCM HQTM HJNU HQMO HSKT HQEQ HWLN HCWJ XHLX HTKR HIHR HJKA HHAG HVNO HONK XHLMO HFDV HYRB HSLY HTTB HBUI HMWD HHWP HHYU HYUB HHVU HWLI HYSK HAVT HDLO HIXP HVDL HMWJ HNOT HTMC HMUA HTCE HEII HQHW HDLO OFD FDU FDND FDAU FDHA UUFD FDMMS MWFD IOFD XHWMV EIFD YEFD FDMLK FQVV FDJMF FDIKH FDNHD FDONK FDNOB FDHOA FDTVI FDHUK FDYHR IDFD FDILE FDNII FDMBB VIF YKVIF VRVIF QIVIF TCVIF HKVIF IDVIF BUHVF HBUF QMWYF VVM VMMD VMDI VMON VMKNI VMI VMSHI VMQS VMMMI VMKI VMPP VMHG VMOP VMJM VMNL VMNIN VMTM VMPT VMIKE VMNSM VMFQ VMLLN VMUU VMEQ VMIR VMKMS VMMIG VMHON VMPA VMHEQ VMMLK XVMFB VMRB VMCOR VMBV VMHED VMCNH VMGCE VMTLK VMKMR VMLMY VMFBR VMAPP VMBBE XVMBB VMPOU VMHYR VMFQU VMJMO VMJRR VMEEE VMVVW VMTLJ VMDBU VMIHR VMAMO VMBUH VMRSJ VMABT VMLMO VMWP VMHJM VMHJE VMOMK VMONK VMYHR VMYBB VMRPA VMMCA VMMVI VMJBC VMYWV VMYRB VMYUB VMTCT VMTXC VMJOC VMMWF VMAWE VMWVF VMBOV VMSMH VMVVD VMGRO VMKCF VMTTR VMCWA VMMWM VMYLR VMRRD VMWLV VMHUO OJU BOOJU GEOJU OUYPD BTYV WLMF WLJR WLMYM WLKLU WLJBJ WLGIF WLPOG WLCWA WLTJM TGHU TGF TQOII TQHPM TQNOM TQICE TQAPV TQUMF TGHDS YRBTN TGFTK STQQ SMT JESMM YTSMM SMYT OISMM OMRM SMOG LYSMM JASMM TBNM HBSMM MBSMM HJSMM SESMM JPHQU JPA JPMIG QD QDND QDFH QDMMI QDAU QDRLR QDOMR QDTBS QDFBR QDWLB QDFDV QDMVI QDTTB QDYBS QDIDR SJMN KSJ SJLBU SJEE SJGB SJOII SJJMN SJHJR SJLMO GKSJ LQ XL PKLQ HKLQ BKS YVB BDI BM BHHH BMMS BYHS BPU BOB BYHN BKI KKB BNO BTT BKI LEB BLWL LWB BHVO BOHH BHS BMFM BWL BHPM LVBU NOB BKD BYMY BYS BNOM VEOBO BWK BKMS BKN BFMU BYVO BBMR BJV BTT BOMI BKIC BYKL BFD BHBV YCOBO BJMU BOOG BBND BIJB BSE BROB BTBC BQMB BYOK BKLU BIOI BLMY BJMF BJMO BQKK BOMN BJBJ BRRS BWP BNKQ BHXO BHAE BMWL BABT YVB BMRB BIBI BJOC BMWF BJCG BFDQ BYBR BTGR IGB BYWM SEB BITC BYVG BYTP BRRD BGTE BHUO IMSLL HUD MGQKD HX HXO BHX HXT QKHX HXYF HRHVP HRHKP NIQ BBNQ HYM HYU HYIK HYHE HYYHS HYPP HYL HYLW HYHS HYHA HYYVI HYMNR HYYS HYMCW HYFB HYSHU HYNDT HYTHU HYTWA HYYTG HYTBO AV LNNAU TKN TNHS TKNI XTQ THJ TMD TPI TN TG TSU TVVH TPP TMKU THNE TNO TNDU TOLL TNHE TOIN THVP TMMU TAU TOB TJE TPHH TMMI THML TMVH TJB TOO TYY TQS XTMKS TMSU TBHU TPO TJM TNIU TGB TOII TIR TSHR TBR TMNR TBU TPRU TPR TRVP TVIO TSS TMFM TJMN TYR TDM TBM TTM TODI TUU TKSR THHL TIKK TYMP TDJ TOG TNOM TIKP TPYM XTBG TBNJ TNIR THPL TAV TMCW TLMI TIMO TKLG TYCK TOIK THJD TEM TWR TWK TSJ TVR TYIU TBMR TPA TOMG TTLN THON TOHG TKN TKSS XTYK TKT XTJPU TPPJ THKL TOMI TYKL TBKQ TBE TBHQ TBF XTSMI TSOY XTNDF TNYK TVMM XXXTV TJBD TKHF TOMD TBV TOYT TIJB TRHR TOWY TYTJ TNKG TOLK TJMU THDS TIAV TBND THQI TGNO TADI TROB XTOMM TKHU TBMG TBPM TVMU TIKT TJNU TQMB TJRR TVJR TEMR TBSE TAA TDCI TQIK TNUI TEDE TNUE TDHL TJMR TNDO TGCE TYSY TEBM TYFE TTMC TYOJ THHJ TJLV TAB THDV TNHX TOG TKMF TLBR TBLI TBVF TJMM THXO TRRS TORD TGGI TDBU TTMV TQHK THAU TJRB TRYE TIHV TNOK TYRN TWP TRSJ TIHO TPPA TLMO TFDV TEHV TEIV TMFF TYBS TBLN TTUB TTXC TKOK TWKP TYRB TQKD TCIM TJPA TMVI TYWV TOYR THWP TNMN TYUB TNNO TBC TAKM THOO TSMH TJOA TWVF TDLO TAWE TITF TSFI TYSK TMYF TGCW THVU TOMK TLSG TJME TIVV THDW TMWJ TOGF TPPP TESD TJIP TASE TMOM TMTO TEAT TCJL TYVG TRJI TSIC TMBW TVMI THOK TYTP TSRJ TMNM TWLP TFVK TWLA THGF TMBB TGRG TYRD TBHU TNMQ TQDB THHE TEHW TERD TMBG THON TIDR THJD TYYO TOKF TMGF TIDY YP YPKS YPSM 0 YPYK YPRVK BIYPU LIU LIHN NHLI MULMI LIYV LION MSLMI LIIK LINVM LIYK LIOB LIQJ LIPP LINL HKLMI LIMVH LIHQU LICI EILMI LIOLL LIQO UMLI LIYJ XLIBH LIOM LILW LIHS LIVIS LIMNR LITM LIGB LIYG LIJR LIBM LIOII XLIBT LIMMS LIEG LITW LIIHQ LIWR LITQ LIGG LIHJR LIYCK LIOMR MNLMI LIMIG QILMI LIKT LIJPU LILLB LIYKL LIFB LINIB LIHQI WLPLI MVLMI QLLMI LIRVK LIBND LIHDN LIOMD LINKM LINKG XLICR LIROB LIOKR LYLMI LITMC LINDT LITGU LIDHL LIBGR LIIRM LIHHJ LIAPH LIFQU LIQMB LIWD LIJNU LIRLU LIWMI LICWJ LIHDJ LIAPV LIOMN LIHAG LIHSB LIMRW LIYSD LITCW NKLMI LIOAE LIKGG LIJRB LIJBJ LIFDV LIQKA LITBD LILMI LIIIL LIYBS LIHUP LIMHF LIHXE LIQKD LIILR LIBAC LITMB GKLMI LITWA LIYUB GKLMI LIFBG LIMWF LIWVF HEYLI LIYIJ LITAK NHLII LIHDP XLITL LIYTJ LITIT LINAO LIGTH LIHDW LITMC LIJIP LITGR NQLMI LINCR YRBLN LIITC LITBO LIMBB LITOE LITWI VOLII TTWLI JBMRI LIBUE HTNG HTFQ HOEMN HOMRN HOBGN LEI YCIV LOB LHG OINV LOIN LDK LHK PYSV LQS KRYHV LAM LDJ LFQ YNHV LIVE LOIK LOMR LHER LFSM LBKQ LAV LRHG YHXV IEYHV EHYHV XLYKQ LOMM LLSA LHHJ LEEE LQMV FBRYV LYYHV LAPH LSJR LGGY LHSB LAPV YODV LORD LLPB LJKA LFDV LTOR LMVI LYAV LHYU JTCV LLIT LSMA LNII SJYHV LMBB LDDQ MWAJ XBUND YRBHU UUBHU MOBHU JKBHU TCBHU ONBHU TBBHU TMBHU YCBHU NBDK NBHVO YPNBG NBONH NBFMU NBDL NBCWJ GBHNE PYMR LSYMR YPYMR WLYMR NCYMR FQYMR JTCR GEYMR INV IVY IVMJ IVM IVU IVON IVHP IVSHI IVSK IVSS IVOB XIVOP IVUK IVDK IVJR IVMNR IVBM IVBR IVHVI IVNSM IVUU IVSHR IVDHE IVIR IVSMG IVQD IVGG IVGR IVKF IVHJD IVHGU IVHMR IVOMG IVNMU XIVPA IVNSD IVJHP IVBKQ IVSMM IVQKI IVIT IVMOO IVFB IVHGR IVOWY IVKHG IVIOK IVSJE IVMSO IVLMY IVHDV IVHXO IVOIP IVNHX IVYRD IVYOJ IVTMV IVPTD IVDWF IVYPM IVAPV IVRRS IVOMN IVBME IVNUY IVIOR IVYTA IVYHH IVYBB IVISB IVNOB IVTAK IVFBU IVWCE IVYBS IVTCT IVPHT IVAWE IVYCB IVTBH IVMUA IVOGF IVLSW IVNHB IVJBK IVNCR IVOIM JRCOR MTM MTJE MTJNU MSHO BMSO FQMSO MOJTO UMOO BSHH BHPI BHDH BHSHR BHOD BHHER BHMA BHHWP BHTAK IBO BOHIO BOJM IPMMO JTBO XPTBO BORHU BOIR QIBO YPBO OGBO BOHER BOIG BOYVO BOSOY BOIJE BOMMV XDTBO BOOMF JBBO BOJNK BOBOO BOBGR ILOO BOFF BOABU QKBO BOIBI SLQMO MOGO YMBO BONCR YJHEO GCOK GCSLE GCYBO GCJKA GOVL GOBM GOIMO GOMNN GOHUO RMPI MSRYO RMQO RMMT RMYLM RMNHE RMOSU RMIR RMIKK RMJP RMKSR RMMR RMODI RMBT RMDHE RMHVD RMHGU RMYCK MNRYO RMGG RMYK RMJPU RMPPJ RMYHJ RMHND RMYKL RMSUP QLRYO RMIAV RMNIB RMQKI RMYAJ RMWD RMSJR RMOKR RMYTR RMHJO RMIYR XRMTK RMITE RMHJG RMUMB RMNKQ RMHLB RMPTD RMHSB RMNHD RMYBB JTCO RMTQM RMBVK RMASM XRMSJ RMTMB IFRYO RMUBB FKRYO RMNOT RMCWA RMHDW RMMMI RMYFU RMMTO RMTCO RMJCL RMWLI RMTJA RMTLG RMVVV RMIWG RMHUO RMFFE JJR JQU KQMJ KQK KQSHI KQMSU KQJR KQMNR KQYS KQRC KQHQO KQHFD KQOHH KQHVD KQSHR KQIPM KQMIG KQHBY KQOMG KQHER KQSJU QOKQ KQAPP KQBTV KQYRF KQEEE KQVVW KQQKK KQMRW KQABT XVMR KQGRV KQJQR KQSTV KQIXP KQYBK KQFDQ YMD YMVH YOJ YSHR YOPD YBR YKSR YIR YNF YHQO YHS YNOM YTT YHEQ YHMR YIJB YFB YIJE YKHF YRHG YICE YMBB YJRR YVNE YGCG YHDV YOMN YHJU YUMB YAPV YRYE YHAG YTCW YTTB YHHW YASM YGSK YFDQ YYPO YNBQ YJCO YBHU YVVV RAU VVRAU MJNL YVNL MNL INL YSNL MTNL PMNL TMNL IRNL OMNL MMNL MBNL LMPNL HMNL NSNL TCNL HDNL KINL MGNL PANL KTNL XOINL BQNL KBNL BDNL HRNL GCNL SRNL RGNL XMBNL RONL HJNL FFNL DDNL CJNL SVNL RSNL MGNL TMNL MFNL YJNL TRNL HWNL SONL HONL MRNL UTNL MCWM MWMN TCWM MWPI MWDI MWPD MWMJ MWUK MWCSH MWMMI MWKI MWJP MWHS MWTM MWJR MWHD MWIVE MWNIR MWHER MWBMR MWPA MWHGU MWRHG MWOMD MWJKD MWOWY MWBDI MWMTH XMWMB MWYTR MWYRD MWAPP MWAMO MWJRB MWNOB MWYFD MWTOG MWKRT MWILR MWSMH MWTCO MWOGF MWYUT MWTWT MWYPO MWHGF HDLW CKMGC MNC YCC EKC KLC NKC EUC GKC IPC SJC CCC OMJV XCU XCN XCLN XCY XCNN XCG XCHJ XCLLL XCHHH XCNHE XCHNI CLS XCV CNSH XCEI XCMT XCMYS XCMF XXCKI XCSS XCPU XCFH XCOB CBO XCHE XCOIN XCB XCPIM CPVM XCYHN XCYHS XCF XCYJ XCNG XCAU XCMGI XCMYM XCTM XCJR XCDM XCMNR XCSR XCKLB XCIKE XCIV XCBU XCAM XCWL XCW XCLW XCHA CHVD XCHHL XCPRU XCYLB XCYVI XCJP XCPH XCSP XCDHE CEQ XCMTN XCJKS XCJKP XCSJ XCTYV CMTC XCKB XCIHS CKT XCMHL CJPU XCMIG CFSM XCRR XCRLB XCWK CUSU CBON XCHJD XCHGU XCNKG XCHGI XCHJR COPJ XCOMG CKD XCOMR XCLMO XCHER XCNSD XCNAU XCYCK XCYHV CYTH XXXCY CENH XCJV XCVR CTBS XCMMR CDT XCIPP CLEG XCWG XCRMG XCBMS XCHGR XCHQI XCHDS XCOOG XCBDI XCYTJ XCYIU CLST CLSA XCCNH XCIAV XCSME XCSSR XCNLR XCQMB XCJKA XCTKR XCTW XCKJT XCKMR XCAMI XCWD XCAPP XCAA XCWJR XCOG CHJO XXCHL XCFQU XCPHP XCYTR XCFF OVJMO XCSJR XCNDT XCVVW XCQHK XCTLK XCPPA XCLMI XCWP XCRRS XCHJX XCHDF XCHJG XCHXE XCHAG XCBME XXXCY XCITE XCTGK CFDV XCTVI CLNO XCAHU XCTAK XCIBI XCMRB XCSJE XCFBU XXCOG XCHUD XCORQ XCHHW XCYRB XCYBS XCTCT XXXCJ CJOC XCJCR XCFBG XCAWE XCWVF XCUBB XCILB XCYCB XCYSK XCYSO XCSMH XCMWJ XCMTO XCKCF XCTCO XCNWA XCYDK CLSW XCTCA CJCL XXXCN XCNOT XCTOE XCMBW XCWLV XCWLI XCITC XCYTP XXCJB XCIPF XCVVV XCNRI LSM LSMMM LSMJ LSMG 0 LSKI LSYK LSYHN LSWL LSGG XLSYK LSLMI LSRR LSUSU LSOI LSYVO LSWD LSNWU LSIAV LSJKA LSIRM LSKLU LSAA LSHXU LSBBE LSHPA LSNHX LSYSY LSDWF LSBUK LSLMO LSNOK LSGIT LSJBC LSASM LSTUO LSNJK LSWLV HRJ NL NLHJ NLMU NLHE NLMMU NLTT NLHS NLYR NLDHE NLIKP NLNOM NLYVO NLPPG NLYLH NLAG NLRBO NLSJE NLHJM NLHHJ NLWLB NLWMV NLKMB NLHAG NLHI NLTCT NLYTO NLAVF NBOP OG OGJ OGNHS OKOG YMPOG YVHG BMOG NSOG HROG OGIVG MBMMS MBYK MBMKS MBPRU MBYKL MBFB MBNKG MBEJB MBYTV MBLMY MBHXU MBDD MBBIE MBEBG MBIVV MBTBK MBSRJ MBBHG QBBHU QBJMO IDLMY MIKW TJHML TJOP TJAU TJAM TJLBK TJJV TJYK TJHKL TJNAU TJFB TJPFD TJNHD TJPYR TJTKD TJTTB TJTHB QSSHI QSIKE AOQS QSABT QSBHX LMMM YASHR PMBO MJMBO MGMBO HLMBO YNMBO YSMBO GRMBO NGMBO XORMB PEMBO XPFMB YOMBO SLMBO ETMBO HNMBO ORMBO PFMBO WBMBO RSMBO UBMBO SEMBO TBMBO EDMBO AFMBO MBMBO YOHWJ TGMBO HNNSH XHNYR XHNPR YTHNK XHNBM XHNWP XHNHX BUHNK XHNHH IKHNK XHNFF NIOIV VHOIV MIKV MHOIV YVGV RUOIV NV NVMN NVHP NVNSH NVPU NVOMN NVHG NVHK NVOKS NVIJ NVSMR NVUU NVIR NVSJ NVHBR NVOMR NVHER NVYCK NVYHV NVJBD NVMRT NVOMD NVBV NVICE NVWD NVAPP NVNHX NVDAM NVLMO NVBBB NVHXE NVNUY NVGIT NVTAK NVIBI NVHHW NVTQG NVTLM NVAWE NVTBK NVRUC NVJBV KNTHU TUIRM HAOAE NME NMK NMLLL NMA NMIS NMBM NMWC NMODI NMPR NMNSM NMJP VENVM NMEQ NMIR NMJPU NMWK NMOPJ NMYVO NMTT NMNMM NMMBB NMLWS NMYTJ NMSME NMICE NMTMC NMWD NMOG NMJMF NMLX NMIKH NHNVM NMNOK NKNVM QKNVM NMHHW JTCM NMISM NMMWF NMWVF NMHWP NMSND NMLPC NMMBU NMYRV BBHNE BBOLL BBHPM BBJR BBYVO BBHMR BBHER BBHHJ BBWD BBJHR BBFDV BBJTU BBJOC BBWLI BBYKB SIHHH SHMU SHHQU SHSHR SHYMP SHGB SHOD SHGR SHJMF SHFQU SHHDF SHJOC SHWLV SHVVV UIP MRBL NNMRB HIYJ HIIKK HIJD MIKI HIFB HIMOB HIBTV HIYUB NMSH XNMSU NMIKU NMPU NMYHS NMAU NMMNR NMIKE NMMFJ NMYR NMYS NMLW NMOS XNMOD NMHA FBNWM NMDHE XNMIR NMGG NMGR NMJKS NMKB NMMBL NMBMR NMBON NMHMR NMOMI NMYKL NMYCK TQNWM FQNWM NMSMI NMMLK XNMMB NMYKQ NMLEG NMWG NMADI NMHED NMHVF EHNWM NMJMU NMSKR NMAIL NMNIB NMQMB NMGCE XNMTM NMSJE NMLMY NMAPP NMAA NMWJR NMHXU NMOIP NMBGR NMYRF XNMIK NMNHI NMVVW NMJTO NMPTD NMMRW NMFBI NMAMO NMABT NMWMV NMWP NMRRS NMHDF NMOAE NMHAG NMHAE XNMLM XNMIS XNMEI QKNWM NMJPA NMASM NMWLF NMBOU NMYBS NMTXC NMTJS XNMMW NMMBS FKNWM NMAWE OKNWM NMILB NMSFI NMSMA NMMTO NMTTR NMFDQ NMTWI NMTOE NMIRP NMTWT NMYWM KNPYM IPPYM SPYM SKPYM OUPYM PJPYM LUPYM JRPYM KDPYM YSPYM XRSPY LKPYM OIPYM XHIPY PRPYM NUPYM XFBPY PMJP VVMPM QIPYM XXMBP XHRPY ODPM HOMNM HYPYM ORPYM YCPYM MOPYM JDPYM MBPYM RBPYM HRPYM CRPYM LDPYM CHPYM MMPYM TAPYM TWPYM KUPYM APPYM HJPYM NXPYM YDPYM IOPYM JUPYM LXPYM JRBPM AVPYM RSPYM BBPYM HFPYM TIPYM AUPYM NKPYM XMBPY BUPYM CMPYM HWPYM FBPYM TTPYM TCPYM SEPYM BVPYM IFPYM SHPYM KFPYM OFPYM YUPYM NBPYM RRPYM YMPYM PMTOE TOPYM TGPYM MUPYM YWTQM IPHN IPHD IPYG IPFD IPTMC DDIXP IPHHI IPFDQ JNPFD QEQO IDHI IDHQU FBTLC HDOE HEYR WFOIN OPWGF WFUU WFVIS WFNIN WFGR MIKF WFICE WFYRF HHWGF WFJNK WFIKH WFYTA TCFB TBIKK TBIJB RLWU XMMUU XRRWM NSBUL LOGTE GEHHJ HVCSH HVLW HVMMR HVBVK HVAJV HLKN HLMJ HLDAM YKLLL YUP YUON YUHML YUBM YUPRU YUSHR YUYMP YUAV YUMMR YURYO YUHLB YUSMG IPTC ORIKP OMRB OWLN SBLN RROB VTJB UOPJ QIKI QES QLIT MNJNK MNLMO EI FHBV MGSMF BUFDV HDMTC HKT VMLW VMQNI VMBR VMSJ VMCRU VMBD VMJBJ VMLIT VMYTO TYMU LITJB LTJB LWLI IVHML IVSIM BOHJR BOQMB BOQKA MWBHU NMSJE NMYT MBPYM YKPYM MNPYM QBPYM BKPYM HNPYM SRYJM"
.split(' ')
     var Lat2CJ ={Q:'手',W:'田',E:'水',R:'口',T:'廿',Y:'卜',U:'山',I:'戈',O:'人',P:'心',
                  A:'日',S:'尸',D:'木',F:'火',G:'土',H:'竹',J:'十',K:'大',L:'中',
                  Z:'重',X:'難',C:'金',V:'女',B:'月',N:'弓',M:'一','0':'0'}
     var i, k, sub, subarr, hier, varPY, varCJ, CJArr = [], cL, vL
     var CJincomplete={}
     for (i=0, cL=cjList.length; i<cL; i++) {
         hier=simpList[i]
         varCJ = cjList[i].replace(/./g, function(lat){return Lat2CJ[lat]} )
         if(varCJ=='0') 
             continue // no CangJie for this hieroglyph
         if (CJArr[varCJ])
             CJArr[varCJ].push(hier)
         else
             CJArr[varCJ]=[hier]
         for (k=1, vL=varCJ.length; k<vL; k++) {
             sub=varCJ.substr(0,k)
             if (subarr=CJincomplete[sub]) {
                 if (subarr.length <9 && subarr[subarr.length-1] != hier)
                     CJincomplete[sub].push(hier)
             } else
                 CJincomplete[sub]=[hier]
         }
     }
     for(k in CJincomplete) {
         if(CJArr[k]) {
             if(CJArr[k].length<10)CJArr[k] = CJArr[k].concat(CJincomplete[k].slice(0,10-CJArr[k].length))
         }
     }
     VirtualKeyboard.Langs.CN.CJArr = CJArr
 }
,'activate' : function () {
     VirtualKeyboard.Langs.CN.INPArr = VirtualKeyboard.Langs.CN.CJArr;
 }
,'charProcessor' : VirtualKeyboard.Langs.CN.processChar
}},
{code:'ZH-CN'
,name:'Chinese Simpl. Pinyin'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,。/'
,shift:{0:'~！·#￥%…—*（）—+|',24:'{}',35:'："',44:'《》？'}
,'cbk':/**
 * $Id$
 *
 * Chinese simplified PinYin
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
{'load' : function () {
     VirtualKeyboard.Langs.CN.PYArr={a:"阿啊吖嗄锕安爱暗案按",ai:"爱呆挨哀埃碍艾唉矮哎癌嗌嗳嗳嫒捱暧瑷皑砹硙蔼诶锿隘霭",an:"安暗案按岸俺埯庵揞桉氨犴胺腌谙铵鞍鹌黯",ang:"昂盎腌",ao:"奥澳傲熬凹嗷坳媪岙廒懊拗敖燠獒翱聱螯袄遨鏊鏖骜鳌"
                                    ,b:"不本把部便被北并别比",ba:"把八吧巴伯罢爸拔霸坝叭扒岜捌杷湃灞疤笆粑耙芭茇菝萆跋钯钹靶魃鲃鲅鲌",bai:"白百伯败拜摆柏佰呗捭掰稗薜鞴䙓",ban:"反办半版般班板伴搬扮斑颁坂扳拌瓣瘢癍绊舨钣阪",bang:"帮旁邦棒膀绑傍榜梆氆浜磅蒡蚌螃谤镑",bao:"报保包宝抱暴炮薄爆胞饱剥堡鲍刨孢掊煲脬苞苴葆裒褒褓褴豹趵铇雹鸨",be:"本被北备背奔悲辈杯臂",bei:"被北备背悲辈杯臂贝倍碑卑呗埤孛庳悖惫焙狈碚萆蓓蜚褙跋邶鐾钡陂鞴鹎",ben:"本奔笨坌夯畚苯贲锛唪",beng:"唪嘣堋崩抨泵甏甭绷绷蚌蹦迸镚",bi:"比必笔毕秘避臂币壁闭逼鼻彼碧辟拂毙鄙蔽弊俾匕吡哔埤妣婢嬖庇庳弼愎敝枇檗殍毖泌滗濞狴璧畀痹睥瞥秕筚箅篦纰舭芘荜荸菝萆蓖薜蘖蚍裨襞诐贲赑跛跸鐾铋陂陛陴馥髀鲾",bia:"便表边变编标遍彪辩鞭",bian:"便边变编遍辩鞭辨辫扁匾卞弁忭汴煸砭碥稹窆笾缏苄蝙褊贬鳊",biao:"表标彪镖剽婊嫖杓灬焱瘭膘苞裱鏖镳飑飙飚骉骠髟鳔",bie:"别憋瘪蹩鳖",bin:"宾彬滨斌傧摈殡浜濒玢禀缤膑豳镔髌鬓",bing:"并兵病冰柄屏饼丙冫廪摒枋槟炳燹禀秉迸邴",bo:"白百般波伯博播薄勃拨柏剥玻脖泊卜驳搏魄亳佰啵孛帛悖擘檗泺渤溥礴箔簸簿膊舶艴荸菔菠蕃薜蘖袯趵跛踣钵钹铂镈雹饽馎鲅鲌鹁",bu:"不部步布补捕堡怖卜卟卩哺埔埠惚晡溥瓿簿逋醭钚钸鞴"
                                    ,c:"出成从长此重次产处才",ca:"擦拆嚓礤才参采藏草菜",cai:"才采菜财材彩裁猜蔡踩睬䌽",can:"参残餐惨灿孱惭掺昝璨粲蚕骖黪",cang:"藏苍仓舱伧沧臧鸧",cao:"草操曹嘈屮槽漕澡糙艚螬",ce:"策测侧册厕恻栅赦䇲曾",cen:"参岑涔曾层噌缯蹭",ceng:"曾层噌缯蹭",ch:"出成长重产处场车常吃",cha:"查差察茶插刹叉吒咤喳姹岔搋搽杈楂槎檫汊痄碴苴茬荼衩诧锸镲馇",chai:"差柴拆侪瘥茈虿豺钗",chan:"产单颤禅缠阐冁刬啴婵孱廛忏掸掺搀浐潺澶羼苫蒇蝉蟾觇谄谗躔铲镵馋骣",chang:"长场常厂唱尝偿昌畅肠倡敞伥娼嫦徜怅惝昶氅猖玚苌菖裳锠阊鬯鲳鲿",chao:"朝超潮吵抄炒嘲绰剿巢怊晁焯耖钞",che:"车彻尺撤扯坼屮掣澈砗辙",chen:"称陈沉晨尘沈臣辰趁衬琛嗔宸忱抻榇橙湛疹眈碜秤肜胂谌谶郴龀",cheng:"成城程称承枪乘盛诚撑呈惩澄丞伧噌埕塍晟枨柽樘橙浈瞠秤蛏裎赪逞郢酲铖铛骋",chi:"吃持迟赤尺池驰耻痴齿斥嗤匙侈傺叱哆哧啻坻墀媸弛彳搋敕沱炽瘛眙眵笞篪翅胝芪茌茬蚩螭褫豉踅踟郗饬魑䗖",cho:"重冲充抽仇崇愁丑臭筹",chon:"重冲充崇虫宠忡憧潼盅",chong:"重冲充崇虫宠忡憧潼盅舂艟茧茺酮铳",chou:"抽仇愁丑臭筹酬绸瞅俦帱惆搐焘畴瘳稠踌雠䌷",chu:"出处初除楚础触储厨畜亍刍怵憷搐杵楮樗橱滁矗硫絮绌蜍褚蹰锄雏黜",chua:"传创穿船窗床川串闯喘",chuai:"嘬揣揣搋踹蹉",chuan:"传穿船川串喘巛椽氚舛舡遄钏",chuang:"创窗床闯幢囱怆疮舂",chui:"吹垂锤捶棰椎槌炊陲",chun:"春纯唇淳蠢椿沌肫莼醇鹑䞐",chuo:"绰啜戳淖焯簇缀荃蔟踔踱躇辍醛龊",ci:"此次差刺词辞慈赐磁瓷兹伺嵯恣疵祠粢糍茈茨蚝螅訾趑雌鹚",co:"从匆聪丛凑葱囱揍枞楱",con:"从匆聪丛葱囱枞淙琮璁",cong:"从匆聪丛葱囱枞淙琮璁苁骢",cou:"凑揍楱簇腠蔟辏",cu:"促粗醋卒徂槭殂猝簇蔟蹙蹴酢",cua:"窜撺汆爨篡蹿镩",cuan:"窜撺汆爨篡蹿镩",cui:"脆翠崔衰催粹摧啐悴榱橇毳淬璀瘁缞萃隹",cun:"存村寸忖浚皴",cuo:"错差措挫厝嵯搓撮痤瘥矬磋脞蹉锉鹾"
                                    ,d:"的大到地道得对多都当",da:"大打达答塔搭哒妲怛沓疸瘩瘩笪耷荙褡跶酂靼鞑",dai:"大代带待呆袋戴贷逮歹傣呔埭岱怠棣殆玳甙绐轪迨逯黛",dan:"但单石担弹丹淡胆旦蛋诞儋啖惮掸檐殚氮湛澶澹疸瘅瘅眈箪耽聃膻萏蜒詹赡郸钽",dang:"当党荡挡档凼垱宕玚珰砀筜菪裆谠铛",dao:"到道倒导刀岛盗稻蹈悼捣叨刂帱忉梼氘洮祷纛鱽",de:"的地得德锝陟等登邓",dei:"得",den:"等登邓灯瞪凳澄噔嶝戥",deng:"等登邓灯瞪凳澄噔嶝戥橙眙磴簦蹬镫",di:"的地第提弟底低敌帝适抵递滴狄迪蒂堤笛嘀坻娣嫡柢棣氐涤睇砥碲籴缔羝翟胝芍荻莜觌诋谛蹄轪邸镝骶䗖",dia:"嗲点电调店掉典鸟雕殿",dian:"点电店典殿颠淀甸奠佃坫垫巅惦拈掂涎滇玷癜癫碘簟蜓踮钿阽靛",diao:"调掉鸟雕钓吊凋刁叼碉稠窎莜蜩貂踔钌铞鲷",die:"爹跌叠蝶碟佚喋垤堞揲渫牒瓞窒绖耋褶谍蹀轶迭鲽鳎",din:"定顶订丁钉盯鼎叮仃啶",ding:"定顶订丁钉盯鼎叮仃啶汀玎町疔碇耵腚葶酊锭饤",diu:"丢铥",'do':"都动东读斗洞懂冬豆抖",don:"动东洞懂冬董冻栋侗咚",dong:"动东洞懂冬董冻栋侗咚垌岽峒恫氡甬硐胨胴酮鸫",dou:"都读斗豆抖兜逗陡渎痘窦窬篼蔸蚪逾饾",du:"都度读独毒督肚渡杜赌堵睹嘟妒椟橐渎牍犊碡竺笃纛芏蠹镀阇髑黩㱩",dua:"段断端短锻椴煅簖缎踹",duan:"段断端短锻椴煅簖缎踹",dui:"对队堆敦兑怼憝槌碓镦",dun:"顿盾吨敦蹲囤墩沌炖盹砘礅豚趸遁钝",duo:"多度夺躲朵舵堕亸剁咄哆哚垛惰掇柁棰沱沲缍裰跺踱铎锗隋饳驮"
                                    ,e:"阿恶额俄饿哦鹅厄呃噩垩娥婀屙峨愕扼猗硪胺腭苊莪萼蛤蛾讹谔轭遏邑鄂钶锷阏隘颚鳄鹗",ei:"哎诶诶",en:"恩摁蒽",er:"而二儿尔耳佴洱濡珥贰迩铒饵鲕鸸䌺"
                                    ,f:"发方分法反放风服非夫",fa:"发法乏罚伐垡珐砝筏阀",fan:"反饭翻犯范凡番烦繁返泛贩帆幡梵樊燔畈矾蕃藩蘩蟠袢蹯钒",fang:"方放房访防仿芳妨坊纺匚彷枋肪舫邡邡钫鲂鳑",fe:"分风非飞费份封纷峰丰",fei:"非飞费斐废菲肥匪啡肺沸吠妃悱扉榧淝狒痱痱砩祓篚绯翡腓芾蜚裴诽贲镄霏鲱",fen:"分份纷奋愤粉芬吩氛坟粪焚偾忿棼棼汾瀵燔玢豮贲酚鲼鼢",feng:"风封峰丰锋凤奉枫疯逢缝冯蜂讽俸唪沣烽砜葑蚌赗逄酆",fo:"佛否缶",fou:"否缶",fu:"服夫父府复福副负妇富佛付附幅伏扶赴浮符腐腹咐抚覆傅弗肤芙俯拂俘赋甫缚辅敷凫匐呋呒孚孵宓幞怫拊掊斧桴氟涪溥滏砩祓稃绂绋罘脯腑艴芾苻茯莆莩菔蚨蜉蝠蝮袱讣赙趺跗辐郛釜阜阝鞴韨馥驸鲋鳆麸黻黼"
                                    ,g:"国个过公高工给间关感",ga:"界夹咖胳嘎噶尕尜尬旮轧钆骱",gai:"该改概盖丐垓戤溉胲芥赅钙阂陔骸",gan:"间感干敢赶甘乾杆肝坩尴擀旰柑橄泔淦澉疳矸秆竿竿绀苷赣酐鳡",gang:"港刚钢岗纲缸冈扛亢戆杠筻罡肛肮舡颃",gao:"高告稿搞糕膏咎杲桕槁槔皋睾篙缟羔蒿藁诰郜锆镐",ge:"个合各革格哥歌隔割阁葛戈搁胳仡咯哿嗝噶圪塥搿烙疙砝硌纥膈舸菏虼蛤袼铬镉阖颌骼髂鬲鸽",gei:"给胲",gen:"跟根哏艮茛更颈耕耿亘",geng:"更颈耕耿亘哽埂庚梗炅炔粳绠羹赓邢鲠鹒",go:"公工共功红供够构攻狗",gon:"公工共功红供攻宫恭贡",gong:"公工共功红供攻宫恭贡躬拱弓巩唝廾汞珙肱蚣蛩觥赣龚",gou:"够构狗购沟勾钩佝垢媾岣彀枸笱篝缑耩苟觏诟逅遘鞲骺",gu:"告古故姑顾股骨鼓谷固孤估贾雇辜咕嘏崮梏毂汩沽牯牿瓠痼皋瞽箍罟胍臌菇菰蛄蛊觚诂酤钴钴锢馉骰鲴鸪鹄鹘",gua:"挂瓜寡刮剐卦呱栝聒胍脶蜗褂诖鸹",guai:"怪乖拐",guan:"关管观官馆惯冠贯灌罐倌掼擐斡棺浣涫盥矜纶缶脘莞菅鳏鹳",guang:"光广逛咣桄潢犷胱",gui:"规归贵鬼桂跪柜轨龟瑰傀刽刿匦匮圭妫宄庋撅晷桧洼炅炔癸皈眭瞆硅祈簋觖诡蹶闺隗鲑鳜",gun:"滚棍磙绲衮辊鲧",guo:"国过果郭锅裹呙埚崞帼掴椁涡猓聒虢蜮蜾蝈蠃馃馘"
                                    ,h:"和会后好还行回话很海",ha:"哈虾獬蛤铪好还行海孩",hai:"还海孩害咳亥嗨氦胲醢颏骇骸",han:"汉喊含寒汗韩罕憾翰涵函旱撼悍憨捍撖擀旰晗泔澉瀚焊焓犴菡蚶邗邯酐酣闬顸颌颔鼾",hang:"行航杭巷吭夯桁沆炕绗肮酐颃鸻",hao:"好号毫豪浩耗嗥嚆嚎壕昊涸濠灏皋皓睾蒿薅蚝貉郝镐颢",he:"和何合河喝核吓赫荷贺盒呵鹤禾劾嗑嗬壑曷洽涸盍硅纥翮耠苛菏藿蚵蝎褐诃貉钾阂阖颌饸鲄鹖龁䙓",hei:"黑嘿",hen:"很恨狠痕哏艮行横哼衡",heng:"行横哼衡恒亨桁珩绗蘅訇鸻黉",ho:"后红候洪厚後轰鸿宏侯",hon:"红洪轰鸿宏哄虹唝弘泓",hong:"红洪轰鸿宏哄虹唝弘泓洚烘纮荭蕻薨訇讧闳黉",hou:"后候厚後侯喉吼猴堠灬瘊篌糇逅骺鲎鲘",hu:"和许乎胡户护呼忽湖狐互核虎糊沪壶冱唬唿囫岵弧怙惚戽扈斛槲汩浒滹烀煳猢琥瑚瓠祜笏胍芋芴葫虍蝴觳轷酏醐鳠鹄鹕鹘鹱",hua:"话化华花划画滑哗婳桦狯猾砉稞豁踝铧骅㟆",huai:"怀坏淮孬徊槐踝",huan:"还欢换环缓幻患唤圜垸奂宦寰擐桓洹浣涣漶焕獾瑗痪皖眩缳脘苋萑豢逭郇锾镮阛鬟鲩",huang:"黄皇荒晃慌惶煌谎恍凰幌徨湟潢潢璜癀磺篁簧肓蝗蟥遑锽隍鳇",hui:"会回挥汇灰辉惠慧毁悔恢绘徽溃贿讳卉咴哕喙彗徊恚悝戯晖晦桧洄烩珲皓眭秽缋茴荟蕙虺蛔蝰蟪袆诙诲钺阓隳颒麾",hun:"婚混魂昏浑溷珲荤诨阍馄",huo:"和话活或火获伙货祸惑霍劐嚯壑夥攉瓠砉硅耠藿蠖豁钬锪镬鳠鹱"
                                    ,j:"就家见经将进其己机给",ji:"其己机给几期系计及记革即技基极际济集级奇急纪击既辑激寄继积忌吉迹鸡季骑疾籍挤寂绩祭饥妓肌脊圾剂藉讥姬丌乩亟伎佶偈冀剞叽咭哜唧墼嫉屐岌嵇嵴彐悸戟戢掎揖暨棘楫殛汲洎犄猗玑畸畿疵瘠瘵睽瞿矶秸稷稽笄笈箕粢缉羁脔芨芰荠萁蒺蓟蕺虮觊赍跻跽郅钑霁骥鱾鲚鲫鹡麂齑",jia:"家加价假架甲佳夹驾嫁嘉贾颊稼伽嘏岬恝戛拮挟枷柙槚浃珈痂瘕笳胛茄荚葭蛱袈袷跏迦郏钾铗铪镓颉饸骱䇲",jian:"见间件建剑渐简坚监健检肩减尖兼奸箭舰艰键鉴剪践荐贱捡拣煎俭僭囝戋戬搛枧柬楗槛歼毽沮涧湔湛溅牮犍犴睑硷碱笕笺箴缄缣翦腱茛茧菅蒹裥謇谏谫谮趼踺蹇钘锏鞯饯鲣鳒鹣",jiang:"将强江讲奖降蒋疆虹匠姜僵酱浆桨洚犟礓糨绛缰耩茳螀襁豇鳉",jiao:"教叫觉交校脚较角焦轿娇骄郊缴嚼胶搅浇绞佼侥僬剿噍姣峤徼徼挢敫椒湫爝狡皎矫矫礁窖艽茭荞菽蕉蛟跤酵醮铰饺鲛鹪䴔",jie:"家界解接结价节姐街阶介借届杰截洁戒皆揭捷劫竭藉偈偕卩喈嗟婕孑廨拮栉桀桔楷獬疖疥睫砝碣秸羯芥苴葜蚧袷讦诘诫锴颉骱髻鲒鹖",jin:"进金今近尽紧仅禁劲津斤锦筋谨晋巾浸襟卺噤堇妗廑槿湛烬瑾矜缙肋荩衿觐赆钅靳馑",jing:"经京精竟惊境静景警睛靖劲敬竞净镜径井晶颈儆兢刭婧弪憬旌晟檠泾烃獍痉箐粳肼胫腈茎荆菁蜻迳阱陉靓鲸黥䴖",jio:"垧扃炅炯窘迥颎䌹",jion:"垧扃炅炯窘迥颎䌹",jiong:"垧扃炅炯窘迥颎䌹",jiu:"就九究久酒救旧舅纠僦厩咎啾揪柩桕湫灸玖疚缪臼艽蝤赳赳阄韭鬏鸠鹫",ju:"车据且局举句具居剧巨聚距拒惧俱柜矩拘菊倨咀屦掬枸桔椐榉榘橘沮炬犋狙琚疽瞿窭苣苴莒菹蛆裾讵趄踞踽遽鄹醵钜锔锯雎鞠鞫飓驹鬻鲏龃䴗",jua:"卷圈捐倦娟桊泫涓狷甄",juan:"卷圈捐倦娟桊泫涓狷甄眩眷绢蕊蜷蠲鄄锩镌阮隽鹃䌸",jue:"觉决绝脚角爵掘嚼倔劂厥嗟噘噱孓崛抉撅攫柽桷梏橛爝獗珏矍蕞蕨蛙蠼觖觳诀谲蹶镢阙鳜",jun:"军均君俊龟峻菌捃浚狻皲睃竣筠訇逡郡钧隽馂骏鲪麇"
                                    ,k:"会可看开口科快空克客",ka:"卡刮咖喀佧咔咯胩髂看",kai:"开凯慨剀垲忾恺揩楷溘蒈铠锎锴闿雉",kan:"看刊砍堪坎侃勘戡槛瞰莰阚龛",kang:"康抗慷扛亢伉沆炕糠肮钪闶",kao:"考靠烤尻拷栲槁犒铐鲓",ke:"可科克客刻课颗柯渴棵磕咳壳哿嗑坷岢恪氪溘珂疴盍瞌碣稞窠缂苛蚵蝌轲钶铪锞颏骒髁",kei:"克",ken:"肯恳啃垦裉颀龂龈坑吭",keng:"坑吭硁硎胫铿",ko:"口空恐控孔扣佝倥叩寇",kon:"空恐控孔倥崆穹箜",kong:"空恐控孔倥崆穹箜",kou:"口扣佝叩寇抠挎筘芤蔻",ku:"苦哭库裤酷枯刳喾堀挎窟绔绹轱骷",kua:"跨夸垮侉挎胯锞髁会快",kuai:"会快块筷侩呙哙栝桧浍狯脍蒉蒯郐魁鲙㧟㱮",kuan:"款宽髋况狂矿旷框匡哐",kuang:"况狂矿旷框匡哐圹夼湟眶磺筐纩诓诓诳贶邝",kui:"亏愧溃奎傀匮喟喹夔岿悝愦揆暌盔睽瞆窥篑聩臾葵蒉蝰觖跬逵隗顷馈馗骙魁㱮",kun:"困昆坤壸巛悃捆琨裈醌锟阃髡鲲鹍麇",kuo:"括扩阔廓栝蛞"
                                    ,l:"了来里老两理力立路利",la:"落拉啦辣喇腊蜡剌垃摺旯瘌癞砬邋镴",lai:"来厉赖莱俫崃徕梾涞濑癞睐籁赉铼黧",lan:"兰栏蓝烂览拦懒篮滥缆啉婪岚廪揽斓榄漤澜罱褴谰郴镧阑㨫䍀",lang:"浪郎朗狼廊啷榔琅稂羹莨蒗螂踉锒阆阆",lao:"老落劳络牢姥捞佬唠崂栎栳涝潦潦烙獠痨耢蓼酪醪铑铹",le:"了乐勒仂叻捋泐肋饹鳓",lei:"类泪雷累勒垒儡嘞埒嫘擂擂檑漯磊缧羸耒肋蕾诔酹镭",len:"冷愣塄棱楞",leng:"冷愣塄棱楞",li:"里理力立利李历离丽礼例厉励黎璃哩莉粒隶梨栗俐俚俪傈厘吏呖唳喱坜娌嫠悝捩枥栎沥溧漓澧牦犁狸猁珞疠疬痢砬砺砾硌笠篥篱粝缡罹翮苈荔莅蓠藜蛎蜊蠡詈跞轹逦郦酾醴锂镉雳霾骊髦鬲鲡鲤鳢鹂黧䲞",lia:"俩了两连联量脸料亮练",lian:"连联脸练恋怜莲炼廉帘链奁娈敛梿楝殓涟潋濂琏瞵碾羸膦臁苓莶蔹蠊裢裣镰鲢",liang:"两量亮良粮辆梁凉俩谅唡墚晾椋粱莨踉辌阆魉",liao:"了料疗聊辽僚寥嘹寮尥廖撂撩撩潦燎燎獠缪缭蓼钌镣鹨鹩",lie:"列烈裂劣猎冽咧戾捩洌膊趔躐邋鬣䴕",lin:"林临邻琳淋凛吝啉嶙廪懔檩瞵磷禀粼膦蔺赁躏辚遴霖鳞麟",ling:"领令另灵零龄凌玲铃陵岭伶呤呤囹拎柃棂棱泠瓴磷绫羚翎聆苓菱蛉酃鲮鸰㻏",liu:"六流留陆刘柳溜碌旒榴泖泵浏熘琉瘤硫绺蒌蓼遛鎏铆锍镏镠飗馏骝鹠",lo:"咯龙楼露弄隆笼漏搂陋",lon:"龙弄隆笼拢胧聋垄咙垅",'long':"龙弄隆笼拢胧聋垄咙垅昽栊泷珑癃眬砻窿茏陇",lou:"楼露漏搂陋偻喽娄嵝瘘窭篓耧蒌蝼镂髅䁖",lu:"路陆露录绿鲁卢炉鹿碌芦庐卤噜垆戮掳撸栌橹泸渌漉潞璐瘳禄箓簏胪舻蓼虏赂轳辂辘逯酪镥颅鲈鸬鹭麓",lua:"乱卵娈孪峦挛栾滦脔銮",luan:"乱卵娈孪峦挛栾滦脔銮鸾",lun:"论轮伦沦仑囵抡纶",luo:"落罗络洛逻骆裸萝锣倮捋摞椤橐氇泺漯烙猓猡珞瘰硌箩脶荦蔂蜾螺蠃蠡袼跞酪铬镙雒骡㑩䲞",lü:"律率旅绿虑吕履缕侣偻屡嵝捋榈氯滤瘘稆膂褛铝闾驴",lüe:"略掠撂锊"
                                    ,m:"们么没无面民美明名门",ma:"马吗妈骂麻摩码嘛玛抹唛嬷杩犸祃蚂蚂蟆貉靡麽",mai:"买卖麦埋脉迈劢狸荬霡霾",man:"满慢漫埋曼蛮瞒墁幔熳缦蔓螨谩蹒镘鞔颟馒鳗",mang:"忙茫盲芒氓漭瞢硭莽蟒邙铓",mao:"毛冒贸貌矛猫帽茅茂卯峁懋旄昴泖牟牦瑁瞀耄茆蝥蟊袤铆锚髦",me:"么麼末麽们没美门每妹",mei:"没美每妹梅眉媒枚煤谜媚霉昧玫寐嵋楣浼湄猸瑁糜莓袂酶镁镅靡魅鹛",men:"们门闷懑扪汶满焖钔鞔",meng:"梦蒙猛盟孟朦氓勐懵檬甍瞑瞢礞艋艨苎萌虻蜢蟊蟒蠓锰鹲黾",mi:"米密秘迷弥蜜谜觅佴咪嘧宓幂弭敉汨泌溟狝猕眯眯祢糜糸縻脒芈蘼谧醚靡麋",mia:"面免妙描苗庙棉绵眠勉",mian:"面免棉绵眠勉缅冕娩沔泯渑湎眄瞑腼黾",miao:"妙描苗庙秒渺喵杪淼眇瞄缈缪藐蜱邈钞鹋",mie:"灭蔑乜咩篾芈蠛",min:"民敏岷悯愍抿汶泯渑玟珉缗苠闵闽鳘黾",ming:"明名命鸣盟铭冥暝溟皿瞑茗萌螟酩",miu:"谬缪",mo:"么没无万模莫默摸麼末摩磨魔脉漠墨抹陌寞沫膜嫫摹殁瘼秣耱茉蓦藐蘑蟆袜谟貉貊貘镆霡靡馍麽",mou:"某谋侔厶哞毋牟眸瞀缪蛑蝥袤鍪",mu:"目母木模幕慕墓姆姥穆牧亩沐募仫坶拇暮毪牟牡睦缪苜钼鹜"
                                    ,n:"你年那能女内难南呢拿",na:"那南拿哪纳呐捺箬絮肭衲讷钠镎",nai:"奶乃耐奈佴柰氖艿萘鼐",nan:"难南男喃囝囡楠罱腩蝻赧",nang:"囊囔攮曩馕",nao:"脑闹恼呶垴孬挠桡淖猱瑙硇铙䜧",ne:"呢哪呐疔讷那能内嫩",nei:"那内哪馁",nen:"嫩能",neng:"能",ng:"嗯",ni:"你呢尼泥拟逆倪妮腻伲匿坭嶷怩慝旎昵猊睨祢铌霓鲵鹝鹢",nia:"年念娘鸟尿廿酿粘埝嬲",nian:"年念廿粘埝廾拈拈捻撵碾蔫辇辗鲇鲶黏",niang:"娘酿",niao:"鸟尿嬲氽溺脲茑袅",nie:"捏乜啮嗫孽捻涅聂臬蘖蹑镊镍陧颞䯅",nin:"您宁凝佞咛拧攘柠泞狞",ning:"宁凝佞咛拧拧攘柠泞狞甯聍苧",niu:"牛扭纽妞忸拗狃蚴钮",no:"农弄浓侬哝秾耨脓㶶",non:"农弄浓侬哝秾脓㶶",nong:"农弄浓侬哝秾脓㶶",nou:"耨",nu:"怒努奴孥帑弩胬褥驽那",nua:"暖濡",nuan:"暖濡",nuo:"那诺娜挪傩喏懦搦濡砹糯锘",nü:"女忸恧狃絮肭衄钕乇疟",nüe:"乇疟虐谑"
                                    ,o:"哦喔噢区欧偶呕怄殴沤",ou:"区欧偶呕呕怄殴沤瓯眍禺耦藕讴鸥"
                                    ,p:"便被平品派片怕般破批",pa:"派怕爬帕啪趴扒杷琶筢耙芭葩钯",pai:"派排拍牌迫俳哌徘湃蒎",pan:"般判盘番胖盼叛拚潘畔攀弁扳拌樊泮爿皤磐蟠袢襻蹒鄱",pang:"旁胖膀庞乓厐彷滂磅磅耪蒡螃逄鳑",pao:"跑炮抛袍泡刨匏咆庖狍疱脬苞趵龅",pe:"朋配培碰陪彭佩赔鹏盆",pei:"配培陪佩赔呸妃帔徘旆沛淠碚胚艴茇蜚裴辔邳醅锫霈",pen:"盆喷汾湓朋碰彭鹏捧棚",peng:"朋碰彭鹏捧棚蓬砰篷膨嘭堋怦抨澎烹甏硼蟛迸",pi:"被批否皮罢坏屁匹疲披脾辟劈啤僻譬丕仳噼圮坯埤媲庀擗枇毗淠濞琵甓疋痞痦癖睥砒篦纰罴芘苤萆蕃薜蚌蚍蜱螵裨貔邳郫鄱铍陂陴霹鲏鼙䴙",pia:"便片票篇偏飘骗漂朴扁",pian:"便片篇偏骗扁犏缏翩胼蝙褊谝蹁骈",piao:"票飘漂朴剽剽嘌嫖殍瓢瞟瞟缥膘莩螵骠髟",pie:"撇氕瘪瞥苤",pin:"品贫聘频拼拚姘嫔榀泵牝颦",ping:"平评凭萍瓶冯屏苹乒坪俜娉枰秤鲆",po:"破婆迫颇坡泊朴泼魄叵攴泺溥珀皤笸粕膊跛鄱酦钋钷陂",pou:"剖掊涪瓿裒踣锫",pu:"普暴扑铺谱仆堡浦朴菩葡蒲瀑匍噗圃埔攴曝氆溥濮璞脯苻莆蹼醭镤镨"
                                    ,q:"去起前其全情气却期亲",qi:"起其气期吃七器奇企齐妻汽旗棋弃启骑岂枝欺戚契凄歧漆泣乞迄亓亟伎俟偈嘁圻屺岐崎憩挈杞柒栖桤槭欹汔淇琦琪甭畦畸碛祁祈祺稽綦绮缉耆脐芑芪荠萁萋葺蕲虮蛴蜞讫赍趿蹊锜颀骐鲯鳍麒",qia:"卡恰掐洽疴葜髂前强钱",qian:"前钱千签潜牵浅迁乾遣欠歉谦纤铅谴嵌仟佥倩堑岍悭愆慊扦掮搴撖柑椠涔犍箝缱肷腱芊芡茜荨虔褰蹇钎钤钳锓阡骞鹐黔",qiang:"强枪墙抢腔丬呛嫱戕戗樯炝爿玱箐羌羟蔷蜣襁跄跫锖锵镪鸧",qiao:"瞧桥悄乔巧敲侨壳雀翘俏劁峤峭愀憔撬樵橇毳硗硝窍缲舄茭荞蕉诮谯跤跷醮锹鞒鞘",qie:"且切契窃怯伽唼妾惬慊挈沏沏渫砌箧脞茄蕺趄锲",qin:"亲侵琴秦勤钦擒吣嗪噙寝嵚廑揿槿檎沁渗溱矜禽芩芹蓁螓衾衿覃锓骎",qing:"情亲清请青轻庆倾晴卿倩圊擎檠氢氰磬箐綮罄苘蜻謦顷鲭鲸黥䞍",qio:"穷琼穹筇芎苘茕蛩跫邛",qion:"穷琼穹筇芎苘茕蛩跫邛",qiong:"穷琼穹筇芎苘茕蛩跫邛銎鞠",qiu:"求球秋仇丘龟囚瞅俅巯楸氽泅湫犰糗艽虬蚯蝤裘赇逑遒邱酋钆馗鳅鹙鼽",qu:"去区取曲趣屈驱趋娶渠躯凵劬岖朐枸氍璩癯瞿磲祛絮苣蕖蘧蛆蛐蠼衢觑诎遽阒鞠鞫鸲麴黢龋",qua:"全权卷拳圈劝泉券悛桊",quan:"全权卷拳圈劝泉券悛桊犬獾畎痊筌绻荃蜷诠辁醛铨颧鬈鳈",que:"却确缺雀悫攉榷炔瘸舭芍觳郄阕阙鹊",qun:"群裙蝽逡遁麇"
                                    ,r:"儿人然日如入任让认",ra:"然让染绕扰燃饶嚷壤冉",ran:"然染燃冉苒蚺髯让嚷壤",rang:"让嚷壤攘瓤禳穰",rao:"绕扰饶娆桡荛蛲",re:"若热惹喏人儿任认仍忍",ren:"人儿任认忍仁刃仞壬妊恁稔纫纴荏葚衽讱赁轫韧饪䌾",reng:"仍扔穰艿",ri:"日驲",ro:"容肉荣蓉柔融揉绒熔溶",ron:"容荣蓉融绒熔溶冗嵘戎",rong:"容荣蓉融绒熔溶冗嵘戎榕狨肜茸蝾镕",rou:"肉柔揉糅蹂鞣",ru:"如入辱儒乳汝嚅孺洳溽濡缛茹蓐薷褥襦铷颥",rua:"软朊濡蠕阮",ruan:"软朊濡蠕阮",rui:"瑞锐枘睿芮蕊蕤蚋䌼",run:"润闰",ruo:"若弱偌箬芮"
                                    ,s:"是上说时生事手十所三",sa:"萨撒洒仨卅檫脎趿钑飒",sai:"思赛塞噻腮蓑鳃",san:"三散伞叁毵糁馓丧桑嗓",sang:"丧桑嗓搡磉颡",sao:"扫嫂骚埽搔瘙缫缲臊鳋",se:"色塞瑟圾啬槭涩穑蔷铯",sen:"森僧",seng:"僧",sh:"是上说时生事手十身实",sha:"杀沙傻莎厦刹啥纱煞杉唼嗄歃痧砂裟赊铩霎鲨",shai:"色晒筛酾",shan:"山单善闪衫禅扇珊陕杉删剡埏姗嬗彡掸掺擅栅檀汕潸澹煽疝缮膳膻舢芟苫蟮詹讪赡跚鄯钐骟髟鳝鳣",shang:"上商伤尚赏汤晌垧墒殇熵裳觞",shao:"少烧绍稍哨邵劭勺捎杓梢溲潲笤筲艄芍苕蛸鞘韶",she:"社设折射舍涉蛇拾摄舌佘厍奢慑揲歙滠猞畲睫蛞赊赦铊阇麝䞌",shei:"谁",shen:"身什神深甚参伸申审沈慎绅吲呻哂娠婶抻椹渖渗瘆矧砷肾胂莘葚蜃诜谂鲹",sheng:"生声省胜升圣乘盛剩牲绳嵊晟渑甥眚笙",shi:"是时事十实什使世市师士式识始史失似石视示势室食诗试施适释氏尸侍拾驶湿饰逝誓殖狮匙蚀仕嗜噬埘屎峙弑弛恃拭柿炻矢礻筮耆舐莳蓍虱螫谥豉豕贳轼郝酾铈铊饣鲥鲺鳀鸤䴓",sho:"手受收首授守熟售瘦寿",shou:"手受收首授守熟售瘦寿兽狩绶艏",shu:"书数术树属输熟述束叔舒殊署鼠疏俞竖暑抒梳蔬淑枢倏塾墅姝孰庶恕戍摅曙杼樗殳毹沭涑漱澍疋秫纾腧荼菽薯蜀蜍赎黍",shua:"刷耍唰涮双率摔爽衰帅",shuai:"率摔衰帅甩缞蟀",shuan:"拴揎栓汕涮踹闩双爽霜",shuang:"双爽霜孀泷淙骦鹴",shui:"说水谁睡税蜕",shun:"顺瞬吮舜䞐",shuo:"说数硕烁妁搠朔杓槊溯濯芍蒴铄",si:"四死司思似斯食丝私寺撕厕肆伺俟兕厮厶咝嗣嘶姒巳汜泗澌祀祠笥糸纟缌耜肄苡菥蛳锶雉飔饲饴驷鸶",so:"送松宋搜颂嵩艘耸诵讼",son:"送松宋颂嵩耸诵讼凇崧",song:"送松宋颂嵩耸诵讼凇崧忪怂悚淞竦菘锶",sou:"搜艘叟嗖嗽嗾擞涑溲漱瞍薮螋锼飕馊",su:"苏诉速素俗宿肃稣塑僳嗉夙愫涑溯簌粟蓿蔌觫谡酥骕鹔",sua:"算酸狻蒜",suan:"算酸狻蒜",sui:"虽随岁碎尿遂彗攵濉燧眭睢祟穗绥荽蓑谇邃隋隧髓䍁",sun:"孙损榫狲笋荪跣隼飧",suo:"所索缩锁莎嗦唆唢嗍娑挲桫梭琐睃羧蓑逡"
                                    ,t:"他她天头同听太体通提",ta:"他她它达踏塔拓塌嗒挞榻沓溻漯獭趿跶蹋遢铊闼阘鳎",tai:"太台态抬泰胎汰炱肽苔薹跆邰酞钛骀鲐",tan:"谈弹探叹坦坛贪摊滩谭潭毯炭啴坍忐昙檀湛澹痰瘫眈碳膻舔荨蕈袒覃赕郯钽锬镡",tang:"堂唐倘躺汤糖趟塘烫膛淌傥帑惝搪棠樘溏瑭羰耥螗螳醣铴镋镗",tao:"讨套逃挑桃涛陶掏萄淘滔叨啕梼洮焘绦绹韬饕鼗",te:"特忑忒慝铽腾疼藤滕誊",ten:"腾疼藤滕誊",teng:"腾疼藤滕誊",ti:"体提题弟替踢梯倜剃剔啼嚏屉悌惕棣涕睇绨缇荑裼谛蹄逖醍锑鳀鹈䗖䴘",tia:"天条调田跳挑甜添填佃",tian:"天田甜添填佃嗔忝恬掭栝殄滇町畋腆舔苫蚕蚺觍钿锘阗颋䩄",tiao:"条调跳挑佻眺祧稠窕笤粜苕蜩踔迢铫髫鲦龆",tie:"铁贴帖帖揲萜锇餮",tin:"听停庭厅挺亭廷艇婷梃",ting:"听停庭厅挺亭廷艇婷梃汀烃町耵莛葶蜓铤霆颋",to:"头同通统投痛童透偷铜",ton:"同通统痛童铜桐桶筒仝",tong:"同通统痛童铜桐桶筒仝佟侗侗僮嗵垌峒彤恫恸捅潼瞳砼硐艟茼酮鲖",tou:"头投透偷钭骰",tu:"突土图徒途吐涂屠秃兔凸堍芏荼菟酴钍",tua:"团彖抟揣湍疃鹑",tuan:"团彖抟揣湍疃鹑",tui:"推退腿煺萑褪颓",tun:"吞屯囤暾氽沌炖窀肫臀褪豚饨鲀",tuo:"他脱托拖妥拓陀魄乇佗佗唾坨庹捝摭柁柝棁椭橐沱沲砣箨绥讬跎迤酏酡铊隋饦驮驼鸵鼍䓕"
                                    ,w:"我为文无外问位五万王",wa:"瓦娃挖哇佤凹娲洼腽蛙袜鲑",wai:"外歪呙夭㖞",wan:"万完晚湾玩碗弯腕顽挽婉宛丸剜娩惋浣烷琬畹皖箢纨绾脘芄莞菀蔓蜿豌鞔鲩",wang:"王望往网忘亡汪妄旺枉芒尢惘罔辋魍㲿",we:"为文问位未委微闻卫韦",wei:"为位未委微卫韦围威维味遗伟危谓唯慰尾违魏喂伪畏胃惟倭偎囗圩娓尉崴嵬巍帏帷桅沩洧涠渭潍炜煨熨猗猥猬玮痿眭硙纬艉芟苇荽萎葳蔚薇诿軎逶闱阢隈隗隹韪鲔鳂鳚㧑䓕",wen:"文问闻温稳吻纹刎愠揾殁汶煴玟珉璺瘟笏紊缊蕰蚊辒阌雯鳁",weng:"翁嗡瓮蓊蕹鹟",wo:"我握窝卧沃倭喔夭幄挝斡涡瘟硪肟莴蜗龌",wou:"渥",wu:"无五务物武恶屋吴午舞误污乌伍於悟雾吾呜勿侮兀捂仵唔圬坞垭妩婺寤巫庑忤怃悮戊晤杌梧毋浯渥焐牾痦瞀笏芜芴蜈蝥诬迕邬鋈钨铻阢骛鹀鹉鼯"
                                    ,x:"下学小心想行见现些向",xi:"西系息喜希席细习吸戏洗惜析悉稀袭熙嘻夕牺锡膝撕溪昔腊媳晰粞隙熄僖兮唏嘶奚嬉屃屎屣嵇徙戯曦栖樨檄欷歙汐浠淅澌烯熹犀玺畦皙矽硒禊禧穸绤羲翕舄舾茜菥葸蓰蜥蜴螅蟋裼褶觋诶蹊郄郗酾醯钖铣阋饩鳃鳛鼷䜣",xia:"下夏吓侠霞峡瞎厦狭暇虾匣呷挟柙歃毳洽狎瑕瘕硖罅葭辖遐黠",xian:"见现先显线险限县鲜献洗仙闲陷贤宪洒嫌掀纤羡弦衔伣冼咸娴岘崄彡挦掺暹氙涎濂燹狝猃痃痫癣碱祆筅籼腺舷苋莶藓蚬跣跹酰钐铣铦锨锬霰馅鹇黹",xiang:"想向相象像香响项乡降享箱详祥襄湘巷厢翔镶橡庠攘缃舡芗葙蟓飨饷骧鲞",xiao:"小笑校消效销晓萧肖削潇孝啸宵哓哮嚣姣枭枵梢淆爻狡硝筱箫绡芍茭蛸蟏逍酵霄骁魈鸮",xie:"些解写血谢叶协鞋斜邪胁携泄歇械屑谐卸泻亵偕勰廨懈挟撷桔楔榍榭歙渫溉瀣燮獬眭绁缬苴薤蝎蟹跬躞迦邂隰颉骱鲑䙊",xin:"心新信寻辛欣芯薪馨囟忻昕歆莘衅鑫锌镡骍䜣",xing:"行性形兴星省姓型幸醒刑腥杏悻惺擤猩硎荇邢钘铏陉饧",xio:"兄雄胸凶熊汹匈芎讻诇",xion:"兄雄胸凶熊汹匈芎讻诇",xiong:"兄雄胸凶熊汹匈芎讻诇",xiu:"修秀休袖宿臭羞绣朽咻嗅岫庥溴煦莠貅锈馐髹鸺",xu:"许需续须虚徐序绪蓄吁叙畜婿勖咻嘘圩墟屿恤戌旭旮旯栩洫溆煦盱砉糈絮肷胥芋蓿诩谞酗醑雩顼馘",xua:"选宣玄旋悬券喧儇埙揎",xuan:"选宣玄旋悬券喧儇埙揎擐暄楦泫洵涓渲漩炫煊璇癣眩碹绚萱谖轩铉镟馔",xue:"学血雪穴削薛噱泶炔谑踅靴鳕鸴",xun:"寻讯训迅询巡逊循旬勋埙孙峋巽徇恂挦曛梭殉汛洵浔浚熏狻獯窨荀荤荨蕈薰逡遁郇醺鑫驯鲟"
                                    ,y:"一有也要以么于用又已",ya:"亚压呀牙雅押哑崖涯丫鸭讶鸦伢垭娅岈挜揠柙桠氩琊疋痖睚砑碣芽蚜衙轧辂迓铔䅉",yai:"睚",yan:"眼言研广严演验烟燕延沿颜殷掩厌岩咽炎艳盐宴嫣雁焰淹焉彦俨偃兖剡厣唁埏堰奄妍崦恹晏檐氤洇涎湮滟焱琰砚硎筵罨胭腌芫菸蔫蜒衍覃觃讠谚谳赝趼郾鄢酽闫阉阎阏阽餍魇鹌黡鼹",yang:"样阳杨央养洋扬羊仰痒佯徉怏恙旸殃氧泱漾炀烊玚疡秧蛘鞅飏鸯",yao:"要么约药摇腰遥咬耀邀姚哟妖窑谣吆夭尧峣崤崾幺徭徼曜杳洮淆瀹爻珧瑶疟祆窈窕繇肴舀荛轺钥铫飖鳐鹞",ye:"也业夜爷叶野耶页邪咽液冶噎拽掖揲揶晔曳椰洇烨琊腋荼谒邺铘靥馌",yi:"一以已意义议衣易医依异艺亿疑益移遗仪亦忆译伊宜尾蛇椅谊翼艾泄役抑姨毅逸夷裔倚溢矣乙疫仡佗佚佾刈劓勚呓咦咿嗌噫圯埸壹奕屹峄嶷弈弋彝怡怿悒懿挹掖揖旖昱曳欹殪洫渫漪焱熠犄猗疙痍瘗癔眙硪祎绁绎缢羿翊翌翳肄胰腋臆舣芸苡荑薏蚁蛾蜴袂诒诣贻轶迤邑酏钇铱锜镒镱阝雉颐饴饻驿鹝鹢鹥黝黟",yin:"因音引印银烟隐阴饮殷吟姻淫尹荫吲喑圻垠堙夤寅廴氤沂洇湮狺瘾窨纼胤芩茚茵蚓訚鄞铟霪骃鳏龂龈䜣",ying:"应英影营迎硬映盈赢鹰婴颖嘤媵嬴撄楹樱滢潆瀛瑛璎瘿绬缨罂膺茔荥荧莹莺萤萦蓥蝇逞郢锳颍颕鹦",yo:"育哟唷有用又由友游右",yon:"用永拥勇涌庸泳佣俑咏",yong:"用永拥勇涌庸泳佣俑咏喁墉壅恿慵甬痈臃臾蕹蛹踊邕镛雍颙饔鲬鳙",you:"有又由友游右优油邮犹尤忧幽幼悠诱佑侑卣呦囿宥尢揄攸柚泅牖猷疣繇聱莜莠莸蚰蚴蝣蝤酉釉铀铕鱿鲉黝鼬",yu:"于与语育余遇雨玉预鱼欲域誉予狱愈於宇御郁豫渔吁愚俞愉羽寓浴裕娱舆喻粥伛俣喁噢圄圉圩妤妪尉屿峪嵛庾揄昱梧榆欤毓毹汩淤渝滪煜煨熨燠狳瑜畲瘀瘐盂禹禺窬窳竽纡聿肀腧腴臾舁芋菸萸蓣蔚虞蜍蜮蝓衙衙觎谀谕迂逾钰铻阈阏隅雩饫馀驭鬻鹆鹬龉",yua:"员原元远院愿园源圆袁",yuan:"员原元远院愿园源圆袁缘怨援冤宛渊圜垣塬媛掾橼沅涓爰猿瑗畹眢箢芫苑菀螈贠辕阮陨鸢鸳鹓鼋",yue:"月越乐约跃阅岳曰悦刖哕栎樾瀹粤蠖钥钺龠",yun:"运云允晕韵孕匀蕴恽愠昀榅殒氲煴熨狁瘟筠筼纭缊耘芸苑菀蕰贠赟郓郧酝陨韫"
                                    ,z:"在这中子自着之只作主",za:"杂扎砸咋匝咂唼拶籴鲝",zai:"在再载灾仔宰哉崽栽甾",zan:"咱赞暂拶攒昝涔湔瓒簪糌臜趱酂錾",zang:"藏脏葬奘臜臧赃驵",zao:"早造遭糟躁灶燥噪凿唣枣槽澡皂窖缫缲藻蚤",ze:"则泽责择咋仄啧帻昃柞稷窄笮箦舴赜迮鲗",zei:"贼",zen:"怎谮曾增综赠憎甑缯罾",zeng:"曾增综赠憎甑缯罾锃",zh:"这中着之只主长知种者",zha:"查扎炸诈眨咋乍吒咤哳喋喳揸札柞栅楂榨槎渣渫猹痄砟碴笮苴蚱轧铡闸鲊齄",zhai:"摘齐择侧债宅寨斋疵瘵砦窄翟膪",zhan:"战展站占颤斩沾粘崭搌旃栈毡湔湛澶盏瞻绽蘸袒觇詹谵躔辗醮飐骣鳣鹯黏",zhang:"长张掌章丈帐仗障涨杖胀账彰仉嫜嶂幛樟漳獐璋瘴绱蟑鄣",zhao:"着找照招著朝赵召兆罩昭爪啁搔棹沼淖濯笊肇蚤诏钊鸼",zhe:"这着者著折哲浙遮乇慑摺柘磔耷聂蔗蛰蜇螫褚褶谪赭辄辙锗陬鹧䗖",zhei:"这",zhen:"真阵镇震针珍振圳诊侦贞枕斟朕椹榛浈溱滇甄畛疹砧稹箴纼缜胗臻蓁赈轸鸩",zheng:"正政争证整征丁郑挣睁怔症蒸峥帧徵拯桢狰町瞠祯筝诤钲铮锃鲭",zhi:"之只知制至直指治识志支职质致止值织纸置智执址氏迟枝植旨掷殖芷芝侄秩肢滞汁脂稚帜卮吱咫埴夂峙帙彘徵忮挚摭昵枳枳栀栉桎氐炙痔痣砥祁祉祗窒絷耆胝膣蛭蛰蜘觯豸贽趵趾跖踬踯轵轾郅郦酯铚锧陟雉骘鸱鸷黹㛿",zho:"中种重周众终州钟洲忠",zhon:"中种重众终钟忠仲衷肿",zhong:"中种重众终钟忠仲衷肿冢忪潼盅舂舯蚣螽踵锺",zhou:"周州洲舟皱宙骤粥轴昼咒啁啄妯帚碡籀繇纣绉肘胄舳荮诌诪赒辀酎驺鬻鲖鸼",zhu:"主住术注著助属朱诸逐竹珠驻猪筑祝柱烛嘱煮株铸蛛伫侏妯拄杼柚楮槠橥泞洙渚潴澍炷疰瘃瞩竺纻翥舳苎苧茁茱蚰蛀褚诛贮邾铢鬻麈㔉",zhua:"抓爪挝传转专装状庄撞",zhuai:"转拽",zhuan:"传转专赚砖撰啭抟沌湍篆颛馔",zhuang:"装状庄撞壮妆桩幢僮奘戆艟",zhui:"追坠惴揣椎槌缀缒萑赘锥隧隹骓",zhun:"准盹窀肫胗谆隼",zhuo:"着著桌捉卓缴琢倬勺啄拙擢斫棁棹浊浞涿淖濯灼焯禚箸绌肫茁蕞诼趵踔躅酌镯",zi:"子自字资齐紫姊姿仔滋咨兹吱呲孜孳嵫恣梓淄渍滓甾疵瘠眦秭笫籽粢糍缁耔茈觜訾谘赀趑辎锱镃髭鲻鹚龇",zo:"走总宗纵奏踪综偬揍枞",zon:"总宗纵踪综偬枞棕疭粽",zong:"总宗纵踪综偬枞棕疭粽腙骔鬃",zou:"走奏揍楱诌诹邹鄹陬驺鲰",zu:"组足族祖阻租俎卒咀沮淬苴菹诅蹴镞驵",zua:"钻赚攥纂缵躜",zuan:"钻赚攥纂缵躜",zui:"最罪嘴堆醉羧蕞觜",zun:"尊遵撙樽鳟",zuo:"作做坐左座昨佐琢乍凿唑嘬怍撮柞砟祚笮胙迮酢阼"
                                    }
 }
,'activate' : function () {
     VirtualKeyboard.Langs.CN.INPArr = VirtualKeyboard.Langs.CN.PYArr;
 }
,'charProcessor' : VirtualKeyboard.Langs.CN.processChar
}},
{code:'ZH-CN'
,name:'Chinese Trad. Pinyin'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,。/'
,shift:{0:'~！·#￥%…—*（）—+|',24:'{}',35:'："',44:'《》？'}
,'cbk':/**
 * $Id$
 *
 * Chinese Traditional PinYin
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
{ 'load' : function () {
VirtualKeyboard.Langs.CN.PYTradArr= {b: "不本並表版被報八部",
c: "此從村曾才次蔡財參",
ch: "陳長成出處傳車程廠",
d: "的第大對等到但電多",
f: "法分發非方福費風富",
g: "國高各給個鬼該更工",
h: "好回或和和號會後華",
j: "及傑將就間家給金經",
k: "可科卡看客開楷克口",
l: "了隆來路錄林類李六",
m: "嗎名美民明摩們目面",
n: "您你年能內那那那南",
p: "片品篇便票普平盤篣",
q: "前請區其期去千器七",
r: "兒人日讓如若入任仍",
s: "是上所時三四斯色司",
sh: "說使生數水書式十市",
t: "他台天圖她條甜特太",
w: "網我為文五無王外吳",
x: "下新小鄉學行性系心",
y: "一與有以也於月頁要",
z: "中之在站者這主則子",
zh: "之在中站者這主至最",
be: "本被北備倍貝盃背杯",
bia: "表標砭便扁編變邊錶",
cho: "重蟲充崇沖抽丑憧衝",
co: "從聰瑽叢蔥琮璁湊樅",
'do': "都東動苳懂董冬鬥洞",
fe: "分非費風豐芬飛份峰",
go: "工公共供購紅狗宮功",
ho: "後宏紅洪鴻弘彋侯虹",
ko: "空口控孔寇扣恐釦叩",
mia: "面免秒妙廟苗麵棉喵",
nia: "年娘廿鳥念尿唸粘黏",
no: "農弄濃儂獳膿耨羺穠",
pe: "配彭芃鵬培佩陪盆朋",
pia: "片篇便票騙偏翩遍飄",
ra: "讓然染禳饒繞燃擾蚺",
ro: "榮容肉融蓉鶔柔溶榕",
tia: "天條甜調田填跳添畋",
to: "同通頭投統童銅痛透",
yo: "有由用又友永優遊油",
zho: "中種重周週忠眾仲洲",
zo: "總宗走綜陬縱鄒奏齱",
a: "阿啊錒腌屙",
ai: "愛艾癌唉埃哎哀昹矮捱礙挨呆隘藹靉曖噯譪賹靄毐欸璦乂騃敳僾皚鑀佁誒嬡鴱薆濭鎄砹",
an: "案安按岸暗菴胺銨諳闇桉庵氨侒荌俺豻鞍匼峖媕黯晻玵垵厂痷萻匎黭盦錌犴儑鵪唵啽堷雸洝腤韽婩揞",
ang: "昂盎腌骯卬醠軮",
ao: "奧澳磝傲媼敖凹鏊鰲嶴熬隞坳摮螯遨芺襖燠嗷懊廒璈翱滶奡擙拗柪扷獒驁謷鼇聱爊鏖镺詏簢墺蔜",
ba: "八把吧巴霸爸拔罷捌疤芭壩跋犮弝扒笆叭耙靶茇鈸豝琶鈀灞粑猈菝仈鼥杷朳軷魃矲詙胈㞎鮁",
bai: "百白拜佰敗擺掰庍粺唄襬稗絔捭粨柏伯",
ban: "版班板辦半般斑伴頒搬阪扮瓣拌鈑昄扳絆鉡怑闆湴靽斒攽粄姅舨瘢爿蝂褩虨癍反柈",
bang: "邦幫棒榜謗磅綁傍膀蚌旁蒡鎊甏牓梆棓氆垹泵縍塝艕鞤浜髈搒",
bao: "報保寶包飽爆堡暴抱胞豹鮑葆薄笣褒媬褓齙嚗鉋炮苞儤刨駂孢煲袌怉鳵菢鴇雹瓝枹窇趵犦鑤蕔虣忁剝曝",
bei: "被北備倍貝盃背杯悲俾埤蓓碑臂卑悖輩琲糒揹鵯裨桮僻憊牬鋇椑犕婢焙痺綼奰孛哱伓褙梖藣鼰珼碚邶偝鄁郥萆狽誖唄陂鞴",
ben: "本体笨苯奔坌畚賁渀錛泍喯夯",
beng: "甭蹦泵崩祊埲洴繃迸玤伻誁菶琫閍跰塴弸搒絣嘣艕鏰",
bi: "比筆必陛畢幣碧弊閉避鼻壁彼俾埤嫳逼璧臂芘妣敝鏎蔽鄙嗶泌狴襞斃皕庇坒拂邲梐朼裨廦堛蹕辟毖鷩繴鉍獘襣骳薜婢閟髀駜弼痺篳鷝蓖愎珌腷苾彃賁疪飶柲秘祕蚍荸屄馝嬖菎楅罼匕稗箄痹篦豍蓽疕畀秕貏粊庳湢蜌箅鎞愊襒躄鼊柫詖怭獙觱沘睥佖柀偪熚贔滭稫驆鮅鄨妼潷鄪費吡跛萆",
bian: "砭便扁編變邊遍卞辨貶辯弁鞭匾蝙甂褊鴘忭汴辮閞萹抃窆碥緶籩猵煸汳惼揙楄箯柉艑稨鯿藊苄",
biao: "表標錶穮飆膘摽滮鏢褾俵驫彪裱鰾儦藨諘臕杓颮鑣麃嘌颩婊熛蔈墂瀌瘭髟謤爂贆猋檦飈驃",
bie: "別蛂鱉彆虌徶憋癟縪襒咇蹩蟞",
bin: "賓斌濱彬臏檳儐驞瀕汃邠髕擯椕蠙鬢鑌豳殯繽璸霦豩",
bing: "並病冰丙併兵炳餅摒秉柄并屏鉼寎稟庰邴昺蛃窉陃栟鵧苪掤鞞怲偋檳",
bo: "博波撥伯柏播玻勃蔔帛桲搏駁擘礡剝泊胉箔袚蚾亳菠缽薜簸舶鉑白百佰般孛薄郣挬踄跛啵葧餑鈸襏檗鱍餺荸鵓蘗脖糪渤猼欂謈懪僰踣挀膊嶓駮簙浡髆砵岥馞鸔碆鑮譒蹳鋍襮柭鎛卜礴䶈鮊愽",
bu: "不部布補步埔簿佈卜埠捕怖晡哺逋捗鯆鳪鈽餔篰鵏咘峬蔀獛醭庯堡卟瓿鈈",
ca: "擦嚓囃搽礤拆䃰",
cai: "才蔡財採彩材菜采猜裁釆踩纔埰寀綵棌睬跴縩婇倸",
can: "參餐殘燦慘蠶憯璨魙粲黲摻慚朁澯驂孱噆嬠",
cang: "藏倉艙蒼傖滄鶬鑶凔嵢",
cao: "草操曹槽漕嶆嘈鄵喿糙肏螬艚襙鐰艸懆騲鰽",
ce: "測策側冊畟廁惻蓛憡拺粣筴矠茦",
cen: "參岑梫梣涔嵾笒埁",
ceng: "曾層噌蹭碀嶒鄫驓",
cha: "查插茶差察衩叉侘詫岔剎秅蹅喳臿奼碴鍤楂扠蜡搽汊槎艖偛嗏杈疀鎈垞紁嚓餷扱茬ॻ鑔",
chai: "差釵拆柴祡儕喍囆瘥豺蠆袃偨茝䜺",
chan: "產禪闡纏蟬摻蟾丳襜幨諂懺鏟嬋單顫讒剷繵磛毚鋋獑攙簅辿棎欃羼劖蟺梴嵼僝廛饞潺滻惉躔譂澶艬瀍瀺旵酁巉嘽幝蕆孱嬓囅灛儳煘鋓嚵燀繟驏湹鑱覘韂剗",
chang: "長廠場常昌唱腸悵嘗萇償昶嚐暢倡敞錩裳娼嫦琩粻菖鼚倀鯧徜猖氅鋹裮鬯淐鋿鱨韔閶惝",
chao: "超朝潮炒吵抄巢鈔剿勦嘲晁訬弨鄛耖罺怊樔眧轈焯",
che: "車徹迠撤扯澈硩掣硨轍奲莗坼屮尺撦",
chen: "陳沈晨塵辰臣沉趁疢橙襯琛宸踸齔嗔忱鷐茞瞋藽磣敶娠諶棽鍖儭搷嚫櫬賝堔謓麎伔讖樄郴諃捵蔯鈂裖墋贂愖煁螴莐傖抻稱",
cheng: "成程稱城誠承呈乘晟澄宬郕撐橙丞秤盛埕掁琤瞠酲盯鋮懲赬崝埥峸悜逞騁竀蟶棖澂棦檉珵荿湞橕裎塍鏿偁塣脀牚浾脭揨饓騬庱鐺槍",
chi: "吃持赤池尺呎齒褫馳拸荎恀遲翅恥离痴懘謘匙斥坻癡蚔豉蚳抶飭熾摰眙敕眵茬喫鴟瘛鉹傺痄侈嗤伬弛鷘叱麶鉓蚇瓻啻郗齝搋痸魑篪墀笞誺淔禠螭跮哧茌栘蚩歭忯栻彳踟絺摛箎踅黐遫箈瞝欼誃徲齹徥姼貾泜乿傂媸戠鶒汦趍饎耛",
chong: "重蟲充崇沖憧衝虫种痋寵忡茧隀蝩銃茺珫蹖舂翀爞揰浺祌艟",
chou: "抽丑仇愁籌惆臭醜酬稠杻溴疇儔綢栦犨篘薵杽懤搊嬦讎椆菗瞅簉婤紬莥躊搐裯禂瘳殠鯈幬雔燽吜圳詶偢憱絒",
chu: "出處除初楚儲觸廚齣褚俶礎雛蒢篨豖躇鄐畜絀跦櫥楮鶵犓杵怵鉏歜藸芻鋤琡矗敊幮濋黜詘蜍貙踀搐亍滁儊檚泏斶臅躕趎耡滀樗摴憷",
chua: "欻",
chuai: "揣踹膗嘬搋膪",
chuan: "傳川船穿串喘釧暷夼遄荈諯輲椽瑏舛氚玔汌歂賗舡踳",
chuang: "創窗搶床闖刱幢瘡漺囪戧愴橦撞摐獊憃",
chui: "陲吹垂炊椎捶腄錘諈鎚槌菙搥娷甀箠棰綞倕圌湷",
chun: "春純淳醇唇憌椿鯙踳鶞蠢杶脣輴媋鰆錞蓴鶉暙偆漘萶韕惷焞屯蝽",
chuo: "磭啜戳綽擉婥齪婼輟畷嚽吷珿趠惙醊逴腏娖歠踔綴",
ci: "此次瓷詞慈佽磁賜疵刺辭皉雌祠莿恣差佌伺廁鶿茨庛玼栨餈飺蚝薋朿蛓髊骴泚呲柌濨趀嬨跐粢絘茲糍",
cong: "從聰瑽叢蔥琮璁樅潀謥慒囪暰欉孮匆淙錝藂漎瞛婃驄賨鏦鍐悰熜蟌徖蓯棇",
cou: "湊楱腠輳",
cu: "促粗麤醋簇殂卒猝梀蹴趣趨蹙瘯槭鏃觕鼀殧徂踧噈蔟顣酢",
cuan: "竄篡攢篹攛躥爨汆巑鋑鑹",
cui: "翠崔催磪粹脆萃瘁墔倅摧淬衰璀竁綷慛凗啐漼縗焠悴膬鏙膵趡嗺脺毳榱濢獕",
cun: "村存吋寸忖袸皴刌籿",
cuo: "錯厝措蒫挫撮痤剒矬搓蓌硰鹺瘥蹉瑳磋侳銼醝髊酇縒剉莝嵯蔖遳脞差",
da: "大達打答搭笪褡呾韃躂撘妲繨荅炟噠鐽怛咑鎝靼瘩譗褟畣留疊匒薘耷嗒沓",
dai: "大代帶待袋戴貸呆迨黛岱歹獃玳埭怠逮靆殆廗柋紿艜跢忕酨汏蹛瀻軩襶呔傣駘甙",
dan: "但單蛋丹淡旦擔膽氮誕眈彈幨砃舕啖鴠撣帎憚撢耽暺亶繵襌簞儋疸鉭刐丼紞聸澹癉酖啗殫狚聃觛噉鄲澶石衴僤蜑憺澸鷤啿髧勯黵泹甔玬柦窞潬癚嚪沊萏嘾餤贉匰霮黮",
dang: "當檔黨擋党盪蕩噹菪襠瓽簹璗儅碭艡欓宕闣蟷鐺簜讜愓礑璫逿攩澢嵣凼",
dao: "到道島導刀倒盜禱稻悼蹈翿舠搗魛壔叨氘擣忉捯禂纛幬幍檤瓙菿燾",
de: "的德淂地得襶脦嘚鍀",
dei: "得",
deng: "等登燈鄧凳瞪邆蹬鐙嬁豋嶝簦磴墱澄戥璒霯噔",
di: "地第低砥迪底的帝抵蒂弟笛虳遞狄滴坻敵牴諦滌邸翟棣睇踶聜梑締苖隄磾嘀旳梊氐娣釱袛篴嵽藡扺嚁荻樀鍉藋觝碲蠗柢軑玓熵適鏑靮馰禘杕嫡弤甋菧糴彽阺蔕詆呧羝鍗蹢鸐楴覿珶鞮渧菂軧墆螮潪蔋焍墑",
dia: "嗲",
dian: "電點店扂典殿墊玷瘨甸碘滇癲奠澱顛痁佃鈿蹎巔錪琠掂磹槙踮婝靛敁惦淀坫癜簟婰驔壂傎厧齻阽蕇",
diao: "調掉釣雕鯛瞗吊鵰琱貂蛁屌弔凋虭窵伄刁彫魡銚叼鳭碉蓧扚誂殦鳥銱",
die: "碟跌耋蝶鞢迭疊眣諜爹嶀挕絰蜨蹀咥牒瓞昳鰈堞楪喋苵跕艓褋胅詄镻垤峌聑臷惵凸嵽",
ding: "定訂頂丁鼎釘錠碇叮盯仃萣啶酊虰嵿椗娗玎疔鋌掟飣帄靪碠濎薡顁橙耵腚",
diu: "丟銩",
dong: "東動苳懂董冬洞棟凍咚鶇崠埬炵戙峒菄胴涷氡蝀駧恫霘鼕墥挏嬞腖硐侗",
dou: "都鬥豆斗陡竇兜痘逗荳抖梪脰讀唗郖枓餖敨鋀蚪浢篼蔸鬦鬭鬪",
du: "讀杜毒獨渡督賭鍍妒嘟肚堵都篤睹韥犢秺儥蝳斁簬讟韇瀆牘蠹韣闍髑醏碡裻黷皾纛喥櫝帾殰錖襩贕厾度妬",
duan: "段端短斷鍛緞籪媏碫耑椴躖葮毈腶偳剬煅",
dui: "對隊憝堆兌薱碓懟痽頧濻譈瀩濧轛敦",
dun: "惇敦頓噸墩盾躉驐礅蹲伅鈍撉燉蜳遁扽鶨坉庉囤沌遯鐓盹崸炖潡腞࣎砘",
duo: "多度跺奪朵躲陏痑鐸舵墮陊埵鮵敓惰馱掇踱袉茤鬌剁垛柁哆椯咄嚲嶞鵽柮裰剟敪墯莌毲剫貀襗趓腏哚",
e: "額哦鋨惡蛾俄枙娥鵝厄餓呃阨顎萼隘囮啞峉鄂噩蚵歹硪迗睋鱷鍔鶚皒峨砐蚅痾錒頞蘁愕噁軛扼諤屙莪堊婀阿堨嶭訛搹鑩詻遏岋堮齶搤魤珴閼吪涐崿蝁咢砨圔餩軶e豟齃櫮猗苊戹",
ei: "哎欸",
en: "恩嗯摁蒽",
eng: "鞥",
er: "而二爾兒貳耳陑洏侕餌咡佴刵荋眲珥洱薾樲峏衈邇尒鉺毦鮞栭唲檽輀鴯栮胹駬耏聏",
fa: "法發閥髮罰筏伐乏茷疺藅瞂琺砝垡",
fan: "反範凡范泛翻飯犯釩番蕃返煩繁販帆藩梵汎奿樊籵氾笲膰繙礬璠颿笵滼幡魬燔軓僠鄤薠旛籓橎畈瀿蘩鷭羳鱕墦杋柉軬嬏嬔勫蠜瀪鐇蹯轓",
fang: "方放芳房防訪坊紡仿妨彷舫肪瓬倣鈁昉枋鶭魴邡汸匚髣淓",
fei: "非費飛廢菲婓肥肺緋妃斐砩啡匪吠俷腓誹騛疿曊沸鯡鼣剕騑翡奜癈篚淝霏扉棐蟦芾蜚榧昲蜰怫朏狒痱濷屝萉厞悱鐨櫠胇餥馡裶",
fen: "分芬份粉坋紛憤酚糞奮黺妢焚弅棻氛墳棼梤蒶蚡忿昐吩橨雰鐼鼢鳻幩汾鼖玢濆砏膹僨羒衯蕡黂枌秎鈖翂羵豶轒瀵魵炃饙賁鱝",
feng: "風豐峰鳳封奉鋒楓逢馮蜂瘋覂縫丰妦俸諷夆烽葑賵飌麷堸捀灃酆艂桻偑焨唪犎崶摓猦檒渢蘴碸",
fo: "佛坲",
fou: "否剻缶不鴀芣紑罘殕缹",
fu: "福富負附腹服副府赴輔夫復甫傅浮付符婦巿父幅弗複覆膚扶賦氟芙孚撫伏佛蝠桴匐褔阜輻縛敷馥腐蝜鴔斧泭复韍峊拂衭嘸彿伕俯玸袚脯茯腑祔艀沸鳧蚥邞茀葍笰胕麩孵踾萯蚨蚹蝮棴鄜黻拊輹諨紨郛蛗暊釜俘袱糐芾紱趺砆莆鳺咐咈枎尃涪跗郙紼怤昲箙俛怫祓蜉鮒黼頫菔駙莩緮訃賻琈弣枹洑簠罘蜅榑鍑鰒鈇帗柫偩稃鵩鶝岪苻翇刜罦綒冹姇沷柎艴荴滏綍澓璷垘烰虙軵蕧呋玞芣幞砩",
fueng: "甮",
ga: "介噶嘎釓軋尬價旮咖伽夾胳疙界尕",
gai: "該改蓋鈣概陔丐垓祴侅賅隑溉鑉胲摡賌絯峐荄瓂戤豥鶛芥",
gan: "幹感虷乾趕肝敢甘桿干灨竿柑尷赶墘鶾杆咁疳橄紺淦旰矸酐贛簳泔凎骭蜬鳱榦稈譀玕坩詌皯嵅盰豃涻筸澉苷間擀",
gang: "港剛鋼岡崗綱缸堈扛肛釭罡戇槓棡笐杠碙堽犅疘",
gao: "高告稿搞膏韟攪糕誥祰鰝縞鷎睪皋髜鎬鼛篙羔槁杲鋯郜檺髇筶睾滜煰暠槔櫜藁",
ge: "各個格歌哥葛閣隔革虼鉻哿閤割擖鬲鎘鴿戈蛤咯牁擱疙佮合箇訶敆茖膈騔麧輵鶷挌郃笴嗝韐胳搿骼蠽鮯轕菏塥觡舸渮愅魺肐獦滒齃仡圪袼槅硌",
gei: "給",
gen: "跟根茛哏艮亘",
geng: "更庚耕梗耿亙羹賡鯁挭粳緪哽菮埂綆骾郠揯鶊浭堩頸",
gong: "工公共供紅宮功攻弓恭龔拱礦汞貢釭拲肱穬躬鞏蛬珙摃廾篢觥栱匑蚣塨羾幊愩疘",
gou: "購狗構夠溝遘勾韝笱鉤句茩垢芶瞉茍搆蚼构苟篝逅枸詬泃耩冓簼岣唦緱姤彀雊媾覯傋耇佝鞲",
gu: "股故古估辜顧固谷鼓骨孤僱牯姑菇凸蛌穀罟雇賈滑蓇扢瀔鈷鶻瞽凅蠱梏咕顝沽堌棝轂鵠榖箍詁告菰觚橭臌錮鈲痼家淈縎羖嫴蛄鴣汩崮嘏鼜盬泒罛酤稒箛鮕杚牿愲夃唃尳薣瀫柧軱狜榾濲呱軲䀇",
gua: "掛瓜蝸卦刮括寡聒騧膼葀适挂呱胍褂颳栝懖罣剮筈腡罫蛞瘑緺絓趏詿鴰劀髺",
guai: "廥怪乖拐枴柺癐夬旝摑",
guan: "館管關觀冠官罐灌貫棺慣倌鱹矜瘝鸛丱摜痯盥祼莞綸悹爟涫瓘錧鑵脘琯毌雚矔鰥筦鱞悺",
guang: "光廣茪逛胱洸穬銧珖桄爌臩獷烡垙炚臦咣",
gui: "鬼歸貴櫃規桂閨皈軌邽癸跪圭庪瑰晷龜窐氿媯佹硅詭嫢匱鮭蟡會檜祪簋銈蛫藱珪槼傀昋暩摫觤柜劌宄槻炔姽蘣嶡溎溈襘鐀垝匭騩蘳厬筀蘬瓌庋劊鱖",
gun: "滾棍掍輥緄鯀袞琯璭蔉混磙",
guo: "國郭過果鍋鞷聝淉埻裹粿槨漍蟈幗堝慖濄簻墎簂崞虢摑膕鐹猓嘓錁馘惈蜾輠聒菓餜",
ha: "哈蝦蛤鉿",
hai: "還海害嗨駭孩咳亥氦鶷醢餀嗐骸頦咍絯烸胲",
han: "和含漢函涵韓翰寒魽梒釬喊汗撼瀚鬫焊罕憨豻悍銲旱憾睅捍鶾邯晥菡扞厂暵嚂酣蚶頜頷唅甝馯琀頇犴淊鋎雗榦焓蜭駻闞哻譀鋡谽熯攌鼾邗蔊涆閈嫨顄豃螒晗",
hang: "行航肮苀杭蚢斻貥夯桁迒雽酐吭頏魧沆絎珩巷",
hao: "號好豪浩耗皓郝淏毫昊蚵秏鰝顥灝悎濠嚆貉蠔鶴壕籇嚎鎬澔皞皜蒿涸嗥勂昦薃哠譹鄗薅諕滈蚝",
he: "和合何核河呵盒喝賀荷禾赫閡閤鶴褐郝覈嚇佫篕鶡蒚蝎訶闔騔龢嗃貉鉌鶷齕郃劾盉翮峆熇盍嗑熆曷涸趷暍猲紇菏澕煂毼翯廅楁滆螛魺礉鞨姀餲齃嗬頜餄壑",
hei: "黑嘿潶",
hen: "很恨狠痕鞎拫",
heng: "恆橫珩衡亨佷恒哼諻蘅桁姮啈鑅楻誙揘澋絎脝行鴴胻",
hong: "宏紅洪鴻弘彋虹哄訇泓轟閎吽紘烘鍙竑鋐汞妅輷触嗊葒鞃蕻浤魟薨谹焢黌鬨汯鍧訌竤霟鈜翃耾揈谾吰瓨仜玒苰谼哅渱澒篊渹灴舼",
hou: "後侯厚后候猴喉銗郈吼洉逅堠鱟篌葔齁佝鍭翭瘊垕缿鯸鄇餱骺",
hu: "湖戶胡護互虎呼乎惚垀壺狐滬忽笏糊弧枑蝴寣斛謢滹匢扈葫唬祜瑚鶻戽戲楛冱昒嫮婟昈鏬媩豰琥鵠鬍抇歑衚鶦搰縠蔰曶瓠謼許滸膴淴槴楜螜芐幠槲囫吰鄠焀猢嫭欻韄虍岵綔鰗魱餬鶘頀汻峘烼熩醐怙觳瀫淲虖沍嘝啒烀唿核煳和鸌",
hua: "華話化花畫劃樺滑驊崋譁划鏵豁嘩猾槬嬅螖杹鷨錵摦搳觟澅嫿繣釫蘳砉",
huai: "懷壞坏淮佪怀踝槐蘹徊諙蘾孬褢褱咶瀤櫰獲",
huan: "還環換歡狟患寰幻緩煥喚漶桓瓛奐擐鍰豢睆瘓宦捖繯圜洹闤雈驩浣鯇豲渙輐嚾瑍皖鐶羦懽懁獾鴅澴嬛肒鬟垸轘讙犿觨酄虇萑澣梡逭瞣荁貆鹮",
huang: "黃皇煌衁凰隍晃荒怳穔徨蝗皝慌蟥謊洸磺簧嚝潢撗騜堭璜媓惶恍篁熀肓遑幌鍠葟榥湟巟喤鰉鷬韹鎤餭崲滉偟軦獚趪熿艎鐄",
hui: "回會惠慧輝匯彙灰揮繪暉迴蕙毀隳徽虫燴悔誨痐洃賄蟪麾拻璯卉褘彗蚘恢潰鰴煇洄穢墮恛諱燬篲薈隓藱喙鐬翽譭褌晦顪蛔憓譿芔槥詼恚翬潓嬇橞繐譓虺烠豗繢饖毇噅嘒獩檓鏸茴濊禬廆蔧闠撝瞺詴禈圚餯咴徊檜殨",
hun: "婚魂混諢葷昏渾顐棞繉慁涽敯睯鼲棔琿餛倱楎惛睔睧圂閽殙溷餫轋",
huo: "或活獲火貨霍禍濩伙惑佸壑穫夥和砉藿騞擭捇靃臛萿眓謋豁蠖嚄掝嗀鑊檴矐雘礭臒矱沎湱鈥攉曤瀖瓁耠劐",
ji: "及給機際計集即級基暨技記吉吃劑極績耤寄奇己紀積濟雞季繼急輯幾籍齊既碁祭擊繫姬革肌騎忌疾激跡极飢机几居擠蔇饑洁磯稽蒺妓蹟伎虮佶脊楫薊冀圾麂寂悸妀膌漈棘鰶咭鶺彶譏薺蛣畸撠驥霵齎秸亟鰿岌勣偈霽庋刉鵋芨剞蟣楖魕戟枅銈嶯狤洎橶艩箕穖穧嫉穄襋嘰笈嚌汲戢羈禨簊蹐璣鯚覬鐖髻笄莋觙塈鯽痵樍屐塉銡鞊唧稷諅霙庴鞿乩瘠齌殛觭芰畿伋旡瞡罽濈蕺漃姞躋忣鱀嵇犄虀毄踦癘轚蘻其期稘鮆鴶癪尐掎蕀泲惎跽鬾踖璾蘮臮鈒裚檕隮癠鏶齏堲湒潗蓻鱭偮槉櫅懻瘈穊墼羇丮誋螏瀱緝覊覉藉詰",
jia: "家加價嘉佳架甲假夾賈葭嫁駕傢挾迦鉀伽珈价硈鴐戛夏貑騢笳頰梜玾鵊稼痂檟婽鉿莢茄鞈鎵麚扴岬榎豭枷鞂袷犌斝舺煆郟袈鋏蛺跲跏筴浹耞胛唊瘕椵毠徦泇恝裌猳讘幏",
jian: "間建檢見件簡劍健鍵減監兼鑑漸艦堅縑賤尖箭薦剪肩俴鹼撿繭鑒煎蒹趼諫箋濺毽馦翦鰹閒姦僭緘珔奸踐瞼糮儉寋湔揀菅戔戩柬荐艱犍鬋鰜豜腱鶼瑐藆虃諓謇殲澗牮麉堿挸蹇暕檻廌靬搛櫼餞猏楗栫筧鵳洊螹葌幵鰔菺椷熞鞬韉鰎榗糋蕑瀳籛揃鐱鑳蔪鳽熸襉鼸鑯牋礛轞譾襺惤湕鈃瞷餰鋻攓瀸鐧襇礆",
jiang: "將江獎講降蔣姜漿絳醬螿薑匠顜疆槳強韁彊嵹僵翞糨謽袶殭豇茳洚瓨橿膙礓弶鱂耩犟虹",
jiao: "較教窖交叫角腳繳膠鵁憿焦狡絞覺嬌礁佼校椒驕跤郊鉸蕉轎徼攪澆嚼姣皎勦剿矯蟭餃穚僥醮撟蟜鷦譥詨挍釂蛟鮫茭憍灚捁珓鷍儌斠嶠筊窌漅膲摷蹻艽煍譑曒皦鱎皭燋僬嘂嶕灂鸄嘄劋潐噭鐎鷮滘蟂湫酵噍藠",
jie: "傑街結接皆界解介節屆捷階藉借潔疥揭姐杰截戒幯姊械劫竭羯擳偕衱櫛婕祴劼吤袺誡詰价桔繲岊蚧揤拮偈倢芥悈鵖頡碣擷椄睫桀犗嗟栨巀岕孑蝔迼玠絜鉣昅砎蠽檞喈癤崨緁楬緳訐媎鍻鮚薢滐榤踕犵楶蝍湝褯唶嵥鶛啑趌菨瀄紒嵑鐑躤家價秸",
jin: "金進今近僅錦盡緊晉津禁儘謹筋妗浸斤巾瑾賮堇襟珒衿靳肵搢槿廑祲瘽菫巹慬縉瑧矜嚍藎伒噤殣嬧覲燼僸嶜惍紟菳蓳榗埐騹饉寖璡溍贐墐璶觔濜卺勁",
jing: "經景精靜晶境鏡警京井淨竟敬勁驚菁靖競鯨逕徑頸耕倞惊莖璟荊靚兢睛阱焗巠更旍暻桱旌檠憬仱獍烴儆鵛痙葝丼俓璥婧凈擏涇粳脛凊青鼱麠婛弳憼剄鶄蟼竫鶁箐燛腈肼",
jiong: "炯泂迥坰窘煚皛扃囧顈駉熲絅冏炅褧幜",
jiu: "就九究酒久舊救舅玖鳩觓揪捄糾鷲鬮疚蝤灸咎韭朻慦柩臼樛啾鯦萛廄僦麔赳轇牞湫勼揂揫鬏桕",
ju: "且局具巨據居舉聚劇鮈距炬鉅菊句俱拒瞿鴃橘鶪矩跼鋸懼驧琚齟駒鞠車据匊詎蒟桔狙梮狊窶踽虡莒拘怚蝺遽娵痀郹佢竘掬鋦挶櫸鼳犑踞袓屨粔椐椈葅蛆疽倨咀椇雎埧耟涺鶋躆侷沮柜苴澽貗泃罝斪秬鵴苣颶崌駏揟趜寠醵岠犋輋裾蘜足絇箤蜛焣菹筥姖壉趄跙輂踙踘駶鞫蚷腒鐻洰淗陱焗鵙櫃枸榘",
juan: "卷身娟圈捲捐眷雋悁倦絹臇鵑韏帣睊涓朘獧鐫蠲狷埢裐錈睠鄄罥腃菤鬳脧",
jue: "掘決覺絕爵赽角獗蕨厥瘚玨劂訣堀嚼噱蚗觼攫譎貜芵桷崛撅橛嗟捔蟨钁穱躩抉鴃倔臄屩蠼鵙谻孓觖鱖僪蹶玦鷢炔蹻趹傕噘矍憰彏爝玃焆蕝鐍鈌潏殌戄嵑屈較屫絶鴂梏腳",
jun: "均君俊軍菌鈞竣駿郡峻畯蕈雋呁濬晙浚桾窘麇蚐捃珺袀葰龜囷蜠鮶箘鵘莙皸鵔餕寯焌蔨頵攗碅䐃",
ka: "卡咖喀髂鉲揩佧刮咯咔胩擖",
kai: "開楷凱愷鎧侅咳慨愒鍇豈剴颽壒暟揩塏闓痎欬勓輆鶛愾烗鐦蒈",
kan: "看坎刊崁勘衎砍堪侃瞰龕竷磡埳矙檻戡顑歞莰墈闞譀嵁欿歁轗嵌凵",
kang: "康鏮扛抗炕伉亢囥漮匟邟糠慷嫝犺鈧閌槺",
kao: "考靠烤拷洘犒攷尻栲銬薧",
ke: "可科客克課柯刻顆氪峇珂棵咳堁渴蝌蚵哿勀溘剋苛厒騍搕恪閜簻嵙軻鈳嗑喀犐磕緙砢髁稞窠瞌殼坷岢樖敤薖嶱榼頦痾匼尅錁",
kei: "克",
ken: "墾懇啃硍裉豤掯錹肯",
keng: "肯坑銵硜鏗阬挳吭鍞娙牼硻",
kong: "空控孔恐倥涳崆箜硿悾錓鞚",
kou: "口寇扣釦叩袧怐鷇蔻瞉滱簆摳芤彄鏂佝筘瞘",
ku: "庫酷褲苦哭窟刳枯堀顝瘔橭桍楛矻骷嚳胐趶跍絝袴",
kua: "跨荂垮銙侉誇夸晇胯骻挎姱舿",
kuai: "快塊會蒯檜欳駃鄶筷鱠獪喎膾儈劊澮噲咼擓",
kuan: "款寬髖窾臗梡",
kuang: "況狂框眶誑矌匡筐曠俇鄺恇鵟懭爌絖洭貺壙纊礦誆劻彉哐夼",
kui: "奎悝夔揆魁虧葵闚窺峞簣硊潰饋匱騤逵刲盔撌憒睽簀愧喟躨藈傀跬槶暌巋鍷餽樻楑馗頍蔮蹞聵煃櫆蕢瞶噅媿聧犪湀戣楏頯騩茥嘳蘬鄈蝰隗喹",
kun: "坤困昆崑髡焜悃鯤捆硱琨晜騉睏錕壼褌惃閫綑菎猑梱裍涃稛鵾醌",
kuo: "擴闊括擃廓霩漷蛞姡鞹",
la: "啦拉辣翋蠟旯臘喇剌鬎腊揧藞落菈邋楋柆鞡瘌鑞垃砬揦蝲",
lai: "來賴萊錸瀨籟癩徠藾騋鯠棶郲唻睞箂淶賚崍娕鶆庲",
lan: "覽蘭欄藍爛籃斕嵐濫灠懶攬攔瀾糷纜襤瑯欖籣讕躝灡壏闌婪欗鑭嬾醂襴爁灆爦壈礛浨譋罱",
lang: "郎廊狼浪朗欴蒗螂鋃悢閬桹瑯峎稂榔硠琅塱誏踉啷俍莨崀烺埌蜋筤",
lao: "老勞落恅撈牢佬荖酪姥烙狫栳嫪癆蟧絡澇橑橯潦僗鐒醪咾嶗嘮銠軂浶簩顟轑嚕耮",
le: "了樂捋咯氻肋垃鰳竻阞泐仂埒砳扐礜哷餎褦勒",
lei: "類雷勒淚累蕾磊磥壘酹嫘壨禷擂羸瘣銇藟耒畾儽鐳頛纇儡縲樏罍纍誄轠礧礨灅漯讄鑸瓃蠝蘱檑癗礌櫑櫐絫蘲虆鸓欙嘞肋",
leng: "冷楞稜蔆倰怔愣棱薐崚踜塄",
li: "李利理力立裡里麗禲例裏離莉禮歷黎粒猁哩蜊勵貍曆赲梨儷醴栗鋰璃蒞厘鴗俐隸朸釐笠厲豊罹嚦梩犁鯉唳蝷籬鱧娳瓥壢麜黧酈靂漓篱鷑浬鸝鷅鱺藜鬲欐吏荔綟鯬狸瀝秝痢澧蚸灕戾藶篥攭樆屴縭礫齂櫟苙瑮琍砬剺搮蠣儮靋廲犛漦礪劙邐砅叻粍犡俚驪粴慄溧濿轢蠡岦蘺瓅詈唎皪攡嫠鵹糲孋攦娌喱櫪癘鬁飀鱱蜧褵磿醨謧盭騹鑗釃沴蔾欚峛浰筣蠫讈厤菞塛孷氂斄躒栵曞轣悷傈凓癧",
lia: "倆",
lian: "聯連鍊蓮戀練臉鏈廉憐璉楝煉濂斂漣簾萰縺鰱奩鐮僆殮翴鎌帘羷鏀譧磏襝槤歛堜瀲膦蹥摙蠊蘞鬑湅褳謰覝澰薟嗹薕鄻奱嬚溓臁浰",
liang: "兩量良梁亮輛涼樑糧諒椋倆晾魎喨粱綡緉悢踉湸駺裲啢輬莨蜋靚",
liao: "料廖了寮療聊撩繚遼憭飉瞭膋僚窷寥豂屪尥敹窲鐐潦蓼鄝憀鷯摎蟟镽嵺撂暸嶚膫獠炓燎嫽嘹簝飂釕漻蟉蹽",
lie: "列烈咧獵裂劣捩儠鴷迾蛚冽躐颲洌擸鬣鮤睙趔姴茢犣脟蛶",
lin: "林琳臨麟霖鄰遴磷淋疄鱗橉廩甐藺璘暽賃吝凜亃箖懍菻燐痳榃瞵粼嶙鏻綝潾轔驎罧碄翷躪檁僯惏繗焛閵蹸顲壣拎啉膦",
ling: "另令玲靈領零鈴齡凌陵嶺苓菱伶淩堎綾笭翎砱炩羚聆怜皊瓴呤醽鯪欞拎泠爧柃岭櫺蛉婈駖酃鴒呬囹舲彾詅輘姈夌霝狑蘦坽琌睖澪軨錂裬蕶昤○〇",
liu: "六劉流硫留柳瘤瀏珋坴遛琉溜鷚鰡榴鶹藰蹓嬼鉚蓅裗餾麍飹懰霤塯騮鏐旒鎏綹陸翏廇巰鎦罶媹雡嵧熘飀鋶碌",
'long': "隆龍隴蘢弄籠聾癃瓏瀧矓梇攏鑨靇儱鸗龒衖壟巃礱嚨朧哢櫳窿鏧躘徿曨蠬襱豅蠪壠",
lou: "樓露漏嘍廔摟蔞鷜婁熡螻僂陋鏤嶁簍瘺謱耬塿艛髏瞜漊鞻",
lu: "路錄虜陸魯盧鹿爐祿鷺露臚硉氯蘆嚕僇廬顱鱸滷塶廘琭璐淕鹵賂麓盝戮磟鸕碌騄鯥鐪簏磠擼淥踛瀘蓼鏕嚧漉輅轆艣菉櫓蓾籙醁錴甪逯壚艫睩鵱潞籚角鑪穋彔熝蔍蕗蹗櫨罏轤摝攎璷玈稑螰纑蠦垏觻氌鑥擄綠",
luan: "亂卵欒巒鑾鸞羉灤孌曫臠圞薍孿攣",
lun: "論倫輪崙菕侖掄棆蜦淪惀綸錀圇碖踚陯溣稐",
luo: "羅絡囉落洛峈螺鮥裸蘿駱硌鵅捋鏍犖咯酪剆擄儸烙鑼邏袼鎯珞攭瘰蠃蓏籮騾砢氌雒臝摞玀鸁纙覶欏鱳濼蔂躒啰覙覼倮躶",
lv: "率旅綠呂鋁律侶濾慮穭捋履屢壘絽驢祣縷婁氯梠儢褸挔閭葎勴慺藘櫚菉氀郘膟漊膂膢鑢嵂僂",
lvan: "攣癵孿孌臠",
lve: "略掠鋝擽撂",
ma: "嗎馬碼蟆瑪嘛麻媽罵鬕痲嬤螞嘜鷌犘麼傌禡鎷榪溤抹摩獁",
mai: "買賣麥邁脈埋霾鷶蝐薶勱嘪蕒霢",
man: "滿曼蠻慢漫鰻璊蔓鬗嫚慲鬘鏝矕瞞悗僈幔獌蹣饅謾熳縵屘墁埋鞔槾顢澫蟎",
mang: "忙奀盲芒汒硭漭尨硥痝鋩茫蟒蘉壾莽氓哤牻茻邙駹盳鸏杗庬蛖娏孟笀牤杧",
mao: "貓茂貿毛貌懋帽冒錨茅酕卯鶜軞芼矛昴袤媢媌瑁楙萺蝥髦眊茆旄枆堥瞀艒髳蟊罞渵鄮泖嫹耄毷氂鉚",
me: "麼嚜末",
mei: "美每沒梅妹媒媚眉玫煤魅苺枚鎂黴霉楣挴昧湄痗堳眛脢莓媄瑁禖鋂韎沬袂蝞寐瑂媺嵋腜呅郿渼徾塺煝浼燘酶鎇鶥糜猸謎",
men: "們門穈悶捫暪虋燜樠菛鍆懣汶",
meng: "夢盟孟蒙猛錳萌礞瓾矇蜢檬艨濛雺鄳蠓幪鄸曚氓艋懵霿朦莔饛儚瞢甍甿鼆虻鸏懞霥蕄氋獴勐",
mi: "米迷密秘祕冪蜜謎彌幦咪靡峚泌覓冞羋醚醾禰糸謐獼眯麛漞敉糜羃瀰嘧葞麊瞇滵鼏宓弭汨蘼縻榓蘪攠麋檷瓕灖爢蔝濔蠠塓銤渳幎蔤脒",
mian: "面免麵棉眠勉冕綿偭緬鮸媔蝒娩靦俛湎丏矏沔絻眄矊婂喕愐櫋瞑",
miao: "秒妙廟苗喵描繆淼瞄邈藐玅渺眇緲杳杪篎鱙鶓",
mie: "滅咩蔑羋懱幭乜篾搣瀎覕衊鱴礣蠛薎",
min: "民敏苠笢玟閩旻憫閔暋岷痻抿旼鈱泯敯敃緡愍潣黽澠僶忞崏湣刡罠怋錉簢閺珉皿",
ming: "名明銘命鳴眳蓂冥茗皿熐螟鄍溟暝瞑酩洺嫇姳榠慏詺覭盟",
miu: "繆謬唒",
mo: "摩模末魔膜莫麼髍墨默磨抹摸沒万冒脈鄚摹寞秣謨嫫饃蛨漠瘼貊沫嚜眽貉藦劘靺陌茉蘑慔歿塻妺嘜銆暯枺貘蟔袹驀縸糢瞙霢纆譕歾粖莈覛嗼爅鏌無嬤袜",
mou: "某謀麰蝥牟眸侔鉾繆鴾冇洠蛑哞踇呣鍪牡",
mu: "目木牧母幕姆慕墓穆暮募牡睦繆畝峔鉧沐姥鉬牳幙蚞羃鶩砪霂拇苜模楘坶氁毣莯炑鞪仫",
na: "那納拿哪娜鈉吶笝衲挐肭拏誽捺妠訥豽軜魶南鎿",
nai: "乃耐奈奶倷迺摨鼐孻氖尕錼嬭柰氝艿渿釢螚褦萘",
nan: "南男難奻楠諵湳囡喃婻囝蝻暔赧腩萳莮揇柟戁枏",
nang: "囊齉曩囔攮灢",
nao: "腦鬧撓橈惱怓鐃獿瑙譊孬峱淖呶猱夒獶嶩硇蟯",
ne: "呢訥",
nei: "內那哪餒腇",
nen: "嫩恁",
neng: "能濘薴儜",
ng: "嗯",
ni: "你妳兒尼妮泥擬匿逆迡暱倪膩齯禰呢鈮觬霓抳鯢馜鑈苨堄郳縌怩隬麑儗薿昵猊睨旎秜蜺坭婗輗檷狔狋屔譺淣跜嫟惄臡柅溺衵",
nian: "年廿念唸粘黏撚捻淰鯰輾簐拈輦碾哖攆姩跈涊躎蔫鮎埝",
niang: "娘釀孃",
niao: "鳥尿嬝溺裊蔦嬲嫋褭脲",
nie: "隉捏鎳涅聶囓顳篞孽鷍臬嚙钀乜蘗躡囁齧鑷敜臲疌苶闑巕櫱踗踂糱嵲蠥",
nin: "您拰",
ning: "寧凝甯聹濘擰獰寍嬣檸鑏佞嚀鸋",
niu: "牛紐鈕妞杻扭忸拗莥狃炄",
nong: "農弄濃儂膿穠噥繷齈醲襛鬞",
nou: "獳耨羺譨鎒嗕",
nu: "奴怒努笯弩蒘帑駑砮孥呶胬",
nuan: "暖煖餪渜",
nuo: "那諾娜挪逽梛懦橠挼儺糯搦糑捼懧鍩",
nv: "女衄忸朒釹籹恧",
nve: "虐瘧謔",
o: "喔哦噢",
ou: "偶歐嘔噢藕鷗吽饇蕅耦區慪毆甌鏂漚熰飀齵吘蓲謳腢櫙湡",
pa: "怕帕爬葩扒跁蚆趴耙袙琶鈀帊杷舥啪派筢",
pai: "派排牌拍啪俳蒎鎃棑徘湃俖簰迫",
pan: "盤潘盼判攀畔磐拚鞶般胖蒰頖槃眅牉袢叛扳蟠番泮磻踫蹣坢搫柈頄溿沜詊跘瀊媻幋襻縏爿",
pang: "篣旁胖滂龐彷逄傍磅尨螃膀蒡雱厖乓徬耪庬舽房嗙鰟髈",
pao: "跑泡炮砲拋炰庖袍麭齙匏瓟刨皰鞄麃咆髱脬奅狍麅",
pei: "配培佩陪坏肺珮賠沛胚裴披荖琣伂昢呸旆霈轡姵邳坯衃碚帔柸岯翇陫醅浿垺毰錇",
pen: "盆噴葐呠翉歕湓翸",
peng: "彭芃鵬朋捧澎碰棚蓬膨倗皏堋駍傰閛磞烹亨蟛篷砰恲硼痭淜鬅椪抨樥漰掽匉髼怦錋軯憉鑝輣韸",
pi: "批皮坏匹屁毞罷擗痞琵膍埤闢脾披被譬疲翍阰丕劈裨僻陴俾圮否貔辟砒椑蚽霹啤癖鷿毘毗羆蠯鈹紕坯疋憵蚍嚭陂郫蜱笓髬髲澼媲怌駓猈潎錍枇淠魾苤比仳狉秠崥銔揊鴄礔犤鼙伾鈚釽沘玭螷庀濞諀甓噼芘鮍睥鸊",
pian: "片篇便騙偏翩遍諞扁鶣頨媥萹駢蹁胼貵骿楩犏",
piao: "票飄嫖漂篻魒僄摽薸慓瓢剽彯旚殍瞟皫蔈犥驃莩縹醥翲淲螵顠朴嘌",
pie: "撇瞥氕苤",
pin: "品頻聘拼貧姘嬪瀕礗蠙牝顰涄矉嚬蘋拚榀",
ping: "平評坪瓶屏萍憑郱蘋俜苹帡馮荓洴秤枰蓱乒玶蛢頩呯娉泙軿砯甹缾艵竮覮絣鮃",
plan: "潘番",
plu: "濮莆",
po: "波破頗坡珀泊迫醱婆潑蒪翍朴癹粕魄笸陂櫇叵鄱皤烞岶鏺鉕桲釙濼",
pou: "剖裒捊瓿棓掊婄吥抔",
pu: "普舖譜浦墣埔朴葡僕撲瞨鋪扑溥蒲樸誧暴瀑菩抪濮酺蒱仆璞圃脯纀噗痡曝襆蹼莆潽匍鐠鏷氆釙烳轐醭堡",
qi: "其期器七起氣啟奇企旗琪汽碁迄漆琦崎齊枝慼棄泣圻棋憩棲戚妻騎气綺蚚柒俟祈祺祇掑緝麒呇淇稽愒岐倛豈蚔娸蚑鰭砌臍畦溪颽祁芞騏甈磩欺薺錡淒亟磎跂杞歧旂萋耆埼郪乞汔棨艩屺訖魌諿忔蘄凄唭衹悽桼谿葺鯕綦鏚栖蜞諆藄頎亓鮨軝磧踑玂麡萁蠐岓鑇沏碕蟿芑鼜栔錤婍敧湆稘嘁懠攲僛榿鵸徛邔釮湇翗鬿霋鄿鬐鸂盵悊鶀鶈咠濝槭吃蹊蛣䗩疧芪觭契扱踖",
qia: "洽恰帢掐卡酠殎愘葜袷髂",
qian: "前千錢簽仟潛淺芊謙鉛遷遣茜倩欠牽嵌騫岍籤塹扦蒨鉗乾歉扲虔葥媊墘慳拑阡芡騚繾譴仱蚙奷嗛篟麉漧岒忴僉鰬鈐箝黔棈綪撖顩蜸鳹灊婜褰黚軡揵愆掮慊汧榩韆忏顅縴輤櫏鐱搴槧攐鼸姏粁掔燂檶槏攓傔釺蕁纖",
qiang: "強腔廧牆槍羌薔瑲嗆鎗磢彊鏘蜣傸檣蹌羥墻熗牄搶戕椌嶈羻斨謒鏹錆爿將墏嬙襁蘠矼繈漒蹡唴戧",
qiao: "橋僑巧喬翹敲樵誚瞧幧俏鍬橇敿悄愀鞘鵲譙磽憔竅撽鏒撬雀髜蹺礄頝峭蕎帩蹻骹塙墝鐰譑庨鄡鱎繑燋墽殼劁嘺趬郻燆簥躈嫶趫繰顦",
qie: "且切茄竊伽鯜藒契怯妾挈蛪篋朅緀愜鍥踥唼癿洯趄砌",
qin: "勤秦欽琴侵撳衾禽庈芩沁雂寢擒噙坅芹曋寑肣蚙斳昑懃嶔螓軡耹綅唚檎鋟澿鈙駸螼菣靲嫀顉瀙親嗪搇",
qing: "請情清晴慶親青輕卿頃氫傾擎勍氰郬廎檠磬靘罊鯖黥蜻掅漀凊罄羻綮樈謦碃汫圊鑋殑狅殌䝼",
qiong: "瓊窮藭璚穹藑芎蛩蒆瞏桏筇銎橩邛赹煢嬛跫惸笻輁讂",
qiu: "球邱求秋仇訄丘鰍裘趥銶盚蝤糗囚媝虯僋璆酋萩鯄犰龜鼽恘蝵坵苬俅殏鞦毬蟗鶖楸泅崷艽逑朹緧蚯紌頄梂絿煪蛷遒蓲脙觩鮂鰽蠤賕厹偢釚莍瞅湫巰",
qu: "區去且取曲趨趣袪磲屈驅娶渠軀敺砠圈呿麮鴝胊灈蠷瞿覷菃璩浀翑闃衢抾葋翵镼蛆麴紶嶇鼁祛蟝齲詘阹斪鼩鶌蛐蕖沏蘧胠劬淭漆豦籧佉氍刞岨魼懅螶欋臞朐湨匷鱋躣凵軥髷焌黢戌粬麯癯蠼苣",
quan: "全權卷券泉痊圈犬拳詮銓畎勸悛甽牷灥荃醛婘踡弮筌蠸鬈蜷顴巏齤瑔輇恮綣佺縓琄牶棬汱絭絟鐉觠虇烇駩惓犈姾跧",
que: "卻缺確雀确闕蒛鵲怯騥硞榷恪殼愨埆闋瘸碻皵毃炔爵塙碏礐礜礭搉嗀",
qun: "群裙宭踆峮逡囷麇羣",
ran: "然染燃蚺蛅呥冉珃袡髯橪苒嫨姌",
rang: "讓禳壤鬤躟嚷勷獽攘穰儴蠰蘘瀼瓤懹爙",
rao: "饒繞擾橈襓遶蟯隢嬈蕘",
re: "熱惹若喏爇渃",
ren: "人任仁認儿恁忍妊壬韌刃飪芢栠銋賃軔鵀仞稔荏軠紉衽棯訒荵屻肕紝牣腍葚",
reng: "仍扔礽陾",
ri: "日衵馹鈤",
rong: "榮容融蓉溶榕絨熔戎鎔狨鰫嶸冗瑢蠑茸髶鑅氄茙褣毧駥羢爃烿傇瀜肜媶軵榵",
rou: "肉鶔柔揉禸鞣鍕輮鍒蝚韖葇粈月媃楺蹂糅鰇厹煣",
ru: "如入乳儒茹汝蓐帤袽辱孺褥挐侞繻濡薷襦鑐銣鄏鴽縟女肉嚅曘洳擩筎燸臑醹溽嗕媷蕠蠕檽顬",
ruan: "軟阮堧撋蝡蠕朊壖緛瓀礝耎",
rui: "瑞銳睿蕊桵芮叡緌蚋橤蕤枘汭繠婑惢",
run: "潤閏犉橍瞤",
ruo: "若弱偌楉蒻挼箬篛鄀爇鶸",
sa: "卅薩撒灑馺洒攃颯隡躠趿仨靸三挲摋脎",
sai: "賽思塞鰓腮揌僿毢毸噻",
san: "三參散傘鬖繖毿閐糝鏾叄饊霰",
sang: "桑喪磉顙搡嗓鎟褬",
sao: "掃艘橾騷埽嫂瘙颾繰搔臊慅繅溞鱢氉",
se: "色塞瑟圾澀銫璱嗇濇穡飋翜濏轖鏼犞譅愬",
sen: "森幓篸槮罧襂",
seng: "僧鬙鬠",
sha: "沙紗砂啥莎傻煞猀鯊繺硰嗄廈杉裟霎痧歃摋樧箑帴喢蔱繌萐翣魦唼挲殺剎鎩",
shai: "殺篩曬晒鎩骰閷色",
shan: "山善珊杉閃扇刪羶姍繕膳擅摻煽衫汕疝陝贍搧笘狦晱苫鱣剼潸覢謆穇鱔跚蟺舢嬗赸掞訕摲挻釤睒騸單禪墠鄯縿灗烻儃芟墡膻柵蟮鱓",
shang: "上商尚賞傷殤觴晌漡湯鬺蠰仩裳姠謪蔏螪墒熵垧鞝緔",
shao: "少紹邵卲劭召燒稍梢捎牊韶圴勺芍哨睄玿艄杓鮹袑輎旓筲蛸髾莦弰潲蕱苕",
she: "社設射什攝舍涉蛇捨厙舌葉拾賒赦譇韘騇蠂歙捑佘奢灄鉈麝檨奓猞蔎揲折畲畬闍慴懾",
shei: "誰谁",
shen: "神參身深申沈甚審腎伸慎眒珅砷滲屾紳沁侁甡蔘鯓寀莘椹脤抻蜃娠葚信燊嬸哂矧柛諗胂瀋呻邥氠峷侺鋠詵駪籸妽葠瞫讅覾阠糝棽鰺什瘮",
sheng: "生聲聖盛勝省昇升賸陞笙繩牲剩冼眚圣鉎髜泩呏甥乘鵿譝澠狌鱦貹嵊憴鼪偗焺箵湦溗",
shi: "是時使式十市事室視飾世史實師石士示施試詩氏食碩識勢適始失釋射獅拾濕邿什仕矢蝕駛屍屎嗜豕溼匙逝侍蝨豉誓銴蓍鰤蒔尸噬諡螫拭謚恃寔弛遾虱諟提媞褆湜柿鈰迉唑舐鶳箷鼫弒鰣跩戺鉐軾奭筮詍鉽葹塒鳲纚絁鼭烒祏螄簭湁翨貰溮釃崼徥湤襹揓澨褷襫戠榯鸍溡殖噓炻似忕",
shou: "收受首手售壽守授熟獸瘦狩綬荍艏掱",
shu: "數書淑屬樹術署述鼠輸紓舒薯漱束恕蜀疏殊叔蔬藷暑陎樞墅沭軗埱孰豎梳曙倏黍贖庶婌塾抒荼姝虪鉥糬戍钃攄尌儵杸樗藲澍潻秫襡鵨菽跾綀祋翛殳朱熟鏣籔焂摴鸀裋鶐癙襩毹腧",
shua: "刷耍唰鮛",
shuai: "率帥衰甩摔蟀繂孈縗咰",
shuan: "栓閂涮拴",
shuang: "雙霜爽艭塽鷞漺慡驦礵孇樉縔瀧孀灀鸘",
shui: "水稅睡說蛻帨涗脽裞誰",
shun: "順舜盾賰瞬吮鬊瞚楯揗蕣",
shuo: "說碩帥朔鎙蟀蒴勺率欶鑠爍妁芍搠揱槊獡箾嗍數",
si: "四斯司思死絲似寺肆嗣汜私俟祀巳飼笥賜泗撕廝伺虒儩糸鍶磃嘶覗蟴耜鉰謕食駟禠鷥肂颸緦姒洍柶楒兕涘俬蜤凘偲貄罳蕬螄鼶榹泀禗澌蕼廁噝飤",
song: "送松宋頌鬆慫崧誦嵩訟悚淞聳倯傱嵷菘忪娀愯駷竦濍蜙硹憽凇",
sou: "搜蒐藪嗾嗽瞍醙叟謏鄋廋嗖獀颼擻騪籔餿鎪溲艘螋",
su: "素蘇速塑宿訴俗謖膆肅溯酥粟蓿颽甦穌縮疏憟夙囌玊樕愬洬鋉橚藗愫栜餗驌僳嗉鷫泝涑窣遫潚鱐簌嫊蔌縤榡觫櫯傃溹",
suan: "算酸蒜狻痠筭匴",
sui: "歲雖隨嶲遂隋穗眭尿碎髓綏埣祟繸挼雟隧鐬璲娞顪邃誶賥荽燧荾睢鐩饖禭睟濉檖瀡襚穟毸滖繀巂檅哸浽旞鐆",
sun: "飧孫筍損潠蓀愻搎猻榫簨鎨薞槂蕵隼",
suo: "所索鎖縮梭瑣桫娑嗩璅莎挲蓑逤鎍莏嗦簑唆摵趖蹜傞摍嗍睃髿羧",
ta: "他她它塔祂牠踏鞳遝獺漯躂遢拓蹋嗒迖塌撻榻龘搨禢涾闥嚃鰨沓鉈趿佗鎝榙錔傝褟闒鞜靸毾闟誻羍達濌鎉溚",
tai: "台太泰臺態胎抬鈦汰檯邰颱苔籉薹炱齝跆駘儓嬯呔鮐旲傣燤秮溙大肽酞",
tan: "談探潭彈碳嘆炭壇痰譚坦攤貪埮歎灘憛倓檀抩覃毯藫怹膻罈癱憳坍忐鉭黮曇緂澹錟蟫橝羰蕁賧郯袒禫鐔鷤醰醓菼嗿裧婒餤舑湠貚",
tang: "堂唐湯糖塘燙膛棠倘蝪蓎趟醣躺漟瑭曭鶶爣煻搪踼赯帑钂磄淌鏜闛螳樘溏矘鐋儻摥薚橖榶鼞鎲蹚鎕戃惝螗耥嘡鞺羰餹餳",
tao: "套陶討桃濤逃韜掏挑滔匋饕騊淘萄綯翿洮鞀燾縚搯叨錭絛槄啕蜪檮弢慆鋾駣嫍幍祹醄咷翢䄻",
te: "特忒忑蟘鋱貣螣慝脦",
teng: "藤騰籐疼滕謄縢螣熥",
ti: "體提題替堤踢蹄梯惕嚏悌緹倜体俶騠趧隄鶗啼籊鷈剃稊鬄剔褅啻薙銻蝭涕鵜弟謕厗屜荑禔睼逖裼醍偍鯷鍗殢趯惿揥焍崹綈蕛鶙悐擿鷉ट㯩洟",
tian: "天甜田填添畋蚕菾婖舔瑱恬鈿鷏沺窴腆忝磌餂倎盷痶悿殄掭闐晪賟靦屇甸淟酟煔湉滇覥",
tiao: "條調跳挑覜眺鰷祧窱嬥庣齠祒窕恌蜩朓苕鮡迢笤鞗糶佻髫宨頫芀誂趒鎥岧脁絩",
tie: "貼鐵帖怗蛈餮僣驖萜",
ting: "聽廷廳停庭婷亭艇挺汀桯蜓町蝏听閮耵霆楟鼮頲葶榳渟侹珽鋌梃莛脡艼圢嵉朾筳聤綎烶烴",
tong: "同通統童銅痛艟桐桶茼硐筒迵瞳彤侗炵酮潼橦捅僮狪曈佟朣餇穜峒鉖膧仝慟痌衕鮦烔氃蕫恫浵絧罿爞垌姛詷蓪哃熥獞粡筩犝嗵",
tou: "頭投透偷斢牏酘媮黈蘣紏鈄妵骰",
tu: "圖土塗突凸吐途徒兔捸怢涂酴屠堍蒤嶀禿鷋廜荼釷鷵鼵捈梌瑹菟鵌瘏葖鍎鵚鵵峹潳駼腯鶟芏筡涋稌跿唋湥嵞",
tuan: "團貒湍彖鷒糰剸褖慱摶漙槫鷻煓鏄疃",
tui: "推退腿藬蓷蛻隤俀穨頹橔魋僓螁弚蹪駾忒褪煺",
tun: "屯褪吨豚吞魨忳芚臀拵飩暾旽囤軘汆啍螁涒畽氽",
tuo: "驒拓妥托脫駝馱託拖陀侂挩扥撱魠唾橢袉蘀沱堶鉈鞁橐柝籜庹鴕砣佗坨馲侻鼉牠跎鮀詑毤紽沰矺跅酡嫷阤碢岮飥毻柁鼧沲媠鬌",
wa: "哇瓦挖膃蛙娃襪窐窪汙呱佤窊漥齀洼媧嗢穵溛凹",
wai: "外歪舀喎崴",
wan: "萬灣玩完晚婉芄腕丸輓彎碗婠万刓蜿琬宛倇莞挽烷頑卍晼鮸睌岏豌畹仴葂菀浣忨汍娩皖紈綰鋄綩剜惋抏睕踠捥翫脕蟃鞔綄潫脘蔓",
wang: "網王往望汪旺忘亡惘迋罔尪网妄枉暀朢瀇尢輞魍菵莣臦",
wei: "為未位委維圍威偉衛微惟尾味魏唯緯薇瑋葦謂畏蔚燰韋遺胃喂危慰違偽餵崴芛葳煒韙偎萎諉蘤囗桅洧艉暐鮪尉帷硊磈渭蒍蝟寪媦穌洈躗巍罻闈磑煨亹覣蝛濰褽隗薳鏏儰鍏隈藯覹幃痿餧欈溦猥隇鍡圩娓鮠犚頠蜲潿碨蜼蓶徻壝嵬逶徫葨渨濻鮇薉椲踓贀霺湋韡浘喡骫痏愄菋腲醀瓗峗崣揋鄬椳癓犩烓詴瀢霨讆溾蘶斖倭僞爲䲁",
wen: "文問溫聞雯紋穩吻汶妏蚊玟塭馧免芠紊桽琝瘟顐呡豱殟轀鼤闅搵鳼璺瞃魰炆刎抆駇閿閺薀輼榲鰮鰛",
weng: "翁鶲甕蓊罋嗡瞈螉瓮聬齆浻暡霐塕滃蕹",
wo: "我窩涴握臥沃捰渦婐萵渥蠖倭斡幄喔焥猧偓矱齷踒濣蝸撾婑䰀肟",
wu: "五無吳物務屋武午伍舞勿烏吾霧巫污嗚悟誤戊亡惡瞴陓蜈沃唔晤卼毋迕憮蕪仵鄔梧鼯鎢婺塢痦埡兀捂啎汙窏逜寤於喔鋈芴屼遻鶩蘁噁軏誣圬岉摀侮靰浯廡嫵杇鵡俉珸鯃粅齀騖兀忤膴鷡郚杌峿莁鋙鋘扤螐甒洿牾蓩玝剭碔腛潕阢歍橆沕倵嵨鴮矹焐躌洖煟鵐珷",
xi: "系西係細希溪喜戲息習矽席錫吸析惜繫禧膝棲熙隙襲攜悉郋羲晰嘻兮囍稀烯鰓醯夕釐汐蠵郤恓璽硒俙黖昔穸熄撕畦鰼蓆悕褶晞瘜譆蝷熹鬩蜥徙蟋豯衋曦謑奚僁敼怷蓰蟢桸窸諰貕僖孈怬咥虩檄歙睎犀葸熂翕腊犧簁屭蹊徆覤樨罊恄狶蒠褉礂嬉谿驨齂棤皙槢屣餼扱燨淅禊欯卌盻謵媳娭疧鄎鼷欷綌隰鑴嶍潟肸莃漇觿唏橀鎴琋摡裼螇鵗浠傒滊歖匚豨巇爔釸媐徯覡凞螝縰忥粞螅飁騽釳焟舄蹝巂闟瓗鸂枲惁榽獥鎎屖氥赩蕮霫饎騱菥潝酅薂舾㯕豀隵洗銑葈澙",
xia: "下哈珨夏俠霞岈匣轄瞎挾嚇祫狹峽蝦廈舝冾洽硤笚瑕騢暇呷陜赮狎鏬欱搳斜磍黠遐鍜颬罅煆柙芐縖蕸魻烚碬",
xian: "腺線先現閒縣限賢仙憲顯憸洗險鮮獻纖嫌赻陷掀弦嶮鹹銜蜆銑咸嫻馦秈珗絃諴姍僩奾羨唌餡僊癬霰閑搟晛啣見睍麙獮舷撊鶱嫺暹譣蓒峴涎跣鷴蛝葴癇豏莧杴俔氙祆玁憪鷳娊錎忺孅鰔蘚娹筅仚韱姺姭攇枮涀鍌幰礥屳銛燅躚韅襳嘕嬐燹廯攕轞胘澖灦烍鋧獫瀗毨禒羬褼蚿尟粯薟酰撏冼灑洒綫羡",
xiang: "鄉項向想像相巷祥箱香詳降翔象響享羊湘亨橡襄廂鑲舡嚮驤庠饗餉曏蟓勷鯗葙蠁薌晑襐恦欀闀瓖纕緗萫饟鱌潒鐌忀",
xiao: "小校蕭銷笑曉消孝效髐筱削嘯酵鴞獢宵肖啋驍痟逍硝痚簫歊傚篠哮恔虓霄梟嘐囂穘萷瀟嘵謏藃學洨謼魈郩蛸笅綃烋髇呺灱庨踃潚櫹毊熽膮涍憢虈枵窙蠨踍翛殽淆",
xie: "謝寫解協些血廨嶰蟹鞋楔斜龤洩械鞢歇偕邪挾屑契卸燲蠍瀉諧駭妎瑎榭懈繲脅熁蝢疶媟蝎紲褻泄劦頡燮擷躞齥褉齛絜嗋搚檞拹邂渫薤屜勰瀣猲慀澥獬焎絏屧齘伳灺垥愶纈祄榍骱韰駴籺偰脥揳襭奊攜叶鞵",
xin: "新心信欣鑫辛薪昕鋅歆芯伈莘舋忻攳尋囟炘妡訢盺鬵釁膷杺鈊廞煡鄩襑焮兟噷阠馨",
xing: "行性悻型興星形姓幸陘馨醒刑杏邢硎侀胜荇婞倖馫腥猩洐擤惺莕滎瑆胻鋞鉶騂涬濴煋餳烆垶渻蛵觲箵省",
xiong: "雄兄熊胸凶兇洶匈敻芎恟忷詗赨哅夐",
xiu: "修秀休咻銹鵂珛琇繡茠鏽袖岫宿臭庥溴嗅銝羞樇脩朽糔饈玊潃滫鎀褎髹殠螑臹貅蓨",
xu: "許需須徐續酗序旭虛敘驉怴畜緒侐煦絮諝咻鬚蓄恤旮戌魖昫呴噓胥卹珝繻洫芧邪詡晇嬬吁漵勗藚蝑銊盱婿倠藇墟楈栩殈喣糈瞁頊冔揟欨垿勖歔訏訹慉瞲幁旴沀稰鄦魆鱮姁縃蕦醑湑烅窢嬃蓿欻圩",
xuan: "選縣宣禤軒玄萱炫旋瑄璇諼懸鋗眩蝖絢暄壎漩喧敻蠉袨眴翾萲玹楦璿鉉晅昍誸煖泫琁衒梋烜渲嫙媗儇愃諠縼咺塤鏇昡佡揎嬛楥矎蜁蔙贙鍹讂愋伭妶鞙還駽煊痃癬碹券",
xue: "學雪薛穴嶨削鱈騝噱靴泬袕燢觷趐壆鷽血踅吙澩謞岤茓ॄ謔",
xun: "訊訓尋詢遜馴勳薰臐巡迅循侚郇勛蕈葷旬蟳珣熏洵覃壎潠巽燻汛荀璿恂纁撏潯徇殉蕁獯橁璕醺槆焄鱘枔蔒曛迿噚峋栒燖咰紃矄噀窨塤",
ya: "亞雅壓呀牙鴨丫押砑啞芽鴉軋衙涯厊伢齾堐婭枒訝雃迓氬椏疋庌錏掗蚜孲犽猰揠聐圠窫蕥齖襾玡埡崖睚瘂",
yai: "崖啀娾睚",
yan: "研言演嚴眼彥燕驗岩炎顏延鹽湮煙厭沿菸妍殷鶠宴掩雁衍郔焉巖晏弇豔艷偃焰咽諺鼴埏黤硯簷傿燄淹珚醃堰閻嫣贗漹筵巘檐饜齞厴曮鴈臙嬿躽隒兗腌黫嬮龑鷃蝘壧灩孍焱裺褗奄郾棪閰閹琰儼鄢抁渰戭嚥讞懨顩甗讌蜒魘匽剡鴳綖姶鷰胭偣狿崦碞驠釅莚楌騴姲揜蔫馣曣齴牪嵃萒鈆鰋唁喭愝椻罨壛礹娮酓喦嵒癌猒揅爓婩敥椼噞顃觾沇惔閆醼虤黶扊酀閼洇懕巗嵓顔芫菴灧",
yang: "楊陽揚養央樣洋羊氧仰珜鍚眻瘍昜癢暘恙秧瀁佯炴泱殃婸漾胦煬怏瑒颺鉠蛘鞅鴦抰攁懩徉卬羕岟痒蝆柍鸉雵坱烊禓垟鐊姎紻佒崵",
yao: "要苭藥岆耀邀姚遙堯窯腰咬喲曜搖瑤妖艞葯樂謠騕鑰顤颻么珧窈燿靿宎眑僥抭肴窅夭蓔窔餚葽爻洮舀祅銚拗鷕淆訞袎杳鰩傜猺垚繇吆鷂殽嶢猇榣瀹殀軺獟崤徭柼穾烑筄嗂愮榚喓媱嫍覞趭偠溔爚約瘧",
ye: "也頁業葉夜野耶爺液嶪瞱射椰燁冶埜咽曄曳謁漜腋鐷蠂抴擛黦靨鍱鄴鎑噎擨饁拽琊邪煠擫揶譺殗蠮偞澲掖暍倻",
yi: "一以已依義亦億意益醫宜易溢藝乙議儀怡伊壹移艾尾譯異衣液膉疫疑毅逸憶役蛇翼萓椅誼奕遺矣衪揖懿嶧翊嫕釔邑俋齮苡咦蟻迤瘱倚埸夷痍裔悒姨鎰漪刈抑鷁掖肄偯扆埶薏鷖曳玴羿迆軼顗噫异頤曀翌繹劓驛胰侇瘞笫帠珆釴瓵挹晹亄咿峓謚睪蜴詣鈶恞弋腋鷊帟貽蘙靾蛦迻抴捙廙銥洢佚黓屹飴圯眱殪袘泆洟斁圪彝藙鉯箷詒艤銕熤澺猗佾蛜椸禕緆槸肊鐿弈翳扡宧臆袲黟嗌暆蓺晲檍乂熠檥簃繶螔貤嫛旖枍鳦燱毉歋鶂匜栘浥欭杝掜瑿縊繄羡醳欹焲謻沶唈跠杙呲浂嶷瀷齸仡劮懌寲柂酏陭熪螘檹鷾囈芅隿殔槷霬醷阣枻羛跇溰裛勩墿燚礒襼桋崺稦圛轙饐訑胣垼潩熼燡顊觺黳伿羠郼寱豷嶬艗鸃彞荑扅詑泄昳癔㹭㑊",
yin: "因音銀印引諲殷飲陰尹吟隱茵蔭寅淫湮癮堙垠姻婬听夤銦鏔鄞狺沂裀嚚讔洇蒑酳慇蚓廕噾黫齦殥胤憖闉苂霠蟫粌霪愔趛喑瘖氤縯馻崟蘟鈏誾韾鷣釿紖凐荶絪禋蔩檃湚歅摿朄齗靷冘烎窨駰濦螾檭猌垔圁垽吲茚",
ying: "應營英影盈迎硬穎蠅贏瑩鷹嬰映櫻鶯瑛螢瀛嬴楹熒鸚纓瀅縈梬膺鶧罌瓔甇塋藀潁朠蝧謍碤嫈滎韺郢霙煐癭矨渶鎣瀠媵攖景偀瀯攍蘡籯巆嚶賏罃甖瀴礯浧譻摬褮蠳霒廮",
yo: "唷喲喲育",
yong: "用永勇詠擁泳湧庸悀雍鷛蛹鄘傭墉壅鏞澭涌踴佣顒甬郺嫞醟銢禜邕俑踊廱灉滽蕹癰恿饔慵槦喁嫆雝臃埇嗈塎傛噰嵱鱅",
you: "有由又友優遊油猷游右悠郵尤幼佑祐誘猶疣呦幽憂訧釉酉蚰囿秞怮迶优囮宥柚鈾攸侑鴢魷苃牰峟輶逌槱蚴蒏懮嚘銪扰莠牖褎黝瀀庮楢鼬繇卣莤蝣偤岰纋貁斿羑沋泑姷蠤蕕耰狖浟麀鄾櫌聈莜蝤鮋",
yu: "與於裕魚玉育語欲宇雩餘予雨預愈漁芋域余鈺于逾瑜遇郁羽籲昱毓浴与虞譽慾娛谷邪鋊衧嶼隅御鬱俞獄煜妤喻萸癒愚燠禹盂輿渝礜豫迂噢杅鷸諭榆衙堣瑀聿愉尉寓祤覦盓隃鴥瘀圉敔貐腴饇蒮鬻棫踰蝓禦齬篽馭瘉庾褕扜彧矞籅狳畬窳穻黦螤蘛竽硢堬歈瘐峪萭悇傴拗艅淤袬輍蘌堉雓雽爩魊熨閾鳿鮽遹鸒灪禺楰嫗栯砡飫棜澞歶唹軉圩諛鸆淯蜮錥淢緎歟俁寙毹鵒玗腧蕍蕷麌舁圄嵎崳獝楀窬璵臾揄罭繘齵欥悆戫噊蓹紆鄅鄃薁螸斔鰅澦邘釪斞緰噳隩旟驈稢睮謣醧轝鱊偊箊羭燏湡吁菸/龥汩",
yuan: "元原院員遠源園圓願緣苑淵援袁爰媛怨垣蒬愿宛蝝鳶蒝眢騵芫邧蝯妧蚖鼘鶢沅猿冤圜萲瑗杬褑黿轅齫鴛棩噮笎嫄謜邍灁湲掾駌鋺櫞羱惌溒獂榞蜵螈夗猭裷鎱鵷葾榬禐嬽肙蜎媴妴裫箢嫚垸",
yue: "月約樂閱越曰岳悅躍曜玥粵嶽鉞鑰籥說礿龠鸙樾軏蚎抈刖瀹焥蘥藥戉鈅趯禴噦鸑箹泧狘爚矱",
yun: "雲運允云芸韻孕筠勻韞蘊阭抎暈韗昀熅賱耘妘伝篔熉鋆澐員鄖紜枃熨隕醞殞縜奫慍眃縕鄆蕓褞薀沄枟惲氳緷荺霣溳蝹狁畇鈗贇輑鶤緼醖藴",
za: "雜抸鉔紮砸匝咂雥磼嘁唼扎臢咋",
zai: "在再載仔災栽哉宰賳饡囝縡崽渽甾",
zan: "暫讚咱贊礸禶偺瓚簪寁攢儹趲欑昝劗鐕囋喒灒鏨拶揝糌",
zang: "葬髒臟臧贓藏駔奘牂臢",
zao: "造遭早藻躁棗燥灶糟皂譟澡噪鑿蚤繰傮慥趮蹧鰽皁鐰璪矂簉唣",
ze: "則責澤擇齰仄迮賊窄嘖笮幘蠈側萴簀昃賾咋謮蠌庂崱稄襗舴",
zei: "賊戝贼",
zen: "怎簪譖",
zeng: "增曾贈矰憎磳繒橧甑璔罾鬠驓鋥",
zha: "砟炸皻渣閘扎札柵詐眨紮乍痄喳搾榨霅吒蚻醡楂簎鍘抯蜡樝哳咋謯挓查煠譗柤苲蚱溠劄厏鮓齇猹牐軋喋拃奓",
zhai: "債齋摘宅窄寨翟祭捚擇責齊砦瘵岝柴側㩟",
zhan: "站展戰佔詹占棧斬沾暫瞻綻譫湛顫氈嶄旃譠盞鉆粘鱣輾魙譧橏蹍蘸搌樿詀颭霑呫邅覘饘琖栴虥嫸偡輚薝襢鸇皽驙醆榐驏蹔轏",
zhang: "張長章彰障漲掌帳璋騿脹樟丈杖鱆鄣仗嶂漳獐賬蟑幛傽暲慞仉扙瘴嫜遧鞝墇瞕粀",
zhao: "著找召招昭照趙朝兆罩肇炤爪晁沼釗詔瑵棹盄雿嘲曌鉊狣菬鍣抓笊櫂鵫駋旐垗箌妱啁",
zhe: "者這著折哲虴輒摺遮蜇蔗砓宅鷓懾謫螫晢磔浙轍鮿鍺赭慴褶柘謺蟄檡鸅嫬摘烢讋耴蟅瓋悊讘乇",
zhen: "鎮真振診珍震貞針賑陣眕偵臻禎甄枕圳蓁楨疹箴朕蒧瑊椹縝畛黰祳稹堻遉薽晸籈桭鍼斟眹敶娠禛榛黕袗胗媜樼轃紾寊抌獉挋砧抮酖軫笉栚絼駗侲溱鱵碪鴆紖蜄潧縥揕鬒辴瀙誫幀珎瑱",
zheng: "正鄭政證徵整症丁爭証蒸征氶睜錚鉦箏幀撜怔掙眐炡埩糽拯癥篜崢諍烝聇猙姃",
zhi: "之至址指志智製只知職值置徵致紙制質氏支治直識止植隻誌織執芝旨枝迣脂殖汁酯郅祇緻滯秪躓摯咫洷窒炙肢祗埴秩雉擲芷趾稚痔侄鴩秷狾豸庤坁鴟鷙峙躑阯痣姪晊庢樴幟鴙祉疻祑黹扺膱恉蟙忮褁藢瓡胝鋕懫紩廌擿蛭搘鳷袟蹠輊觶跖枳稙梔蟄贄栺蜘翐膣縶沚秖畤厎摭猘騭蘵帙彘軹銍桎跱卮厔挃柣胵椥榰疐慹蹢陟寘嬂螲礩騺胑淛駤懥鑕汥淽犆臸馽櫍泜觢覟衼滍遰偫吱巵櫛遲",
zhong: "中種重忠眾仲鍾鐘終腫塚伀妐彸煄衷踵盅衶螽冢忪鼨堹籦舯柊尰湩緟狆偅炂蔠",
zhou: "周週洲州軸舟粥咒皺鵃宙晝肘珘縐怞鯞帚籀侜騆銂甃啁冑駎紂婤僽繇胄妯輈徟賙盩酎睭譸淍喌噣咮洀輖謅碡驟",
zhu: "主朱註竹住豬助駐珠祝諸築柱軸注著逐煮株鑄筑疰邾茱藷銖貯燭鱁炾炷祩誅蠾竺躅囑朮侏砫蛀宁硃箸觰佇孎麈麆屬渚蠋鉒眝拄瘃矚蛛洙樦杼灟殶袾窋紸篫鮢櫡瀦馵蓫櫫妯紵茿舳莇斸苧櫧翥泞柷羜陼蝫蠩壴笁跓鴸嵀絑軴諔罜趉欘柚術褚",
zhua: "抓爪檛撾髽",
zhuai: "跩拽轉",
zhuan: "轉專賺撰磚傳囀鄟僎篆饌鱄剸縳瑑譔瑼嫥蟤篿耑顓膞鐉腞塼",
zhuang: "裝莊狀壯撞粧妝庄樁戇梉奘焋幢僮",
zhui: "追綴膇椎錐腄墜鴭惴贅騅硾鑆沝隹鵻縋餟",
zhun: "準純准屯埻宒諄肫隼迍綧窀訰稕",
zhuo: "桌卓酌捉剢啄倬拙鷟濁灼圴擢禚棹琢穛斲梲焯椓篧謶棳蠗蠿斀濯茁彴汋涿鐲斫蝃錣踔斮籗罬諑灂啅浞著繳",
zi: "資子自字仔紫茲姿滋諮秶梓孜姊恣茈吱滓菑籽眥矷笫漬鈭倳孖玆咨鯔胏鼒椔孳緇吇紎鎡貲蠀髭鄑淄輜栥髊秭剚扻訾鶅杍甾齍齊胾訿澬齜芓呰牸趑錙耔崰嵫胔釨粢齎呲",
zong: "總宗綜縱騣棕蹤蝬從蓗粽鬃傯鬷豵摠瘲倧熧稯熜猣嵕朡艐昮翪惾腙",
zou: "走陬鄒奏齱驟謅揍諏鯫棷啁緅掫棸黀郰齺鄹媰菆騶",
zu: "組族足租祖阻卒傶嗾踿哫詛俎珇蒩靻捽踤崒菹鏃",
zuan: "纂賺鑽劗躦籫攥纘揝",
zui: "最罪嘴醉蕞嶵纗絊羧嶊噿嶉墬欈檇晬厜鋷觜祽璻檌濢堆",
zun: "尊圳遵撙樽銌捘俊鱒僔鐏墫鷷嶟譐噂繜壿燇䔿",
zuo: "作做座左坐昨佐祚鑿怍椊葃阼稓柞酢夎胙繓筰葄嘬捽琢撮唑"}
}
,'activate' : function () {
 var a = VirtualKeyboard.Langs.CN.PYTradArr;
 a.chon=a.chong;
 a.con=a.cong;
 a.cua=a.cuan;
 a.den=a.deng;
 a.din=a.ding;
 a.don=a.dong;
 a.dua=a.duan;
 a.fue=a.fuen=a.fueng;
 a.gon=a.gong;
 a.hon=a.hong;
 a.jio=a.jion=a.jiong;
 a.jua=a.juan;
 a.kon=a.kong;
 a.len=a.leng;
 a.lon=a.long;
 a.lua=a.luan;
 a.lva=a.lvan;
 a.non=a.nong;
 a.nua=a.nuan;
 a.qio=a.qion=a.qiong;
 a.qua=a.quan;
 a.ron=a.rong;
 a.rua=a.ruan;
 a.sho=a.shou;
 a.son=a.song;
 a.sua=a.suan;
 a.ten=a.teng;
 a.tin=a.ting;
 a.ton=a.tong;
 a.tua=a.tuan;
 a.xio=a.xion=a.xiong;
 a.xua=a.xuan;
 a.yon=a.yong;
 a.yua=a.yuan;
 a.zhon=a.zhong;
 a.zon=a.zong;
 a.zua=a.zuan;
 VirtualKeyboard.Langs.CN.INPArr = a;
}
,'charProcessor' : VirtualKeyboard.Langs.CN.processChar//WithDict //Tone
}},
{code:'HR'
,name:'Croatian'
,normal:'¸1234567890\'+žqwertzuiopšđasdfghjklčćyxcvbnm,.-'
,shift:{0:'¨!"#$%&/()=?*',44:';:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',24:'÷×',29:'[]',33:'łŁ',36:'ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsşCÇSŞ ¸'}},
{code:'CS-CZ'
,name:'Czech Programmers'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{0:';+ěščřžýáíé=´¨',16:'€',24:'ú)',35:'ů§',44:'?:-'}
,shift_alt:{0:'°',11:'%ˇ^',24:'/(',35:'"!',44:'×÷_'}
,dk:{'´':'nńcćzźaásślĺeérŕuúiíyýoóNŃCĆZŹAÁSŚLĹEÉRŔUÚIÍYÝOÓ ´','ˇ':'nňcčzždďsšlľeěrřtťNŇCČZŽDĎSŠLĽEĚRŘTŤ ˇ','°':'aåuůAÅUŮ °','¨':'aäeëuüiïyÿoöAÄEËUÜIÏYŸOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'CS-CZ'
,name:'Czech (QWERTY)'
,normal:';+ěščřžýáíé=´¨qwertyuiopú)asdfghjklů§zxcvbnm,.-'
,shift:{0:'°1234567890%ˇ\'',24:'/(',35:'"!',44:'?:_'}
,alt:{0:'`!@#$%^&*()-=\\',16:'€',24:'[]',35:';¤',44:'<>/'}
,shift_alt:{0:'~',11:'_+|',24:'{}',35:':^',44:'×÷?'}
,dk:{'´':'nńcćzźaásślĺeérŕuúiíyýoóNŃCĆZŹAÁSŚLĹEÉRŔUÚIÍYÝOÓ ´','ˇ':'nňcčzždďsšlľeěrřtťNŇCČZŽDĎSŠLĽEĚRŘTŤ ˇ','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','°':'aåuůAÅUŮ °','¨':'aäeëuüiïyÿoöAÄEËUÜIÏYŸOÖ ¨'}},
{code:'CS-CZ'
,name:'Czech'
,normal:';+ěščřžýáíé=´¨qwertzuiopú)asdfghjklů§yxcvbnm,.-'
,shift:{0:'°1234567890%ˇ\'',24:'/(',35:'"!',44:'?:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',24:'÷×',27:'đĐ[]',33:'łŁ$ß',38:'#&@{}',44:'<>*'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','˘':'aăgğAĂGĞ ˘','°':'aåuůAÅUŮ °','˛':'aąeęuųiįAĄEĘUŲIĮ ˛','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','˙':'eėiızżEĖIİZŻ ·','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'yÿaäeëuüiïoöYŸAÄEËUÜIÏOÖ ¨','¸':'nņcçgģsşlļkķrŗtţNŅCÇGĢSŞLĻKĶRŖTŢ ¸'}},
{code:'DA-DK'
,name:'Danish'
,normal:'½1234567890+´\'qwertyuiopå¨asdfghjklæøzxcvbnm,.-'
,shift:{0:'§!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}',12:'|',16:'€',25:'~',43:'µ'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'AR-PRS'
,name:'Dari'
,normal:'`١٢٣٤٥٦٧٨٩٠-=\\قوعرتىئءغپ[]اسدفگهجکل;\'زخچژبنم,./'
,shift:{0:'"!@#$%^&*()_+|ثأة',18:'طظلالا؟؛{}آصض',31:'ح',35:':"ذش',44:'<>?'}},
{code:'HI-IN'
,name:'Devanagari - INSCRIPT'
,normal:'ॊ1234567890-ृॉौैाीूबहगदजड़ोे्िुपरकतचटॆंमनवलस,.य'
,shift:{0:'ऒऍॅ्रर्ज्ञत्रक्षश्र()ःऋऑऔऐआईऊभङघधझढञओएअइउफऱखथछठऎँणऩऴळशष।य़'}
,alt:{1:'१२३४५६७८९०',12:'ॄ',17:'ॣ',21:'ग़',23:'ज़ड़',29:'ॢ',33:'क़',35:'॒',37:'॓',39:'॔',44:'॰॥'}
,shift_alt:{12:'ॠ',17:'ॡ',24:'ढ़',29:'ऌ',31:'फ़',33:'ख़',36:'॑',38:'ॐ',45:'ऽ'}},
{code:'DIN'
,name:'Dinka'
,normal:'`1234567890-εŋqwertyuiopɔɣasdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_Ɛ',35:':"',44:'<>?'}},
{code:'DIV-MV'
,name:'Divehi Phonetic'
,normal:'`1234567890-=\\ްއެރތޔުިޮޕ][ަސދފގހޖކލ؛\'ޒ×ޗވބނމ،./'
,shift:{0:'~!@#$%^&*)(_+|ޤޢޭޜޓޠޫީޯ÷}{ާށޑﷲޣޙޛޚޅ:"ޡޘޝޥޞޏޟ><؟'}
,alt:{35:';',40:'‍‌‎‏,'}},
{code:'DIV-MV'
,name:'Divehi Typewriter'
,normal:'`1234567890-=]ޫޮާީޭގރމތހލ[ިުްަެވއނކފﷲޒޑސޔޅދބށޓޯ'
,shift:{0:'~!@#$%^&*)(_+}×’“/:ޤޜޣޠޙ÷{<>.،"ޥޢޘޚޡ؛ޖޕޏޗޟޛޝ\\ޞ؟'}
,alt:{29:',',36:';',40:'‍‌‎‏'}},
{code:'NL'
,name:'Dutch'
,normal:'@1234567890/°<qwertyuiop¨*asdfghjkl+´zxcvbnm,.-'
,shift:{0:'§!"#$%&_()\'?~>',24:'^|',35:'±`',44:';:='}
,alt:{0:'¬¹²³¼½¾£{}',11:'\\¸',16:'€¶',27:'ß',37:'«»¢',43:'µ',45:'·'}
,dk:{'~':'nñaãoõNÑAÃOÕ ~','¸':'cçCÇ ¸','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'DZ-BT'
,name:'Dzongkha'
,normal:'༉༡༢༣༤༥༦༧༨༩༠༔།ཝཀཁགངིེོུཅཆཇཉཏཐདནཔཕབམཙཚཛཞཟའཡརལཤསཧཨ'
,shift:{0:'༊༄༅༆',6:'༈༸༴༼༽ཿ༑ྭྐྑྒྔ྄ྀཻཽྕྖྗྙྟྠྡྣྤྥྦྨྩྪྫྮྯཱྱྲླྴྶྷ'}
,alt:{0:'࿑1234567890-=\\ྈྉ',17:'ྃ༚༛༜༝༞༟[]ཊཋཌཎ‹›༷ཾ༹;\'༓྾༃༏ཪྊྃཥ,./'}
,shift_alt:{0:'࿐!@#$%༁&*()_+ྺ',17:'ྂ',21:'༗༘༙༾༿ྚྛྜྞ«»༵',35:':"༶྿྅ྻྼྋྙྃྵ<>?'}
,caps:{0:'࿑1234567890-=\\ྈྉ࿇ྃ༚༛༜༝༞༟[]ཊཋཌཎ‹›༷ཾ༹;\'༓྾༃༏ཪྊཥ,./'}
,shift_caps:{0:'࿐!@#$%༁&*()_+ྺ',17:'ྂ',21:'༗༘༙༾༿ྚྛྜྞ«»༵',35:':"༶྿྅ྻྼྋྵ<>?'}},
{code:'ET-EE'
,name:'Estonian'
,normal:'ˇ1234567890+´\'qwertyuiopüõasdfghjklöäzxcvbnm,.-'
,shift:{0:'~!"#¤%&/()=?`*',44:';:_'}
,alt:{2:'@£$€',7:'{[]}\\',13:'½',16:'€',25:'§',27:'š',36:'^ž'}
,dk:{'´':'nńcćzźsśeéoóNŃCĆZŹSŚEÉOÓ ´','`':'aàeèuùoòAÀEÈUÙOÒ `','^':'aâgĝeêuûiîAÂGĜEÊUÛIÎ ^','ˇ':'cčzžsšCČZŽSŠ ˇ','~':'oõOÕ ~'}},
{code:'EM-ET'
,name:'Ethiopic  Pan-Amharic'
,normal:'`፩፪፫፬፭፮፯፰፱0-=\\ቀወeረተየuioፐ[]aሰደፈገሀጀከለ፤\'ዘሸቸቨበነመ፣./'
,shift:{0:'~!@#$%^&*()_+|ቐ',18:'ጠ',21:'ዕ',23:'ጰ{}',27:'ጸዻ',30:'ጘሐ',33:'ኸ',35:'፡"ዠ',39:'ጨ',42:'ኘ',44:'«»፧'}
,alt:{7:'፨፠',14:'ቍቝ',27:'ⶥ',30:'ጕ',33:'ኵዅ፦',37:'ⶵኍⶭⶽ',46:'፧'}
,'cbk':/**
 * $Id$
 *
 * Ethiopian Pan-Amharic layout
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
(function () {
    var vowelsEZ = {e:1,i:2,a:3,ie:4,u:5,o:6,ua:7,Y:8}
       ,EZnonfinal = {
            "'":"'", '`':'`'
           ,'፤':'፤'
           ,'፣':'፣'
           ,'፣፣':'፥'
           ,'፡':'፡'
           ,'_':'_'

           ,'ጭ':'ጭ'     // 'C':'ጭ'
           ,'`ጭ':'ⶽ'    // 'C:ⶽ
           ,'ጭጭ':'ⶽ'  // 'CC':'ⶽ'
           ,'ጭች':'ⶽ'  // 'Cc':'ⶽ'
           ,'ጭo':'ጮ'    // 'Co':'ጮ'
           ,'ጭu':'ጩ'    // 'Cu':'ጩ'

           ,'ዽ':'ዽ'     // 'D':'ዽ'
           ,'ዽo':'ዾ'    // 'Do':'ዾ'
           ,'ዽu':'ዹ'    // 'Du':'ዹ'

           ,'ጝ':'ጝ'     // 'G':'ጝ'
           ,'ጝu':'ጙ'    // 'Gu':'ጙ'

           ,'ሕ':'ሕ'     // 'J':'ሕ'
           ,'ሕu':'ሑ'    // 'Ju':'ሑ'

           ,'ኽ':'ኽ'     // 'K':'ኽ'
           ,'ኽu':'ኹ'    // 'Ku':'ኹ'
           ,'ኽይ':'ⷕ'  // 'Ky':'ⷕ'

           ,'ኝ':'ኝ'     // 'N':'ኝ'
           ,'ኝo':'ኞ'    // 'No':'ኞ'
           ,'ኝu':'ኙ'    // 'Nu':'ኙ'

           ,'ጵ':'ጵ'     // 'P':'ጵ'
           ,'ጵo':'ጶ'    // 'Po':'ጶ'
           ,'ጵu':'ጱ'    // 'Pu':'ጱ'

           ,'ቕ':'ቕ'     // 'Q':'ቕ'
           ,'ቕu':'ቑ'    // 'Qu':'ቑ'

           ,'ጽ':'ጽ'     // 'S':'ጽ'
           ,'ጽu':'ጹ'    // 'Su':'ጹ'
           ,'`ጽ':'ፅ'    // 'S:'ፅ'
           ,'ጽጽ':'ፅ'  // 'SS':'ፅ'
           ,'ጽስ':'ፅ'  // 'Ss':'ፅ'
           ,'ፅo':'ፆ'    // 'SSo':'ፆ'

           ,'ጥ':'ጥ'     // 'T':'ጥ'
           ,'ጥo':'ጦ'    // 'To':'ጦ'
           ,'ጥu':'ጡ'    // 'Tu':'ጡ'

           ,'ዥ':'ዥ'     // 'Z':'ዥ'
           ,'ዥu':'ዡ'    // 'Zu':'ዡ'
           ,'`ዥ':'ⶵ'    // 'Z:'ⶵ'
           ,'ዥዥ':'ⶵ'  // 'ZZ':'ⶵ'
           ,'ዥዝ':'ⶵ'  // 'Zz':'ⶵ'

           ,'ብ':'ብ'     // 'b':'ብ'
           ,'ብo':'ቦ'    // 'bo':'ቦ'
           ,'ብu':'ቡ'    // 'bu':'ቡ'

           ,'ች':'ች'     // 'c':'ች'
           ,'ችu':'ቹ'    // 'cu':'ቹ'
           ,'ችo':'ቾ'    // 'co':'ቾ'
           ,'ችች':'ⶭ'  // 'cc':'ⶭ'

           ,'ድ':'ድ'     // 'd':'ድ'
           ,'ድo':'ዶ'    // 'do':'ዶ'
           ,'ድu':'ዱ'    // 'du':'ዱ'

           ,'ፍ':'ፍ'     // 'f':'ፍ'
           ,'ፍu':'ፉ'    // 'fu':'ፉ'

           ,'ግ':'ግ'     // 'g':'ግ'
           ,'ግo':'ጎ'    // 'go':'ጎ'
           ,'ግu':'ጉ'    // 'gu':'ጉ'
           ,'ግይ':'ⷝ'  // 'gy':'ⷝ'

           ,'ህ':'ህ'     // 'h':'ህ'
           ,'ህo':'ሆ'    // 'ho':'ሆ'
           ,'ህu':'ሁ'    // 'hu':'ሁ'

           ,'`ህ':'ኅ'    // 'h:'ኅ'
           ,'ህህ':'ኅ'  // 'hh':'ኅ'
           ,'ኅo':'ኆ'    // 'hho':'ኆ'
           ,'ኅu':'ኁ'    // 'hhu':'ኁ'

           ,'ጅ':'ጅ'     // 'j':'ጅ'
           ,'ጅo':'ጆ'    // 'jo':'ጆ'
           ,'ጅu':'ጁ'    // 'ju':'ጁ'

           ,'ክ':'ክ'     // 'k':'ክ'
           ,'ክo':'ኮ'    // 'ko':'ኮ'
           ,'ክu':'ኩ'    // 'ku':'ኩ'
           ,'ክይ':'ⷍ'  // 'ky':'ⷍ'

           ,'ል':'ል'     // 'l':'ል'
           ,'ልo':'ሎ'    // 'lo':'ሎ'
           ,'ልu':'ሉ'    // 'lu':'ሉ'

           ,'ም':'ም'     // 'm':'ም'
           ,'ምo':'ሞ'    // 'mo':'ሞ'
           ,'ን':'ን'     // 'n':'ን'
           ,'ንo':'ኖ'    // 'no':'ኖ'
           ,'ንu':'ኑ'    // 'nu':'ኑ'

           ,'ፕ':'ፕ'     // 'p':'ፕ'
           ,'ፕo':'ፖ'    // 'po':'ፖ'
           ,'ፕu':'ፑ'    // 'pu':'ፑ'
           ,'ምu':'ሙ'    // 'mu':'ሙ'

           ,'ቅ':'ቅ'     // 'q':'ቅ'
           ,'ቅo':'ቆ'    // 'qo':'ቆ'
           ,'ቅu':'ቁ'    // 'qu':'ቁ'
           ,'ቅይ':'ⷅ'  // 'qy':'ⷅ'

           ,'ር':'ር'     // 'r':'ር'
           ,'ርo':'ሮ'    // 'ro':'ሮ'
           ,'ርu':'ሩ'    // 'ru':'ሩ'

           ,'ስ':'ስ'     // 's':'ስ'
           ,'ስo':'ሶ'    // 'so':'ሶ'
           ,'ስu':'ሱ'    // 'su':'ሱ'
           ,'`ስ':'ሥ'    // 's:'ሥ'
           ,'ስስ':'ሥ'  // 'ss':'ሥ'
           ,'ሥu':'ሡ'    // 'ssu':'ሡ'

           ,'ት':'ት'     // 't':'ት'
           ,'ትo':'ቶ'    // 'to':'ቶ'
           ,'ትu':'ቱ'    // 'tu':'ቱ'

           ,'ቭ':'ቭ'     // 'v':'ቭ'
           ,'ቭu':'ቩ'    // 'vu':'ቩ'

           ,'ው':'ው'     // 'w':'ው'
           ,'ውo':'ዎ'    // 'wo':'ዎ'

           ,'ሽ':'ሽ'     // 'x':'ሽ'
           ,'ሽo':'ሾ'    // 'xo':'ሾ'
           ,'ሽu':'ሹ'    // 'xu':'ሹ'

           ,'`ሽ':'ⶥ'    // 'x:'ⶥ'
           ,'ሽሽ':'ⶥ'  // 'xx':'ⶥ'

           ,'ይ':'ይ'     // 'y':'ይ'
           ,'ይo':'ዮ'    // 'yo':'ዮ'

           ,'ዝ':'ዝ'     // 'z':'ዝ'
           ,'ዝo':'ዞ'    // 'zo':'ዞ'
           ,'ዝu':'ዙ'    // 'zu':'ዙ'

           ,'a':'አ'       // 'a':'አ'
           ,'አa':'ዓ'    // 'aa':'ዓ'
           ,'u':'ኡ'       // 'u':'ኡ'
           ,'o':'ኦ'       // 'o':'ኦ'
           ,'i':'ኢ'       // 'i':'ኢ'
           ,'ኢi':'ዒ'    // 'ii':'ዒ'
           ,'e':'እ'       // 'e':'እ'

           ,'ጭe':'ጨ'    // 'Ce':'ጨ'
           ,'ⶽe':'ⶸ'    // 'CCe':'ⶸ'
           ,'ዽe':'ዸ'    // 'De':'ዸ'
           ,'ጝe':'ጘ'    // 'Ge':'ጘ'
           ,'ጙe':'ⶓ'    // 'Gue':'ⶓ'
           ,'ሕe':'ሐ'    // 'He':'ሐ'
           ,'ኽe':'ኸ'    // 'Ke':'ኸ'
           ,'ኹe':'ዀ'    // 'Kue':'ዀ'
           ,'ⷕe':'ⷐ'    // 'Kye':'ⷐ'
           ,'ኝe':'ኘ'    // 'Ne':'ኘ'
           ,'ጵe':'ጰ'    // 'Pe':'ጰ'
           ,'ቕe':'ቐ'    // 'Qe':'ቐ'
           ,'ቑe':'ቘ'    // 'Que':'ቘ'
           ,'ጽe':'ጸ'    // 'Se':'ጸ'
           ,'ፅe':'ፀ'    // 'SSe':'ፀ'
           ,'ጥe':'ጠ'    // 'Te':'ጠ'
           ,'ዥe':'ዠ'    // 'Ze':'ዠ'
           ,'ⶵe':'ⶰ'    // 'ZZe':'ⶰ'
           ,'ብe':'በ'    // 'be':'በ'
           ,'ቡe':'ᎄ'    // 'bue':'ᎄ'
           ,'ⶭe':'ⶨ'    // 'cce':'ⶨ'
           ,'ችe':'ቸ'    // 'ce':'ቸ'
           ,'ድe':'ደ'    // 'de':'ደ'
           ,'ፍe':'ፈ'    // 'fe':'ፈ'
           ,'ፉe':'ᎈ'    // 'fue':'ᎈ'
           ,'ግe':'ገ'    // 'ge':'ገ'
           ,'ጉe':'ጐ'    // 'gue':'ጐ'
           ,'ⷝe':'ⷘ'    // 'gye':'ⷘ'
           ,'ህe':'ሀ'    // 'he':'ሀ'
           ,'ኅe':'ኀ'    // 'hhe':'ኀ'
           ,'ኁe':'ኈ'    // 'hhue':'ኈ'
           ,'ጅe':'ጀ'    // 'je':'ጀ'
           ,'ክe':'ከ'    // 'ke':'ከ'
           ,'ኩe':'ኰ'    // 'kue':'ኰ'
           ,'ⷍe':'ⷈ'    // 'kye':'ⷈ'
           ,'ልe':'ለ'    // 'le':'ለ'
           ,'ምe':'መ'    // 'me':'መ'
           ,'ሙe':'ᎀ'    // 'mue':'ᎀ'
           ,'ንe':'ነ'    // 'ne':'ነ'
           ,'ፕe':'ፐ'    // 'pe':'ፐ'
           ,'ፑe':'ᎌ'    // 'pue':'ᎌ'
           ,'ቅe':'ቀ'    // 'qe':'ቀ'
           ,'ⷅe':'ⷀ'    // 'qye':'ⷀ'
           ,'ርe':'ረ'    // 're':'ረ'
           ,'ስe':'ሰ'    // 'se':'ሰ'
           ,'ሥe':'ሠ'    // 'sse':'ሠ'
           ,'ትe':'ተ'    // 'te':'ተ'
           ,'ቭe':'ቨ'    // 've':'ቨ'
           ,'ውe':'ወ'    // 'we':'ወ'
           ,'ሽe':'ሸ'    // 'xe':'ሸ'
           ,'ⶥe':'ⶠ'    // 'xxe':'ⶠ'
           ,'ይe':'የ'    // 'ye':'የ'
           ,'ዝe':'ዘ'    // 'ze':'ዘ'

           ,'ⶽi':'ⶺ'    // 'CCi':'ⶺ'
           ,'ጭi':'ጪ'    // 'Ci':'ጪ'
           ,'ዽi':'ዺ'    // 'Di':'ዺ'
           ,'ጝi':'ጚ'    // 'Gi':'ጚ'
           ,'ሕi':'ሒ'    // 'Ji':'ሒ'
           ,'ኽi':'ኺ'    // 'Ki':'ኺ'
           ,'ኝi':'ኚ'    // 'Ni':'ኚ'
           ,'ጵi':'ጲ'    // 'Pi':'ጲ'
           ,'ቕi':'ቒ'    // 'Qi':'ቒ'
           ,'ጽi':'ጺ'    // 'Si':'ጺ'
           ,'ፅi':'ፂ'    // 'SSi':'ፂ'
           ,'ጥi':'ጢ'    // 'Ti':'ጢ'
           ,'ዥi':'ዢ'    // 'Zi':'ዢ'
           ,'ⶵi':'ⶲ'    // 'ZZi':'ⶲ'
           ,'ብi':'ቢ'    // 'bi':'ቢ'
           ,'ችi':'ቺ'    // 'ci':'ቺ'
           ,'ⶭi':'ⶪ'    // 'cci':'ⶪ'
           ,'ድi':'ዲ'    // 'di':'ዲ'
           ,'ፍi':'ፊ'    // 'fi':'ፊ'
           ,'ግi':'ጊ'    // 'gi':'ጊ'
           ,'ህi':'ሂ'    // 'hi':'ሂ'
           ,'ኅi':'ኂ'    // 'hhi':'ኂ'
           ,'ጅi':'ጂ'    // 'ji':'ጂ'
           ,'ክi':'ኪ'    // 'ki':'ኪ'
           ,'ልi':'ሊ'    // 'li':'ሊ'
           ,'ምi':'ሚ'    // 'mi':'ሚ'
           ,'ንi':'ኒ'    // 'ni':'ኒ'
           ,'ፕi':'ፒ'    // 'pi':'ፒ'
           ,'ቅi':'ቂ'    // 'qi':'ቂ'
           ,'ርi':'ሪ'    // 'ri':'ሪ'
           ,'ስi':'ሲ'    // 'si':'ሲ'
           ,'ሥi':'ሢ'    // 'ssi':'ሢ'
           ,'ትi':'ቲ'    // 'ti':'ቲ'
           ,'ቭi':'ቪ'    // 'vi':'ቪ'
           ,'ውi':'ዊ'    // 'wi':'ዊ'
           ,'ሽi':'ሺ'    // 'xi':'ሺ'
           ,'ⶥi':'ⶢ'    // 'xxi':'ⶢ'
           ,'ይi':'ዪ'    // 'yi':'ዪ'
           ,'ዝi':'ዚ'    // 'zi':'ዚ'

           ,'ጙi':'ⶔ'    // 'Gui':'ⶔ'
           ,'ኹi':'ዂ'    // 'Kui':'ዂ'
           ,'ቑi':'ቚ'    // 'Qui':'ቚ'
           ,'ቡi':'ᎅ'    // 'bui':'ᎅ'
           ,'ፉi':'ᎉ'    // 'fui':'ᎉ'
           ,'ጉi':'ጒ'    // 'gui':'ጒ'
           ,'ሁi':'ኊ'    // 'hui':'ኊ'
           ,'ኁi':'ኊ'    // 'hhui':'ኊ'
           ,'ኩi':'ኲ'    // 'kui':'ኲ'
           ,'ሙi':'ᎁ'    // 'mui':'ᎁ'
           ,'ፑi':'ᎍ'    // 'pui':'ᎍ'
           ,'ቁi':'ቊ'    // 'qui':'ቊ'

           ,'ⷕi':'ⷒ'    // 'Kyi':'ⷒ'
           ,'ⷝi':'ⷚ'    // 'gyi':'ⷚ'
           ,'ⷍi':'ⷊ'    // 'kyi':'ⷊ'
           ,'ⷅi':'ⷂ'    // 'qyi':'ⷂ'


           ,"'1":'፩'      // "'1":'፩'
           ,"'2":'፪'      // "'2":'፪'
           ,"'3":'፫'      // "'3":'፫'
           ,"'4":'፬'      // "'4":'፬'
           ,"'5":'፭'      // "'5":'፭'
           ,"'6":'፮'      // "'6":'፮'
           ,"'7":'፯'      // "'7":'፯'
           ,"'8":'፰'      // "'8":'፰'
           ,"'9":'፱'      // "'9":'፱'
           ,'`1':'፩'      // '`1':'፩'
           ,'`2':'፪'      // '`2':'፪'
           ,'`3':'፫'      // '`3':'፫'
           ,'`4':'፬'      // '`4':'፬'
           ,'`5':'፭'      // '`5':'፭'
           ,'`6':'፮'      // '`6':'፮'
           ,'`7':'፯'      // '`7':'፯'
           ,'`8':'፰'      // '`8':'፰'
           ,'`9':'፱'      // '`9':'፱'


           ,"፩0":'፲'    // "፩0":'፲'
           ,'፲0':'፻'    // '፲0':'፻'
           ,'፻0':'፲፻'
        }
       ,EZfinal = {
            'ጪe':'ጬ'    // 'Cie':'ጬ'
           ,'ⶺe':'ⶼ'    // 'CCie':'ⶼ'
           ,'ዺe':'ዼ'    // 'Die':'ዼ'
           ,'ጚe':'ጜ'    // 'Gie':'ጜ'
           ,'ⶔe':'ⶕ'    // 'Guie':'ⶕ'
           ,'ሒe':'ሔ'    // 'Hie':'ሔ'
           ,'ኺe':'ኼ'    // 'Kie':'ኼ'
           ,'ዂe':'ዄ'    // 'Kuie':'ዄ'
           ,'ⷒe':'ⷔ'    // 'Kyie':'ⷔ'
           ,'ኚe':'ኜ'    // 'Nie':'ኜ'
           ,'ጲe':'ጴ'    // 'Pie':'ጴ'
           ,'ቒe':'ቔ'    // 'Qie':'ቔ'
           ,'ቚe':'ቜ'    // 'Quie':'ቜ'
           ,'ጺe':'ጼ'    // 'Sie':'ጼ'
           ,'ፂe':'ፄ'    // 'SSie':'ፄ'
           ,'ጢe':'ጤ'    // 'Tie':'ጤ'
           ,'ዢe':'ዤ'    // 'Zie':'ዤ'
           ,'ⶲe':'ⶴ'    // 'ZZie':'ⶴ'
           ,'ቢe':'ቤ'    // 'bie':'ቤ'
           ,'ᎅe':'ᎆ'    // 'buie':'ᎆ'
           ,'ⶪe':'ⶬ'    // 'ccie':'ⶬ'
           ,'ቺe':'ቼ'    // 'cie':'ቼ'
           ,'ዲe':'ዴ'    // 'die':'ዴ'
           ,'ፊe':'ፌ'    // 'fie':'ፌ'
           ,'ᎉe':'ᎊ'    // 'fuie':'ᎊ'
           ,'ጊe':'ጌ'    // 'gie':'ጌ'
           ,'ጒe':'ጔ'    // 'guie':'ጔ'
           ,'ⷚe':'ⷜ'    // 'gyie':'ⷜ'
           ,'ሂe':'ሄ'    // 'hie':'ሄ'
           ,'ኂe':'ኄ'    // 'hhie':'ኄ'
           ,'ኊe':'ኌ'    // 'hhuie':'ኌ'
           ,'ጂe':'ጄ'    // 'jie':'ጄ'
           ,'ኪe':'ኬ'    // 'kie':'ኬ'
           ,'ኲe':'ኴ'    // 'kuie':'ኴ'
           ,'ⷊe':'ⷌ'    // 'kyie':'ⷌ'
           ,'ሊe':'ሌ'    // 'lie':'ሌ'
           ,'ሚe':'ሜ'    // 'mie':'ሜ'
           ,'ᎁe':'ᎂ'    // 'muie':'ᎂ'
           ,'ኒe':'ኔ'    // 'nie':'ኔ'
           ,'ፒe':'ፔ'    // 'pie':'ፔ'
           ,'ᎍe':'ᎎ'    // 'puie':'ᎎ'
           ,'ቁe':'ቈ'    // 'que':'ቈ'
           ,'ቂe':'ቄ'    // 'qie':'ቄ'
           ,'ቊe':'ቌ'    // 'quie':'ቌ'
           ,'ⷂe':'ⷄ'    // 'qyie':'ⷄ'
           ,'ሪe':'ሬ'    // 'rie':'ሬ'
           ,'ሲe':'ሴ'    // 'sie':'ሴ'
           ,'ሢe':'ሤ'    // 'ssie':'ሤ'
           ,'ቲe':'ቴ'    // 'tie':'ቴ'
           ,'ቪe':'ቬ'    // 'vie':'ቬ'
           ,'ዊe':'ዌ'    // 'wie':'ዌ'
           ,'ሺe':'ሼ'    // 'xie':'ሼ'
           ,'ⶢe':'ⶤ'    // 'xxie':'ⶤ'
           ,'ዪe':'ዬ'    // 'yie':'ዬ'
           ,'ዚe':'ዜ'    // 'zie':'ዜ'

           ,'ጭE':'ጬ'    // 'Ce':'ጨ'
           ,'ⶽE':'ⶼ'    // 'CCE':'ⶼ'
           ,'ዽE':'ዼ'    // 'DE':'ዼ'
           ,'ጝE':'ጜ'    // 'GE':'ጜ'
           ,'ጙE':'ⶕ'    // 'GuE':'ⶕ'
           ,'ሕE':'ሔ'    // 'HE':'ሔ'
           ,'ኽE':'ኼ'    // 'KE':'ኼ'
           ,'ኹE':'ዄ'    // 'KuE':'ዄ'
           ,'ⷕE':'ⷔ'    // 'KyE':'ⷔ'
           ,'ኝE':'ኜ'    // 'NE':'ኜ'
           ,'ጵE':'ጴ'    // 'PE':'ጴ'
           ,'ቕE':'ቔ'    // 'QE':'ቔ'
           ,'ቑE':'ቜ'    // 'QuE':'ቜ'
           ,'ጽE':'ጼ'    // 'SE':'ጼ'
           ,'ፅE':'ፄ'    // 'SSE':'ፄ'
           ,'ጥE':'ጤ'    // 'TE':'ጤ'
           ,'ዥE':'ዤ'    // 'ZE':'ዤ'
           ,'ⶵE':'ⶴ'    // 'ZZE':'ⶴ'
           ,'ብE':'ቤ'    // 'bE':'ቤ'
           ,'ቡE':'ᎆ'    // 'buE':'ᎆ'
           ,'ⶭE':'ⶬ'    // 'ccE':'ⶬ'
           ,'ችE':'ቼ'    // 'cE':'ቼ'
           ,'ድE':'ዴ'    // 'dE':'ዴ'
           ,'ፍE':'ፌ'    // 'fE':'ፌ'
           ,'ፉE':'ᎊ'    // 'fuE':'ᎊ'
           ,'ግE':'ጌ'    // 'gE':'ጌ'
           ,'ጉE':'ጔ'    // 'guE':'ጔ'
           ,'ⷝE':'ⷜ'    // 'gyE':'ⷜ'
           ,'ህE':'ሄ'    // 'hE':'ሄ'
           ,'ኅE':'ኄ'    // 'hhE':'ኄ'
           ,'ኁE':'ኌ'    // 'hhuE':'ኌ'
           ,'ጅE':'ጄ'    // 'jE':'ጄ'
           ,'ክE':'ኬ'    // 'kE':'ኬ'
           ,'ኩE':'ኴ'    // 'kuE':'ኴ'
           ,'ⷍE':'ⷌ'    // 'kyE':'ⷌ'
           ,'ልE':'ሌ'    // 'lE':'ሌ'
           ,'ምE':'ሜ'    // 'mE':'ሜ'
           ,'ሙE':'ᎂ'    // 'muE':'ᎂ'
           ,'ንE':'ኔ'    // 'nE':'ኔ'
           ,'ፕE':'ፔ'    // 'pE':'ፔ'
           ,'ፑE':'ᎌ'    // 'puE':'ᎌ'
           ,'ቅE':'ቄ'    // 'qE':'ቄ'
           ,'ⷅE':'ⷄ'    // 'qyE':'ⷄ'
           ,'ርE':'ሬ'    // 'rE':'ሬ'
           ,'ስE':'ሴ'    // 'sE':'ሴ'
           ,'ሥE':'ሤ'    // 'ssE':'ሤ'
           ,'ትE':'ቴ'    // 'tE':'ቴ'
           ,'ቭE':'ቬ'    // 'vE':'ቬ'
           ,'ውE':'ዌ'    // 'wE':'ዌ'
           ,'ሽE':'ሼ'    // 'xE':'ሼ'
           ,'ⶥE':'ⶤ'    // 'xxE':'ⶤ'
           ,'ይE':'ዬ'    // 'yE':'ዬ'
           ,'ዝE':'ዜ'    // 'zE':'ዜ'

           ,'ጨe':'ጬ'    // 'Cee':'ጬ'
           ,'ⶸe':'ⶼ'    // 'CCee':'ⶼ'
           ,'ዸe':'ዼ'    // 'Dee':'ዼ'
           ,'ጘe':'ጜ'    // 'Gee':'ጜ'
           ,'ⶓe':'ⶕ'    // 'Guee':'ⶕ'
           ,'ሐe':'ሔ'    // 'Hee':'ሔ'
           ,'ኸe':'ኼ'    // 'Kee':'ኼ'
           ,'ዀe':'ዄ'    // 'Kuee':'ዄ'
           ,'ⷐe':'ⷔ'    // 'Kyee':'ⷔ'
           ,'ኘe':'ኜ'    // 'Nee':'ኜ'
           ,'ጰe':'ጴ'    // 'Pee':'ጴ'
           ,'ቐe':'ቔ'    // 'Qee':'ቔ'
           ,'ቘe':'ቜ'    // 'Quee':'ቜ'
           ,'ጸe':'ጼ'    // 'See':'ጼ'
           ,'ፀe':'ፄ'    // 'SSee':'ፄ'
           ,'ጠe':'ጤ'    // 'Tee':'ጤ'
           ,'ዠe':'ዤ'    // 'Zee':'ዤ'
           ,'ⶰe':'ⶴ'    // 'ZZee':'ⶴ'
           ,'በe':'ቤ'    // 'bee':'ቤ'
           ,'ᎄe':'ᎆ'    // 'buee':'ᎆ'
           ,'ⶨe':'ⶬ'    // 'ccee':'ⶬ'
           ,'ቸe':'ቼ'    // 'cee':'ቼ'
           ,'ደe':'ዴ'    // 'dee':'ዴ'
           ,'ፈe':'ፌ'    // 'fee':'ፌ'
           ,'ᎈe':'ᎊ'    // 'fuee':'ᎊ'
           ,'ገe':'ጌ'    // 'gee':'ጌ'
           ,'ጐe':'ጔ'    // 'guee':'ጔ'
           ,'ⷘe':'ⷜ'    // 'gyee':'ⷜ'
           ,'ሀe':'ሄ'    // 'hee':'ሄ'
           ,'ኀe':'ኄ'    // 'hhee':'ኄ'
           ,'ኈe':'ኌ'    // 'hhuee':'ኌ'
           ,'ጀe':'ጄ'    // 'jee':'ጄ'
           ,'ከe':'ኬ'    // 'kee':'ኬ'
           ,'ኰe':'ኴ'    // 'kuee':'ኴ'
           ,'ⷈe':'ⷌ'    // 'kyee':'ⷌ'
           ,'ለe':'ሌ'    // 'lee':'ሌ'
           ,'መe':'ሜ'    // 'mee':'ሜ'
           ,'ᎀe':'ᎂ'    // 'muee':'ᎂ'
           ,'ነe':'ኔ'    // 'nee':'ኔ'
           ,'ፐe':'ፔ'    // 'pee':'ፔ'
           ,'ᎌe':'ᎌ'    // 'puee':'ᎌ'
           ,'ቀe':'ቄ'    // 'qee':'ቄ'
           ,'ⷀe':'ⷄ'    // 'qyee':'ⷄ'
           ,'ረe':'ሬ'    // 'ree':'ሬ'
           ,'ሰe':'ሴ'    // 'see':'ሴ'
           ,'ሠe':'ሤ'    // 'ssee':'ሤ'
           ,'ተe':'ቴ'    // 'tee':'ቴ'
           ,'ቨe':'ቬ'    // 'vee':'ቬ'
           ,'ወe':'ዌ'    // 'wee':'ዌ'
           ,'ሸe':'ሼ'    // 'xee':'ሼ'
           ,'ⶠe':'ⶤ'    // 'xxee':'ⶤ'
           ,'የe':'ዬ'    // 'yee':'ዬ'
           ,'ዘe':'ዜ'    // 'zee':'ዜ'



           ,'ጭa':'ጫ'    // 'Ca':'ጫ'
           ,'ጮa':'ⶐ'    // 'Coa':'ⶐ'
           ,'ጩa':'ጯ'    // 'Cua':'ጯ'
           ,'ⶽa':'ⶻ'    // 'CCa':'ⶻ'
           ,'ⶽo':'ⶾ'    // 'CCo':'ⶾ'
           ,'ⶽu':'ⶹ'    // 'CCu':'ⶹ'

           ,'ዽa':'ዻ'    // 'Da':'ዻ'
           ,'ዾa':'ⶍ'    // 'Doa':'ⶍ'
           ,'ዹa':'ዿ'    // 'Dua':'ዿ'

           ,'ጝa':'ጛ'    // 'Ga':'ጛ'
           ,'ጝo':'ጞ'    // 'Go':'ጞ'
           ,'ጙa':'ጟ'    // 'Gua':'ጟ'
           ,'ጙu':'ⶖ'    // 'Guu':'ⶖ'

           ,'ሕa':'ሓ'    // 'Ha':'ሓ'
           ,'ሕo':'ሖ'    // 'Ho':'ሖ'
           ,'ሑa':'ሗ'    // 'Hua':'ሗ'

           ,'ኽa':'ኻ'    // 'Ka':'ኻ'
           ,'ኽo':'ኾ'    // 'Ko':'ኾ'

           ,'ⷕa':'ⷓ'    // 'Kya':'ⷓ'
           ,'ኹu':'ዅ'    // 'Kuu':'ዅ'
           ,'ኹa':'ዃ'    // 'Kua':'ዃ'
           ,'ⷕo':'ⷖ'    // 'Kyo':'ⷖ'
           ,'ⷕu':'ⷑ'    // 'Kyu':'ⷑ'

           ,'ኝa':'ኛ'    // 'Na':'ኛ'
           ,'ኞa':'ⶉ'    // 'Noa':'ⶉ'
           ,'ኙa':'ኟ'    // 'Nua':'ኟ'

           ,'ጵa':'ጳ'    // 'Pa':'ጳ'
           ,'ጶa':'ⶑ'    // 'Poa':'ⶑ'
           ,'ጱa':'ጷ'    // 'Pua':'ጷ'

           ,'ቕa':'ቓ'    // 'Qa':'ቓ'
           ,'ቕo':'ቖ'    // 'Qo':'ቖ'
           ,'ቑa':'ቛ'    // 'Qua':'ቛ'
           ,'ቑu':'ቝ'    // 'Quu':'ቝ'

           ,'ጽa':'ጻ'    // 'Sa':'ጻ'
           ,'ጽo':'ጾ'    // 'So':'ጾ'
           ,'ጹa':'ጿ'    // 'Sua':'ጿ'

           ,'ፅa':'ፃ'    // 'SSa':'ፃ'
           ,'ፆa':'ፇ'    // 'SSoa':'ፇ'
           ,'ፅu':'ፁ'    // 'SSu':'ፁ'

           ,'ጥa':'ጣ'    // 'Ta':'ጣ'
           ,'ጦa':'ⶏ'    // 'Toa':'ⶏ'
           ,'ጡa':'ጧ'    // 'Tua':'ጧ'

           ,'ዥa':'ዣ'    // 'Za':'ዣ'
           ,'ዥo':'ዦ'    // 'Zo':'ዦ'
           ,'ዡa':'ዧ'    // 'Zua':'ዧ'

           ,'ⶵa':'ⶳ'    // 'ZZa':'ⶳ'
           ,'ⶵo':'ⶶ'    // 'ZZo':'ⶶ'
           ,'ⶵu':'ⶱ'    // 'ZZu':'ⶱ'

           ,'ብa':'ባ'    // 'ba':'ባ'
           ,'ቦa':'ⶅ'    // 'boa':'ⶅ'
           ,'ቡa':'ቧ'    // 'bua':'ቧ'
           ,'ቡu':'ᎇ'    // 'buu':'ᎇ'

           ,'ⶭa':'ⶫ'    // 'cca':'ⶫ'
           ,'ⶭo':'ⶮ'    // 'cco':'ⶮ'
           ,'ⶭu':'ⶩ'    // 'ccu':'ⶩ'

           ,'ችa':'ቻ'    // 'ca':'ቻ'
           ,'ቹa':'ቿ'    // 'cua':'ቿ'
           ,'ቾa':'ⶇ'    // 'coa':'ⶇ'

           ,'ድa':'ዳ'    // 'da':'ዳ'
           ,'ዶa':'ⶌ'    // 'doa':'ⶌ'
           ,'ዱa':'ዷ'    // 'dua':'ዷ'

           ,'ፍa':'ፋ'    // 'fa':'ፋ'
           ,'ፍo':'ፎ'    // 'fo':'ፎ'
           ,'ፉa':'ፏ'    // 'fua':'ፏ'
           ,'ፉu':'ᎋ'    // 'fuu':'ᎋ'

           ,'ግa':'ጋ'    // 'ga':'ጋ'
           ,'ጎa':'ጏ'    // 'goa':'ጏ'
           ,'ጉa':'ጓ'    // 'gua':'ጓ'
           ,'ጉu':'ጕ'    // 'guu':'ጕ'

           ,'ⷝa':'ⷛ'    // 'gya':'ⷛ'
           ,'ⷝo':'ⷞ'    // 'gyo':'ⷞ'
           ,'ⷝu':'ⷙ'    // 'gyu':'ⷙ'

           ,'ህa':'ሃ'    // 'ha':'ሃ'
           ,'ሆa':'ሇ'    // 'hoa':'ሇ'
           ,'ሁa':'ኋ'    // 'hua':'ኋ'
           ,'ሁe':'ኈ'    // 'hue':'ኈ'
           ,'ሁu':'ኍ'    // 'huu':'ኍ'

           ,'ኅa':'ኃ'    // 'hha':'ኃ'
           ,'ኆa':'ኇ'    // 'hhoa':'ኇ'
           ,'ኁa':'ኋ'    // 'hhua':'ኋ'
           ,'ኁu':'ኍ'    // 'hhuu':'ኍ'

           ,'ጅa':'ጃ'    // 'ja':'ጃ'
           ,'ጆa':'ⶎ'    // 'joa':'ⶎ'
           ,'ጁa':'ጇ'    // 'jua':'ጇ'

           ,'ክa':'ካ'    // 'ka':'ካ'
           ,'ኮa':'ኯ'    // 'koa':'ኯ'
           ,'ኩa':'ኳ'    // 'kua':'ኳ'
           ,'ኩu':'ኵ'    // 'kuu':'ኵ'

           ,'ⷍa':'ⷋ'    // 'kya':'ⷋ'
           ,'ⷍo':'ⷎ'    // 'kyo':'ⷎ'
           ,'ⷍu':'ⷉ'    // 'kyu':'ⷉ'

           ,'ልa':'ላ'    // 'la':'ላ'
           ,'ሎa':'ⶀ'    // 'loa':'ⶀ'
           ,'ሉa':'ሏ'    // 'lua':'ሏ'

           ,'ምa':'ማ'    // 'ma':'ማ'
           ,'ሞa':'ⶁ'    // 'moa':'ⶁ'
           ,'ሙa':'ሟ'    // 'mua':'ሟ'
           ,'ሙu':'ᎃ'    // 'muu':'ᎃ'

           ,'ንa':'ና'    // 'na':'ና'
           ,'ኖa':'ⶈ'    // 'noa':'ⶈ'
           ,'ኑa':'ኗ'    // 'nua':'ኗ'

           ,'ፕa':'ፓ'    // 'pa':'ፓ'
           ,'ፖa':'ⶒ'    // 'poa':'ⶒ'
           ,'ፑa':'ፗ'    // 'pua':'ፗ'
           ,'ፑu':'ᎏ'    // 'puu':'ᎏ'

           ,'ቅa':'ቃ'    // 'qa':'ቃ'
           ,'ቆa':'ቇ'    // 'qoa':'ቇ'
           ,'ቁa':'ቋ'    // 'qua':'ቋ'
           ,'ቁu':'ቍ'    // 'quu':'ቍ'

           ,'ⷅa':'ⷃ'    // 'qya':'ⷃ'
           ,'ⷅo':'ⷆ'    // 'qyo':'ⷆ'
           ,'ⷅu':'ⷁ'    // 'qyu':'ⷁ'

           ,'ርa':'ራ'    // 'ra':'ራ'
           ,'ሮa':'ⶂ'    // 'roa':'ⶂ'
           ,'ሩa':'ሯ'    // 'rua':'ሯ'

           ,'ስa':'ሳ'    // 'sa':'ሳ'
           ,'ሶa':'ⶃ'    // 'soa':'ⶃ'
           ,'ሱa':'ሷ'    // 'sua':'ሷ'

           ,'ሥa':'ሣ'    // 'ssa':'ሣ'
           ,'ሥo':'ሦ'    // 'sso':'ሦ'
           ,'ሡa':'ሧ'    // 'ssua':'ሧ'

           ,'ትa':'ታ'    // 'ta':'ታ'
           ,'ቶa':'ⶆ'    // 'toa':'ⶆ'
           ,'ቱa':'ቷ'    // 'tua':'ቷ'

           ,'ቭa':'ቫ'    // 'va':'ቫ'
           ,'ቭo':'ቮ'    // 'vo':'ቮ'
           ,'ቩa':'ቯ'    // 'vua':'ቯ'

           ,'ውa':'ዋ'    // 'wa':'ዋ'
           ,'ዎa':'ዏ'    // 'woa':'ዏ'
           ,'ውu':'ዉ'    // 'wu':'ዉ'

           ,'ሽa':'ሻ'    // 'xa':'ሻ'
           ,'ሾa':'ⶄ'    // 'xoa':'ⶄ'
           ,'ሹa':'ሿ'    // 'xua':'ሿ'


           ,'ⶥa':'ⶣ'    // 'xxa':'ⶣ'
           ,'ⶥo':'ⶦ'    // 'xxo':'ⶦ'
           ,'ⶥu':'ⶡ'    // 'xxu':'ⶡ'

           ,'ይa':'ያ'    // 'ya':'ያ'
           ,'ዮa':'ዯ'    // 'yoa':'ዯ'
           ,'ይu':'ዩ'    // 'yu':'ዩ'

           ,'ዝa':'ዛ'    // 'za':'ዛ'
           ,'ዞa':'ⶋ'    // 'zoa':'ⶋ'
           ,'ዙa':'ዟ'    // 'zua':'ዟ'

           ,'እa':'ኣ'    // 'ea':'ኣ'
           ,'ኢe':'ኤ'    // 'ie':'ኤ'
           ,'አe':'ኧ'    // 'ae':'ኧ'
           ,'ዓa':'ዐ'    // 'aaa':'ዐ'
           ,'`e':'ዐ'      //
           ,'ኡu':'ዑ'    // 'uu':'ዑ'
           ,'`u':'ዑ'      //
           ,'`i':'ዒ'      //
           ,'`a':'ዓ'      //
           ,'ዒe':'ዔ'    // 'iie':'ዔ'
           ,'`E':'ዔ'      //
           ,'እe':'ዕ'    // 'ee':'ዕ'
           ,'`ዕ':'ዕ'    //
           ,'ኦo':'ዖ'    // 'oo':'ዖ'
           ,'`o':'ዖ'      //
           ,'ኦa':'ⶊ'    // 'oa':'ⶊ'


           ,'፲፻0':'፼' // '፲፻0':'፼'
           ,"''":"'"        // "''":"'"
           ,'፤፤':';'    // '፤፤':';'
           ,'፥፣':','    // '፥፣':'

           ,'፡፡':'።'  // '፡፡':'።'
           ,'፡-':'፦'    // '፡-':'፦'
           ,'፡+':'፠'    // '፡+':'፠'
           ,'፡#':'፨'    // '፡#':'፨'

           ,'_1':'᎐'      // '_1':'᎐'
           ,'_2':'᎑'      // '_2':'᎑'
           ,'_3':'᎒'      // '_3':'᎒'
           ,'_4':'᎓'      // '_4':'᎓'
           ,'_5':'᎔'      // '_5':'᎔'
           ,'_6':'᎕'      // '_6':'᎕'
           ,'_7':'᎖'      // '_7':'᎖'
           ,'_8':'᎘'      // '_8':'᎘'
           ,'_0':'᎙'      // '_0':'᎙'
           ,'__':'_'        // '__':'_'

           ,'፪0':'፳'    // '፪0':'፳'
           ,'፫0':'፴'    // '፫0':'፴'
           ,'፬0':'፵'    // '፬0':'፵'
           ,'፭0':'፶'    // '፭0':'፶'
           ,'፮0':'፷'    // '፮0':'፷'
           ,'፯0':'፸'    // '፯0':'፸'
           ,'፰0':'፹'    // '፰0':'፹'
           ,'፱0':'፺'
        };

    return function (chr, buf) {
        var str = buf+chr
           ,len = 1;
        if (chr=='\u0008') { // backspace
            if (buf.length) {
                for (var key in EZnonfinal) {
                    if (EZnonfinal[key] == buf) {
                        return (key==buf || /^[A-z]/.test(key) ? ['',0]
                                                               : [key.charAt(0),1]);
                    }
                }
                str = '';
                len = 0;
            }
        } else if (buf && chr=="'" && buf!="'") {
            if (/[፻፩፪፫፬፭፮፯፰፱፼፲፳፴፵፶፷፸፹፺]/.test(buf)) {
                str = buf+chr;
            } else {
                str = buf;
                len = 0;
            }
        } else {
            chr = VirtualKeyboard.Langs.ET.conv[chr]||chr;
            if (str = EZnonfinal[buf+chr]) {
                len = str.length;
            } else if (str = EZfinal[buf+chr]) {
                len = 0;
            } else if (str = EZnonfinal[chr]) {
                str = buf + str;
            } else {
                str = buf + chr;
                len = 0;
            }
       }
       return [str, len];
    }
})()},
{code:'AM-ET'
,name:'Ethiopic WashRa'
,normal:'`1234567890-=\\ቀወeረተኀሸየዐፐ«»አሰደፈገሀጀከለ፤፣ዘጠቸጸበነመ,።/'
,shift:{0:'~!@#$%^&*()_+|ቐ',19:'YUIOጰ{}Aሠዻ',30:'ጘሐ',33:'ኸ',35:'፦፥ዠ',39:'ጨፀቨኘ',44:'፠፨፧'}
,'cbk':/**
 * $Id$
 *
 * Ethiopian WashRa layout
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
function (chr, buf) {
    var vow
       ,str = ''
       ,len = 0
       ,convWashRa = {A:'እ',U:'ሽ',O:'ዕ',I:'ይ',Y:'ኅ'}
       ,vowelsWashRa = {e:0, ',':1,'ይ':2,'እ':3,'ኅ':4,'ሽ':5,'ዕ':6,'/':7,'1':9,'3':10,'4':11,'5':12,'6':13};

    if (chr=='\u0008') { // backspace
        if (buf.length) {
            str = buf.slice(0,-1);
            len = buf.length-1;
        }
    } else {
        chr = VirtualKeyboard.Langs.ET.conv[chr] || convWashRa[chr] || chr;
        if (chr==' ') {
            str = '፡';
        } else {
            if (buf=='`') {
                if (/[0-9]/.test(chr))
                    str = '፻፩፪፫፬፭፮፯፰፱'.charAt(chr);
                else if('`'==chr)
                    str = chr;
                else
                    str = buf+chr;
            } else if (buf=='~') {
                if (/[0-9]/.test(chr))
                    str = '፼፲፳፴፵፶፷፸፹፺'.charAt(chr);
                else if('~'==chr)
                    str = chr;
                else 
                    sre = buf+chr;
            } else {
                vow = vowelsWashRa[chr] || vowelsWashRa[chr.toLowerCase()];
                if (isNumber(vow) && buf) {
                    str = VirtualKeyboard.Langs.ET.cons[buf].charAt(vow);
                    if (!str || str==' ') {
                        str = buf;
                        len = buf.length;
                    }
                } else {
                    str = buf+chr;
                    if ('`' == str || '~' == str)
                        len = 1;
                    else
                        len = VirtualKeyboard.Langs.ET.cons[chr]?1:0;
                }
            }
        }
    }
    return [str, len];
}},
{code:'AM-ET'
,name:'Ethiopic XTT'
,normal:'`፩፪፫፬፭፮፯፰፱0-=\\ቀወeረተየuioፐጸፀaሰደፈገሀጀከለ፤አዘኀቸቨበነመ፣።/'
,shift:{0:'~፲፳፴፵፶፷፸፹፺)_+|ቐW',18:'ጠY',23:'ጰ{}',27:'ሸዻ',30:'ጘሐ',33:'ኸ',35:'፥ዐዠሠጨ',42:'ኘ',44:'«»?'}
,alt:{7:'፨፠',14:'ቈቘ',27:'ⶠ',30:'ጐ',33:'ኰዀ፦',37:'ⶰኈⶨⶸ',46:'፧'}
,'cbk':/**
 * $Id$
 *
 * Ethiopian Xenotype XXT layout
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
function (chr, buf) {
    var vow
       ,str = ''
       ,len = 0
       ,vowelsXXT = {a:1,i:2,A:3,e:4,u:5,o:6,W:7,Y:8};

    if (chr=='\u0008') { // backspace
        if (buf.length) {
            str = buf.slice(0,-1);
            len = buf.length-1;
        }
    } else {
        chr = VirtualKeyboard.Langs.ET.conv[chr]||chr;
        if (chr==' ') {
            str = '፡';
        } else {
            vow = vowelsXXT[chr] || vowelsXXT[chr.toLowerCase()];
            if(isNumber(vow)){
                 if (buf) {
                     str = VirtualKeyboard.Langs.ET.cons[buf].charAt(vow);
                     if (!str || str==' ') {
                         str = buf;
                         len = buf.length;
                     }
                 } else {
                     str = VirtualKeyboard.Langs.ET.cons['እ'].charAt(vow) || buf+chr;
                 }
             } else {
                 str = buf+chr;
                 len = VirtualKeyboard.Langs.ET.cons[chr]?1:0;
             }
        }
    }
    return [str, len];
}},
{code:'FO'
,name:'Faeroese'
,normal:'½1234567890+´\'qwertyuiopåðasdfghjklæøzxcvbnm,.-'
,shift:{0:'§!"#¤%&/()=?`*',44:';:_'}
,alt:{2:'@£$€',7:'{[]}',12:'|',16:'€',24:'¨~',36:'^',43:'µ'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','~':'nñaãoõNÑAÃOÕ ~','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'FA-IR'
,name:'Farsi'
,normal:'÷1234567890-=پضصثقفغعهخحجچشسیبلاتنمکگظطزرذدئو./'
,shift:{0:'×!@#$%^&*)(_+|ًٌٍريال،؛,][\\}{َُِّۀآـ«»:"ةيژؤإأء<>؟'}},
{code:'SE'
,name:'Finnish with Sami'
,normal:'§1234567890+´\'qwertyuiopå¨asdfghjklöäzxcvbnm,.-'
,shift:{0:'½!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}\\',14:'â',16:'€',18:'ŧ',21:'ïõ',25:'~ášđǥǧȟ',33:'ǩ',35:'øæž',39:'čǯʒŋµ'}
,dk:{'´':'nńcćzźaásślĺwẃeérŕåǻuúiíyýoóNŃCĆZŹAÁSŚLĹWẂEÉRŔÅǺUÚIÍYÝOÓøǿæǽØǾÆǼ ´','`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','¨':'aäwẅeëuüiïyÿoöAÄWẄEËUÜIÏYŸOÖ ¨','^':'cĉaâhĥjĵgĝsŝwŵeêuûiîyŷoôCĈAÂHĤJĴGĜSŜWŴEÊUÛIÎYŶOÔ ^','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~'}},
{code:'FI'
,name:'Finnish'
,normal:'§1234567890+´\'qwertyuiopå¨asdfghjklöäzxcvbnm,.-'
,shift:{0:'½!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}\\',16:'€',25:'~',43:'µ'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'FR'
,name:'French'
,normal:'²&é"\'(-è_çà)=*azertyuiop^$qsdfghjklmùwxcvbn,;:!'
,shift:{1:'1234567890°+µ',24:'¨£',36:'%',43:'?./§'}
,alt:{2:'~#{[|`\\^@]}',16:'€',25:'¤'}
,dk:{'~':'nñoõaãNÑOÕAÃ ~','`':'eèuùiìoòaàEÈUÙIÌOÒAÀ `','^':'eêuûiîoôaâEÊUÛIÎOÔAÂ ^','¨':'eëuüiïyÿoöaäEËUÜIÏOÖAÄ ¨'}},
{code:'EN-IE'
,name:'Gaelic'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{1:'!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦',4:'€',16:'é',19:'ýúíó',26:'á'}
,shift_alt:{0:'¬'}
,dk:{'\'':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ \'','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'KA-GE'
,name:'Georgian'
,normal:'„!?№§%:.;,/–=(ღჯუკენგშწზხცფძვთაპროლდჟჭჩყსმიტქბჰ'
,shift:{0:'“1234567890-+)'}
,alt:{18:'ჱ',24:'ჴ',26:'ჶ',28:'ჳ',42:'ჲ',46:'ჵ'}},
{code:'DE'
,name:'German (IBM)'
,normal:'^1234567890ß´#qwertzuiopü+asdfghjklöäyxcvbnm,.-'
,shift:{0:'°!"§$%&/()=?`\'',25:'*',44:';:_'}
,alt:{2:'²³',7:'{[]}\\',14:'@',16:'€',25:'~',43:'µ'}
,dk:{'´':'yýaáeéuúiíoóYÝAÁEÉUÚIÍOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'DE'
,name:'German'
,normal:'^1234567890ß´#qwertzuiopü+asdfghjklöäyxcvbnm,.-'
,shift:{0:'°!"§$%&/()=?`\'',25:'*',44:';:_'}
,alt:{2:'²³',7:'{[]}\\',14:'@',16:'€',25:'~',43:'µ'}
,dk:{'´':'yýaáeéuúiíoóYÝAÁEÉUÚIÍOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'EL-GR'
,name:'Greek (220) Latin'
,normal:'\\1234567890\']#qwertyuiop+}asdfghjkl΄¨zxcvbnm,.-'
,shift:{0:'|!"#$%&/()=?[@',24:'*{',35:'¨΅',44:';:_'}
,alt:{2:'²³£§¶',8:'¤¦°±½¬',16:'€',24:'«»',35:'΅΅'}
,dk:{'΄':' ΄','¨':' ¨','΅':' ΅'}},
{code:'EL-GR'
,name:'Greek (220)'
,normal:'½1234567890\']#;ςερτυθιοπ+}ασδφγηξκλ΄¨ζχψωβνμ,.-'
,shift:{0:'±!"£$%&/()=?[@:~',24:'*{',35:'¨΅',44:';:_'}
,alt:{2:'²³£§¶',8:'¤¦°±½¬',16:'€®',19:'¥',24:'«»',35:'΅΅',39:'©'}
,dk:{'΄':'ωώαάηήεέιίυύοόΩΏΑΆΗΉΕΈΙΊΥΎΟΌ ΄','¨':'ιϊυϋΙΪΥΫ ¨','΅':'ιΐυΰ ΅'}},
{code:'EL-GR'
,name:'Greek (319) Latin'
,normal:'\\1234567890\'+`qwertyuiop[]asdfghjkl´^zxcvbnm,.-'
,shift:{0:'|!"#$%&/()=?*@',24:'{}',35:'¨~',44:';:_'}
,alt:{16:'€'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'EL-GR'
,name:'Greek (319)'
,normal:'½1234567890\'+²·ςερτυθιοπ[]ασδφγηξκλ΄’ζχψωβνμ,.-'
,shift:{0:'±!"£$%¬/()=°*³―¦',24:'«»',35:'¨‘',44:';:_'}
,alt:{16:'€',35:'΅'}
,dk:{'΄':'ωώαάηήεέιίυύοόΩΏΑΆΗΉΕΈΙΊΥΎΟΌ ΄','¨':'ιϊυϋΙΪΥΫ ¨','΅':'ιΐυΰ ΅'}},
{code:'EL-GR'
,name:'Greek Latin'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{1:'¡²³¤€¼½¾‘’¥×¬äåé®þüúíóö«»áßð',34:'ø¶´æ',39:'©',42:'ñµç',46:'¿'}
,shift_alt:{1:'¹',4:'£',12:'÷¦',27:'§',35:'°¨',39:'¢'}
,dk:{'^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','´':'cçaáeéuúiíyýoóCÇAÁEÉUÚIÍYÝOÓ ´','¨':'aäeëuüiïyÿoöAÄEËUÜIÏYOÖ ¨','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'EL-GR'
,name:'Greek Polytonic'
,normal:'~1234567890-=\\;ςερτυθιοπ[]ασδφγηξκλ΄\'ζχψωβνμ,./'
,shift:{0:'`!@#$%^&*()_+|:΅',24:'{}',35:'¨"',44:'<>?'}
,alt:{0:'῁ϚϞϠ£§¶',8:'¤¦°±½¬´',16:'€®',19:'¥',24:'«»',35:'΅᾿',39:'©',46:'ι'}
,shift_alt:{2:'²³',12:'῟῝',25:'·',36:'῾',46:'῞'}
,dk:{'-':'.¯αᾱιῑυῡΑᾹΙῙΥῩ -','_':'.˘αᾰιῐυῠΑᾸΙῘΥῨ _','=':'ωὦ.῏αἆηἦιἶυὖΩὮΑἎΗἮΙἾ =','+':'ωὧ.῟αἇηἧιἷυὗΩὯΑἏΗἯΙἿΥὟ +','½':'ωᾦαᾆηᾖΩᾮΑᾎΗᾞ ½','῟':'ωᾧαᾇηᾗΩᾯΑᾏΗᾟ',';':'ωώ.´αάηήεέιίυύοόΩΏΑΆΗΉΕΈΙΊΥΎΟΌ ;',':':'.¨ιϊυϋΙΪΥΫ :','´':'ωῴαᾴηῄ','΅':'.΅ιΐυΰ ΅','[':'ωῶ.῀αᾶηῆιῖυῦ [','{':'ωῳ.ιαᾳηῃΩῼΑᾼΗῌ {','«':'ωῷαᾷηῇ «',']':'ωὼ.`αὰηὴεὲιὶυὺοὸΩῺΑᾺΗῊΕῈΙῚΥῪΟῸ ]','}':'.· }','»':'ωῲαᾲηῂ »','΄':'ωώ.΄αάηήεέιίυύοόΩΏΑΆΗΉΕΈΙΊΥΎΟΌ ΄','¨':'.¨ιϊυϋΙΪΥΫ ¨','\'':'ωὠ.᾿αἀηἠεἐρῤιἰυὐοὀΩὨΑἈΗἨΕἘΙἸΟὈ \'','\"':'ωὡ.῾αἁηἡεἑρῥιἱυὑοὁΩὩΑἉΗἩΕἙΡῬΙἹΥὙΟὉ "','᾿':'ωᾠαᾀηᾐΩᾨΑᾈΗᾘ','῾':'ωᾡαᾁηᾑΩᾩΑᾉΗᾙ','~':'.΅ιΐυΰ ~','`':'.῭ιῒυῢ `','῁':'.῁ιῗυῧ ῁','\\':'ωὢ.῍αἂηἢεἒιἲυὒοὂΩὪΑἊΗἪΕἚΙἺΟὊ \\','|':'ωὣ.῝αἃηἣεἓιἳυὓοὃΩὫΑἋΗἫΕἛΙἻΥὛΟὋ |','¬':'ωᾢαᾂηᾒΩᾪΑᾊΗᾚ ¬','῝':'ωᾣαᾃηᾓΩᾫΑᾋΗᾛ','/':'ωὤ.῎αἄηἤεἔιἴυὔοὄΩὬΑἌΗἬΕἜΙἼΟὌ /','?':'ωὥ.῞αἅηἥεἕιἵυὕοὅΩὭΑἍΗἭΕἝΙἽΥὝΟὍ ?','ι':'ωᾤαᾄηᾔΩᾬΑᾌΗᾜ','῞':'ωᾥαᾅηᾕΩᾭΑᾍΗᾝ'}},
{code:'EL-GR'
,name:'Greek'
,normal:'`1234567890-=\\;ςερτυθιοπ[]ασδφγηξκλ΄\'ζχψωβνμ,./'
,shift:{0:'~!@#$%^&*()_+|:΅',24:'{}',35:'¨"',44:'<>?'}
,alt:{2:'²³£§¶',8:'¤¦°±½¬',16:'€®',19:'¥',24:'«»',35:'΅',39:'©'}
,dk:{'΅':'ιΐυΰ ΅','΄':'ωώαάηήεέιίυύοόΩΏΑΆΗΉΕΈΙΊΥΎΟΌ ΄','¨':'ιϊυϋΙΪΥΫ ¨'}},
{code:'GU-IN'
,name:'Gujarati'
,normal:'1234567890-ૃૉૌૈાીૂબહગદજડ઼ોે્િુપરકતચટંમનવલસ,.ય'
,shift:{1:'ઍૅ્રર્જ્ઞત્રક્ષશ્ર()ઃઋઑઔઐઆઈઊભઙઘધઝઢઞઓએઅઇઉફ',33:'ખથછઠ',38:'ઁણ',42:'ળશષ।'}
,alt:{1:'૧૨૩૪૫૬૭૮૯૦',12:'ૄ',45:'॥'}
,shift_alt:{12:'ૠ',38:'ૐ',45:'ઽ'}},
{code:'HE-IL'
,name:'Hebrew'
,normal:';1234567890-=\\/\'קראטוןםפ][שדגכעיחלךף,זסבהנמצתץ.'
,shift:{0:'~!@#$%^&*)(_+|QWERTYUIOP}{ASDFGHJKL:"ZXCVBNM><?'}
,alt:{4:'₪',11:'ֿ',16:'€',20:'װ',31:'ײױ'}
,caps:{35:';\'',44:',./'}
,shift_caps:{0:'ְֱֲֳִֵֶַָֹֻּׁׂ',24:'[]',35:'ף',44:'תץ'}},
{code:'HI-IN'
,name:'Hindi (Inscript)'
,normal:'`1234567890-ृ\\ौैाीूबहगदजड़ोे्िुपरकतचटॉंमनवलस,.य'
,shift:{0:'~ऍॅ्रजतकश()रऋ|औऐआईऊभङघधझढञओएअइउफऱखथछठ',38:'ँणVBळशष।य़'}},
{code:'HI-IN'
,name:'Hindi Traditional'
,normal:'1234567890-ृॉौैाीूबहगदजड़ोे्िुपरकतचटंमनवलस,.य'
,shift:{1:'ऍॅ्रर्ज्ञत्रक्षश्र()ःऋऑऔऐआईऊभङघधझढञओएअइउफऱखथछठ',38:'ँण',42:'ळशष।य़'}
,alt:{0:'`१२३४५६७८९०',12:'=\\',24:'[]',35:';\'',46:'/'}
,shift_alt:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',38:'ॐ',44:'<>?'}},
{code:'HU'
,name:'Hungarian 101-key'
,normal:'í123456789öüóűqwertyuiopőúasdfghjkléázxcvbnm,.-'
,shift:{1:'\'"+!%/=()',44:'?:_'}
,alt:{0:'0~ˇ^˘°˛`˙´˝',13:'\\\\|Ä§¤',20:'€Í',24:'÷×äđĐ[]',32:'íłŁ$ß>#&@{}<;>*'}},
{code:'HU'
,name:'Hungarian'
,normal:'0123456789öüóűqwertzuiopőúasdfghjkléáyxcvbnm,.-'
,shift:{0:'§\'"+!%/=()',44:'?:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|Ä',20:'€Í',24:'÷×äđĐ[]',32:'íłŁ$ß>#&@{}<;>*'}
,dk:{'ˇ':'nňcčdďsšeěrřtťzžNŇCČDĎSŠEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsştţCÇSŞTŢ ¸'}},
{code:'IS'
,name:'Icelandic'
,normal:'°1234567890ö-+qwertyuiopð\'asdfghjklæ´zxcvbnm,.þ'
,shift:{0:'¨!"#$%&/()=',12:'_*',25:'?',36:'\'',44:';:'}
,alt:{5:'€',7:'{[]}\\',13:'`@',16:'€',25:'~',36:'^',43:'µ'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','°':'aåAÅ °','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'IU-IKU'
,name:'Inuktitut Phonetic'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjklł\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',31:'ᕼ',35:':"',41:'ᖯ',44:'<>?'}
,'cbk':VirtualKeyboard.Langs.IKU.charProcessor},
{code:'IU-IKU'
,name:'Inuktitut Syllabic'
,normal:'`1234567890-=\\ᖃᐁᕋᑕᐂᐅᐃᐸ[]ᐊᓴᖕᒐᕼᔭᑲᓚᐧ\'ᖤᕙᖯᓇᒪ,.ᖤ'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,'cbk':VirtualKeyboard.Langs.IKU.charProcessor},
{code:'EN-IE'
,name:'Irish'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'¬!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦',4:'€',16:'é',20:'úíó',26:'á',36:'´'}
,shift_alt:{36:'`'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'IT'
,name:'Italian (142)'
,normal:'\\1234567890\'ìùqwertyuiopè+asdfghjklòàzxcvbnm,.-'
,shift:{0:'|!"£$%&/()=?^§',24:'é*',35:'ç°',44:';:_'}
,alt:{3:'#',5:'€',7:'{[]}',13:'`@',16:'€',25:'~'}},
{code:'IT'
,name:'Italian'
,normal:'\\1234567890\'ìùqwertyuiopè+asdfghjklòàzxcvbnm,.-'
,shift:{0:'|!"£$%&/()=?^§',24:'é*',35:'ç°',44:';:_'}
,alt:{5:'€',16:'€',24:'[]',35:'@#'}
,shift_alt:{24:'{}'}},
{code:'JA-JP'
,name:'Japanese'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,'cbk':VirtualKeyboard.Langs.JP.processChar},
{code:'KN-IN'
,name:'Kannada'
,normal:'ೊ1234567890-ೃೌೈಾೀೂಬಹಗದಜಡೋೇ್ಿುಪರಕತಚಟೆಂಮನವಲಸ,.ಯ'
,shift:{0:'ಒ',3:'್ರರ್ಜ್ಞತ್ರಕ್ಷಶ್ರ()ಃಋ',14:'ಔಐಆಈಊಭಙಘಧಝಢಞಓಏಅಇಉಫಱಖಥಛಠಎ',39:'ಣ',42:'ಳಶಷ|'}
,alt:{1:'೧೨೩೪೫೬೭೮೯೦',12:'ೄ',15:'ೖ',27:'ೕ'}
,shift_alt:{12:'ೠ',17:'ೡ',29:'ಌ',31:'ೞ'}},
{code:'KK-KZ'
,name:'Kazakh'
,normal:'("әіңғ,.үұқөһ\\йцукенгшщзхъфывапролджэячсмитьбю№'
,shift:{0:')!',6:';:',13:'/',46:'?'}},
{code:'KM'
,name:'Khmer (NIDA 1.0)'
,normal:'«១២៣៤៥៦៧៨៩០ឥឲឮឆឹេរតយុិោផៀឪាសដថងហ្កលើ់ឋខចវបនម។៊'
,shift:{0:'»!ៗ"៛%៍័៏()៌=ឭឈឺែឬទួូីៅភឿឧាំៃឌធអះញគឡោះ៉ឍឃជេះពណំុះ៕?'}
,alt:{0:'‍‌@៑$€៙៚*{}x៎\\ៜ៝ឯឫឨ',21:'ឦឱឰឩឳ',33:'ឝ',35:'៖ៈ',41:'ឞ',44:',./'}
,shift_alt:{1:'៱៲៳៴៵៶៷៸៹៰',14:'᧠᧡᧢᧣᧤᧥᧦᧧᧨᧩᧪᧫᧬᧭᧮᧯᧰᧱᧲᧳᧴᧵᧶᧷᧸᧹᧺᧻᧼᧽᧾᧿'}},
{code:'KO-KR'
,name:'2 Beolsik'
,normal:'~1234567890-=\\ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ[]ㅁㄴㅇㄹㅎㅗㅓㅏㅣ;\'ㅋㅌㅊㅍㅠㅜㅡ,./'
,shift:{0:'`!@#$%^&*()_+|ㅃㅉㄲㄲㅆ',22:'ㅒㅖ{}',35:':"',44:'<>?'}
,'cbk':VirtualKeyboard.Langs.KR.charProcessor},
{code:'KO-KR'
,name:'3 Beolsik'
,normal:'~ㅎㅆㅂㅛㅠㅑㅖㅢㅜㅋ)>:ㅅㄹㅕㅐㅓㄹㄷㅁㅊㅍ(<ㅇㄴㅣㅏㅡㄴㅇㄱㅈㅂㅌㅁㄱㅔㅗㅜㅅㅎ,.ㅗ'
,shift:{0:'`ㄲㄺㅈㄿㄾ=""\'~;+\\ㅍㅌㄵㅀㄽ56789%/ㄷㄶㄼㄻㅒ01234"ㅊㅄㅋㄳ?-"\'',46:'!'}
,'cbk':VirtualKeyboard.Langs.KR.charProcessor},
{code:'KO-KR'
,name:'Ru-Kor'
,normal:'ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}
,'cbk':/**
 * $Id$
 *
 * Korean phonetic IME
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2007-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
function (chr, buf) {
    var Ru2Kor = {'-':'-','а':'ㅏ','А':'ㅏ','б':'ㅂ','Б':'ㅃ','в':'ㅗ','В':'ㅗ','г':'ㄱ','Г':'ㄲ','д':'ㄷ','Д':'ㄸ','е':'ㅔ','Е':'ㅔ','ё':'ㅛ','Ё':'ㅕ','ж':'ㅈ','Ж':'ㅈ','з':'ㅈ','З':'ㅈ','и':'ㅣ','И':'ㅣ','й':'ㅣ','Й':'ㅣ','к':'ㄱ','К':'ㄲ','л':'ㄹ','Л':'ㄹ','м':'ㅁ','М':'ㅁ','н':'ㄴ','Н':'ㅇ','о':'ㅗ','О':'ㅓ','п':'ㅂ','П':'ㅃ','р':'ㄹ','Р':'ㄹ','с':'ㅅ','С':'ㅆ','т':'ㄷ','Т':'ㄸ','у':'ㅜ','У':'ㅜ','ф':'ㅍ','Ф':'ㅍ','х':'ㅎ','Ч':'ㅎ','ц':'ㅉ','Ц':'ㅉ','ч':'ㅈ','Ч':'ㅉ','ш':'ㅅ','Ш':'ㅅ','щ':'ㅅ','Щ':'ㅅ','ъ':'ъ','ы':'ㅡ','Ы':'ㅡ','ь':'ㅓ','Ь':'ㅓ','э':'ㅐ','Э':'ㅐ','ю':'ㅠ','Ю':'ㅠ','я':'ㅑ','Я':'ㅑ'}
       ,RuVowels = "ьЬаАеЕёЁиИйЙОоуУыЫэЭюЮяЯ"
       ,Ru2KorJotVowels = "ㅕㅕㅑㅑㅖㅖㅕㅛㅣㅣㅣㅣㅕㅛㅠㅠㅡㅡㅒㅒㅠㅠㅑㅑ"
       ,Korean = VirtualKeyboard.Langs.KR
       ,CVC=Korean.parseHangul(buf)
    if(CVC==null){
        var kor, jamo
        if((kor= Ru2Kor[chr]) && (jamo = Korean.Jamo[kor])){
            var flagged='\u0448\u0428\u0439\u0419\u0432\u0412'.indexOf(chr)
            if(flagged >=0) Korean.flags |= parseInt('112244'.charAt(flagged), 16)
            if(jamo[0] & 1) {// V
                    return [String.fromCharCode(50500+jamo[1]),1]
            }
        }
    }else{
        switch (chr) {
        case '-': // -
            Korean.flags=0
            return  [buf, 0]
        case '\u044a': // tv.znak
                    if(CVC && CVC[2] && CVC[2]==4)// n->ng
                                    return [String.fromCharCode(CVC[0]+CVC[1]+21), 1]
                    else return [buf, buf && 1 || 0]
                    break
/*      case '\u044c': //m.znak
                    return [buf, buf && 1 || 0]
                    break
*/
        case '\u0445': // h
            var pos= '\u3142\u3137\u3148\u3131'.indexOf(buf) // p t c k
            if (pos!=-1 ) return ['\u314d\u314c\u314a\u314b'.charAt(pos), 1]
            else if(CVC[2]) switch (CVC[2]){
                    case 1: return [String.fromCharCode(CVC[0]+CVC[1]+24), 1] // k>kh
                    case 7: return [String.fromCharCode(CVC[0]+CVC[1]+25), 1] // t>th
                    case 17: return [String.fromCharCode(CVC[0]+CVC[1]+26), 1] // p>ph
                    case 22: return [String.fromCharCode(CVC[0]+CVC[1]+23), 1] // j>ch
                    case 11: return [String.fromCharCode(CVC[0]+CVC[1]+14), 1] // lp>lph
            }
            break
        case '\u0436': // zh
            if(buf=='\u3148' || buf=='\u3137') return ['\u3148', 1]
            else if(CVC[2]){
                    if(CVC[2]==22) return [buf, 1];
                    else if (CVC[2]==7) return [String.fromCharCode(CVC[0]+CVC[1]+22), 1]
            }
            break
        case '\u0448': case '\u0428': // sh
            Korean.flags =1
            return[buf+'\u3145',1]
            break
        case '\u0439': case '\u0419': // yot
        //debugger              
            if (CVC[1] == -1 || CVC[2]) Korean.flags =2 //s-y, sas-y
            break
        case '\u0432': case '\u0412': //w
            Korean.flags =4
            break
        default:
        if (CVC && (Korean.flags & 1 &&  CVC[1]==-1 || Korean.flags & 2 && CVC[2]==0)){//sha, rya
                var vow
                if ((vow=RuVowels.indexOf(chr))!=-1) {//vowel
                    Korean.flags &=~ 3
                    return Korean.charProcessor(Ru2KorJotVowels.charAt(vow), Korean.CV2C[(CVC[0]-44032)/588], [CVC[0],-1,0])
                }
            }
        }
    }
    return Korean.charProcessor(Ru2Kor[chr]||chr, buf, CVC, 1)
}},
{code:'AR-KU'
,name:'Kurdish Arabic'
,normal:'`١٢٣٤٥٦٧٨٩٠-=\\قوهرتییپ[]سدفگهجكل;\'زخچڤبنم,./'
,shift:{0:'~!@#$٪^&*()_+|ثشئى̌ڒطێوووۊ',24:'{}اصذ',30:'غحژ',34:'ڵ:"ظ',39:'ضعلالا̌ء<>?'}},
{code:'KU'
,name:'Kurdish Cyrillic'
,normal:'\'1234567890әъэqwертöуиопшщасдфгhйкльжзхчвбнм,.;'
,shift:{0:'"!@#$%^&*()',44:'<>:'}},
{code:'KU'
,name:'Kurdish Latin'
,normal:'`æîûçéêíşùú-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~',11:'_+|',24:'{}',35:':"',44:'<>?'}},
{code:'KY-KG'
,name:'Kyrgyz Cyrillic'
,normal:'ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}
,alt:{16:'ү',19:'ң',32:'ө'}},
{code:'LA'
,name:'Lakhota Standard'
,normal:'`1234567890-=\\ǧweštyuiop[]asdŋghȟkl;\'zžčvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',32:'Ȟ',35:':"',44:'<>?'}
,'cbk':/**
 * $Id$
 *
 * Lakhota char processor
 *
 * This software is protected by patent No.2009611147 issued on 20.02.2009 by Russian Federal Service for Intellectual Property Patents and Trademarks.
 *
 * @author Konstantin Wiolowan
 * @copyright 2008-2009 Konstantin Wiolowan <wiolowan@mail.ru>
 * @version $Rev$
 * @lastchange $Author$ $Date$
 */
function(chr, buf){
    if (chr=='\u0008') { // backspace
        if (buf.length) {
            return [buf.slice(0,-1),buf.length-1]
        } 
    } else if(/[^A-z']/.test(chr)){
        return VirtualKeyboard.Langs.LA.remap[buf+chr] || [buf+chr, 0]
    } else { //non backspace
        return VirtualKeyboard.Langs.LA.remap[buf+chr] || [buf+chr, 1]
    }
}},
{code:'LO-LAO'
,name:'Lao SengKeo'
,normal:'@ຢຟໂຖຸູຄຕຈຂຊໍ\\ົໄຳພະິີຣນຍບລັຫກດເ້່າສວງຜປແອຶືທມໃຝ'
,shift:{0:'©໑໒໓໔໌ຼ໕໖໗໘໙ໍ່ໝົ້໐້ຳ-+ິ້ີ້ຮ່ຳຽ-/ັ້;.,:໊໋!?%',37:'&(ຯໜຶ້ື້ໆ"$)'}},
{code:'ES-MX'
,name:'Latin American'
,normal:'|1234567890\'¿}qwertyuiop´+asdfghjklñ{zxcvbnm,.-'
,shift:{0:'°!"#$%&/()=?¡]',24:'¨*',36:'[',44:';:_'}
,alt:{0:'¬',11:'\\',13:'`@',25:'~',36:'^'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `'}},
{code:'LV'
,name:'Latvian (QWERTY)'
,normal:'`1234567890-=°qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{0:'­ «»€',6:'’',11:'–',16:'ēŗ',20:'ūīõ',26:'āš',30:'ģ',33:'ķļ',36:'´ž',39:'č',42:'ņ'}
,shift_alt:{4:'§°',7:'±×',11:'—',36:'¨'}
,dk:{'´':'nńcćzźsśeéoóNŃCĆZŹSŚEÉOÓ ´','¨':'aäuüoöAÄUÜOÖ ¨','~':'oõOÕ ~','°':'zżaågġeėZŻAÅEĖ °'}},
{code:'LV'
,name:'Latvian'
,normal:'­1234567890-fķūgjrmvnzēčžhšusildatec´ņbīkpoā,.ļ'
,shift:{0:'?!«»$%/&×()_',36:'°',44:';:'}
,alt:{1:'«',4:'€"’',8:':',11:'–=',14:'qģ',17:'ŗwy',24:'[]',34:'€',38:'x',40:'ķ',42:'õ',44:'<>'}
,shift_alt:{2:'@#$~^±',11:'—;',24:'{}',36:'¨'}
,dk:{'~':'oõOÕ ~','´':'oósścćeénńzźOÓSŚCĆEÉNŃZŹ ´','°':'aåeėgġzżAÅEĖZŻ °','¨':'oöaäuüOÖAÄUÜ ¨'}},
{code:'LT'
,name:'Lithuanian IBM'
,normal:'`!"/;:,.?()_+|ąžertyuiopį“asdfghjklųėzūcvbnmčšę'
,shift:{0:'~1234567890-=\\',25:'”'}
,alt:{7:'{[]}',16:'€'}},
{code:'LT'
,name:'Lithuanian'
,normal:'`ąčęėįšųū90-ž\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~',9:'()_',13:'|',24:'{}',35:':"',44:'<>?'}
,alt:{1:'12345678',12:'=',16:'€'}
,shift_alt:{1:'!@#$%^&*',12:'+'}},
{code:'LB-LU'
,name:'Luxembourgish '
,normal:'§1234567890\'^$qwertzuiopè¨asdfghjkléàyxcvbnm,.-'
,shift:{0:'°+"*ç%&/()=?`£',24:'ü!',35:'öä',44:';:_'}
,alt:{1:'¦@#°§¬|¢',11:'´~}',16:'€',24:'[]',36:'{'}
,dk:{'´':'yýaáeéuúiíoóYÝAÁEÉUÚIÍOÓ ´','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','¨':'yÿaäeëuüiïoöAÄEËUÜIÏOÖ "'}},
{code:'MK'
,name:'Macedonian'
,normal:'`1234567890-=жљњертѕуиопшѓасдфгхјклчќзџцвбнм,./'
,shift:{0:'~!„“’%‘&*()_+',44:';:?'}
,alt:{16:'€',24:'Ђђ',29:'[]',35:'Ћћ',40:'@{}§'}},
{code:'ML-IN'
,name:'Malayalam'
,normal:'ൊ1234567890-ൃൌൈാീൂബഹഗദജഡോേ്ിുപരകതചടെംമനവലസ,.യ'
,shift:{0:'ഒ',3:'്ര',7:'ക്ഷ',9:'()ഃഋ',14:'ഔഐആഈഊഭങഘധഝഢഞഓഏഅഇഉഫറഖഥഛഠഎ',39:'ണ',41:'ഴളശഷ'}
,alt:{1:'൧൨൩൪൫൬൭൮൯൦',14:'ൗ'}
,shift_alt:{12:'ൠ',17:'ൡ',28:'ഌ'}},
{code:'MT'
,name:'Maltese 47-key'
,normal:'ċ1234567890-=żqwertyuiopġħasdfghjkl;\'zxcvbnm,./'
,shift:{1:'!@€$%^&*()_+',35:':"',44:'<>?'}
,alt:{0:'`',3:'£',13:'\\',16:'è',20:'ùìò',24:'[]à'}
,shift_alt:{0:'~',13:'|',24:'{}'}},
{code:'MT'
,name:'Maltese 48-key'
,normal:'ċ1234567890-=#qwertyuiopġħasdfghjkl;\'zxcvbnm,./'
,shift:{1:'!"€$%^&*()_+~',35:':@',44:'<>?'}
,alt:{0:'`',3:'£',16:'è',20:'ùìò',24:'[]à'}
,shift_alt:{0:'¬',24:'{}'}},
{code:'MI-NZ'
,name:'Maori-Dvorak (Two-Handed)'
,normal:'`1234567890[]\\\',.pyfgcrl/=aoeuidhtns-;qjkxbmwvz'
,shift:{0:'~!@#$%^&*(){}|"<>',24:'?+',36:'_:'}
,dk:{'`':'aāeēuūiīoō``AĀEĒUŪIĪOŌ ~'}},
{code:'MI-NZ'
,name:'Maori'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,dk:{'`':'aāeēuūiīoō``AĀEĒUŪIĪOŌ ~'}},
{code:'MR-IN'
,name:'Marathi'
,normal:'१२३४५६७८९०-ृॉौैाीूबहगदजड़ोे्िुपरकतचटंमनवलस,.य'
,shift:{1:'ऍॅ्रर्ज्ञत्रक्षश्र()ःऋऑऔऐआईऊभङघधझढञओएअइउफऱखथछठ',38:'ँण',42:'ळशष।य़'}
,alt:{0:'`1234567890',12:'=\\',24:'[]',35:';\'',46:'/'}
,shift_alt:{0:'~!@#$%^&*()_+|',24:'{}',35:':"ऽॐ',44:'<>?'}},
{code:'MN'
,name:'Mongolian Cyrillic'
,normal:'=№-"₮:._,%?ещ\\фцужэнгшүзкъйыбөахролдпячёсмитьвю'
,shift:{0:'+1234567890',13:'|'}},
{code:'MN'
,name:'Mongolian Cyrillic (QWERTY)'
,normal:'=!ыёү:;[]()шщ\\өеэртюуиопяъасдфгхжклйьзчцвбнм,./'
,shift:{0:'+№',5:'-*&₮_=',13:'|',44:'<>?'}},
{code:'NE-NP'
,name:'Nepali '
,normal:'ञघङझछटठडढण(.धभचतथगषयउृेबकमानजवपिसुशहअखदलफ,।र'
,shift:{0:'ञ्१२३४५६७८९०)ं्ोध्भ्च्त्थ्ग्क्षइएर्ैब्क्म्ँन्ज्व्प्ीस्ूश्ह्ऋख्द्ल्ः?श्ररू'}
,alt:{1:'1234567890',12:'+',23:'ऊ',25:'औ',39:'आ'}},
{code:'SE-NO'
,name:'Norwegian with Sami'
,normal:'|1234567890+\\\'qwertyuiopå¨asdfghjkløæzxcvbnm,.-'
,shift:{0:'§!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}',12:'´',14:'â',16:'€',18:'ŧ',21:'ïõ',25:'~ášđǥǧȟ',33:'ǩ',35:'öäž',39:'čǯʒŋµ'}
,dk:{'`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','´':'nńcćzźaáøǿæǽsślĺwẃeérŕåǻuúiíyýoóNŃCĆZŹAÁØǾÆǼSŚLĹWẂEÉRŔÅǺUÚIÍYÝOÓ ´','¨':'aäwẅeëuüiïyÿoöAÄWẄEËUÜIÏYŸOÖ ¨','^':'cĉaâhĥjĵgĝsŝwŵeêuûiîyŷoôCĈAÂHĤJĴGĜSŜWŴEÊUÛIÎYŶOÔ ^','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~'}},
{code:'NB-NO'
,name:'Norwegian'
,normal:'|1234567890+\\\'qwertyuiopå¨asdfghjkløæzxcvbnm,.-'
,shift:{0:'§!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}',12:'´',16:'€',25:'~',43:'µ'}
,dk:{'`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'AR-EG'
,name:'Pashto-FSI'
,normal:'ﷲ١٢٣٤٥٦٧٨٩٠­=؛قويرتېعئوپطصاسدفږهجکل;\'زخچځبنم،./'
,shift:{0:'ة![]﴾٪^﴿*()-+ۀؤىړټ',20:'غۍۋ­ظضآشډﭪګحژگﻻ:"ذښثڅﱣڼً«»؟'}
,alt:{0:'ّﱣﱠﱢﱟﱡﱞٌُُْٰٔإأآٱًٍَِﻻـ'}},
{code:'PL'
,name:'Polish (214)'
,normal:'˛1234567890+\'óqwertzuiopżśasdfghjklłąyxcvbnm,.-'
,shift:{0:'·!"#¤%&/()=?*ź',24:'ńć',36:'ę',44:';:_'}
,alt:{1:'~ˇ^˘°˛`·´˝¨¸',14:'\\¦',20:'€',24:'÷×',27:'đĐ',35:'$ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšeěrřtťzžNŇCČDĎSŠEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','·':'zżZŻ ·','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsştţCÇSŞTŢ ¸'}},
{code:'PL'
,name:'Polish (Programmers)'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{16:'ę',20:'€',22:'ó',26:'ąś',34:'ł',37:'żźć',42:'ń'}
,dk:{'~':'nńcćxźzżaąsślłeęoóNŃCĆXŹZŻAĄSŚLŁEĘOÓ ~'}},
{code:'PT-BR'
,name:'Portuguese (Brazilian ABNT2)'
,normal:'\'1234567890-=]qwertyuiop´[asdfghjklç~zxcvbnm,.;'
,shift:{0:'"!@#$%¨&*()_+}',24:'`{',36:'^',44:'<>:'}
,alt:{1:'¹²³£¢¬',12:'§º/?°',25:'ª',39:'₢'}
,dk:{'¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'PT-BR'
,name:'Portuguese (Brazilian ABNT)'
,normal:'\'1234567890-=]qwertyuiop´[asdfghjklç~zxcvbnm,.;'
,shift:{0:'"!@#$%¨&*()_+}',24:'`{',36:'^',44:'<>:'}
,alt:{1:'¹²³£¢¬',12:'§º/?°',25:'ª',39:'₢'}
,dk:{'¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'PT'
,name:'Portuguese'
,normal:'\\1234567890\'«~qwertyuiop+´asdfghjklçºzxcvbnm,.-'
,shift:{0:'|!"#$%&/()=?»^',24:'*`',36:'ª',44:';:_'}
,alt:{2:'@£§€',7:'{[]}',16:'€',24:'¨]'}
,dk:{'¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'PA-IN'
,name:'Punjabi'
,normal:'1234567890-ੌੈਾੀੂਬਹਗਦਜਡ਼ੋੇ੍ਿੁਪਰਕਤਚਟੰਮਨਵਲਸ,.ਯ'
,shift:{0:'੍ਹ੍ਵ੍ਯ੍ਰੱ',9:'()',14:'ਔਐਆਈਊਭਙਘਧਝਢਞਓਏਅਇਉਫ',33:'ਖਥਛਠ',38:'ਂਣ',41:'ੲਲ਼ਸ਼',45:'।'}
,alt:{1:'੧੨੩੪੫੬੭੮੯੦',21:'ਗ਼',23:'ਜ਼ੜ',31:'ਫ਼',33:'ਖ਼',41:'ੳ',45:'॥'}
,shift_alt:{38:'ੴ'}},
{code:'RO'
,name:'Romanian'
,normal:']1234567890+\'âqwertzuiopăîasdfghjklşţyxcvbnm,.-'
,shift:{0:'[!"#¤%&/()=?*',44:';:_'}
,alt:{1:'~ˇ^˘°˛`·´˝¨¸',14:'\\|',24:'÷×',27:'đĐ',33:'łŁ$ß',40:'@{}§<>'}},
{code:'RU'
,name:'Russian_Qwerty'
,normal:'ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}
,alt:{0:'`',14:'QWERTYUIOP[]ASDFGHJKL;\'ZXCVBNM,.'}},
{code:'RU'
,name:'Russian ЯЖЕРТЫ'
,normal:'ю1234567890-=эяжертыуиопшщасдфгчйкл;\'зхцвбнм,./'
,shift:{1:'!ъЪ$%ёЁ*()_+',35:':"',44:'<>?'}},
{code:'RU'
,name:'Russian Translit'
,normal:'ё1234567890-ъэяшертыуиопющасдфгчйкльжзхцвбнм;.='
,shift:{1:'№!/":«»?()_',44:'\',%'}},
{code:'RU'
,name:'Russian (Typewriter)'
,normal:'|№-/":,._?%!;)йцукенгшщзхъфывапролджэячсмитьбюё'
,shift:{0:'+1234567890=\\('}},
{code:'RU'
,name:'Russian'
,normal:'ё1234567890-=\\йцукенгшщзхъфывапролджэячсмитьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}},
{code:'SE'
,name:'Sami Extended Finland-Sweden'
,normal:'§1234567890+´đášertŧuiopåŋasdfghjklöäzčcvbnm,.-'
,shift:{0:'½!"#¤%&/()=?`',44:';:_'}
,alt:{0:'|',2:'@£$€',7:'{[]}\\',13:'\'qw€',19:'y',21:'ïõ',24:'¨~â',30:'ǧǥ',33:'ǩ',35:'øæʒx',43:'µ<>'}
,shift_alt:{13:'*',24:'^ˇ'}
,dk:{'´':'nńcćzźaásślĺeérŕåǻuúiíoóNŃCĆZŹAÁSŚLĹEÉRŔÅǺUÚIÍOÓøǿæǽwẃyýØǾÆǼWẂYÝ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒwẁyỳWẀYỲ `','¨':'aäeëuüiïoöAÄEËUÜIÏOÖwẅyÿWẄYŸ ¨','^':'cĉaâhĥjĵgĝsŝeêuûiîoôCĈAÂHĤJĴGĜSŜEÊUÛIÎOÔwŵyŷWŴYŶ ^','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~','ˇ':'nňcčzžhȟgǧdďsšlľkǩeěrřtťNŇCČZŽHȞGǦDĎSŠLĽKǨEĚRŘTŤʒǯƷǮ ˇ'}},
{code:'SE-NO'
,name:'Sami Extended Norway'
,normal:'|1234567890+\\đášertŧuiopåŋasdfghjkløæzčcvbnm,.-'
,shift:{0:'§!"#¤%&/()=?`',44:';:_'}
,alt:{2:'@£$€',7:'{[]}',12:'´\'qw€',19:'y',21:'ïõ',24:'¨~â',30:'ǧǥ',33:'ǩ',35:'öäʒx',43:'µ<>'}
,shift_alt:{13:'*',24:'^ˇ'}
,dk:{'`':'aàeèuùiìoòAÀEÈUÙIÌOÒwẁyỳWẀYỲ `','´':'nńcćzźaáøǿæǽsślĺeérŕåǻuúiíoóNŃCĆZŹAÁØǾÆǼSŚLĹEÉRŔÅǺUÚIÍOÓwẃyýWẂYÝ ´','¨':'aäeëuüiïoöAÄEËUÜIÏOÖwẅyÿWẄYŸ ¨','^':'cĉaâhĥjĵgĝsŝeêuûiîoôCĈAÂHĤJĴGĜSŜEÊUÛIÎOÔwŵyŷWŴYŶ ^','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~','ˇ':'nňcčzžhȟgǧdďsšlľkǩeěrřtťNŇCČZŽHȞGǦDĎSŠLĽKǨEĚRŘTŤʒǯƷǮ ˇ'}},
{code:'SA-IN'
,name:'Sanskrit Romanized'
,normal:'आ१२३४५६७८९०-=।टडेरतयुिोपऋऌअसदउगहजकल.ऽशइचवबनमएओ्'
,shift:{0:'ॐ॒॑!?\'"<>()_+॥ठढैृथञूीौफॠॡाषधऊघःझखॢ,॰ङईछळभणंऐऔ‍'}
,alt:{0:'॔',8:'*[]',13:'\\',15:'ड़ॅॄ',19:'य़',22:'ॉफ़',29:'÷ग़ज़क़ॣ:़',38:'×',40:'ऴ',42:'ऩँऍऑ‌'}
,shift_alt:{0:'॓',9:'{}',13:'/',15:'ढ़ॆऱ',22:'ॊ',33:'ख़',35:';◌',43:'ऎऒ​'}},
{code:'SR-SP'
,name:'Serbian (Cyrillic)'
,normal:'`1234567890\'+жљњертзуиопшђасдфгхјклчћѕџцвбнм,.-'
,shift:{0:'~!"#$%&/()=?*',44:';:_'}
,alt:{16:'€',44:'<>'}
,dk:{'\'':'гѓкќГЃКЌ \''}},
{code:'SR-SP'
,name:'Serbian (Latin)'
,normal:'‚1234567890\'+žqwertzuiopšđasdfghjklčćyxcvbnm,.-'
,shift:{0:'~!"#$%&/()=?*',44:';:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',24:'÷×',29:'[]',33:'łŁ',36:'ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsşCÇSŞ ¸','‚':'cçsşCÇSŞ ‚'}},
{code:'SK'
,name:'Slovak (QWERTY)'
,normal:';+ľščťžýáíé=´ňqwertyuiopúäasdfghjklô§zxcvbnm,.-'
,shift:{0:'°1234567890%ˇ)',24:'/(',35:'"!',44:'?:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',23:'\'÷×',27:'đĐ[]',33:'łŁ$ß>#&@{}',44:'<>*'}
,dk:{'ˇ':'nňcčzždďsšlľeěrřtťNŇCČZŽDĎSŠLĽEĚRŘTŤ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćzźaásślĺeérŕuúiíyýoóNŃCĆZŹAÁSŚLĹEÉRŔUÚIÍYÝOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsştţCÇSŞTŢ ¸'}},
{code:'SK'
,name:'Slovak'
,normal:';+ľščťžýáíé=´ňqwertzuiopúäasdfghjklô§yxcvbnm,.-'
,shift:{0:'°1234567890%ˇ)',24:'/(',35:'"!',44:'?:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',23:'\'÷×',27:'đĐ[]',33:'łŁ$ß>#&@{}',44:'<>*'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ·','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäuüoöAÄUÜOÖ ¨','¸':'cçsştţCÇSŞTŢ ¸'}},
{code:'SL-SI'
,name:'Slovenian'
,normal:'¸1234567890\'+žqwertzuiopšđasdfghjklčćyxcvbnm,.-'
,shift:{0:'¨!"#$%&/()=?*',44:';:_'}
,alt:{1:'~ˇ^˘°˛`˙´˝¨¸¤\\|€',24:'÷×',29:'[]',33:'łŁ',36:'ß',40:'@{}§<>'}
,dk:{'ˇ':'nňcčdďsšlľeěrřtťzžNŇCČDĎSŠLĽEĚRŘTŤZŽ ˇ','^':'aâiîoôAÂIÎOÔ ^','˘':'aăAĂ ˘','°':'uůUŮ °','˛':'aąeęAĄEĘ ˛','˙':'zżZŻ ˙','´':'nńcćyýaásślĺeérŕuúiízźoóNŃCĆYÝAÁSŚLĹEÉRŔUÚIÍZŹOÓ ´','˝':'uűoőUŰOŐ ˝','¨':'aäeëuüoöAÄEËUÜOÖ ¨','¸':'cçsşCÇSŞ ¸'}},
{code:'ES'
,name:'Spanish Variation'
,normal:'\'1234567890-¨´qwertyuiop÷`asdfghjklñçzxcvbnm,.='
,shift:{0:'·ª"/()¡!¿?₧+',24:'×',44:';:%'}
,alt:{0:'\\|@#¼½¬_#§\\*~}',16:'€',24:'[]$&@[]|£±',35:'~{',45:'^'}
,dk:{'¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','~':'nñaãoõNÑAÃOÕ ~','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','´':'aáeéuúiíyýoóAÁEÉUÚIÍOÓ ´','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^'}},
{code:'ES'
,name:'Spanish'
,normal:'º1234567890\'¡çqwertyuiop`+asdfghjklñ´zxcvbnm,.-'
,shift:{0:'ª!"·$%&/()=?¿',24:'^*',36:'¨',44:';:_'}
,alt:{0:'\\|@#~€¬',13:'}',16:'€',24:'[]',36:'{'}
,dk:{'~':'nñaãoõNÑAÃOÕ ~','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨'}},
{code:'SE'
,name:'Swedish with Sami'
,normal:'§1234567890+´\'qwertyuiopå¨asdfghjklöäzxcvbnm,.-'
,shift:{0:'½!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}\\',14:'â',16:'€',18:'ŧ',21:'ïõ',25:'~ášđǥǧȟ',33:'ǩ',35:'øæž',39:'čǯʒŋµ'}
,dk:{'´':'nńcćzźaásślĺwẃeérŕåǻuúiíyýoóNŃCĆZŹAÁSŚLĹWẂEÉRŔÅǺUÚIÍYÝOÓøǿæǽØǾÆǼ ´','`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','¨':'aäwẅeëuüiïyÿoöAÄWẄEËUÜIÏYŸOÖ ¨','^':'cĉaâhĥjĵgĝsŝwŵeêuûiîyŷoôCĈAÂHĤJĴGĜSŜWŴEÊUÛIÎYŶOÔ ^','~':'nñaãuũiĩoõNÑAÃUŨIĨOÕ ~'}},
{code:'SV-SE'
,name:'Swedish'
,normal:'§1234567890+´\'qwertyuiopå¨asdfghjklöäzxcvbnm,.-'
,shift:{0:'½!"#¤%&/()=?`*',25:'^',44:';:_'}
,alt:{2:'@£$€',7:'{[]}\\',16:'€',25:'~',43:'µ'}
,dk:{'´':'aáeéuúiíyýoóAÁEÉUÚIÍYÝOÓ ´','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','¨':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ ¨','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'FR-CH'
,name:'Swiss French'
,normal:'§1234567890\'^$qwertzuiopè¨asdfghjkléàyxcvbnm,.-'
,shift:{0:'°+"*ç%&/()=?`£',24:'ü!',35:'öä',44:';:_'}
,alt:{1:'¦@#°§¬|¢',11:'´~}',16:'€',24:'[]',36:'{'}
,dk:{'´':'yýaáeéuúiíoóYÝAÁEÉUÚIÍOÓ ´','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','¨':'yÿaäeëuüiïoöAÄEËUÜIÏOÖ "'}},
{code:'DE-CH'
,name:'Swiss German'
,normal:'§1234567890\'^$qwertzuiopü¨asdfghjklöäyxcvbnm,.-'
,shift:{0:'°+"*ç%&/()=?`£',24:'è!',35:'éà',44:';:_'}
,alt:{1:'¦@#°§¬|¢',11:'´~}',16:'€',24:'[]',36:'{'}
,shift_caps:{24:'È',35:'ÉÀ'}
,dk:{'´':'yýaáeéuúiíoóYÝAÁEÉUÚIÍOÓ ´','^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~','¨':'yÿaäeëuüiïoöAÄEËUÜIÏOÖ ¨'}},
{code:'SYR-SY'
,name:'Syriac Phonetic'
,normal:'܏1234567890-=܆ܩܘܖܪܬܝܜܥܧܦ][ܐܣܕܔܓܗܛܟܠܚܞܙܨܤܫܒܢܡ܀.܇'
,shift:{0:'̮!̥̊݉♰♱܊»)(«+:ܑܱܴܷܻܾܰܳܶܺܽ݀݁̈̄̇̃݊ـ̤̱̣̰ܸܼܹ݂ܲܵܿ،؛؟'}
,alt:{0:'ّ܁܂܃܄܅܈܉܋܌܍┌┐',14:'ًٌَُ̭ٓٔ݇݃݅',26:'ٍِٖءٰٕ݈݄݆',38:'ْ',40:'‍‌‎‏'}},
{code:'SYR-SY'
,name:'Syriac'
,normal:'܏1234567890-=܆ܔܨܖܩܦܜܥܗܞܚܓܕܫܣܝܒܠܐܬܢܡܟܛ][ܤܪܧ܀.ܘܙ܇'
,shift:{0:'̮!̥̊݉♰♱܊»)(«+:ܑܱܴܷܻܾܰܳܶܺܽ݀݁̈̄̇̃݊ـ̤̱̣̰ܸܼܹ݂ܲܵܿ،؛؟'}
,alt:{0:'ّ܁܂܃܄܅܈܉܋܌܍┌┐',14:'ًٌَُ̭ٓٔ݇݃݅',26:'ٍِٖءٰٕ݈݄݆',38:'ْ',40:'‍‌‎‏'}},
{code:'TL'
,name:'Tagalog - Tausug'
,normal:'ñ1234567890-=ãqwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{1:'!@#$%^&*()_+',24:'{}',35:':"',44:'<>?'}},
{code:'TG'
,name:'Tajik Latin'
,normal:'`ëžčšèġîûǧ(-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~',7:'Ì',10:')_+|',24:'{}',35:':"',44:'<>?'}},
{code:'TA-IN'
,name:'Tamil'
,normal:'ொ1234567890-ௌைாீூபஹகதஜடஞோே்ிுபரகதசடெமநவலஸ,.ய'
,shift:{0:'ஒ',6:'த்ரக்ஷஷ்ர',11:'ஃ',14:'ஔஐஆஈஊ',20:'ங',23:'ச',26:'ஓஏஅஇஉ',32:'ற',37:'எ',39:'ணனழளஷஷஸ்ரீ'}
,alt:{1:'௧௨௩௪௫௬௭௮௯௰௱௲'}},
{code:'TT-RU'
,name:'Tatar'
,normal:'һ1234567890-=\\йөукенгшәзхүфывапролдңэячсмитҗбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}
,alt:{0:'ё',2:'@#$',7:'[]{}',15:'ц',22:'щ',25:'ъ',35:'ж\'',43:'ь<>'}},
{code:'TE-IN'
,name:'Telugu'
,normal:'ొ1234567890-ృౌైాీూబహగదజడోే్ిుపరకతచటెంమనవలస,.య'
,shift:{0:'ఒ',3:'్ర',5:'జ్ఞత్రక్షశ్ర()ఃఋ',14:'ఔఐఆఈఊభఙఘధఝఢఞఓఏఅఇఉఫఱఖథఛఠఎఁణ',42:'ళశష'}
,alt:{1:'౧౨౩౪౫౬౭౮౯౦',12:'ౄ',15:'ౖ',27:'ౕ'}
,shift_alt:{12:'ౠ',17:'ౡ',29:'ఌ'}},
{code:'TH'
,name:'Thai Kedmanee'
,normal:'_ๅ/-ภถุึคตจขชฃๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝ'
,shift:{0:'%+๑๒๓๔ู฿๕๖๗๘๙ฅ๐"ฎฑธํ๊ณฯญฐ,ฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦ'}},
{code:'TH'
,name:'Thai Pattachote'
,normal:'_=๒๓๔๕ู๗๘๙๐๑๖็ตยอร่ดมวแใฌ้ทงกัีานเไขบปลหิคสะจพ'
,shift:{0:'฿+"/,?ุ_.()-%ํ๊ฤๆญษึฝซถฒฯฦ๋ธำณ์ืผชโฆฑฎฏฐภัศฮฟฉฬ'}},
{code:'TH'
,name:'Thai'
,normal:'_ๅ/-ภถุึคตจขชฃๆไำพะัีรนยบลฟหกดเ้่าสวงผปแอิืทมใฝ'
,shift:{0:'%+๑๒๓๔ู฿๕๖๗๘๙ฅ๐"ฎฑธํ๊ณฯญฐมฤฆฏโฌ็๋ษศซใ()ฉฮฺ์?ฒฬฦ'}},
{code:'TR'
,name:'Turkish F'
,normal:'+1234567890/-xfgğıodrnhpqwuieaütkmlyşjövcçzsb.,'
,shift:{0:'*!"^$%&\'()=?_',27:'İ',45:':;'}
,alt:{0:'¬¹²#¼½¾{[]}\\|`@',17:'¶',19:'¥',22:'ø£¨~æß€',35:'´',37:'«»¢',43:'µ×÷­'}
,shift_alt:{1:'¡',3:'³¤',11:'¿',17:'®',27:'§',29:'ª',37:'<>©',43:'º'}
,dk:{'^':'uûaâeêiîıîoôUÛAÂEÊİÎIÎOÔ ^','¨':'uüaäeëyÿiïıïoöUÜAÄEËİÏIÏOÖ ¨','~':'aãnñoõAÃNÑOÕ ~','´':'uúaáeéiíıíoóUÚAÁEÉİÍIÍOÓ ´','`':'uùaàeèiìıìoòUÙAÀEÈİÌIÌOÒ `'}},
{code:'TR'
,name:'Turkish Q'
,normal:'"1234567890*-,qwertyuıopğüasdfghjklşizxcvbnmöç.'
,shift:{0:'é!\'^+%&/()=?_;',36:'İ',46:':'}
,alt:{0:'<>£#$½',7:'{[]}\\|`@',16:'€',24:'¨~æß',35:'´'}
,shift_alt:{21:'İ'}
,dk:{'^':'aâiîeêuûıîoôAÂİÎEÊUÛIÎOÔ ^','¨':'aäiïeëuüıïoöAÄİÏEËUÜIÏOÖ ¨','~':'nñaãoõNÑAÃOÕ ~','´':'aáiíeéuúıíoóAÁİÍEÉUÚIÍOÓ ´','`':'aàiìeèuùıìoòAÀİÌEÈUÙIÌOÒ `'}},
{code:'TK'
,name:'Turkmen Cyrillic'
,normal:'ё\'!$&(җңөүә-ъэяшертыуиопющасдфгчйкльжзхцвбнм,.;'
,shift:{1:'"@%*)',11:'_',44:'<>:'}},
{code:'UG'
,name:'Uighur Arabic'
,normal:'`١٢٣٤٥٦٧٨٩٠-=\\قشېرتيۇیوپ[]ڧسدفگهجكل;\'زخچۋبنم,./'
,shift:{0:'~!@#$٪^&*()_+|',20:'ۈ،ۆ؛{}ه',30:'غ',32:'؟لالا:"ژ',42:'ڭ',44:'<>?'}},
{code:'UG'
,name:'Uighur Cyrillic'
,normal:'ёқңғүөҗәһ\'(-ъэяшертыуиопющасдфгчйкльжзхцвбнм,.;'
,shift:{9:'")_',44:'<>:'}},
{code:'UG'
,name:'Uighur Latin'
,normal:'ä1234567890-öüqwErtyuiop[]asDfghjkl;\'zxCvbnm,./'
,shift:{1:'!@#$%^&*()_',24:'{}',35:':"',44:'<>?'}},
{code:'CY-GB'
,name:'United Kingdom Extended'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'¬!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦',2:'¨',4:'€',6:'^',13:'~',15:'ẃé',19:'ýúíó',26:'á',36:'´',39:'ç'}
,shift_alt:{36:'`'}
,dk:{'¨':'aäwẅeëuüiïyÿoöAÄWẄEËUÜIÏYŸOÖ ¨','^':'aâwŵeêuûiîyŷoôAÂWŴEÊUÛIÎYŶOÔ ^','´':'aáwẃeéuúiíyýoóAÁWẂEÉUÚIÍYÝOÓ ´','`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'EN-GB'
,name:'UK Qwerty-Maltron'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'¬!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦',2:'¨',4:'€',6:'^',13:'~',15:'ẃé',19:'ýúíó',26:'á',36:'´',39:'ç'}
,shift_alt:{36:'`'}
,caps:{13:'r',15:'pycb[]vmuzl',27:'nisf\'#dtho.jg;e\\/wkx'}
,shift_caps:{19:'{}',31:'@~',37:'>',40:':',42:'|?'}
,dk:{'¨':'aäwẅeëuüiïyÿoöAÄWẄEËUÜIÏYŸOÖ ¨','^':'aâwŵeêuûiîyŷoôAÂWŴEÊUÛIÎYŶOÔ ^','´':'aáwẃeéuúiíyýoóAÁWẂEÉUÚIÍYÝOÓ ´','`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'EN-GB'
,name:'United Kingdom'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'¬!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦',4:'€',16:'é',20:'úíó',26:'á'}},
{code:'EN-GB'
,name:'UK International'
,normal:'`1234567890-=#qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'¬!"£$%^&*()_+~',24:'{}',35:':@',44:'<>?'}
,alt:{0:'¦¡²³€¤¼½¾‘’¥×',14:'åẃé®þýúíóöªºáßð',34:'ø¶´æ',39:'©',42:'ñµç',46:'¿'}
,shift_alt:{1:'¹¨',11:'±÷',24:'«»',27:'§',35:'°',39:'¢'}
,dk:{'\"':'aäeëiïoöuüwẅyÿAÄEËIÏOÖUÜWẄYŸ "','^':'aâeêiîoôuûwŵyŷAÂEÊIÎOÔUÛWŴYŶ ^','\'':'aáeéiíoóuúyýwẃcçCÇAÁEÉIÍOÓUÚYÝWẂ \'','`':'aàwẁeèuùiìyỳoòAÀWẀEÈUÙIÌYỲOÒ `','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'EN-GB'
,name:'United Kingdom-Dvorak'
,normal:'`1234567890-=#/,.pyfgcrl[]aoeuidhtns\';qjkxbmwvz'
,shift:{0:'¬!"£$%^&*()_+~?<>',24:'{}',36:'@:'}
,alt:{0:'¦',4:'€'}},
{code:'UK-UA'
,name:'Ukrainian Translit'
,normal:'ё1234567890-ґєяшертiуиопющасдфгчйкльжзхцвбнмї.='
,shift:{1:'!"№;%:?*()_',45:',+'}},
{code:'UK-UA'
,name:'Ukrainian'
,normal:'ё1234567890-=\\йцукенгшщзхїфівапролджєячсмитьбю.'
,shift:{1:'!"№;%:?*()_+/',46:','}
,alt:{20:'ґ'}},
{code:'UR-PK'
,name:'Urdu Arabic'
,normal:'`١٢٣٤٥٦٧٨٩٠-=ڍقصيرتٿعڳوپڇچاسدفگهجڪلکڱزخطڀبنم،.ئ'
,shift:{0:'~!ٰءِءَءُ^۽ﯗ()_+ٺَضِڙٽثغهُڦڃڄآشڊلا̈هگحهجه:؛ـذّظاًٻڻ۾“”؟'}},
{code:'UR-PK'
,name:'Urdu'
,normal:'`1234567890-=\\طصھدٹپتبجح][مورنلہاکی؛\'قفےسشغع،۔/'
,shift:{0:'~!@#$٪^ۖ٭)(_+|ظضذڈثّۃـچخ}{ژزڑںۂءآگي:"‍‌ۓ‎ؤئ‏><؟'}},
{code:'EN-US'
,name:'United States-Dvorak left'
,normal:'`[]/pfmlj4321\\;qbyurso.65=-kcdtheaz87\'xgvwni,09'
,shift:{0:'~{}?',9:'$#@!|:',22:'>^%+_',35:'*&"',44:'<)('}},
{code:'EN-US'
,name:'United States-Dvorak right'
,normal:'`1234jlmfp/[]\\56q.orsuyb;=78zaehtdck-90x,inwvg\''
,shift:{0:'~!@#$',10:'?{}|%^',17:'>',24:':+&*',36:'_()',40:'<',46:'"'}},
{code:'EN-US'
,name:'United States-Dvorak'
,normal:'`1234567890[]\\\',.pyfgcrl/=aoeuidhtns-;qjkxbmwvz'
,shift:{0:'~!@#$%^&*(){}|"<>',24:'?+',36:'_:'}},
{code:'EN-US'
,name:'United States-International'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{1:'¡²³¤€¼½¾‘’¥×¬äåé®þüúíóö«»áßð',34:'ø¶´æ',39:'©',42:'ñµç',46:'¿'}
,shift_alt:{1:'¹',4:'£',12:'÷¦',27:'§',35:'°¨',39:'¢'}
,dk:{'^':'aâeêuûiîoôAÂEÊUÛIÎOÔ ^','\'':'cçaáeéuúiíyýoóCÇAÁEÉUÚIÍYÝOÓ \'','\"':'aäeëuüiïyÿoöAÄEËUÜIÏOÖ "','`':'aàeèuùiìoòAÀEÈUÙIÌOÒ `','~':'nñaãoõNÑAÃOÕ ~'}},
{code:'EN-US'
,name:'US English + Cyrillic'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}
,alt:{0:'‘‚©¤€°',7:'¬',9:'¶№–†¦',16:'є',18:'ћ',20:'ўї',27:'ѕђґѓ',32:'јќљ',37:'џ',42:'њµ“”·'}
,shift_alt:{0:'’„®£§‰',11:'—‡±',43:'™«»•'}
,caps:{0:'ё',14:'йцукенгшщзхъфывапролджэячсмитьбю.'}
,shift_caps:{2:'"№;',6:':?',13:'/',46:','}},
{code:'EN-US'
,name:'US'
,normal:'`1234567890-=\\qwertyuiop[]asdfghjkl;\'zxcvbnm,./'
,shift:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}},
{code:'UZ'
,name:'Uzbek Cyrillic'
,normal:'ё1234567890ғҳ\\йцукенгшўзхъфқвапролджэячсмитьбю.'
,shift:{1:'!"№;%:?*()',13:'/',46:','}},
{code:'VI-VN'
,name:'Vietnamese'
,normal:'`ăâêộ̀̉̃́đ-₫\\qwertyuiopươasdfghjkl;\'zxcvbnm,./'
,shift:{0:'~',11:'_+|',35:':"',44:'<>?'}
,alt:{1:'1234567890',12:'=',24:'[]'}
,shift_alt:{0:'~!@#$%^&*()_+|',24:'{}',35:':"',44:'<>?'}},
{code:'MYA-MM'
,name:'Zawgyi Myanmar'
,normal:'`၁၂၃၄၅၆၇၈၉၀-=၏ဆတနမအပကငသစဟ]ေ်ိ္ါ့ျုူးဒဖထခလဘညာယ.။'
,shift:{0:'~ဍ႑ဋ၌%/ရဂ()×+႒ွ်ၽႊႏၽြႊ႔႕ႈဥဏဧ}ဗွီၤြံဲဳဴၚဓဇဌဃဠႀၿၾဝဈ၊'}
,dk:{']':'--×_==++ဟ[ဧ{]]}}၏\\႒|း;ၚ:ဒ\'ဓ"ယ,ဝ<..ဈ>။/၊?``~~၁1ဍ!၂2႑@၃3ဋ#၄4၌$၅5%%၆6/^၇7ရ&၈8ဂ*၉9((၀0))  ','`':'ဘၻညဉလႅခၡထၳဖၹျႃိႎဒၵ်ၽ္ႍုႉတၱနၷမၼစၥကၠင၍အဤပၸသႆဆၦဂၢရ႐၄၎၅ဩဋၬ၁ၮ၀ဝ  ၿႁဃၣဇၨၾႂဗၺဲႄီႌဓၶွႇၤႋႏ႖ဏၰဥၪႊဣ%ဪ)ဦ၃႗ဌၭ×÷-​႔႕ဈၩဝၯယဎ','~':'ဆၧတၲထၴညၫဘ႓'}}
);