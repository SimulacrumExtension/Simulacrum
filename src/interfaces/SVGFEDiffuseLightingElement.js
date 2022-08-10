import {property_getter} from '../templates.js';

// begin[override SVGFEDiffuseLightingElement_property_getters]
let SVGFEDiffuseLightingElement_property_getters = ['in1', 'surfaceScale', 'diffuseConstant', 'kernelUnitLengthX', 'kernelUnitLengthY', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEDiffuseLightingElement_property_getters.length; i++){
    let property = SVGFEDiffuseLightingElement_property_getters[i];
	Object.defineProperty(SVGFEDiffuseLightingElement.prototype, property, {
        get: property_getter('SVGFEDiffuseLightingElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEDiffuseLightingElement_property_getters]
