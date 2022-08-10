import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLContentElement_property_setter_getter]
let HTMLContentElement_property_setter_getter = ['select'];
for(let i=0; i<HTMLContentElement_property_setter_getter.length; i++){
    let property = HTMLContentElement_property_setter_getter[i];
	Object.defineProperty(HTMLContentElement.prototype, property, {
        get: property_getter('HTMLContentElement', property+'_getter'),
        set: property_setter('HTMLContentElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLContentElement_property_setter_getter]

// begin[override HTMLSlotElement_method_get]
let HTMLSlotElement_method_get = ['getDistributedNodes']
for(let i=0; i<HTMLSlotElement_method_get.length; i++){
    let method = HTMLSlotElement_method_get[i];
	HTMLSlotElement.prototype[method] = property_getter('HTMLSlotElement',method);
}
// end[override HTMLSlotElement_method_get]
