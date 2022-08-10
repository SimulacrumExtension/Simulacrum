import {property_getter, property_setter} from '../templates.js';

// begin[override SVGStopElement_property_getters]
let SVGStopElement_property_getters = ['offset'];
for(let i=0; i<SVGStopElement_property_getters.length; i++){
    let property = SVGStopElement_property_getters[i];
	Object.defineProperty(SVGStopElement.prototype, property, {
        get: property_getter('SVGStopElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGStopElement_property_getters]
