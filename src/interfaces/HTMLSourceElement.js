import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLSourceElement_property_setter_getters]
let HTMLSourceElement_property_setter_getters = ['src', 'type', 'srcset', 'sizes', 'media'];
for(let i=0; i<HTMLSourceElement_property_setter_getters.length; i++){
    let property = HTMLSourceElement_property_setter_getters[i];
	Object.defineProperty(HTMLSourceElement.prototype, property, {
        get: property_getter('HTMLSourceElement',property+'_getter'),
        set: property_setter('HTMLSourceElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSourceElement_property_setter_getters]


