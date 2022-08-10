import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLTableCellElement_property_getter]
let HTMLTableCellElement_property_getter = ['cellIndex'];
for(let i=0; i<HTMLTableCellElement_property_getter.length; i++){
    let property = HTMLTableCellElement_property_getter[i];
	Object.defineProperty(HTMLTableCellElement.prototype, property, {
        get: property_getter('HTMLTableCellElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableCellElement_property_getter]

// begin[override HTMLTableCellElement_property_setter_getter]
let HTMLTableCellElement_property_setter_getter = ['colSpan', 'rowSpan', 'headers', 'align', 'axis', 'height', 'width', 'ch', 'chOff', 'noWrap', 'vAlign', 'bgColor', 'abbr', 'scope'];
for(let i=0; i<HTMLTableCellElement_property_setter_getter.length; i++){
    let property = HTMLTableCellElement_property_setter_getter[i];
	Object.defineProperty(HTMLTableCellElement.prototype, property, {
        get: property_getter('HTMLTableCellElement', property+'_getter'),
        set: property_setter('HTMLTableCellElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLTableCellElement_property_setter_getter]

