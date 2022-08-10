import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override SVGStyleElement_property_setter_getters]
let SVGStyleElement_property_setter_getters = ['type', 'media', 'title', 'disabled'];
for(let i=0; i<SVGStyleElement_property_setter_getters.length; i++){
    let property = SVGStyleElement_property_setter_getters[i];
	Object.defineProperty(SVGStyleElement.prototype, property, {
        get: property_getter('SVGStyleElement',property+'_getter'),
        set: property_setter('SVGStyleElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGStyleElement_property_setter_getters]

// begin[override SVGStyleElement_property_getters_interaction]
let SVGStyleElement_property_getters_interaction = ['sheet'];
for(let i=0; i<SVGStyleElement_property_getters_interaction.length; i++){
    let property = SVGStyleElement_property_getters_interaction[i];
	Object.defineProperty(SVGStyleElement.prototype, property, {
        get: property_interaction('SVGStyleElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGStyleElement_property_getters_interaction]

