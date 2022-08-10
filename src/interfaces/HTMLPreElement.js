import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLPreElement_property_setter_getter]
let HTMLPreElement_property_setter_getter = ['width'];
for(let i=0; i<HTMLPreElement_property_setter_getter.length; i++){
    let property = HTMLPreElement_property_setter_getter[i];
	Object.defineProperty(HTMLPreElement.prototype, property, {
        get: property_getter('HTMLPreElement',property+'_getter'),
        set: property_setter('HTMLPreElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLPreElement_property_setter_getter]

