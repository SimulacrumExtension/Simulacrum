import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLAnchorElement_property_setter_getter]
let HTMLAnchorElement_property_setter_getter = ['target', 'download', 'ping', 'rel', 'relList', 'hreflang', 'type', 'referrerPolicy', 'text', 'coords', 'charset', 'name', 'rev', 'shape', 'href', 'protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'];
for(let i=0; i<HTMLAnchorElement_property_setter_getter.length; i++){
    let property = HTMLAnchorElement_property_setter_getter[i];
	Object.defineProperty(HTMLAnchorElement.prototype, property, {
        get: property_getter('HTMLAnchorElement',property+'_getter'),
        set: property_setter('HTMLAnchorElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLAnchorElement_property_setter_getter]

// begin[override HTMLAnchorElement_property_getters]
let HTMLAnchorElement_property_getters = ['origin'];
for(let i=0; i<HTMLAnchorElement_property_getters.length; i++){
    let property = HTMLAnchorElement_property_getters[i];
	Object.defineProperty(HTMLAnchorElement.prototype, property, {
        get: property_getter('HTMLAnchorElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLAnchorElement_property_getters]

// begin[override HTMLAnchorElement_method_get]
let HTMLAnchorElement_method_get = ['toString']
for(let i=0; i<HTMLAnchorElement_method_get.length; i++){
    let method = HTMLAnchorElement_method_get[i];
	HTMLAnchorElement.prototype[method] = property_getter('HTMLAnchorElement',method);
}
// end[override HTMLAnchorElement_method_get]
