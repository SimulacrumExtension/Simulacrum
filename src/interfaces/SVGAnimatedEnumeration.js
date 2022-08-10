import {object_setter_withParent} from '../templates.js';

let SVGAnimatedEnumeration_properties = ['baseVal']
for(let i=0; i<SVGAnimatedEnumeration_properties.length; i++){
    let property = SVGAnimatedEnumeration_properties[i];
    Object.defineProperty(SVGAnimatedEnumeration.prototype, property, {
        set: object_setter_withParent('SVGAnimatedEnumeration',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}

