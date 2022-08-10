import {property_getter,property_setter} from '../templates.js';

// begin[override SVGLinearGradientElement_property_getters]
let SVGLinearGradientElement_property_getters = ['x1', 'y1', 'x2', 'y2'];
for(let i=0; i<SVGLinearGradientElement_property_getters.length; i++){
    let property = SVGLinearGradientElement_property_getters[i];
	Object.defineProperty(SVGLinearGradientElement.prototype, property, {
        get: property_getter('SVGLinearGradientElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGLinearGradientElement_property_getters]
