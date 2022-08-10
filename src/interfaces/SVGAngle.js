import {object_setter_withParent} from '../templates.js';

let SVGAngle_properties = ['valueAsString','valueInSpecifiedUnits','value']
for(let i=0; i<SVGAngle_properties.length; i++){
    let property = SVGAngle_properties[i];
    Object.defineProperty(SVGAngle.prototype, property, {
        set: object_setter_withParent('SVGAngle',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}

let SVGAngle_method = ['convertToSpecifiedUnits','newValueSpecifiedUnits'];
for(let i=0; i<SVGAngle_method.length; i++){
    let method = SVGAngle_method[i]
	SVGAngle.prototype[method] = object_setter_withParent('SVGAngle',method);
}
