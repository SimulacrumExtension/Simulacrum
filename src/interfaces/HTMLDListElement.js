import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLDListElement_property_setter_getter]
let HTMLDListElement_property_setter_getter = ['compact'];
for(let i=0; i<HTMLDListElement_property_setter_getter.length; i++){
    let property = HTMLDListElement_property_setter_getter[i];
	Object.defineProperty(HTMLDListElement.prototype, property, {
        get: property_getter('HTMLDListElement',property+'_getter'),
        set: property_setter('HTMLDListElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDListElement_property_setter_getter]

