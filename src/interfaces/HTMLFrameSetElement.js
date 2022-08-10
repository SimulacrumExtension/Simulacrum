import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLFrameSetElement_property_setter_getter]
let HTMLFrameSetElement_property_setter_getter = ['cols', 'rows', 'onblur', 'onerror', 'onfocus', 'onload', 'onresize', 'onscroll', 'onafterprint', 'onbeforeprint', 'onbeforeunload', 'onhashchange', 'onlanguagechange', 'onmessage', 'onmessageerror', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onrejectionhandled', 'onstorage', 'onunhandledrejection', 'onunload'];
for(let i=0; i<HTMLFrameSetElement_property_setter_getter.length; i++){
    let property = HTMLFrameSetElement_property_setter_getter[i];
	Object.defineProperty(HTMLFrameSetElement.prototype, property, {
        get: property_getter('HTMLFrameSetElement',property+'_getter'),
        set: property_setter('HTMLFrameSetElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLFrameSetElement_property_setter_getter]