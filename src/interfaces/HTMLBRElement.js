import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLBRElement_property_setter_getters]
let HTMLBRElement_property_setter_getters = ['clear'];
for(let i=0; i<HTMLBRElement_property_setter_getters.length; i++){
    let property = HTMLBRElement_property_setter_getters[i];
	Object.defineProperty(HTMLBRElement.prototype, property, {
        get: property_getter('HTMLBRElement',property+'_getter'),
        set: property_setter('HTMLBRElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLBRElement_property_setter_getters]

