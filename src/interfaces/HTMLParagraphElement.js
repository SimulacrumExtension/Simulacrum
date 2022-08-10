import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLParagraphElement_property_setter_getter]
let HTMLParagraphElement_property_setter_getter = ['align'];
for(let i=0; i<HTMLParagraphElement_property_setter_getter.length; i++){
    let property = HTMLParagraphElement_property_setter_getter[i];
	Object.defineProperty(HTMLParagraphElement.prototype, property, {
        get: property_getter('HTMLParagraphElement',property+'_getter'),
        set: property_setter('HTMLParagraphElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLParagraphElement_property_setter_getter]

