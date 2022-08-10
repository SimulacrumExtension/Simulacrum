import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLMapElement_property_setter_getter]
let HTMLMapElement_property_setter_getter = ['name'];
for(let i=0; i<HTMLMapElement_property_setter_getter.length; i++){
    let property = HTMLMapElement_property_setter_getter[i];
	Object.defineProperty(HTMLMapElement.prototype, property, {
        get: property_getter('HTMLMapElement',property+'_getter'),
        set: property_setter('HTMLMapElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMapElement_property_setter_getter]

// begin[override HTMLMapElement_property_getter]
let HTMLMapElement_property_getter = ['areas'];
for(let i=0; i<HTMLMapElement_property_getter.length; i++){
    let property = HTMLMapElement_property_getter[i];
	Object.defineProperty(HTMLMapElement.prototype, property, {
        get: property_getter('HTMLMapElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMapElement_property_getter]
