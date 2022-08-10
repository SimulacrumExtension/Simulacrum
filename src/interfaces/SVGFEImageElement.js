import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGFEImageElement_property_getters]
let SVGFEImageElement_property_getters = ['preserveAspectRatio', 'result', 'href'];
for(let i=0; i<SVGFEImageElement_property_getters.length; i++){
    let property = SVGFEImageElement_property_getters[i];
	Object.defineProperty(SVGFEImageElement.prototype, property, {
        get: property_getter('SVGFEImageElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEImageElement_property_getters]

// begin[override SVGFEImageElement_property_getter_interaction]
let SVGFEImageElement_property_getter_interaction = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGFEImageElement_property_getter_interaction.length; i++){
    let property = SVGFEImageElement_property_getter_interaction[i]
	Object.defineProperty(SVGFEImageElement.prototype, property, {
        get: property_interaction('SVGFEImageElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEImageElement_property_getter_interaction]
