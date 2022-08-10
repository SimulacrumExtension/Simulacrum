import {object_setter_withParent} from '../templates.js';

let SVGAnimatedNumber_properties = ['baseVal']
for(let i=0; i<SVGAnimatedNumber_properties.length; i++){
    let property = SVGAnimatedNumber_properties[i];
    Object.defineProperty(SVGAnimatedNumber.prototype, property, {
        set: object_setter_withParent('SVGAnimatedNumber',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
