import {object_setter_withParent} from '../templates.js';

let SVGAnimatedInteger_properties = ['baseVal']
for(let i=0; i<SVGAnimatedInteger_properties.length; i++){
    let property = SVGAnimatedInteger_properties[i];
    Object.defineProperty(SVGAnimatedInteger.prototype, property, {
        set: object_setter_withParent('SVGAnimatedInteger',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
