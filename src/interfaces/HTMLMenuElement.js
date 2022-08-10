import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLMenuElement_property_setter_getters]
let HTMLMenuElement_property_setter_getters = ['compact'];
for(let i=0; i<HTMLMenuElement_property_setter_getters.length; i++){
    let property = HTMLMenuElement_property_setter_getters[i];
	Object.defineProperty(HTMLMenuElement.prototype, property, {
        get: property_getter('HTMLMenuElement',property+'_getter'),
        set: property_setter('HTMLMenuElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMenuElement_property_setter_getters]
