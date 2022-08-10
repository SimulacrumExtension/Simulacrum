import {property_getter} from '../templates.js';

// begin[override SVGFETileElement_property_getters]
let SVGFETileElement_property_getters = ['in1', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFETileElement_property_getters.length; i++){
    let property = SVGFETileElement_property_getters[i];
	Object.defineProperty(SVGFETileElement.prototype, property, {
        get: property_getter('SVGFETileElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFETileElement_property_getters]

