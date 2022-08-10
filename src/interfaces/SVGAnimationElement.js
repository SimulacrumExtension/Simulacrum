import {property_getter, property_interaction, property_setter} from '../templates.js';

// begin[override SVGAnimationElement_property_getters]
let SVGAnimationElement_property_getters = ['targetElement', 'requiredExtensions', 'systemLanguage'];
for(let i=0; i<SVGAnimationElement_property_getters.length; i++){
    let property = SVGAnimationElement_property_getters[i];
	Object.defineProperty(SVGAnimationElement.prototype, property, {
        get: property_getter('SVGAnimationElement',property+'_getter'),
        configurable: true,
        enumerable: true,

    });
}
// end[override SVGAnimationElement_property_getters]

// begin[override SVGAnimationElement_method_interaction]
let SVGAnimationElement_method_interaction = ['getStartTime', 'getCurrentTime', 'getSimpleDuration', 'beginElement', 'beginElementAt', 'endElement', 'endElementAt']
for(let i=0; i<SVGAnimationElement_method_interaction.length; i++){
    let method = SVGAnimationElement_method_interaction[i]
	SVGAnimationElement.prototype[method] = property_interaction('SVGAnimationElement',method);
}
// end[override SVGAnimationElement_method_interaction]

// begin[override SVGAnimationElement_property_setter_getters]
let SVGAnimationElement_property_setter_getters = ['onbegin', 'onend', 'onrepeat'];
for(let i=0; i<SVGAnimationElement_property_setter_getters.length; i++){
    let property = SVGAnimationElement_property_setter_getters[i];
	Object.defineProperty(SVGAnimationElement.prototype, property, {
        get: property_getter('SVGAnimationElement',property+'_getter'),
        set: property_setter('SVGAnimationElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGAnimationElement_property_setter_getters]