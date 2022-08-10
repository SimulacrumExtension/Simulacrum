import {property_getter } from '../templates.js';

// begin[override SVGFEMorphologyElement_property_getters]
let SVGFEMorphologyElement_property_getters = ['in1', 'operator', 'radiusX', 'radiusY', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEMorphologyElement_property_getters.length; i++){
    let property = SVGFEMorphologyElement_property_getters[i];
	Object.defineProperty(SVGFEMorphologyElement.prototype, property, {
        get: property_getter('SVGFEMorphologyElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGFEMorphologyElement_property_getters]
