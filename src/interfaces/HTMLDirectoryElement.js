import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLDirectoryElement_property_setter_getters]
let HTMLDirectoryElement_property_setter_getters = ['compact'];
for(let i=0; i<HTMLDirectoryElement_property_setter_getters.length; i++){
    let property = HTMLDirectoryElement_property_setter_getters[i];
	Object.defineProperty(HTMLDirectoryElement.prototype, property, {
        get: property_getter('HTMLDirectoryElement',property+'_getter'),
        set: property_setter('HTMLDirectoryElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDirectoryElement_property_setter_getters]

