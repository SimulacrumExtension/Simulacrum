import {property_getter} from '../templates.js';

// begin[override SVGFEFloodElement_property_getters]
let SVGFEFloodElement_property_getters = ['x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEFloodElement_property_getters.length; i++){
    let property = SVGFEFloodElement_property_getters[i];
	Object.defineProperty(SVGFEFloodElement.prototype, property, {
        get: property_getter('SVGFEFloodElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEFloodElement_property_getters]
