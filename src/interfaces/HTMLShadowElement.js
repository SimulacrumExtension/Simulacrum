import {property_getter, property_setter} from '../templates.js';

// begin[override HTMLShadowElement_method_get]
let HTMLShadowElement_method_get = ['getDistributedNodes']
for(let i=0; i<HTMLShadowElement_method_get.length; i++){
    let method = HTMLShadowElement_method_get[i];
	HTMLShadowElement.prototype[method] = property_getter('HTMLShadowElement',method);
}
// end[override HTMLShadowElement_method_get]
