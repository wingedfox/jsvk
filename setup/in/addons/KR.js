var Korean={
Jamo: {
// bits: 1: vowel, 2:
'\u3131':[14,44032,1], //g
'\u3132':[6,44620,2], //gg
'\u3133':[4,-1,3], //gs
'\u3134':[14,45208,4], //n
'\u3135':[4,-1,5], //nj
'\u3136':[4,-1,6], //nh
'\u3137':[6,45796,7], //d
'\u3138':[2,46384,0], //dd
'\u3139':[14,46972,8], //r
'\u313a':[4,-1,9], //lg
'\u313b':[4,-1,10], //lm
'\u313c':[4,-1,11], //lb
'\u313d':[4,-1,12], //ls
'\u313e':[4,-1,13], //lt
'\u313f':[4,-1,14], //lp
'\u3140':[4,-1,15], //lh
'\u3141':[6,47560,16], //m
'\u3142':[14,48148,17], //b
'\u3143':[2,48736,0], //bb
'\u3144':[4,-1,18], //bs
'\u3145':[14,49324,19], //s
'\u3146':[6,49912,20], //ss
'\u3147':[6,50500,21], //ng
'\u3148':[6,51088,22], //j
'\u3149':[2,51676,0], //jj
'\u314a':[6,52264,23], //ch
'\u314b':[6,52852,24], //k
'\u314c':[6,53440,25], //t
'\u314d':[6,54028,26], //p
'\u314e':[6,54616,27], //h
'\u314f':[1,0,0], //a
'\u3150':[1,28,0], //ae
'\u3151':[1,56,0], //ya
'\u3152':[1,84,0], //yae
'\u3153':[1,112,0], //eo
'\u3154':[1,140,0], //e
'\u3155':[1,168,0], //yeo
'\u3156':[1,196,0], //ye
'\u3157':[1,224,0], //o
'\u315b':[1,336,0], //yo
'\u315c':[1,364,0], //u
'\u3160':[1,476,0], //yu ?
'\u3161':[1,504,0], //eu
'\u3163':[1,560,0] //i
},
VV2V:[0,0,0,0,0,0,0,0,0,224,224,224,0,0,364,364,364,0,0,504,0],
V2VV:[0,0,0,0,0,0,0,0,{'\u314f':252,'\u3150':280,'\u3163':308},0,0,0,0,{'\u3153':392,'\u3154':420,'\u3163':448},0,0,0,0, {'\u3163':532},0,0],
CV2C: ['\u3131','\u3132','\u3134','\u3137','\u3138','\u3139','\u3141','\u3142','\u3143','\u3145','\u3146','\u3147','\u3148','\u3149','\u314a','\u314b','\u314c','\u314d','\u314e'],
C2CC: {'\u3131':'\u3132','\u3137':'\u3138','\u3142':'\u3143','\u3145':'\u3146','\u3148':'\u3149'},
CC2C: {'\u3132':'\u3131','\u3138':'\u3137','\u3143':'\u3142','\u3146':'\u3145','\u3149':'\u3148'},
PP2P:[0,0,1,1,0,4,4,0,0,8,8,8,8,8,8,8,0,0,17,0,19,0,0,0,0,0,0,0],
PP2PC:[0,
[0,44032],//g
[0,44620],//gg
[1,49324],//gs
[0,45208],//n
[4,51088],//nj
[4,54616],//nh
[0,45796],//d
[0,46972],//r
[8,44032],//lg
[8,47560],//lm
[8,48148],//lb
[8,49324],//ls
[8,53440],//lt
[8,54028],//lp
[8,54616],//lh
[0,47560],//m
[0,48148],//b
[17,49324],// bs
[0,49324],//s
[0,49912],//ss
[0,50500],//ng
[0,51088],//j
[0,52264],//ch
[0,52852],//k
[0,53440],//t
[0,54028],//p
[0,54616]//h
],

P2PP:[0,{'\u3131':2, '\u3145':3}, //g
0,0,{'\u3148':5, '\u314e':6}, //n
0,0,0,{'\u3131':9, '\u3141':10, '\u3142':11, '\u3145':12, '\u314c':13, '\u314d':14, '\u314e':15}, //r
0,0,0,0,0,0,0, // l*
0,{'\u3145':18}, //b
0, {'\u3145':20}, //s
0,0,0,0,0,0,0,0],

Ru2Kor:{'-':'-',
'\u0430': '\u314f',     '\u0410': '\u314f',//a
'\u0431': '\u3142',     '\u0411': '\u3143',     //b, PP
'\u0432': '\u3157',     '\u0412': '\u3157',     //v
'\u0433': '\u3131',     '\u0413': '\u3132',     //g,G
'\u0434': '\u3137',     '\u0414': '\u3138',     //d,TT
'\u0435': '\u3154',     '\u0415': '\u3154',     //e
'\u0451': '\u315b',     '\u0401': '\u3155',     //yo, Yo
'\u0436': '\u3148',     '\u0416': '\u3148',     //zh
'\u0437': '\u3148',     '\u0417': '\u3148',     //z
'\u0438': '\u3163',     '\u0418': '\u3163',     //i
'\u0439': '\u3163',     '\u0419': '\u3163',     //y
'\u043a': '\u3131',     '\u041a': '\u3132',     //k, K
'\u043b': '\u3139',     '\u041b': '\u3139',     //l
'\u043c': '\u3141',     '\u041c': '\u3141',     //m
'\u043d': '\u3134',     '\u041d': '\u3147',     //n, N=ng
'\u043e': '\u3157',     '\u041e': '\u3153',     //o, O
'\u043f': '\u3142',     '\u041f': '\u3143',     //p, PP
'\u0440': '\u3139',     '\u0420': '\u3139',     //r
'\u0441': '\u3145',     '\u0421': '\u3146',     //s, SS
'\u0442': '\u3137',     '\u0422': '\u3138',     //t, TT
'\u0443': '\u315c',     '\u0423': '\u315c',     //u
'\u0444': '\u314d',     '\u0424': '\u314d',     //f
'\u0445': '\u314e',     '\u0425': '\u314e',     //x
'\u0446': '\u3149',     '\u0426': '\u3149',     //ts
'\u0447': '\u3148',     '\u0427': '\u3149',     //ch, JJ
'\u0448': '\u3145',     '\u0428': '\u3145',     //sh
'\u0449': '\u3145',     '\u0429': '\u3145',     //shch
'\u044a': '\u044a',     
'\u044b': '\u3161',     '\u042b': '\u3161',     //eu
'\u044c': '\u3153',     '\u042c': '\u3153',     // soft sign
'\u044d': '\u3150',     '\u042d': '\u3150',     //ae
'\u044e': '\u3160',     '\u042e': '\u3160',     //yu
'\u044f': '\u3151', '\u042f': '\u3151'//ya
},
RuVowels:         "\u044c\u042c\u0410\u0430\u0415\u0435\u0401\u0451\u0418\u0438\u0419\u0439\u041e\u043e\u0423\u0443\u042b\u044b\u042d\u044d\u042e\u044e\u042f\u044f",
Ru2KorJotVowels:  "\u3155\u3155\u3151\u3151\u3156\u3156\u3155\u315b\u3163\u3163\u3163\u3163\u3155\u315b\u3160\u3160\u3161\u3161\u3152\u3152\u3160\u3160\u3151\u3151",
flags:0 //for some crosstalk
/*
1 -sh
2 -jot
4 -w
8 -
16 -
*/
}
function parseHangul(bufchar){
        if(bufchar=='' || bufchar.length>1) return null
  var code=bufchar.charCodeAt()
        if(code<0x3131 || code >0xD7A3) return null // non Korean buffer
  else if(code<0x314F && code>0x3130) return [Korean.Jamo[bufchar][1],-1,0] // consonant in buffer
        code -= 44032
        var arr=[]
        arr[0]=44032+588*(code / 588 >>0)
        code %= 588
        arr[1]= 28*(code / 28 >>0)
        arr[2]= code % 28
        return arr
}

function KoreanCharProcessor(chr, buf, CVC, rukbd){
        var jamo=Korean.Jamo[chr]
  if(!CVC) CVC=parseHangul(buf)
      if(CVC==null){
                if(!jamo)       return [chr,0]
                else{
                        if(jamo[0] & 2) return [chr,1] //can start a syllable
                        else return [chr,0]
                }
        }else{ // full buf
                if(chr=='\u0008'){
                        if(CVC[2]) return [ String.fromCharCode( CVC[0]+CVC[1]+Korean.PP2P[CVC[2]]), 1]
                        else if(CVC[1]>-1){
                                var VV2V=Korean.VV2V[CVC[1]/28]
                                if(VV2V) return [String.fromCharCode(CVC[0]+VV2V), 1]
                                else return [Korean.CV2C[(CVC[0]-44032)/588], 1]
                        }
                        else if(Korean.CC2C[buf])return [Korean.CC2C[buf],1]
                        else{
                                Korean.flags=0
                                 return['',0] 
                        }
                }else if(!jamo){
                        Korean.flags=0
                  return [buf+chr,0]
                }else if(CVC[2]){ // [CVC]
                        if(jamo[0] & 2) { //[CVC] +C
                                var P2PP = Korean.P2PP[CVC[2]][chr]    
                                if(P2PP) return [ String.fromCharCode( CVC[0]+CVC[1]+P2PP), 1] // [CVCC]
                                else return [buf+chr, 1] // CVC, [C]
                        }else if(jamo[0] & 1){// [CVC] +V
                                        if(rukbd && CVC[2]==21) return [buf+String.fromCharCode(50500+jamo[1]),1]
                                 return [String.fromCharCode( CVC[0]+CVC[1]+Korean.PP2PC[CVC[2]][0])+
                                 String.fromCharCode( Korean.PP2PC[CVC[2]][1]+Korean.Jamo[chr][1]),
                                 1] // CV(P) [PV]
                        }else{ // [CVC] + PP
                                return [buf+chr, 0]
                        }
                }else if(CVC[1]>-1){ // [CV]
                                Korean.flags &=~ 3
                        if(jamo[0] & 4) // [CV] +P
                                return [String.fromCharCode(CVC[0]+CVC[1]+jamo[2]), 1] // [CVC]
                        else if(jamo[0] & 1){ // [CV]+V
                                     if(rukbd){
                                                var vow
                                                if(Korean.flags & 4 && (vow='\u3153\u3154\u3163'.indexOf(chr))!=-1){//weo, we, wi
                                                        Korean.flags &=~4
                                                        return [String.fromCharCode(CVC[0]+[392,308,448][vow]),1]
                                                }
                                }
                                var V2VV = Korean.V2VV[CVC[1]/28][chr]
                                if(V2VV) {// [CVV]
                                        //Korean.flags &=~7
                                        return [String.fromCharCode(CVC[0]+V2VV), 1] 
                                }else {// CV,[V]
                                        if(rukbd){
                                                        //Korean.flags &=~7
                                                        return [buf+String.fromCharCode(50500+jamo[1]),1]
                                        }
                                        else return [buf+chr, 0] 
                                }
                        }
                        else return [buf+chr, 1] //CV [C]
                }
                else if(jamo[0] & 1) {// [C] +V 
                                return [String.fromCharCode(Korean.Jamo[buf][1]+jamo[1]), 1]
                }else{ //[C]+C
                                if(buf==chr && Korean.C2CC[buf]) return [Korean.C2CC[buf],1]
                                else return [buf+chr, 1]
                }
        }
};