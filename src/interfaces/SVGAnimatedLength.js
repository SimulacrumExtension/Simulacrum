import {object_getter_withParent} from '../templates.js';

let SVGAnimatedLength_properties = ['baseVal', 'animVal']
for(let i=0; i<SVGAnimatedLength_properties.length; i++){
    let property = SVGAnimatedLength_properties[i];
    Object.defineProperty(SVGAnimatedLength.prototype, property, {
        get: object_getter_withParent('SVGAnimatedLength',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}

