import {property_getter,property_setter} from '../templates.js';

// begin[override SVGLineElement_property_getters]
let SVGLineElement_property_getters = ['x1', 'y1', 'x2', 'y2'];
for(let i=0; i<SVGLineElement_property_getters.length; i++){
    let property = SVGLineElement_property_getters[i];
	Object.defineProperty(SVGLineElement.prototype, property, {
        get: property_getter('SVGLineElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGLineElement_property_getters]
