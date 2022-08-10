import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import {property_interaction, property_getter, property_setter, property_setter_DOMTokenList} from '../templates.js';

// begin[override HTMLMediaElement_property_setter_getter]
let HTMLMediaElement_property_setter_getter = ['src', 'crossOrigin', 'defaultPlaybackRate', 'loop', 'controls', 'defaultMuted', 'srcObject', 'disableRemotePlayback', 'onencrypted', 'onwaitingforkey'];
for(let i=0; i<HTMLMediaElement_property_setter_getter.length; i++){
    let property = HTMLMediaElement_property_setter_getter[i];
	Object.defineProperty(HTMLMediaElement.prototype, property, {
        get: property_getter('HTMLMediaElement',property+'_getter'),
        set: property_setter('HTMLMediaElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMediaElement_property_setter_getter]

// begin[override HTMLMediaElement_property_setter_getters_DOMTokenList]
let HTMLMediaElement_property_setter_getters_DOMTokenList = ['controlsList'];
for(let i=0; i<HTMLMediaElement_property_setter_getters_DOMTokenList.length; i++){
    let property = HTMLMediaElement_property_setter_getters_DOMTokenList[i];
	Object.defineProperty(HTMLMediaElement.prototype, property, {
        get: property_getter('HTMLMediaElement', property+'_getter'),
        set: property_setter_DOMTokenList('HTMLMediaElement', property+'_setter'),
        configurable: true,
        enumerable: true,
	});  
}     
// end[override HTMLMediaElement_property_setter_getters_DOMTokenList]


// begin[override HTMLMediaElement_property_getter_interaction]
let HTMLMediaElement_property_getter_screen = ['error', 'networkState', 'buffered', 'readyState', 'seeking', 'paused', 'played', 'seekable', 'ended', 'textTracks', 'sinkId', 'remote', 'mediaKeys', 'webkitVideoDecodedByteCount', 'webkitAudioDecodedByteCount', 'currentSrc', 'duration'];
for(let i=0; i<HTMLMediaElement_property_getter_screen.length; i++){
    let property = HTMLMediaElement_property_getter_screen[i]
	Object.defineProperty(HTMLMediaElement.prototype, property, {
        get: property_interaction('HTMLMediaElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMediaElement_property_getter_interaction]

// begin[override HTMLMediaElement_method_interaction]
let HTMLMediaElement_method_screen = ['canPlayType', 'load', 'play', 'pause', 'addTextTrack', 'captureStream', 'setSinkId', 'setMediaKeys'];
for(let i=0; i<HTMLMediaElement_method_screen.length; i++){
    let method = HTMLMediaElement_method_screen[i]
	HTMLMediaElement.prototype[method] = property_interaction('HTMLMediaElement',method);
}
// end[override HTMLMediaElement_method_interaction]

// begin[override HTMLMediaElement_property_setter_getter_interaction]
let HTMLMediaElement_property_setter_getter_screen = ['currentTime', 'autoplay', 'preload', 'volume', 'muted', 'playbackRate'];
for(let i=0; i<HTMLMediaElement_property_setter_getter_screen.length; i++){
    let property = HTMLMediaElement_property_setter_getter_screen[i]
	Object.defineProperty(HTMLMediaElement.prototype, property, {
        get: property_interaction('HTMLMediaElement',property+"_getter"),
        set: property_interaction('HTMLMediaElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMediaElement_property_setter_getter_interaction]

