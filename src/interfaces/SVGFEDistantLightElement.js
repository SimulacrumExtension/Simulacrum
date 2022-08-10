import {property_getter} from '../templates.js';

// begin[override SVGFEDistantLightElement_property_getters]
let SVGFEDistantLightElement_property_getters = ['azimuth', 'elevation'];
for(let i=0; i<SVGFEDistantLightElement_property_getters.length; i++){
    let property = SVGFEDistantLightElement_property_getters[i];
	Object.defineProperty(SVGFEDistantLightElement.prototype, property, {
        get: property_getter('SVGFEDistantLightElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGFEDistantLightElement_property_getters]
