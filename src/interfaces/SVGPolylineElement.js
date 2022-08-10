import {property_interaction } from '../templates.js';

// begin[override SVGPolylineElement_property_getters_interaction]
let SVGPolylineElement_property_getters_interaction = ['points', 'animatedPoints'];
for(let i=0; i<SVGPolylineElement_property_getters_interaction.length; i++){
    let property = SVGPolylineElement_property_getters_interaction[i];
	Object.defineProperty(SVGPolylineElement.prototype, property, {
        get: property_interaction('SVGPolylineElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGPolylineElement_property_getters_interaction]
