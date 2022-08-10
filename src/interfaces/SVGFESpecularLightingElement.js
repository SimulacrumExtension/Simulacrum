import {property_getter} from '../templates.js';

// begin[override SVGFESpecularLightingElement_property_getters]
let SVGFESpecularLightingElement_property_getters = ['in1', 'surfaceScale', 'specularConstant', 'specularExponent', 'kernelUnitLengthX', 'kernelUnitLengthY', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFESpecularLightingElement_property_getters.length; i++){
    let property = SVGFESpecularLightingElement_property_getters[i];
	Object.defineProperty(SVGFESpecularLightingElement.prototype, property, {
        get: property_getter('SVGFESpecularLightingElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFESpecularLightingElement_property_getters]
