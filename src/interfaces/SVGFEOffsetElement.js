import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGFEOffsetElement_property_getters]
let SVGFEOffsetElement_property_getters = ['in1', 'dx', 'dy', 'result'];
for(let i=0; i<SVGFEOffsetElement_property_getters.length; i++){
    let property = SVGFEOffsetElement_property_getters[i];
	Object.defineProperty(SVGFEOffsetElement.prototype, property, {
        get: property_getter('SVGFEOffsetElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEOffsetElement_property_getters]

// begin[override SVGFEOffsetElement_property_getter_interaction]
let SVGFEOffsetElement_property_getter_interaction = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGFEOffsetElement_property_getter_interaction.length; i++){
    let property = SVGFEOffsetElement_property_getter_interaction[i]
	Object.defineProperty(SVGFEOffsetElement.prototype, property, {
        get: property_interaction('SVGFEOffsetElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEOffsetElement_property_getter_interaction]