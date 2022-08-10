import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLTitleElement_property_setter_getters]
let HTMLTitleElement_property_setter_getters = ['text'];
for(let i=0; i<HTMLTitleElement_property_setter_getters.length; i++){
    let property = HTMLTitleElement_property_setter_getters[i];
	Object.defineProperty(HTMLTitleElement.prototype, property, {
        get: property_getter('HTMLTitleElement',property+'_getter'),
        set: property_setter('HTMLTitleElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTitleElement_property_setter_getters]

