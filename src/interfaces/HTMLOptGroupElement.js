import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLOptGroupElement_property_setter_getter]
let HTMLOptGroupElement_property_setter_getter = ['disabled', 'label'];
for(let i=0; i<HTMLOptGroupElement_property_setter_getter.length; i++){
    let property = HTMLOptGroupElement_property_setter_getter[i];
	Object.defineProperty(HTMLOptGroupElement.prototype, property, {
        get: property_getter('HTMLOptGroupElement',property+'_getter'),
        set: property_setter('HTMLOptGroupElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLOptGroupElement_property_setter_getter]

