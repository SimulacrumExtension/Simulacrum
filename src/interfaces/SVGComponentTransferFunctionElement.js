import {property_getter, property_interaction, property_setter} from '../templates.js';

// begin[override SVGComponentTransferFunctionElement_property_getters]
let SVGComponentTransferFunctionElement_property_getters = ['type', 'slope', 'intercept', 'amplitude', 'exponent', 'offset'];
for(let i=0; i<SVGComponentTransferFunctionElement_property_getters.length; i++){
    let property = SVGComponentTransferFunctionElement_property_getters[i];
	Object.defineProperty(SVGComponentTransferFunctionElement.prototype, property, {
        get: property_getter('SVGComponentTransferFunctionElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGComponentTransferFunctionElement_property_getters]

// begin[override SVGComponentTransferFunctionElement_property_getter_interaction]
let SVGComponentTransferFunctionElement_property_getter_interaction = ['tableValues'];
for(let i=0; i<SVGComponentTransferFunctionElement_property_getter_interaction.length; i++){
    let property = SVGComponentTransferFunctionElement_property_getter_interaction[i]
	Object.defineProperty(SVGComponentTransferFunctionElement.prototype, property, {
        get: property_interaction('SVGComponentTransferFunctionElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGComponentTransferFunctionElement_property_getter_interaction]
