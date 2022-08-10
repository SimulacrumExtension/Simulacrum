import {object_setter_withParent} from '../templates.js';

let SVGPoint_properties = ['x','y']
for(let i=0; i<SVGPoint_properties.length; i++){
    let property = SVGPoint_properties[i];
    Object.defineProperty(SVGPoint.prototype, property, {
        set: object_setter_withParent('SVGPoint',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}

let SVGPoint_method = ['matrixTransform'];
for(let i=0; i<SVGPoint_method.length; i++){
    let method = SVGPoint_method[i]
	SVGPoint.prototype[method] = object_setter_withParent('SVGPoint',method);
}


