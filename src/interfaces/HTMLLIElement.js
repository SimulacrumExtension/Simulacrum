import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLLIElement_property_setter_getter]
let HTMLLIElement_property_setter_getter = ['value', 'type'];
for(let i=0; i<HTMLLIElement_property_setter_getter.length; i++){
    let property = HTMLLIElement_property_setter_getter[i];
	Object.defineProperty(HTMLLIElement.prototype, property, {
        get: property_getter('HTMLLIElement',property+'_getter'),
        set: property_setter('HTMLLIElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLIElement_property_setter_getter]

