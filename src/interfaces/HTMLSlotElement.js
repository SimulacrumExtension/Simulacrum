import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLSlotElement_property_setter_getter]
let HTMLSlotElement_property_setter_getter = ['name'];
for(let i=0; i<HTMLSlotElement_property_setter_getter.length; i++){
    let property = HTMLSlotElement_property_setter_getter[i];
	Object.defineProperty(HTMLSlotElement.prototype, property, {
        get: property_getter('HTMLSlotElement', property+'_getter'),
        set: property_setter('HTMLSlotElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLSlotElement_property_setter_getter]

// begin[override HTMLSlotElement_method_get]
let HTMLSlotElement_method_get = ['assignedNodes', 'assignedElements']
for(let i=0; i<HTMLSlotElement_method_get.length; i++){
    let method = HTMLSlotElement_method_get[i];
	HTMLSlotElement.prototype[method] = property_getter('HTMLSlotElement',method);
}
// end[override HTMLSlotElement_method_get]
