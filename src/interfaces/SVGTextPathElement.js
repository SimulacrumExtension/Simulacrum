import {property_getter} from '../templates.js';

// begin[override SVGTextPathElement_property_getters]
let SVGTextPathElement_property_getters = ['startOffset', 'method', 'spacing', 'href'];
for(let i=0; i<SVGTextPathElement_property_getters.length; i++){
    let property = SVGTextPathElement_property_getters[i];
	Object.defineProperty(SVGTextPathElement.prototype, property, {
        get: property_getter('SVGTextPathElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGTextPathElement_property_getters]
