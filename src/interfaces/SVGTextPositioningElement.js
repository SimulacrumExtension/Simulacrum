import {property_interaction} from '../templates.js';

// begin[override SVGTextPositioningElement_property_getters_interaction]
let SVGTextPositioningElement_property_getters_interaction = ['x', 'y', 'dx', 'dy', 'rotate'];
for(let i=0; i<SVGTextPositioningElement_property_getters_interaction.length; i++){
    let property = SVGTextPositioningElement_property_getters_interaction[i];
	Object.defineProperty(SVGTextPositioningElement.prototype, property, {
        get: property_interaction('SVGTextPositioningElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGTextPositioningElement_property_getters_interaction]

