import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLLegendElement_property_setter_getter]
let HTMLLegendElement_property_setter_getter = ['align'];
for(let i=0; i<HTMLLegendElement_property_setter_getter.length; i++){
    let property = HTMLLegendElement_property_setter_getter[i];
	Object.defineProperty(HTMLLegendElement.prototype, property, {
        get: property_getter('HTMLLegendElement',property+'_getter'),
        set: property_setter('HTMLLegendElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLegendElement_property_setter_getter]

// begin[override HTMLLegendElement_property_getter]
let HTMLLegendElement_property_getter = ['form'];
for(let i=0; i<HTMLLegendElement_property_getter.length; i++){
    let property = HTMLLegendElement_property_getter[i];
	Object.defineProperty(HTMLLegendElement.prototype, property, {
        get: property_getter('HTMLLegendElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLegendElement_property_getter]

