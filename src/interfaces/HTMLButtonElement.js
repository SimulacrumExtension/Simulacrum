import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLButtonElement_property_getter]
let HTMLButtonElement_property_getter = ['form', 'willValidate', 'labels'];
for(let i=0; i<HTMLButtonElement_property_getter.length; i++){
    let property = HTMLButtonElement_property_getter[i];
	Object.defineProperty(HTMLButtonElement.prototype, property, {
        get: property_getter('HTMLButtonElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLButtonElement_property_getter]

// begin[override HTMLButtonElement_property_setter_getter]
let HTMLButtonElement_property_setter_getter = ['disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'value'];
for(let i=0; i<HTMLButtonElement_property_setter_getter.length; i++){
    let property = HTMLButtonElement_property_setter_getter[i];
	Object.defineProperty(HTMLButtonElement.prototype, property, {
        get: property_getter('HTMLButtonElement', property+'_getter'),
        set: property_setter('HTMLButtonElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLButtonElement_property_setter_getter]

// begin[override HTMLButtonElement_property_getter_interaction]
let HTMLButtonElement_property_getter_interaction = ['validity', 'validationMessage'];
for(let i=0; i<HTMLButtonElement_property_getter_interaction.length; i++){
    let property = HTMLButtonElement_property_getter_interaction[i]
	Object.defineProperty(HTMLButtonElement.prototype, property, {
        get: property_interaction('HTMLButtonElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLButtonElement_property_getter_interaction]

// begin[override HTMLButtonElement_method_interaction]
let HTMLButtonElement_method_interaction = ['checkValidity', 'reportValidity', 'setCustomValidity']
for(let i=0; i<HTMLButtonElement_method_interaction.length; i++){
    let method = HTMLButtonElement_method_interaction[i]
	HTMLButtonElement.prototype[method] = property_interaction('HTMLButtonElement',method);
}
// end[override HTMLButtonElement_method_interaction]

