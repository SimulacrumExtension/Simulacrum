import {property_interaction,property_getter,property_setter, property_setter_DOMTokenList, property_elementAppender} from '../templates.js';

// begin[override HTMLOutputElement_property_getter]
let HTMLOutputElement_property_getter = ['form', 'type', 'willValidate', 'labels', 'value'];
for(let i=0; i<HTMLOutputElement_property_getter.length; i++){
    let property = HTMLOutputElement_property_getter[i];
	Object.defineProperty(HTMLOutputElement.prototype, property, {
        get: property_getter('HTMLOutputElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOutputElement_property_getter]

// begin[override HTMLOutputElement_property_getter_interaction]
let HTMLOutputElement_property_getter_interaction = ['validity', 'validationMessage'];
for(let i=0; i<HTMLOutputElement_property_getter_interaction.length; i++){
    let property = HTMLOutputElement_property_getter_interaction[i]
	Object.defineProperty(HTMLOutputElement.prototype, property, {
        get: property_interaction('HTMLOutputElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOutputElement_property_getter_interaction]

// begin[override HTMLOutputElement_property_setter_getter_interaction]
let HTMLOutputElement_property_setter_getter_interaction = ['value'];
for(let i=0; i<HTMLOutputElement_property_setter_getter_interaction.length; i++){
    let property = HTMLOutputElement_property_setter_getter_interaction[i]
	Object.defineProperty(HTMLOutputElement.prototype, property, {
        get: property_interaction('HTMLOutputElement',property+"_getter"),
        set: property_interaction('HTMLOutputElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOutputElement_property_setter_getter_interaction]

// begin[override HTMLOutputElement_property_setter_getter]
let HTMLOutputElement_property_setter_getter = ['name', 'defaultValue'];
for(let i=0; i<HTMLOutputElement_property_setter_getter.length; i++){
    let property = HTMLOutputElement_property_setter_getter[i];
	Object.defineProperty(HTMLOutputElement.prototype, property, {
        get: property_getter('HTMLOutputElement', property+'_getter'),
        set: property_setter('HTMLOutputElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOutputElement_property_setter_getter]

// begin[override HTMLOutputElement_property_setter_getters_DOMTokenList]
let HTMLOutputElement_property_setter_getters_DOMTokenList = ['htmlFor'];
for(let i=0; i<HTMLOutputElement_property_setter_getters_DOMTokenList.length; i++){
    let property = HTMLOutputElement_property_setter_getters_DOMTokenList[i];
	Object.defineProperty(HTMLOutputElement.prototype, property, {
        get: property_getter('HTMLOutputElement', property+'_getter'),
        set: property_setter_DOMTokenList('HTMLOutputElement', property+'_setter'),
        configurable: true,
        enumerable: true,
	});  
}     
// end[override HTMLOutputElement_property_setter_getters_DOMTokenList]

// begin[override HTMLOutputElement_method_interaction]
let HTMLOutputElement_method_interaction = ['checkValidity', 'reportValidity', 'setCustomValidity']
for(let i=0; i<HTMLOutputElement_method_interaction.length; i++){
    let method = HTMLOutputElement_method_interaction[i]
	HTMLOutputElement.prototype[method] = property_interaction('HTMLOutputElement',method);
}
// end[override HTMLOutputElement_method_interaction]

