import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLMetaElement_property_setter_getters]
let HTMLMetaElement_property_setter_getters = ['name', 'httpEquiv', 'content', 'scheme'];
for(let i=0; i<HTMLMetaElement_property_setter_getters.length; i++){
    let property = HTMLMetaElement_property_setter_getters[i];
	Object.defineProperty(HTMLMetaElement.prototype, property, {
        get: property_getter('HTMLMetaElement',property+'_getter'),
        set: property_setter('HTMLMetaElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMetaElement_property_setter_getters]
