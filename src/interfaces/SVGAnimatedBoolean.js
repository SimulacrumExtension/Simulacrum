import {object_setter_withParent} from '../templates.js';

let SVGAnimatedBoolean_properties = ['baseVal']
for(let i=0; i<SVGAnimatedBoolean_properties.length; i++){
    let property = SVGAnimatedBoolean_properties[i];
    Object.defineProperty(SVGAnimatedBoolean.prototype, property, {
        set: object_setter_withParent('SVGAnimatedBoolean',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
