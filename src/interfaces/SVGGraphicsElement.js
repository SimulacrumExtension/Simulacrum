import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGGraphicsElement_property_getters]
let SVGGraphicsElement_property_getters = ['nearestViewportElement', 'farthestViewportElement', 'requiredExtensions', 'systemLanguage'];
for(let i=0; i<SVGGraphicsElement_property_getters.length; i++){
    let property = SVGGraphicsElement_property_getters[i];
	Object.defineProperty(SVGGraphicsElement.prototype, property, {
        get: property_getter('SVGGraphicsElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGGraphicsElement_property_getters]

// begin[override SVGGraphicsElement_property_getter_interaction]
let SVGGraphicsElement_property_getter_interaction = ['transform'];
for(let i=0; i<SVGGraphicsElement_property_getter_interaction.length; i++){
    let property = SVGGraphicsElement_property_getter_interaction[i]
	Object.defineProperty(SVGGraphicsElement.prototype, property, {
        get: property_interaction('SVGGraphicsElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGGraphicsElement_property_getter_interaction]

// begin[override SVGGraphicsElement_method_interaction]
let SVGGraphicsElement_method_interaction = ['getBBox', 'getCTM', 'getScreenCTM']
for(let i=0; i<SVGGraphicsElement_method_interaction.length; i++){
    let method = SVGGraphicsElement_method_interaction[i]
	SVGGraphicsElement.prototype[method] = property_interaction('SVGGraphicsElement',method);
}
// end[override SVGGraphicsElement_method_interaction]
