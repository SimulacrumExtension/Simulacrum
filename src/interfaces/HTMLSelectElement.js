import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import {property_interaction,property_getter, property_setter, property_elementAppender, property_getter_HTMLCollection_interaction} from '../templates.js';


// begin[override HTMLSelectElement_property_getter_HTMLCollection_interaction]
let HTMLSelectElement_property_getter_HTMLCollection_interaction = ['selectedOptions'];
for(let i=0; i<HTMLSelectElement_property_getter_HTMLCollection_interaction.length; i++){
    let property = HTMLSelectElement_property_getter_HTMLCollection_interaction[i]
	Object.defineProperty(HTMLSelectElement.prototype, property, {
		get: property_getter_HTMLCollection_interaction('HTMLSelectElement',property+'_getter'),
		configurable: true,
		enumerable: true,
	});
}
// end[override HTMLSelectElement_property_getter_HTMLCollection_interaction]

// begin[override HTMLSelectElement_method_elementAppender]
let HTMLSelectElement_method_elementAppender = ['add'];
for(let i=0; i<HTMLSelectElement_method_elementAppender.length; i++){
    let method = HTMLSelectElement_method_elementAppender[i];
	HTMLSelectElement.prototype[method] = property_elementAppender('HTMLSelectElement', method);
}
// end[override HTMLSelectElement_method_elementAppender]

// begin[override HTMLSelectElement_property_setter_getter]
let HTMLSelectElement_property_setter_getter = ['autocomplete', 'disabled', 'multiple', 'name', 'required', 'size', 'length'];
for(let i=0; i<HTMLSelectElement_property_setter_getter.length; i++){
    let property = HTMLSelectElement_property_setter_getter[i];
	Object.defineProperty(HTMLSelectElement.prototype, property, {
        get: property_getter('HTMLSelectElement',property+'_getter'),
        set: property_setter('HTMLSelectElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSelectElement_property_setter_getter]

// begin[override HTMLSelectElement_property_getters]
let HTMLSelectElement_property_getters = ['form', 'type', 'options', 'willValidate', 'labels'];
for(let i=0; i<HTMLSelectElement_property_getters.length; i++){
    let property = HTMLSelectElement_property_getters[i];
	Object.defineProperty(HTMLSelectElement.prototype, property, {
        get: property_getter('HTMLSelectElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSelectElement_property_getters]

// begin[override HTMLSelectElement_property_getter_interaction]
let HTMLSelectElement_property_getter_interaction = ['validity', 'validationMessage'];
for(let i=0; i<HTMLSelectElement_property_getter_interaction.length; i++){
    let property = HTMLSelectElement_property_getter_interaction[i]
	Object.defineProperty(HTMLSelectElement.prototype, property, {
        get: property_interaction('HTMLSelectElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSelectElement_property_getter_interaction]

// begin[override HTMLSelectElement_property_setter_getter_interaction]
let HTMLSelectElement_property_setter_getter_interaction = ['selectedIndex', 'value'];
for(let i=0; i<HTMLSelectElement_property_setter_getter_interaction.length; i++){
    let property = HTMLSelectElement_property_setter_getter_interaction[i]
	Object.defineProperty(HTMLSelectElement.prototype, property, {
        get: property_interaction('HTMLSelectElement',property+"_getter"),
        set: property_interaction('HTMLSelectElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSelectElement_property_setter_getter_interaction]

// begin[override HTMLSelectElement_method_get]
let HTMLSelectElement_method_get = ['item', 'namedItem'];
for(let i=0; i<HTMLSelectElement_method_get.length; i++){
    let method = HTMLSelectElement_method_get[i];
	HTMLSelectElement.prototype[method] = property_getter('HTMLSelectElement',method);
}
// end[override HTMLSelectElement_method_get]

// begin[override HTMLSelectElement_method_set]
let HTMLSelectElement_method_set = ['remove'];
for(let i=0; i<HTMLSelectElement_method_set.length; i++){
    let method = HTMLSelectElement_method_set[i];
	HTMLSelectElement.prototype[method] = property_setter('HTMLSelectElement',method);
}
// end[override HTMLSelectElement_method_set]

// begin[override HTMLSelectElement_method_interaction]
let HTMLSelectElement_method_interaction = ['checkValidity', 'reportValidity', 'setCustomValidity'];
for(let i=0; i<HTMLSelectElement_method_interaction.length; i++){
    let method = HTMLSelectElement_method_interaction[i];
	HTMLSelectElement.prototype[method] = property_interaction('HTMLSelectElement',method);
}
// end[override HTMLSelectElement_method_interaction]
