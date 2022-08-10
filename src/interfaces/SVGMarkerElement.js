import {property_getter,property_setter} from '../templates.js';

// begin[override SVGMarkerElement_property_getters]
let SVGMarkerElement_property_getters = ['refX', 'refY', 'markerUnits', 'markerWidth', 'markerHeight', 'orientType', 'orientAngle', 'viewBox', 'preserveAspectRatio'];
for(let i=0; i<SVGMarkerElement_property_getters.length; i++){
    let property = SVGMarkerElement_property_getters[i];
	Object.defineProperty(SVGMarkerElement.prototype, property, {
        get: property_getter('SVGMarkerElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGMarkerElement_property_getters]

// begin[override SVGMarkerElement_method_set]
let SVGMarkerElement_method_set = ['setOrientToAuto', 'setOrientToAngle'];
for(let i=0; i<SVGMarkerElement_method_set.length; i++){
    let method = SVGMarkerElement_method_set[i];
    SVGMarkerElement.prototype[method] = property_setter('SVGMarkerElement',method);
}
// end[override element_method_set]