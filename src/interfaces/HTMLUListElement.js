import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLUListElement_property_setter_getters]
let HTMLUListElement_property_setter_getters = ['compact', 'type'];
for(let i=0; i<HTMLUListElement_property_setter_getters.length; i++){
    let property = HTMLUListElement_property_setter_getters[i];
	Object.defineProperty(HTMLUListElement.prototype, property, {
        get: property_getter('HTMLUListElement',property+'_getter'),
        set: property_setter('HTMLUListElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLUListElement_property_setter_getters]

