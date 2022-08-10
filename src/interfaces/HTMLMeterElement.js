import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLMeterElement_property_setter_getter]
let HTMLMeterElement_property_setter_getter = ['value', 'min', 'max', 'low', 'high', 'optimum'];
for(let i=0; i<HTMLMeterElement_property_setter_getter.length; i++){
    let property = HTMLMeterElement_property_setter_getter[i];
	Object.defineProperty(HTMLMeterElement.prototype, property, {
        get: property_getter('HTMLMeterElement', property+'_getter'),
        set: property_setter('HTMLMeterElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMeterElement_property_setter_getter]

// begin[override HTMLMeterElement_property_getter]
let HTMLMeterElement_property_getter = ['labels'];
for(let i=0; i<HTMLMeterElement_property_getter.length; i++){
    let property = HTMLMeterElement_property_getter[i];
	Object.defineProperty(HTMLMeterElement.prototype, property, {
        get: property_getter('HTMLMeterElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMeterElement_property_getter]
