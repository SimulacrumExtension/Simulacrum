import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLDataElement_property_setter_getters]
let HTMLDataElement_property_setter_getters = ['value'];
for(let i=0; i<HTMLDataElement_property_setter_getters.length; i++){
    let property = HTMLDataElement_property_setter_getters[i];
	Object.defineProperty(HTMLDataElement.prototype, property, {
        get: property_getter('HTMLDataElement',property+'_getter'),
        set: property_setter('HTMLDataElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDataElement_property_setter_getters]

