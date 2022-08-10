import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGFEPointLightElement_property_getters]
let SVGFEPointLightElement_property_getters = ['x','y','z'];
for(let i=0; i<SVGFEPointLightElement_property_getters.length; i++){
    let property = SVGFEPointLightElement_property_getters[i];
	Object.defineProperty(SVGFEPointLightElement.prototype, property, {
        get: property_getter('SVGFEPointLightElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEPointLightElement_property_getters]

