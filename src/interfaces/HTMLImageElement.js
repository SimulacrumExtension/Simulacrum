import {property_interaction,property_getter,property_setter} from '../templates.js';

// begin[override HTMLImageElement_property_getters_interaction]
let HTMLImageElement_property_getters_interaction = ['complete', 'naturalWidth', 'naturalHeight', 'currentSrc', 'x', 'y'];
for(let i=0; i<HTMLImageElement_property_getters_interaction.length; i++){
    let property = HTMLImageElement_property_getters_interaction[i]
	Object.defineProperty(HTMLImageElement.prototype, property, {
        get: property_interaction('HTMLImageElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLImageElement_property_getters_interaction]

// begin[override HTMLImageElement_property_setter_getter]
let HTMLImageElement_property_setter_getter = ['alt', 'src', 'srcset', 'sizes', 'crossOrigin', 'useMap', 'isMap', 'width', 'height', 'referrerPolicy', 'decoding', 'name', 'lowsrc', 'align', 'hspace', 'vspace', 'longDesc', 'border', 'loading'];
for(let i=0; i<HTMLImageElement_property_setter_getter.length; i++){
    let property = HTMLImageElement_property_setter_getter[i];
	Object.defineProperty(HTMLImageElement.prototype, property, {
        get: property_getter('HTMLImageElement', property+'_getter'),
        set: property_setter('HTMLImageElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLImageElement_property_setter_getter]

// begin[override HTMLImageElement_method_interaction]
let HTMLImageElement_method_get = ['decode'];
for(let i=0; i<HTMLImageElement_method_get.length; i++){
    let method = HTMLImageElement_method_get[i];
	HTMLImageElement.prototype[method] = property_interaction('HTMLImageElement',method);
}
// end[override HTMLImageElement_method_interaction]