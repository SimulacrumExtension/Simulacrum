import {object_setter_withParent} from '../templates.js';

// begin[override SVGRect_property_setter_getters]
let SVGRect_property_setter_getters = ['x', 'y', 'width', 'height'];
for(let i=0; i<SVGRect_property_setter_getters.length; i++){
    let property = SVGRect_property_setter_getters[i];
	Object.defineProperty(SVGRect.prototype, property, {
        set: object_setter_withParent('SVGRect',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGRect_property_setter_getters]

