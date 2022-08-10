import {property_getter} from '../templates.js';

// begin[override HTMLDataListElement_property_setter_getters]
let HTMLDataListElement_property_setter_getters = ['options'];
for(let i=0; i<HTMLDataListElement_property_setter_getters.length; i++){
    let property = HTMLDataListElement_property_setter_getters[i];
	Object.defineProperty(HTMLDataListElement.prototype, property, {
        get: property_getter('HTMLDataListElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDataListElement_property_setter_getters]

