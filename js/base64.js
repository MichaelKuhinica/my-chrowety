// optimized by leodutra.br (2009y.12m.29d)

function btoa(str){
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var L = str.length;
    var ENCODED = [];
    var n = 0; // encoded index, optimization
    var c = 0;
    var b1;
    var b2;
    var buf;
    while (c < L) {
        buf = ((str.charCodeAt(c)) << 16) + ((b1 = str.charCodeAt(c + 1)) << 8 || 0) + ((b2 = str.charCodeAt(c + 2)) || 0);
        c += 3; // optimization
        ENCODED[n] = CHARS.charAt((buf & (63 << 18)) >> 18);
        ENCODED[n + 1] = CHARS.charAt((buf & (63 << 12)) >> 12);
        ENCODED[n + 2] = CHARS.charAt(isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6);
        ENCODED[n + 3] = CHARS.charAt(isNaN(b2) ? 64 : (buf & 63));
        n += 4; //opt
    }
    return ENCODED.join('');
}

function atob(str){
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    if (str.length % 4 !== 0 || (new RegExp('[^' + CHARS + ']')).test(str) || (/\=/.test(str) && ((/\=[^\=]/).test(str) || (/\={3}/).test(str)))) {
        throw new Error('Invalid base64 data');
    }
    var L = str.length;
    var DECODED = [];
    var n = 0; // DECODED index, opt
    var c = 0;
    var i1;
    var i2;
    var i3;
    var buf;
    var b1;
    var b2;
    while (c < L) {
        i1 = CHARS.indexOf(str.charAt(c + 1));
        i2 = CHARS.indexOf(str.charAt(c + 2));
        i3 = CHARS.indexOf(str.charAt(c + 3));
        buf = (CHARS.indexOf(str.charAt(c)) << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
        c += 4; // opt
        DECODED[n++] = String.fromCharCode((buf & (255 << 16)) >> 16);
        if ((b1 = (i2 == 64) ? false : -1 < (buf & (255 << 8)) >> 8)) { //  -1 < is faster than >= 0
            DECODED[n++] = String.fromCharCode(b1);
        }
        if ((b2 = (i3 == 64) ? false : -1 < (buf & 255))) { // -1 < is faster than >= 0
            DECODED[n++] = String.fromCharCode(b2);
        }
    }
    return DECODED.join('');
}
