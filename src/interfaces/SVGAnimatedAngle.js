import {object_getter_withParent} from '../templates.js';

let SVGAnimatedAngle_properties = ['baseVal', 'animVal']
for(let i=0; i<SVGAnimatedAngle_properties.length; i++){
    let property = SVGAnimatedAngle_properties[i];
    Object.defineProperty(SVGAnimatedAngle.prototype, property, {
        get: object_getter_withParent('SVGAnimatedAngle',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
