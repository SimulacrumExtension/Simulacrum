import {property_getter} from '../templates.js';

// begin[override SVGClipPathElement_property_getters]
let SVGClipPathElement_property_getters = ['clipPathUnits'];
for(let i=0; i<SVGClipPathElement_property_getters.length; i++){
    let property = SVGClipPathElement_property_getters[i];
	Object.defineProperty(SVGClipPathElement.prototype, property, {
        get: property_getter('SVGClipPathElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGClipPathElement_property_getters]
