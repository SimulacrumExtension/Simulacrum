import {object_setter_withParent} from '../templates.js';

let SVGLength_properties = ['value', 'valueInSpecifiedUnits', 'valueAsString']
for(let i=0; i<SVGLength_properties.length; i++){
    let property = SVGLength_properties[i];
    Object.defineProperty(SVGLength.prototype, property, {
        set: object_setter_withParent('SVGLength',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}

let SVGLength_method = ['newValueSpecifiedUnits', 'convertToSpecifiedUnits'];
for(let i=0; i<SVGLength_method.length; i++){
    let method = SVGLength_method[i];
    SVGLength.prototype[method] = object_setter_withParent('SVGLength',method);
}
