import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGFilterElement_property_getters]
let SVGFilterElement_property_getters = ['filterUnits', 'primitiveUnits', 'href'];
for(let i=0; i<SVGFilterElement_property_getters.length; i++){
    let property = SVGFilterElement_property_getters[i];
	Object.defineProperty(SVGFilterElement.prototype, property, {
        get: property_getter('SVGFilterElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFilterElement_property_getters]

// begin[override SVGFilterElement_property_getter_interaction]
let SVGFilterElement_property_getter_interaction = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGFilterElement_property_getter_interaction.length; i++){
    let property = SVGFilterElement_property_getter_interaction[i]
	Object.defineProperty(SVGFilterElement.prototype, property, {
        get: property_interaction('SVGFilterElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFilterElement_property_getter_interaction]

