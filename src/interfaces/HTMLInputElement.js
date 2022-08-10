import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js';
import {property_interaction,property_getter, property_setter} from '../templates.js';

// begin[override HTMLInputElement_property_getters]
let HTMLInputElement_property_getters = ['form', 'list', 'willValidate', 'labels'];
for(let i=0; i<HTMLInputElement_property_getters.length; i++){
    let property = HTMLInputElement_property_getters[i];
	Object.defineProperty(HTMLInputElement.prototype, property, {
        get: property_getter('HTMLInputElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLInputElement_property_getters]

// begin[override HTMLInputElement_property_getters_interaction]
let HTMLInputElement_property_getters_screen = ['validity', 'webkitEntries', 'validationMessage'];
for(let i=0; i<HTMLInputElement_property_getters_screen.length; i++){
    let property = HTMLInputElement_property_getters_screen[i]
	Object.defineProperty(HTMLInputElement.prototype, property, {
        get: property_interaction('HTMLInputElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLInputElement_property_getters_interaction]

// begin[override HTMLInputElement_property_setter_getter]
let HTMLInputElement_property_setter_getter = ['accept', 'alt', 'autocomplete', 'defaultChecked', 'dirName', 'disabled', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'height', 'max', 'maxLength', 'min', 'minLength', 'multiple', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'size', 'src', 'step', 'type', 'defaultValue', 'width', 'align', 'useMap', 'webkitdirectory', 'incremental'];
for(let i=0; i<HTMLInputElement_property_setter_getter.length; i++){
    let property = HTMLInputElement_property_setter_getter[i];
	Object.defineProperty(HTMLInputElement.prototype, property, {
        get: property_getter('HTMLInputElement',property+'_getter'),
        set: property_setter('HTMLInputElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLInputElement_property_setter_getter]

// begin[override HTMLInputElement_property_setter_getter_interaction]
let HTMLInputElement_property_setter_getter_interaction = ['files', 'value', 'selectionStart', 'selectionEnd', 'selectionDirection', 'valueAsDate', 'valueAsNumber', 'checked', 'indeterminate'];
for(let i=0; i<HTMLInputElement_property_setter_getter_interaction.length; i++){
    let property = HTMLInputElement_property_setter_getter_interaction[i];
	Object.defineProperty(HTMLInputElement.prototype, property, {
        get: property_interaction('HTMLInputElement',property+"_getter"),
        set: property_interaction('HTMLInputElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLInputElement_property_setter_getter_interaction]

// begin[override HTMLInputElement_method_interaction]
let HTMLInputElement_method_screen = ['stepUp', 'stepDown', 'checkValidity', 'reportValidity', 'setCustomValidity', 'select', 'setRangeText', 'setSelectionRange'];
for(let i=0; i<HTMLInputElement_method_screen.length; i++){
    let method = HTMLInputElement_method_screen[i]
	HTMLInputElement.prototype[method] = property_interaction('HTMLInputElement',method);
}
// end[override HTMLInputElement_method_interaction]