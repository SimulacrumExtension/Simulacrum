import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLFormElement_property_getter]
let HTMLFormElement_property_getter = ['elements', 'length'];
for(let i=0; i<HTMLFormElement_property_getter.length; i++){
    let property = HTMLFormElement_property_getter[i];
	Object.defineProperty(HTMLFormElement.prototype, property, {
        get: property_getter('HTMLFormElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFormElement_property_getter]


// begin[override HTMLFormElement_property_setter_getter]
let HTMLFormElement_property_setter_getter = ['acceptCharset', 'action', 'autocomplete', 'enctype', 'encoding', 'method', 'name', 'noValidate', 'target'];
for(let i=0; i<HTMLFormElement_property_setter_getter.length; i++){
    let property = HTMLFormElement_property_setter_getter[i];
	Object.defineProperty(HTMLFormElement.prototype, property, {
        get: property_getter('HTMLFormElement', property+'_getter'),
        set: property_setter('HTMLFormElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFormElement_property_setter_getter]

// begin[override HTMLFormElement_method_set]
let HTMLFormElement_method_set = ['reset'];
for(let i=0; i<HTMLFormElement_method_set.length; i++){
    let method = HTMLFormElement_method_set[i];
    HTMLFormElement.prototype[method] = property_setter('HTMLFormElement', method);
}
// end[override HTMLFormElement_method_set]

// begin[override HTMLFormElement_method_interaction]
let HTMLFormElement_method_interaction = ['submit', 'requestSubmit', 'checkValidity', 'reportValidity']
for(let i=0; i<HTMLFormElement_method_interaction.length; i++){
    let method = HTMLFormElement_method_interaction[i]
	HTMLFormElement.prototype[method] = property_interaction('HTMLFormElement',method);
}
// end[override HTMLFormElement_method_interaction]
