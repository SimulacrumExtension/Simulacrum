import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLDivElement_property_setter_getter]
let HTMLDivElement_property_setter_getter = ['align'];
for(let i=0; i<HTMLDivElement_property_setter_getter.length; i++){
    let property = HTMLDivElement_property_setter_getter[i];
	Object.defineProperty(HTMLDivElement.prototype, property, {
        get: property_getter('HTMLDivElement',property+'_getter'),
        set: property_setter('HTMLDivElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDivElement_property_setter_getter]
