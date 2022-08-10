import {object_setter_withParent} from '../templates.js';

let SVGPreserveAspectRatio_properties = ['align', 'meetOrSlice']
for(let i=0; i<SVGPreserveAspectRatio_properties.length; i++){
    let property = SVGPreserveAspectRatio_properties[i];
    Object.defineProperty(SVGPreserveAspectRatio.prototype, property, {
        set: object_setter_withParent('SVGPreserveAspectRatio',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
