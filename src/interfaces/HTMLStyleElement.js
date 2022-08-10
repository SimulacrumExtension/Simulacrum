import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLStyleElement_property_setter_getter]
let HTMLStyleElement_property_setter_getter = ['disabled', 'media', 'type'];
for(let i=0; i<HTMLStyleElement_property_setter_getter.length; i++){
    let property = HTMLStyleElement_property_setter_getter[i];
	Object.defineProperty(HTMLStyleElement.prototype, property, {
        get: property_getter('HTMLStyleElement', property+'_getter'),
        set: property_setter('HTMLStyleElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLStyleElement_property_setter_getter]

// begin[override HTMLStyleElement_property_getter_interaction] 
let HTMLStyleElement_property_getter_interaction = ['sheet'];
for(let i=0; i<HTMLStyleElement_property_getter_interaction.length; i++){
    let property = HTMLStyleElement_property_getter_interaction[i]
	Object.defineProperty(HTMLStyleElement.prototype, property, {
        get: property_interaction('HTMLStyleElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLStyleElement_property_getter_interaction]

