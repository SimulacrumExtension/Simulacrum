import {property_interaction } from '../templates.js';

// begin[override SVGPolygonElement_property_getters_interaction]
let SVGPolygonElement_property_getters_interaction = ['points', 'animatedPoints'];
for(let i=0; i<SVGPolygonElement_property_getters_interaction.length; i++){
    let property = SVGPolygonElement_property_getters_interaction[i];
	Object.defineProperty(SVGPolygonElement.prototype, property, {
        get: property_interaction('SVGPolygonElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGPolygonElement_property_getters_interaction]

