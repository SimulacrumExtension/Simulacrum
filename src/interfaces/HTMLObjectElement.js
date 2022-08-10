import {property_interaction,property_getter, property_setter} from '../templates.js';

// begin[override HTMLObjectElement_property_setter_getter]
let HTMLObjectElement_property_setter_getter = ['data', 'type', 'name', 'useMap', 'width', 'height', 'align', 'archive', 'code', 'declare', 'hspace', 'standby', 'vspace', 'codeBase', 'codeType', 'border'];
for(let i=0; i<HTMLObjectElement_property_setter_getter.length; i++){
    let property = HTMLObjectElement_property_setter_getter[i];
	Object.defineProperty(HTMLObjectElement.prototype, property, {
        get: property_getter('HTMLObjectElement',property+'_getter'),
        set: property_setter('HTMLObjectElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLObjectElement_property_setter_getter]

// begin[override HTMLObjectElement_property_getters]
let HTMLObjectElement_property_getters = ['form', 'willValidate'];
for(let i=0; i<HTMLObjectElement_property_getters.length; i++){
    let property = HTMLObjectElement_property_getters[i];
	Object.defineProperty(HTMLObjectElement.prototype, property, {
        get: property_getter('HTMLObjectElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLObjectElement_property_getters]

// begin[override HTMLObjectElement_property_getters_interaction]
let HTMLObjectElement_property_getters_interaction = ['contentDocument', 'contentWindow', 'validity', 'validationMessage'];
for(let i=0; i<HTMLObjectElement_property_getters_interaction.length; i++){
    let property = HTMLObjectElement_property_getters_interaction[i]
	Object.defineProperty(HTMLObjectElement.prototype, property, {
        get: property_interaction('HTMLObjectElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLObjectElement_property_getters_interaction]

// begin[override HTMLObjectElement_method_interaction]
let HTMLObjectElement_method_interaction = ['getSVGDocument', 'checkValidity', 'reportValidity', 'setCustomValidity'];
for(let i=0; i<HTMLObjectElement_method_interaction.length; i++){
    let method = HTMLObjectElement_method_interaction[i]
	HTMLObjectElement.prototype[method] = property_interaction('HTMLObjectElement',method);
}
// end[override HTMLObjectElement_method_interaction]

