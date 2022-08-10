import {property_interaction,property_getter,property_setter} from '../templates.js';

// begin[override HTMLEmbedElement_property_setter_getter]
let HTMLEmbedElement_property_setter_getter = ['src', 'type', 'width', 'height', 'align', 'name'];
for(let i=0; i<HTMLEmbedElement_property_setter_getter.length; i++){
    let property = HTMLEmbedElement_property_setter_getter[i];
	Object.defineProperty(HTMLEmbedElement.prototype, property, {
        get: property_getter('HTMLEmbedElement', property+'_getter'),
        set: property_setter('HTMLEmbedElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLEmbedElement_property_setter_getter]

// begin[override HTMLEmbedElement_method_interaction]
let HTMLEmbedElement_method_interaction = ['getSVGDocument'];
for(let i=0; i<HTMLEmbedElement_method_interaction.length; i++){
    let method = HTMLEmbedElement_method_interaction[i];
	HTMLEmbedElement.prototype[method] = property_interaction('HTMLEmbedElement',method);
}
// end[override HTMLEmbedElement_method_interaction]
