import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLScriptElement_property_setter_getter]
let HTMLScriptElement_property_setter_getter = ['src', 'type', 'noModule', 'charset', 'async', 'defer', 'crossOrigin', 'text', 'referrerPolicy', 'event', 'htmlFor', 'integrity'];
for(let i=0; i<HTMLScriptElement_property_setter_getter.length; i++){
    let property = HTMLScriptElement_property_setter_getter[i];
	Object.defineProperty(HTMLScriptElement.prototype, property, {
        get: property_getter('HTMLScriptElement', property+'_getter'),
        set: property_setter('HTMLScriptElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLScriptElement_property_setter_getter]

