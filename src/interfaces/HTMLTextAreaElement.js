import {property_interaction,property_getter, property_setter} from '../templates.js';

// begin[override HTMLTextAreaElement_property_getters]
let HTMLTextAreaElement_property_getters = ['form', 'type', 'willValidate', 'labels'];
for(let i=0; i<HTMLTextAreaElement_property_getters.length; i++){
    let property = HTMLTextAreaElement_property_getters[i];
	Object.defineProperty(HTMLTextAreaElement.prototype, property, {
        get: property_getter('HTMLTextAreaElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTextAreaElement_property_getters]

// begin[override HTMLTextAreaElement_property_getters_interaction]
let HTMLTextAreaElement_property_getters_interaction = ['validity', 'textLength', 'validationMessage'];
for(let i=0; i<HTMLTextAreaElement_property_getters_interaction.length; i++){
    let property = HTMLTextAreaElement_property_getters_interaction[i]
	Object.defineProperty(HTMLTextAreaElement.prototype, property, {
        get: property_interaction('HTMLTextAreaElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTextAreaElement_property_getters_interaction]

// begin[override HTMLTextAreaElement_property_setter_getter]
let HTMLTextAreaElement_property_setter_getter = ['autocomplete', 'cols', 'dirName', 'disabled', 'maxLength', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'rows', 'wrap', 'defaultValue'];
for(let i=0; i<HTMLTextAreaElement_property_setter_getter.length; i++){
    let property = HTMLTextAreaElement_property_setter_getter[i];
	Object.defineProperty(HTMLTextAreaElement.prototype, property, {
        get: property_getter('HTMLTextAreaElement',property+'_getter'),
        set: property_setter('HTMLTextAreaElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTextAreaElement_property_setter_getter]

// begin[override HTMLTextAreaElement_property_setter_getter_interaction]
let HTMLTextAreaElement_property_setter_getter_interaction = ['value', 'selectionStart', 'selectionEnd', 'selectionDirection'];
for(let i=0; i<HTMLTextAreaElement_property_setter_getter_interaction.length; i++){
    let property = HTMLTextAreaElement_property_setter_getter_interaction[i];
	Object.defineProperty(HTMLTextAreaElement.prototype, property, {
        get: property_interaction('HTMLTextAreaElement',property+"_getter"),
        set: property_interaction('HTMLTextAreaElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTextAreaElement_property_setter_getter_interaction]

// begin[override HTMLTextAreaElement_method_interaction]
let HTMLTextAreaElement_method_interaction = ['checkValidity', 'reportValidity', 'setCustomValidity', 'select', 'setRangeText', 'setSelectionRange'];
for(let i=0; i<HTMLTextAreaElement_method_interaction.length; i++){
    let method = HTMLTextAreaElement_method_interaction[i]
	HTMLTextAreaElement.prototype[method] = property_interaction('HTMLTextAreaElement',method);
}
// end[override HTMLTextAreaElement_method_interaction]

