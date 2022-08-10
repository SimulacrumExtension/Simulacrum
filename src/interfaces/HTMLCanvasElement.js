import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLCanvasElement_property_setter_getter]
let HTMLCanvasElement_property_setter_getter = ['width', 'height'];
for(let i=0; i<HTMLCanvasElement_property_setter_getter.length; i++){
    let property = HTMLCanvasElement_property_setter_getter[i];
	Object.defineProperty(HTMLCanvasElement.prototype, property, {
        get: property_getter('HTMLCanvasElement', property+'_getter'),
        set: property_setter('HTMLCanvasElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLCanvasElement_property_setter_getter]

// begin[override HTMLCanvasElement_method_interaction]
let HTMLCanvasElement_method_interaction = ['toDataURL', 'toBlob', 'getContext', 'captureStream', 'transferControlToOffscreen']
for(let i=0; i<HTMLCanvasElement_method_interaction.length; i++){
    let method = HTMLCanvasElement_method_interaction[i]
	HTMLCanvasElement.prototype[method] = property_interaction('HTMLCanvasElement',method);
}
// end[override HTMLCanvasElement_method_interaction]