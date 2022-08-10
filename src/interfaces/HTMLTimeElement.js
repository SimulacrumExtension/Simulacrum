import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLTimeElement_property_setter_getter]
let HTMLTimeElement_property_setter_getter = ['dateTime'];
for(let i=0; i<HTMLTimeElement_property_setter_getter.length; i++){
    let property = HTMLTimeElement_property_setter_getter[i];
	Object.defineProperty(HTMLTimeElement.prototype, property, {
        get: property_getter('HTMLTimeElement',property+'_getter'),
        set: property_setter('HTMLTimeElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTimeElement_property_setter_getter]
