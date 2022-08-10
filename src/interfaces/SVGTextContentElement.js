import {property_interaction,property_getter} from '../templates.js';

// begin[override SVGTextContentElement_methods_interaction]
let SVGTextContentElement_methods_interaction = ['getNumberOfChars', 'getComputedTextLength', 'getSubStringLength', 'getStartPositionOfChar', 'getEndPositionOfChar', 'getExtentOfChar', 'getRotationOfChar', 'getCharNumAtPosition', 'selectSubString']
for(let i=0; i<SVGTextContentElement_methods_interaction.length; i++){
    let method = SVGTextContentElement_methods_interaction[i]
	SVGTextContentElement.prototype[method] = property_interaction('SVGTextContentElement',method);
}
// end[override SVGTextContentElement_methods_interaction]


// begin[override SVGTextContentElement_property_getters]
let SVGTextContentElement_property_getters = ['lengthAdjust'];
for(let i=0; i<SVGTextContentElement_property_getters.length; i++){
    let property = SVGTextContentElement_property_getters[i];
	Object.defineProperty(SVGTextContentElement.prototype, property, {
        get: property_getter('SVGTextContentElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGTextContentElement_property_getters]

// begin[override SVGTextContentElement_property_getters_interaction]
let SVGTextContentElement_property_getters_interaction = ['textLength'];
for(let i=0; i<SVGTextContentElement_property_getters_interaction.length; i++){
    let property = SVGTextContentElement_property_getters_interaction[i];
	Object.defineProperty(SVGTextContentElement.prototype, property, {
        get: property_interaction('SVGTextContentElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGTextContentElement_property_getters_interaction]