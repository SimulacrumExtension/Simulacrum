import {property_getter, property_setter} from '../templates.js';

// begin[override SVGScriptElement_property_getters]
let SVGScriptElement_property_getters = ['href'];
for(let i=0; i<SVGScriptElement_property_getters.length; i++){
    let property = SVGScriptElement_property_getters[i];
	Object.defineProperty(SVGScriptElement.prototype, property, {
        get: property_getter('SVGScriptElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGScriptElement_property_getters]

// begin[override SVGScriptElement_property_setter_getters]
let SVGScriptElement_property_setter_getters = ['type'];
for(let i=0; i<SVGScriptElement_property_setter_getters.length; i++){
    let property = SVGScriptElement_property_setter_getters[i];
	Object.defineProperty(SVGScriptElement.prototype, property, {
        get: property_getter('SVGScriptElement',property+'_getter'),
        set: property_setter('SVGScriptElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGScriptElement_property_setter_getters]
