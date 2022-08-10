import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLBodyElement_property_setter_getter]
let HTMLBodyElement_property_setter_getter = ['text', 'link', 'vLink', 'aLink', 'bgColor', 'background', 'onblur', 'onerror', 'onfocus', 'onload', 'onresize', 'onscroll', 'onafterprint', 'onbeforeprint', 'onbeforeunload', 'onhashchange', 'onlanguagechange', 'onmessage', 'onmessageerror', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onrejectionhandled', 'onstorage', 'onunhandledrejection', 'onunload'];
for(let i=0; i<HTMLBodyElement_property_setter_getter.length; i++){
    let property = HTMLBodyElement_property_setter_getter[i];
	Object.defineProperty(HTMLBodyElement.prototype, property, {
        get: property_getter('HTMLBodyElement',property+'_getter'),
        set: property_setter('HTMLBodyElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLBodyElement_property_setter_getter]