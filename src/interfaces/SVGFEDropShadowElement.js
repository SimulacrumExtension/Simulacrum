import {property_getter, property_setter} from '../templates.js';

// begin[override SVGFEDropShadowElement_property_getters]
let SVGFEDropShadowElement_property_getters = ['in1', 'dx', 'dy', 'stdDeviationX', 'stdDeviationY', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEDropShadowElement_property_getters.length; i++){
    let property = SVGFEDropShadowElement_property_getters[i];
	Object.defineProperty(SVGFEDropShadowElement.prototype, property, {
        get: property_getter('SVGFEDropShadowElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGFEDropShadowElement_property_getters]

// begin[override SVGFEDropShadowElement_method_set]
let SVGFEDropShadowElement_method_set = [];
for(let i=0; i<SVGFEDropShadowElement_method_set.length; i++){
    let method = SVGFEDropShadowElement_method_set[i];
    SVGFEDropShadowElement.prototype[method] = property_setter('SVGFEDropShadowElement',method);
}
// end[override SVGFEDropShadowElement_method_set]
