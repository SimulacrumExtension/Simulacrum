import {property_getter} from '../templates.js';

// begin[override SVGFETurbulenceElement_property_getters]
let SVGFETurbulenceElement_property_getters = ['baseFrequencyX', 'baseFrequencyY', 'numOctaves', 'seed', 'stitchTiles', 'type', 'x', 'y', 'width', 'height', 'result'];
for(let i=0; i<SVGFETurbulenceElement_property_getters.length; i++){
    let property = SVGFETurbulenceElement_property_getters[i];
	Object.defineProperty(SVGFETurbulenceElement.prototype, property, {
        get: property_getter('SVGFETurbulenceElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGFETurbulenceElement_property_getters]
