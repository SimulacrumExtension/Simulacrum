import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLTableCaptionElement_property_setter_getters]
let HTMLTableCaptionElement_property_setter_getters = ['align'];
for(let i=0; i<HTMLTableCaptionElement_property_setter_getters.length; i++){
    let property = HTMLTableCaptionElement_property_setter_getters[i];
	Object.defineProperty(HTMLTableCaptionElement.prototype, property, {
        get: property_getter('HTMLTableCaptionElement',property+'_getter'),
        set: property_setter('HTMLTableCaptionElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableCaptionElement_property_setter_getters]

