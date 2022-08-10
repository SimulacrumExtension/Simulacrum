import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLOptionElement_property_getter]
let HTMLOptionElement_property_getter = ['form', 'index'];
for(let i=0; i<HTMLOptionElement_property_getter.length; i++){
    let property = HTMLOptionElement_property_getter[i];
	Object.defineProperty(HTMLOptionElement.prototype, property, {
        get: property_getter('HTMLOptionElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOptionElement_property_getter]

// begin[override HTMLOptionElement_property_setter_getter_interaction]
let HTMLOptionElement_property_setter_getter_interaction = ['selected'];
for(let i=0; i<HTMLOptionElement_property_setter_getter_interaction.length; i++){
    let property = HTMLOptionElement_property_setter_getter_interaction[i];
	Object.defineProperty(HTMLOptionElement.prototype, property, {
        get: property_interaction('HTMLOptionElement', property+'_getter'),
        set: property_interaction('HTMLOptionElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOptionElement_property_setter_getter_interaction]

// begin[override HTMLOptionElement_property_setter_getter]
let HTMLOptionElement_property_setter_getter = ['disabled', 'label', 'defaultSelected', 'value', 'text'];
for(let i=0; i<HTMLOptionElement_property_setter_getter.length; i++){
    let property = HTMLOptionElement_property_setter_getter[i];
	Object.defineProperty(HTMLOptionElement.prototype, property, {
        get: property_getter('HTMLOptionElement', property+'_getter'),
        set: property_setter('HTMLOptionElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOptionElement_property_setter_getter]


