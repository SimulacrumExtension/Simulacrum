import {property_getter} from '../templates.js';

// begin[override SVGMPathElement_property_getters]
let SVGMPathElement_property_getters = ['href'];
for(let i=0; i<SVGMPathElement_property_getters.length; i++){
    let property = SVGMPathElement_property_getters[i];
	Object.defineProperty(SVGMPathElement.prototype, property, {
        get: property_getter('SVGMPathElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGMPathElement_property_getters]

