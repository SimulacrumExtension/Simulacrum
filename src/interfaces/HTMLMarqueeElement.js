import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLMarqueeElement_property_setter_getter]
let HTMLMarqueeElement_property_setter_getter = ['behavior', 'bgColor', 'direction', 'height', 'hspace', 'loop', 'scrollAmount', 'scrollDelay', 'trueSpeed', 'vspace', 'width'];
for(let i=0; i<HTMLMarqueeElement_property_setter_getter.length; i++){
    let property = HTMLMarqueeElement_property_setter_getter[i];
	Object.defineProperty(HTMLMarqueeElement.prototype, property, {
        get: property_getter('HTMLMarqueeElement', property+'_getter'),
        set: property_setter('HTMLMarqueeElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLMarqueeElement_property_setter_getter]

// begin[override HTMLMarqueeElement_method_set]
let HTMLMarqueeElement_method_set = ['start', 'stop'];
for(let i=0; i<HTMLMarqueeElement_method_set.length; i++){
    let method = HTMLMarqueeElement_method_set[i];
    HTMLMarqueeElement.prototype[method] = property_setter('HTMLMarqueeElement',method);
}
// end[override HTMLMarqueeElement_method_set]
