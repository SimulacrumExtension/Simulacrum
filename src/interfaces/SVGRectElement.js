import {property_getter } from '../templates.js';

// begin[override SVGRectElement_property_getters]
let SVGRectElement_property_getters = ['x', 'y', 'width', 'height', 'rx', 'ry'];
for(let i=0; i<SVGRectElement_property_getters.length; i++){
    let property = SVGRectElement_property_getters[i];
	Object.defineProperty(SVGRectElement.prototype, property, {
        get: property_getter('SVGRectElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGRectElement_property_getters]
