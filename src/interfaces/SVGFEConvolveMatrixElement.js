import {property_getter,property_interaction} from '../templates.js';

// begin[override SSVGFEConvolveMatrixElement_property_getters]
let SSVGFEConvolveMatrixElement_property_getters = ['in1', 'orderX', 'orderY', 'divisor', 'bias', 'targetX', 'targetY', 'edgeMode', 'kernelUnitLengthX', 'kernelUnitLengthY', 'preserveAlpha', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SSVGFEConvolveMatrixElement_property_getters.length; i++){
    let property = SSVGFEConvolveMatrixElement_property_getters[i];
	Object.defineProperty(SVGFEConvolveMatrixElement.prototype, property, {
        get: property_getter('SVGFEConvolveMatrixElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SSVGFEConvolveMatrixElement_property_getters]

// begin[override SVGFEConvolveMatrixElement_property_getter_interaction]
let SVGFEConvolveMatrixElement_property_getter_interaction = ['kernelMatrix'];
for(let i=0; i<SVGFEConvolveMatrixElement_property_getter_interaction.length; i++){
    let property = SVGFEConvolveMatrixElement_property_getter_interaction[i]
	Object.defineProperty(SVGFEConvolveMatrixElement.prototype, property, {
        get: property_interaction('SVGFEConvolveMatrixElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEConvolveMatrixElement_property_getter_interaction]