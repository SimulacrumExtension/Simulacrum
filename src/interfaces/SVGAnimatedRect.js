import {object_getter_withParent} from '../templates.js';

let SVGAnimatedRect_properties = ['baseVal', 'animVal']
for(let i=0; i<SVGAnimatedRect_properties.length; i++){
    let property = SVGAnimatedRect_properties[i];
    Object.defineProperty(SVGAnimatedRect.prototype, property, {
        get: object_getter_withParent('SVGAnimatedRect',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}

