import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGForeignObjectElement_property_getters]
let SVGForeignObjectElement_property_getters = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGForeignObjectElement_property_getters.length; i++){
    let property = SVGForeignObjectElement_property_getters[i];
	Object.defineProperty(SVGForeignObjectElement.prototype, property, {
        get: property_getter('SVGForeignObjectElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGForeignObjectElement_property_getters]

