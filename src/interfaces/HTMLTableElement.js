import {property_getter, property_setter, property_elementAppender} from '../templates.js';

// begin[override HTMLTableElement_property_getter]
let HTMLTableElement_property_getter = ['tBodies', 'rows'];
for(let i=0; i<HTMLTableElement_property_getter.length; i++){
    let property = HTMLTableElement_property_getter[i];
	Object.defineProperty(HTMLTableElement.prototype, property, {
        get: property_getter('HTMLTableElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableElement_property_getter]

// begin[override HTMLTableElement_property_setter_getter]
let HTMLTableElement_property_setter_getter = ['align', 'border', 'frame', 'rules', 'summary', 'width', 'bgColor', 'cellPadding', 'cellSpacing'];
for(let i=0; i<HTMLTableElement_property_setter_getter.length; i++){
    let property = HTMLTableElement_property_setter_getter[i];
	Object.defineProperty(HTMLTableElement.prototype, property, {
        get: property_getter('HTMLTableElement', property+'_getter'),
        set: property_setter('HTMLTableElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableElement_property_setter_getter]

// begin[override HTMLTableElement_property_setter_getter_elementAppender]
let HTMLTableElement_property_setter_getter_elementAppender = ['caption', 'tHead', 'tFoot'];
for(let i=0; i<HTMLTableElement_property_setter_getter_elementAppender.length; i++){
    let property = HTMLTableElement_property_setter_getter_elementAppender[i];
	Object.defineProperty(HTMLTableElement.prototype, property, {
        get: property_getter('HTMLTableElement', property+'_getter'),
        set: property_elementAppender('HTMLTableElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableElement_property_setter_getter_elementAppender]

// begin[override HTMLTableElement_method_set]
let HTMLTableElement_method_set = ['createCaption', 'deleteCaption', 'createTHead', 'deleteTHead', 'createTFoot', 'deleteTFoot', 'createTBody', 'insertRow', 'deleteRow'];
for(let i=0; i<HTMLTableElement_method_set.length; i++){
    let method = HTMLTableElement_method_set[i];
	HTMLTableElement.prototype[method] = property_setter('HTMLTableElement',method);
}
// end[override HTMLTableElement_method_set]