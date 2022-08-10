import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLProgressElement_property_setter_getters]
let HTMLProgressElement_property_setter_getters = ['value', 'max'];
for(let i=0; i<HTMLProgressElement_property_setter_getters.length; i++){
    let property = HTMLProgressElement_property_setter_getters[i];
	Object.defineProperty(HTMLProgressElement.prototype, property, {
        get: property_getter('HTMLProgressElement', property+'_getter'),
        set: property_setter('HTMLProgressElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLProgressElement_property_setter_getters]

// begin[override HTMLProgressElement_property_getters]
let HTMLProgressElement_property_getters = ['position', 'labels'];
for(let i=0; i<HTMLProgressElement_property_getters.length; i++){
    let property = HTMLProgressElement_property_getters[i];
	Object.defineProperty(HTMLProgressElement.prototype, property, {
        get: property_getter('HTMLProgressElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLProgressElement_property_getters]