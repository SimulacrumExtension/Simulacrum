import {object_getter_withParent} from '../templates.js';

let SVGAnimatedNumberList_properties = ['baseVal', 'animVal']
for(let i=0; i<SVGAnimatedNumberList_properties.length; i++){
    let property = SVGAnimatedNumberList_properties[i];
    Object.defineProperty(SVGAnimatedNumberList.prototype, property, {
        get: object_getter_withParent('SVGAnimatedNumberList',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
