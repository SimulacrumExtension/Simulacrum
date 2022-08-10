import {property_interaction,property_getter, property_setter} from '../templates.js';

// begin[override HTMLDialogElement_property_setter_getter]
let HTMLDialogElement_property_setter_getter = ['returnValue'];
for(let i=0; i<HTMLDialogElement_property_setter_getter.length; i++){
    let property = HTMLDialogElement_property_setter_getter[i];
	Object.defineProperty(HTMLDialogElement.prototype, property, {
        get: property_getter('HTMLDialogElement', property+'_getter'),
        set: property_setter('HTMLDialogElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDialogElement_property_setter_getter]

// begin[override HTMLDialogElement_property_setter_getter_interaction]
let HTMLDialogElement_property_setter_getter_interaction = ['open'];
for(let i=0; i<HTMLDialogElement_property_setter_getter_interaction.length; i++){
    let property = HTMLDialogElement_property_setter_getter_interaction[i]
	Object.defineProperty(HTMLDialogElement.prototype, property, {
        get: property_interaction('HTMLDialogElement',property+"_getter"),
        set: property_interaction('HTMLDialogElement',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLDialogElement_property_setter_getter_interaction]

// begin[override HTMLDialogElement_method_interaction]
let HTMLDialogElement_method_interaction = ['show', 'showModal', 'close'];
for(let i=0; i<HTMLDialogElement_method_interaction.length; i++){
    let method = HTMLDialogElement_method_interaction[i]
	HTMLDialogElement.prototype[method] = property_interaction('HTMLDialogElement',method);
}
// end[override HTMLDialogElement_method_interaction]
