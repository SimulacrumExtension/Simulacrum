import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLBaseElement_property_setter_getter]
let HTMLBaseElement_property_setter_getter = ['href', 'target'];
for(let i=0; i<HTMLBaseElement_property_setter_getter.length; i++){
    let property = HTMLBaseElement_property_setter_getter[i];
	Object.defineProperty(HTMLBaseElement.prototype, property, {
        get: property_getter('HTMLBaseElement', property+'_getter'),
        set: property_setter('HTMLBaseElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLBaseElement_property_setter_getter]
