import {property_getter} from '../templates.js';

// begin[override SVGFEComponentTransferElement_property_getters]
let SVGFEComponentTransferElement_property_getters = ['in1', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEComponentTransferElement_property_getters.length; i++){
    let property = SVGFEComponentTransferElement_property_getters[i];
	Object.defineProperty(SVGFEComponentTransferElement.prototype, property, {
        get: property_getter('SVGFEComponentTransferElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEComponentTransferElement_property_getters]

