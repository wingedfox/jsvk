/**
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
}
