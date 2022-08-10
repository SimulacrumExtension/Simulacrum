import {property_getter,property_interaction } from '../templates.js';

// begin[override SVGPatternElement_property_getters]
let SVGPatternElement_property_getters = ['patternUnits', 'patternContentUnits', 'x', 'y', 'width', 'height', 'viewBox', 'preserveAspectRatio', 'requiredExtensions', 'systemLanguage', 'href'];
for(let i=0; i<SVGPatternElement_property_getters.length; i++){
    let property = SVGPatternElement_property_getters[i];
	Object.defineProperty(SVGPatternElement.prototype, property, {
        get: property_getter('SVGPatternElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGPatternElement_property_getters]

// begin[override SVGPatternElement_property_getter_interaction]
let SVGPatternElement_property_getter_interaction = ['patternTransform'];
for(let i=0; i<SVGPatternElement_property_getter_interaction.length; i++){
    let property = SVGPatternElement_property_getter_interaction[i]
	Object.defineProperty(SVGPatternElement.prototype, property, {
        get: property_interaction('SVGPatternElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGPatternElement_property_getter_interaction]

