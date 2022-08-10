import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGGradientElement_property_getters]
let SVGGradientElement_property_getters = ['gradientUnits', 'spreadMethod', 'href'];
for(let i=0; i<SVGGradientElement_property_getters.length; i++){
    let property = SVGGradientElement_property_getters[i];
	Object.defineProperty(SVGGradientElement.prototype, property, {
        get: property_getter('SVGGradientElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGGradientElement_property_getters]

// begin[override SVGGradientElement_property_getter_interaction]
let SVGGradientElement_property_getter_interaction = ['gradientTransform'];
for(let i=0; i<SVGGradientElement_property_getter_interaction.length; i++){
    let property = SVGGradientElement_property_getter_interaction[i]
	Object.defineProperty(SVGGradientElement.prototype, property, {
        get: property_interaction('SVGGradientElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGGradientElement_property_getter_interaction]

