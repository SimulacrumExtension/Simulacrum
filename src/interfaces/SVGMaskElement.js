import {property_getter} from '../templates.js';

// begin[override SVGMaskElement_property_getters]
let SVGMaskElement_property_getters = ['maskUnits', 'maskContentUnits', 'x', 'y', 'width', 'height', 'requiredExtensions', 'systemLanguage'];
for(let i=0; i<SVGMaskElement_property_getters.length; i++){
    let property = SVGMaskElement_property_getters[i];
	Object.defineProperty(SVGMaskElement.prototype, property, {
        get: property_getter('SVGMaskElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGMaskElement_property_getters]

