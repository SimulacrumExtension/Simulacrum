import { original } from '../original.js';
import {property_getter, property_setter, property_interaction} from '../templates.js';

// begin[override HTMLIFrameElement_property_getter]
let HTMLIFrameElement_property_getter = ['featurePolicy'];
for(let i=0; i<HTMLIFrameElement_property_getter.length; i++){
    let property = HTMLIFrameElement_property_getter[i];
	Object.defineProperty(HTMLIFrameElement.prototype, property, {
        get: property_getter('HTMLIFrameElement', property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLIFrameElement_property_getter]

// begin[override HTMLIFrameElement_property_setter_getter]
let HTMLIFrameElement_property_setter_getter = ['src', 'srcdoc', 'name', 'sandbox', 'allowFullscreen', 'width', 'height', 'referrerPolicy', 'csp', 'allow', 'align', 'scrolling', 'frameBorder', 'longDesc', 'marginHeight', 'marginWidth', 'loading', 'allowPaymentRequest'];
for(let i=0; i<HTMLIFrameElement_property_setter_getter.length; i++){
    let property = HTMLIFrameElement_property_setter_getter[i];
	Object.defineProperty(HTMLIFrameElement.prototype, property, {
        get: property_getter('HTMLIFrameElement', property+'_getter'),
        set: property_setter('HTMLIFrameElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLIFrameElement_property_setter_getter]

// begin[override HTMLIFrameElement_property_getter_interaction]
let HTMLIFrameElement_property_getter_interaction = ['contentDocument', 'contentWindow'];
for(let i=0; i<HTMLIFrameElement_property_getter_interaction.length; i++){
    let property = HTMLIFrameElement_property_getter_interaction[i]
	Object.defineProperty(HTMLIFrameElement.prototype, property, {
        get: function(){
            let iframeWindow = property_interaction('HTMLIFrameElement',"contentWindow_getter").apply(this, arguments);

            try { // accessing to the iframe window immediately 
                if (iframeWindow && !iframeWindow.__ready){
                    return
                }
            } catch (error) {
            }
            
            if (property == "contentWindow")
                return iframeWindow
            else
                return property_interaction('HTMLIFrameElement',"contentDocument_getter").apply(this, arguments); 
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLIFrameElement_property_getter_interaction]

// begin[override HTMLIFrameElement_method_interaction]
let HTMLIFrameElement_method_interaction = ['getSVGDocument'];
for(let i=0; i<HTMLIFrameElement_method_interaction.length; i++){
    let method = HTMLIFrameElement_method_interaction[i];
	HTMLIFrameElement.prototype[method] = property_interaction('HTMLIFrameElement',method);
}
// end[override HTMLIFrameElement_method_interaction]