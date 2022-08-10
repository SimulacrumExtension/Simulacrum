import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLDetailsElement_property_setter_getters]
let HTMLDetailsElement_property_setter_getters = ['open'];
for(let i=0; i<HTMLDetailsElement_property_setter_getters.length; i++){
    let property = HTMLDetailsElement_property_setter_getters[i];
	Object.defineProperty(HTMLDetailsElement.prototype, property, {
        get: property_getter('HTMLDetailsElement',property+'_getter'),
        set: property_setter('HTMLDetailsElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDetailsElement_property_setter_getters]

