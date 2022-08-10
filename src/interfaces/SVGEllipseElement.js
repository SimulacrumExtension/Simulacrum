import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGEllipseElement_property_getters]
let SVGEllipseElement_property_getters = ['cx', 'cy', 'rx', 'ry'];
for(let i=0; i<SVGEllipseElement_property_getters.length; i++){
    let property = SVGEllipseElement_property_getters[i];
	Object.defineProperty(SVGEllipseElement.prototype, property, {
        get: property_getter('SVGEllipseElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGEllipseElement_property_getters]

