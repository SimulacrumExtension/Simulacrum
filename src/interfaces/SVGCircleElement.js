import {property_getter,property_setter} from '../templates.js';

// begin[override SVGCircleElement_property_getters]
let SVGCircleElement_property_getters = ['cx', 'cy', 'r'];
for(let i=0; i<SVGCircleElement_property_getters.length; i++){
    let property = SVGCircleElement_property_getters[i];
	Object.defineProperty(SVGCircleElement.prototype, property, {
        get: property_getter('SVGCircleElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGCircleElement_property_getters]
