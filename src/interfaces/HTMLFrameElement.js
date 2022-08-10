import {property_getter, property_setter,property_interaction} from '../templates.js';

// begin[override HTMLFrameElement_property_setter_getter]
let HTMLFrameElement_property_setter_getter = ['name', 'scrolling', 'src', 'frameBorder', 'longDesc', 'noResize', 'marginHeight', 'marginWidth'];
for(let i=0; i<HTMLFrameElement_property_setter_getter.length; i++){
    let property = HTMLFrameElement_property_setter_getter[i];
	Object.defineProperty(HTMLFrameElement.prototype, property, {
        get: property_getter('HTMLFrameElement', property+'_getter'),
        set: property_setter('HTMLFrameElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFrameElement_property_setter_getter]

// begin[override HTMLFrameElement_property_getter_interaction]
let HTMLFrameElement_property_getter_interaction = ['contentDocument', 'contentWindow'];
for(let i=0; i<HTMLFrameElement_property_getter_interaction.length; i++){
    let property = HTMLFrameElement_property_getter_interaction[i];
	Object.defineProperty(HTMLFrameElement.prototype, property, {
        get: property_interaction('HTMLFrameElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFrameElement_property_getter_interaction]

