import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLHtmlElement_property_setter_getter]
let HTMLHtmlElement_property_setter_getter = ['version'];
for(let i=0; i<HTMLHtmlElement_property_setter_getter.length; i++){
    let property = HTMLHtmlElement_property_setter_getter[i];
	Object.defineProperty(HTMLHtmlElement.prototype, property, {
        get: property_getter('HTMLHtmlElement',property+'_getter'),
        set: property_setter('HTMLHtmlElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLHtmlElement_property_setter_getter]
