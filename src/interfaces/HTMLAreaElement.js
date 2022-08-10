import {property_setter_DOMTokenList,property_getter, property_setter} from '../templates.js';

// begin[override HTMLAreaElement_property_getter]
let HTMLAreaElement_property_getter = ['origin'];
for(let i=0; i<HTMLAreaElement_property_getter.length; i++){
    let property = HTMLAreaElement_property_getter[i];
	Object.defineProperty(HTMLAreaElement.prototype, property, {
        get: property_getter('HTMLAreaElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLAreaElement_property_getter]

// begin[override HTMLAreaElement_property_setter_getter]
let HTMLAreaElement_property_setter_getter = ['alt', 'coords', 'download', 'shape', 'target', 'ping', 'rel', 'referrerPolicy', 'noHref', 'href', 'protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'];
for(let i=0; i<HTMLAreaElement_property_setter_getter.length; i++){
    let property = HTMLAreaElement_property_setter_getter[i];
	Object.defineProperty(HTMLAreaElement.prototype, property, {
        get: property_getter('HTMLAreaElement',property+'_getter'),
        set: property_setter('HTMLAreaElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLAreaElement_property_setter_getter]

// begin[override HTMLAreaElement_property_setter_getter_DOMTokenList]
let HTMLAreaElement_property_setter_getter_DOMTokenList = ['relList'];
for(let i=0; i<HTMLAreaElement_property_setter_getter_DOMTokenList.length; i++){
    let property = HTMLAreaElement_property_setter_getter_DOMTokenList[i];
	Object.defineProperty(HTMLAreaElement.prototype, property, {
        get: property_getter('HTMLAreaElement',property+'_getter'),
        set: property_setter_DOMTokenList('HTMLAreaElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLAreaElement_property_setter_getter_DOMTokenList]

// begin[override HTMLAreaElement_method_get]
let HTMLAreaElement_method_get = ['toString'];
for(let i=0; i<HTMLAreaElement_method_get.length; i++){
    let method = HTMLAreaElement_method_get[i];
	HTMLAreaElement.prototype[method] = property_getter('HTMLAreaElement',method);
}
// end[override HTMLAreaElement_method_get]