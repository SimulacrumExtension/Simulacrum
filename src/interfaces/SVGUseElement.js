import {property_getter} from '../templates.js';

// begin[override SVGUseElement_property_getters]
let SVGUseElement_property_getters = ['x', 'y', 'width', 'height', 'href'];
for(let i=0; i<SVGUseElement_property_getters.length; i++){
    let property = SVGUseElement_property_getters[i];
	Object.defineProperty(SVGUseElement.prototype, property, {
        get: property_getter('SVGUseElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGUseElement_property_getters]
