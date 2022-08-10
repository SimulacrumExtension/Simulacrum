import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLQuoteElement_property_setter_getter]
let HTMLQuoteElement_property_setter_getter = ['cite'];
for(let i=0; i<HTMLQuoteElement_property_setter_getter.length; i++){
    let property = HTMLQuoteElement_property_setter_getter[i];
	Object.defineProperty(HTMLQuoteElement.prototype, property, {
        get: property_getter('HTMLQuoteElement',property+'_getter'),
        set: property_setter('HTMLQuoteElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLQuoteElement_property_setter_getter]

