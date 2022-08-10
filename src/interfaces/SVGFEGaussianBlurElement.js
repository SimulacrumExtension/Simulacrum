import {property_getter, property_setter} from '../templates.js';

// begin[override SVGFEGaussianBlurElement_property_getters]
let SVGFEGaussianBlurElement_property_getters = ['in1', 'stdDeviationX', 'stdDeviationY', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFEGaussianBlurElement_property_getters.length; i++){
    let property = SVGFEGaussianBlurElement_property_getters[i];
	Object.defineProperty(SVGFEGaussianBlurElement.prototype, property, {
        get: property_getter('SVGFEGaussianBlurElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFEGaussianBlurElement_property_getters]

// begin[override SVGFEGaussianBlurElement_method_set]
let SVGFEGaussianBlurElement_method_set = ['setStdDeviation'];
for(let i=0; i<SVGFEGaussianBlurElement_method_set.length; i++){
    let method = SVGFEGaussianBlurElement_method_set[i];
    SVGFEGaussianBlurElement.prototype[method] = property_setter('SVGFEGaussianBlurElement',method);
}
// end[override SVGFEGaussianBlurElement_method_set]
