import {property_getter} from '../templates.js';

// begin[override SVGSymbolElement_property_getters]
let SVGSymbolElement_property_getters = ['viewBox', 'preserveAspectRatio'];
for(let i=0; i<SVGSymbolElement_property_getters.length; i++){
    let property = SVGSymbolElement_property_getters[i];
	Object.defineProperty(SVGSymbolElement.prototype, property, {
        get: property_getter('SVGSymbolElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGSymbolElement_property_getters]

