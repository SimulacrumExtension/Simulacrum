import {property_getter} from '../templates.js';

// begin[override SVGFEDisplacementMapElement_property_getters]
let SVGFEDisplacementMapElement_property_getters = ['in1', 'in2', 'scale', 'xChannelSelector', 'yChannelSelector', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEDisplacementMapElement_property_getters.length; i++){
    let property = SVGFEDisplacementMapElement_property_getters[i];
	Object.defineProperty(SVGFEDisplacementMapElement.prototype, property, {
        get: property_getter('SVGFEDisplacementMapElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEDisplacementMapElement_property_getters]
