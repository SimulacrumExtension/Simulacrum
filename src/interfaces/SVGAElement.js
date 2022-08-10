import {property_getter} from '../templates.js';

// begin[override SVGAElement_property_getters]
let SVGAElement_property_getters = ['target', 'href'];
for(let i=0; i<SVGAElement_property_getters.length; i++){
    let property = SVGAElement_property_getters[i];
	Object.defineProperty(SVGAElement.prototype, property, {
        get: property_getter('SVGAElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGAElement_property_getters]
