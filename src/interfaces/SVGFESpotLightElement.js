import {property_getter} from '../templates.js';

// begin[override SVGFESpotLightElement_property_getters]
let SVGFESpotLightElement_property_getters = ['x', 'y', 'z', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'limitingConeAngle'];
for(let i=0; i<SVGFESpotLightElement_property_getters.length; i++){
    let property = SVGFESpotLightElement_property_getters[i];
	Object.defineProperty(SVGFESpotLightElement.prototype, property, {
        get: property_getter('SVGFESpotLightElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFESpotLightElement_property_getters]

