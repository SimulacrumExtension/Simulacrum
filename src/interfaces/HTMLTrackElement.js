import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLTrackElement_property_getter_interaction]
let HTMLTrackElement_property_getter_interaction = ['readyState', 'track'];
for(let i=0; i<HTMLTrackElement_property_getter_interaction.length; i++){
    let property = HTMLTrackElement_property_getter_interaction[i];
	Object.defineProperty(HTMLTrackElement.prototype, property, {
        get: property_interaction('HTMLTrackElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTrackElement_property_getter_interaction]

// begin[override HTMLTrackElement_property_setter_getter]
let HTMLTrackElement_property_setter_getter = ['kind', 'src', 'srclang', 'label', 'default'];
for(let i=0; i<HTMLTrackElement_property_setter_getter.length; i++){
    let property = HTMLTrackElement_property_setter_getter[i];
	Object.defineProperty(HTMLTrackElement.prototype, property, {
        get: property_getter('HTMLTrackElement', property+'_getter'),
        set: property_setter('HTMLTrackElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTrackElement_property_setter_getter]
