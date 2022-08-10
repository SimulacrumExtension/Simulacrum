import {property_getter,property_interaction } from '../templates.js';

// begin[override SVGFEColorMatrixElement_property_getters]
let SVGFEColorMatrixElement_property_getters = ['in1', 'type', 'values', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEColorMatrixElement_property_getters.length; i++){
    let property = SVGFEColorMatrixElement_property_getters[i];
	Object.defineProperty(SVGFEColorMatrixElement.prototype, property, {
        get: property_getter('SVGFEColorMatrixElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGFEColorMatrixElement_property_getters]

// begin[override SVGFEColorMatrixElement_property_getter_interaction]
let SVGFEColorMatrixElement_property_getter_interaction = ['values'];
for(let i=0; i<SVGFEColorMatrixElement_property_getter_interaction.length; i++){
    let property = SVGFEColorMatrixElement_property_getter_interaction[i]
	Object.defineProperty(SVGFEColorMatrixElement.prototype, property, {
        get: property_interaction('SVGFEColorMatrixElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEColorMatrixElement_property_getter_interaction]

