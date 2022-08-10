import {object_setter_withParent} from '../templates.js';

let SVGAnimatedString_properties = ['baseVal']
for(let i=0; i<SVGAnimatedString_properties.length; i++){
    let property = SVGAnimatedString_properties[i];
    Object.defineProperty(SVGAnimatedString.prototype, property, {
        set: object_setter_withParent('SVGAnimatedString',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
