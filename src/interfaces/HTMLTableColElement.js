import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLTableColElement_property_setter_getter]
let HTMLTableColElement_property_setter_getter = ['span', 'align', 'ch', 'chOff', 'vAlign', 'width'];
for(let i=0; i<HTMLTableColElement_property_setter_getter.length; i++){
    let property = HTMLTableColElement_property_setter_getter[i];
	Object.defineProperty(HTMLTableColElement.prototype, property, {
        get: property_getter('HTMLTableColElement', property+'_getter'),
        set: property_setter('HTMLTableColElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableColElement_property_setter_getter]

