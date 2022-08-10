import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLFieldSetElement_property_getter]
let HTMLFieldSetElement_property_getter = ['form', 'type', 'elements', 'willValidate'];
for(let i=0; i<HTMLFieldSetElement_property_getter.length; i++){
    let property = HTMLFieldSetElement_property_getter[i];
	Object.defineProperty(HTMLFieldSetElement.prototype, property, {
        get: property_getter('HTMLFieldSetElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFieldSetElement_property_getter]

// begin[override HTMLFieldSetElement_property_getter_interaction]
let HTMLFieldSetElement_property_getter_interaction = ['validity', 'validationMessage'];
for(let i=0; i<HTMLFieldSetElement_property_getter_interaction.length; i++){
    let property = HTMLFieldSetElement_property_getter_interaction[i];
	Object.defineProperty(HTMLFieldSetElement.prototype, property, {
        get: property_interaction('HTMLFieldSetElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFieldSetElement_property_getter_interaction]

// begin[override HTMLFieldSetElement_property_setter_getter]
let HTMLFieldSetElement_property_setter_getter = ['disabled', 'name'];
for(let i=0; i<HTMLFieldSetElement_property_setter_getter.length; i++){
    let property = HTMLFieldSetElement_property_setter_getter[i];
	Object.defineProperty(HTMLFieldSetElement.prototype, property, {
        get: property_getter('HTMLFieldSetElement', property+'_getter'),
        set: property_setter('HTMLFieldSetElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFieldSetElement_property_setter_getter]

// begin[override HTMLFieldSetElement_method_interaction]
let HTMLFieldSetElement_method_interaction = ['checkValidity', 'reportValidity', 'setCustomValidity']
for(let i=0; i<HTMLFieldSetElement_method_interaction.length; i++){
    let method = HTMLFieldSetElement_method_interaction[i]
	HTMLFieldSetElement.prototype[method] = property_interaction('HTMLFieldSetElement',method);
}
// end[override HTMLFieldSetElement_method_interaction]