import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLTableRowElement_property_getter]
let HTMLTableRowElement_property_getter = ['rowIndex', 'sectionRowIndex', 'cells'];
for(let i=0; i<HTMLTableRowElement_property_getter.length; i++){
    let property = HTMLTableRowElement_property_getter[i];
	Object.defineProperty(HTMLTableRowElement.prototype, property, {
        get: property_getter('HTMLTableRowElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableRowElement_property_getter]

// begin[override HTMLTableRowElement_property_setter_getter]
let HTMLTableRowElement_property_setter_getter = ['align', 'ch', 'chOff', 'vAlign', 'bgColor'];
for(let i=0; i<HTMLTableRowElement_property_setter_getter.length; i++){
    let property = HTMLTableRowElement_property_setter_getter[i];
	Object.defineProperty(HTMLTableRowElement.prototype, property, {
        get: property_getter('HTMLTableRowElement', property+'_getter'),
        set: property_setter('HTMLTableRowElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableRowElement_property_setter_getter]

// begin[override HTMLTableRowElement_methods_set]
let HTMLTableRowElement_methods_set = ['insertCell', 'deleteCell'];
for(let i=0; i<HTMLTableRowElement_methods_set.length; i++){
    let method = HTMLTableRowElement_methods_set[i];
    HTMLTableRowElement.prototype[method] = property_setter('HTMLTableRowElement', method);
}
// end[override HTMLTableRowElement_methods_set]