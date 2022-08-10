import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGFEBlendElement_property_getters]
let SVGFEBlendElement_property_getters = ['in1', 'in2', 'mode', 'result'];
for(let i=0; i<SVGFEBlendElement_property_getters.length; i++){
    let property = SVGFEBlendElement_property_getters[i];
	Object.defineProperty(SVGFEBlendElement.prototype, property, {
        get: property_getter('SVGFEBlendElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEBlendElement_property_getters]

// begin[override SVGFEBlendElement_property_getter_interaction]
let SVGFEBlendElement_property_getter_interaction = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGFEBlendElement_property_getter_interaction.length; i++){
    let property = SVGFEBlendElement_property_getter_interaction[i]
	Object.defineProperty(SVGFEBlendElement.prototype, property, {
        get: property_interaction('SVGFEBlendElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEBlendElement_property_getter_interaction]