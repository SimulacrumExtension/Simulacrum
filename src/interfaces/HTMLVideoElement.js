import {property_interaction,property_getter, property_setter} from '../templates.js';

// begin[override HTMLVideoElement_property_setter_getter]
let HTMLVideoElement_property_setter_getter = ['disablePictureInPicture', 'width', 'height', 'poster', 'playsInline', 'onenterpictureinpicture', 'onleavepictureinpicture'];
for(let i=0; i<HTMLVideoElement_property_setter_getter.length; i++){
    let property = HTMLVideoElement_property_setter_getter[i];
	Object.defineProperty(HTMLVideoElement.prototype, property, {
        get: property_getter('HTMLVideoElement',property+'_getter'),
        set: property_setter('HTMLVideoElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLVideoElement_property_setter_getter]

// begin[override HTMLVideoElement_property_getters_interaction]
let HTMLVideoElement_property_getters_interaction = ['videoWidth', 'videoHeight', 'webkitDecodedFrameCount', 'webkitDroppedFrameCount', 'webkitDisplayingFullscreen', 'webkitSupportsFullscreen'];
for(let i=0; i<HTMLVideoElement_property_getters_interaction.length; i++){
    let property = HTMLVideoElement_property_getters_interaction[i]
	Object.defineProperty(HTMLVideoElement.prototype, property, {
        get: property_interaction('HTMLVideoElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLVideoElement_property_getters_interaction]

// begin[override HTMLVideoElement_method_interaction]
let HTMLVideoElement_method_interaction = ['webkitEnterFullscreen', 'webkitExitFullscreen', 'webkitEnterFullScreen', 'webkitExitFullScreen', 'getVideoPlaybackQuality', 'requestPictureInPicture'];
for(let i=0; i<HTMLVideoElement_method_interaction.length; i++){
    let method = HTMLVideoElement_method_interaction[i]
	HTMLVideoElement.prototype[method] = property_interaction('HTMLVideoElement',method);
}
// end[override HTMLVideoElement_method_interaction]