import {property_getter } from '../templates.js';

// begin[override SVGFEMergeNodeElement_property_getters]
let SVGFEMergeNodeElement_property_getters = ['in1'];
for(let i=0; i<SVGFEMergeNodeElement_property_getters.length; i++){
    let property = SVGFEMergeNodeElement_property_getters[i];
	Object.defineProperty(SVGFEMergeNodeElement.prototype, property, {
        get: property_getter('SVGFEMergeNodeElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGFEMergeNodeElement_property_getters]
