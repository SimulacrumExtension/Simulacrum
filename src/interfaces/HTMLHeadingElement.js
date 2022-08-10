import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLHeadingElement_property_setter_getters]
let HTMLHeadingElement_property_setter_getters = ['align'];
for(let i=0; i<HTMLHeadingElement_property_setter_getters.length; i++){
    let property = HTMLHeadingElement_property_setter_getters[i];
	Object.defineProperty(HTMLHeadingElement.prototype, property, {
        get: property_getter('HTMLHeadingElement',property+'_getter'),
        set: property_setter('HTMLHeadingElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLHeadingElement_property_setter_getters]

