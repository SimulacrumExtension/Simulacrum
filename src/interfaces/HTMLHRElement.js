import {property_getter,property_setter} from '../templates.js';

// begin[override HTMLHRElement_property_setter_getters]
let HTMLHRElement_property_setter_getters = ['align', 'color', 'noShade', 'size', 'width'];
for(let i=0; i<HTMLHRElement_property_setter_getters.length; i++){
    let property = HTMLHRElement_property_setter_getters[i];
	Object.defineProperty(HTMLHRElement.prototype, property, {
        get: property_getter('HTMLHRElement',property+'_getter'),
        set: property_setter('HTMLHRElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLHRElement_property_setter_getters]

