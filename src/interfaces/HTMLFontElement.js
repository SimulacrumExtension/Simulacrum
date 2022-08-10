import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLFontElement_property_setter_getter]
let HTMLFontElement_property_setter_getter = ['color', 'face', 'size'];
for(let i=0; i<HTMLFontElement_property_setter_getter.length; i++){
    let property = HTMLFontElement_property_setter_getter[i];
	Object.defineProperty(HTMLFontElement.prototype, property, {
        get: property_getter('HTMLFontElement', property+'_getter'),
        set: property_setter('HTMLFontElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFontElement_property_setter_getter]

