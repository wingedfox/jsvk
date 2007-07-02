function(chr, buf){
    if (chr=='\u0008') { // backspace
        if (buf.length) {
            return [buf.slice(0,-1),buf.length-1]
        } 
    } else { //non backspace
        return VirtualKeyboard.Langs.LA.remap[buf+chr] || [buf+chr, 1]
    }
}