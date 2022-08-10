import {property_getter } from '../templates.js';

// begin[override SVGRadialGradientElement_property_getters]
let SVGRadialGradientElement_property_getters = ['cx', 'cy', 'r', 'fx', 'fy', 'fr'];
for(let i=0; i<SVGRadialGradientElement_property_getters.length; i++){
    let property = SVGRadialGradientElement_property_getters[i];
	Object.defineProperty(SVGRadialGradientElement.prototype, property, {
        get: property_getter('SVGRadialGradientElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGRadialGradientElement_property_getters]

