import {property_getter,property_setter} from '../templates.js';

// begin[override SVGViewElement_property_setter_getters]
let SVGViewElement_property_setter_getters = ['zoomAndPan'];
for(let i=0; i<SVGViewElement_property_setter_getters.length; i++){
    let property = SVGViewElement_property_setter_getters[i];
	Object.defineProperty(SVGViewElement.prototype, property, {
        get: property_getter('SVGViewElement',property+'_getter'),
        set: property_setter('SVGViewElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGViewElement_property_setter_getters]

// begin[override SVGViewElement_property_getters]
let SVGViewElement_property_getters = ['viewBox', 'preserveAspectRatio'];
for(let i=0; i<SVGViewElement_property_getters.length; i++){
    let property = SVGViewElement_property_getters[i];
	Object.defineProperty(SVGViewElement.prototype, property, {
        get: property_getter('SVGViewElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGViewElement_property_getters]

