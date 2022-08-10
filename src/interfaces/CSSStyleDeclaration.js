import {object_setter_withParent} from '../templates.js';

let CSSStyleDeclaration_properties = ['cssText', 'cssFloat']
for(let i=0; i<CSSStyleDeclaration_properties.length; i++){
    let property = CSSStyleDeclaration_properties[i];
    Object.defineProperty(CSSStyleDeclaration.prototype, property, {
        set: object_setter_withParent('CSSStyleDeclaration',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}

let CSSStyleDeclaration_method = ['removeProperty', 'setProperty'];
for(let i=0; i<CSSStyleDeclaration_method.length; i++){
    let method = CSSStyleDeclaration_method[i]
	CSSStyleDeclaration.prototype[method] = object_setter_withParent('CSSStyleDeclaration',method);
}

