import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLModElement_property_setter_getter]
let HTMLModElement_property_setter_getter = ['cite', 'dateTime'];
for(let i=0; i<HTMLModElement_property_setter_getter.length; i++){
    let property = HTMLModElement_property_setter_getter[i];
	Object.defineProperty(HTMLModElement.prototype, property, {
        get: property_getter('HTMLModElement',property+'_getter'),
        set: property_setter('HTMLModElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLModElement_property_setter_getter]


