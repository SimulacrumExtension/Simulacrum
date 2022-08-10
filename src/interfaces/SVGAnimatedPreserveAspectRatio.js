import {object_getter_withParent} from '../templates.js';

let SVGAnimatedPreserveAspectRatio_properties = ['baseVal', 'animVal']
for(let i=0; i<SVGAnimatedPreserveAspectRatio_properties.length; i++){
    let property = SVGAnimatedPreserveAspectRatio_properties[i];
    Object.defineProperty(SVGAnimatedPreserveAspectRatio.prototype, property, {
        get: object_getter_withParent('SVGAnimatedPreserveAspectRatio',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
