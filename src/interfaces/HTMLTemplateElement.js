import {property_interaction} from '../templates.js';

// begin[override HTMLTemplateElement_property_getters]
let HTMLTemplateElement_property_getters = ['content'];
for(let i=0; i<HTMLTemplateElement_property_getters.length; i++){
    let property = HTMLTemplateElement_property_getters[i];
	Object.defineProperty(HTMLTemplateElement.prototype, property, {
        get: property_interaction('HTMLTemplateElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTemplateElement_property_getters]

