import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLLabelElement_property_setter_getter]
let HTMLLabelElement_property_setter_getter = ['htmlFor'];
for(let i=0; i<HTMLLabelElement_property_setter_getter.length; i++){
    let property = HTMLLabelElement_property_setter_getter[i];
	Object.defineProperty(HTMLLabelElement.prototype, property, {
        get: property_getter('HTMLLabelElement', property+'_getter'),
        set: property_setter('HTMLLabelElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLabelElement_property_setter_getter]

// begin[override HTMLLabelElement_property_getter]
let HTMLLabelElement_property_getter = ['form', 'control'];
for(let i=0; i<HTMLLabelElement_property_getter.length; i++){
    let property = HTMLLabelElement_property_getter[i];
	Object.defineProperty(HTMLLabelElement.prototype, property, {
        get: property_getter('HTMLLabelElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLabelElement_property_getter]

