import {property_getter} from '../templates.js';

// begin[override SVGFECompositeElement_property_getters]
let SVGFECompositeElement_property_getters = ['in2', 'in1', 'operator', 'k1', 'k2', 'k3', 'k4', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFECompositeElement_property_getters.length; i++){
    let property = SVGFECompositeElement_property_getters[i];
	Object.defineProperty(SVGFECompositeElement.prototype, property, {
        get: property_getter('SVGFECompositeElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFECompositeElement_property_getters]
