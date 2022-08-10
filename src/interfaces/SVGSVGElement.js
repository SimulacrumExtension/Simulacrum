import {property_getter,property_setter,property_interaction,property_getter_NodeList_interaction} from '../templates.js';

// begin[override SVGSVGElement_property_setter_getters]
let SVGSVGElement_property_setter_getters = ['currentScale', 'zoomAndPan'];
for(let i=0; i<SVGSVGElement_property_setter_getters.length; i++){
    let property = SVGSVGElement_property_setter_getters[i];
	Object.defineProperty(SVGSVGElement.prototype, property, {
        get: property_getter('SVGSVGElement',property+'_getter'),
        set: property_setter('SVGSVGElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGSVGElement_property_setter_getters]

// begin[override SVGSVGElement_property_getters]
let SVGSVGElement_property_getters = ['x', 'y', 'width', 'height', 'currentTranslate', 'viewBox', 'preserveAspectRatio'];
for(let i=0; i<SVGSVGElement_property_getters.length; i++){
    let property = SVGSVGElement_property_getters[i];
	Object.defineProperty(SVGSVGElement.prototype, property, {
        get: property_getter('SVGSVGElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGSVGElement_property_getters]

// begin[override SVGSVGElement_method_interaction]
let SVGSVGElement_method_interaction = ['checkIntersection', 'checkEnclosure', 'deselectAll', 'suspendRedraw', 'unsuspendRedraw', 'unsuspendRedrawAll', 'forceRedraw', 'pauseAnimations', 'unpauseAnimations', 'animationsPaused', 'getCurrentTime', 'setCurrentTime']
for(let i=0; i<SVGSVGElement_method_interaction.length; i++){
    let method = SVGSVGElement_method_interaction[i]
	SVGSVGElement.prototype[method] = property_interaction('SVGSVGElement',method);
}
// end[override SVGSVGElement_method_interaction]

// begin[override SVGSVGElement_method_get]
let SVGSVGElement_method_get = ['getElementById']
for(let i=0; i<SVGSVGElement_method_get.length; i++){
    let method = SVGSVGElement_method_get[i];
	SVGSVGElement.prototype[method] = property_getter('SVGSVGElement',method);
}
// end[override SVGSVGElement_method_get]

// begin[override SVGSVGElement_method_NodeList_interaction]
let SVGSVGElement_method_NodeList_interaction = ['getIntersectionList', 'getEnclosureList']
for(let i=0; i<SVGSVGElement_method_NodeList_interaction.length; i++){
    let method = SVGSVGElement_method_NodeList_interaction[i]
	SVGSVGElement.prototype[method] = property_getter_NodeList_interaction('SVGSVGElement',method);
}
// end[override SVGSVGElement_method_NodeList_interaction]