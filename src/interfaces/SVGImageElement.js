import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override SVGImageElement_property_setter_getters]
let SVGImageElement_property_setter_getters = ['decoding'];
for(let i=0; i<SVGImageElement_property_setter_getters.length; i++){
    let property = SVGImageElement_property_setter_getters[i];
	Object.defineProperty(SVGImageElement.prototype, property, {
        get: property_getter('SVGImageElement',property+'_getter'),
        set: property_setter('SVGImageElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGImageElement_property_setter_getters]

// begin[override SVGImageElement_property_getters]
let SVGImageElement_property_getters = ['href', 'preserveAspectRatio'];
for(let i=0; i<SVGImageElement_property_getters.length; i++){
    let property = SVGImageElement_property_getters[i];
	Object.defineProperty(SVGImageElement.prototype, property, {
        get: property_getter('SVGImageElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGImageElement_property_getters]

// begin[override SVGImageElement_property_getter_interaction]
let SVGImageElement_property_getter_interaction = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGImageElement_property_getter_interaction.length; i++){
    let property = SVGImageElement_property_getter_interaction[i]
	Object.defineProperty(SVGImageElement.prototype, property, {
        get: property_interaction('SVGImageElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGImageElement_property_getter_interaction]

// begin[override SVGImageElement_method_interaction]
let SVGImageElement_method_interaction = ['decode']
for(let i=0; i<SVGImageElement_method_interaction.length; i++){
    let method = SVGImageElement_method_interaction[i]
	SVGImageElement.prototype[method] = property_interaction('SVGImageElement',method);
}
// end[override SVGImageElement_method_interaction]
