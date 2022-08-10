import {property_getter} from '../templates.js';

// begin[override SVGFEMergeElement_property_getters]
let SVGFEMergeElement_property_getters = ['x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEMergeElement_property_getters.length; i++){
    let property = SVGFEMergeElement_property_getters[i];
	Object.defineProperty(SVGFEMergeElement.prototype, property, {
        get: property_getter('SVGFEMergeElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEMergeElement_property_getters]



