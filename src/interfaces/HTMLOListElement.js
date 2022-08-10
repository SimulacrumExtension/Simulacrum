import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLOListElement_property_setter_getters]
let HTMLOListElement_property_setter_getters = ['reversed', 'start', 'type', 'compact'];
for(let i=0; i<HTMLOListElement_property_setter_getters.length; i++){
    let property = HTMLOListElement_property_setter_getters[i];
	Object.defineProperty(HTMLOListElement.prototype, property, {
        get: property_getter('HTMLOListElement',property+'_getter'),
        set: property_setter('HTMLOListElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOListElement_property_setter_getters]
