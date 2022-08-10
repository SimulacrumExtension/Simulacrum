import {property_getter,property_interaction} from '../templates.js';

// begin[override SVGGeometryElement_property_getters]
let SVGGeometryElement_property_getters = ['pathLength'];
for(let i=0; i<SVGGeometryElement_property_getters.length; i++){
    let property = SVGGeometryElement_property_getters[i];
	Object.defineProperty(SVGGeometryElement.prototype, property, {
        get: property_getter('SVGGeometryElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGGeometryElement_property_getters]

// begin[override SVGGeometryElement_method_interaction]
let SVGGeometryElement_method_interaction = ['isPointInFill', 'isPointInStroke', 'getTotalLength', 'getPointAtLength']
for(let i=0; i<SVGGeometryElement_method_interaction.length; i++){
    let method = SVGGeometryElement_method_interaction[i]
	SVGGeometryElement.prototype[method] = property_interaction('SVGGeometryElement',method);
}
// end[override SVGGeometryElement_method_interaction]

