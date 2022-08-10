import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLTableSectionElement_property_getter]
let HTMLTableSectionElement_property_getter = ['rows'];
for(let i=0; i<HTMLTableSectionElement_property_getter.length; i++){
    let property = HTMLTableSectionElement_property_getter[i];
	Object.defineProperty(HTMLTableSectionElement.prototype, property, {
        get: property_getter('HTMLTableSectionElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableSectionElement_property_getter]

// begin[override HTMLTableSectionElement_property_setter_getter]
let HTMLTableSectionElement_property_setter_getter = ['align', 'ch', 'chOff', 'vAlign'];
for(let i=0; i<HTMLTableSectionElement_property_setter_getter.length; i++){
    let property = HTMLTableSectionElement_property_setter_getter[i];
	Object.defineProperty(HTMLTableSectionElement.prototype, property, {
        get: property_getter('HTMLTableSectionElement', property+'_getter'),
        set: property_setter('HTMLTableSectionElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableSectionElement_property_setter_getter]

// begin[override HTMLTableSectionElement_methods_set]
let HTMLTableSectionElement_methods_set = ['insertRow', 'deleteRow'];
for(let i=0; i<HTMLTableSectionElement_methods_set.length; i++){
    let method = HTMLTableSectionElement_methods_set[i];
    HTMLTableSectionElement.prototype[method] = property_setter('HTMLTableSectionElement', method);
}
// end[override HTMLTableSectionElement_methods_set]


