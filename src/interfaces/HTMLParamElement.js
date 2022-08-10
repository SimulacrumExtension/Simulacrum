import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLParamElement_property_setter_getters]
let HTMLParamElement_property_setter_getters = ['name', 'value', 'type', 'valueType'];
for(let i=0; i<HTMLParamElement_property_setter_getters.length; i++){
    let property = HTMLParamElement_property_setter_getters[i];
	Object.defineProperty(HTMLParamElement.prototype, property, {
        get: property_getter('HTMLParamElement',property+'_getter'),
        set: property_setter('HTMLParamElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLParamElement_property_setter_getters]
