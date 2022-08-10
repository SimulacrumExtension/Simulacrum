import {property_getter, property_setter, property_interaction, property_setter_DOMTokenList} from '../templates.js';

// begin[override HTMLLinkElement_property_setter_getter]
let HTMLLinkElement_property_setter_getter = ['disabled', 'href', 'crossOrigin', 'rel', 'media', 'hreflang', 'type', 'as', 'referrerPolicy', 'imageSrcset', 'imageSizes', 'charset', 'rev', 'target', 'integrity'];
for(let i=0; i<HTMLLinkElement_property_setter_getter.length; i++){
    let property = HTMLLinkElement_property_setter_getter[i];
	Object.defineProperty(HTMLLinkElement.prototype, property, {
        get: property_getter('HTMLLinkElement', property+'_getter'),
        set: property_setter('HTMLLinkElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLinkElement_property_setter_getter]

// begin[override HTMLLinkElement_property_setter_getter_DOMTokenList]
let HTMLLinkElement_property_setter_getter_DOMTokenList = ['relList', 'sizes'];
for(let i=0; i<HTMLLinkElement_property_setter_getter_DOMTokenList.length; i++){
    let property = HTMLLinkElement_property_setter_getter_DOMTokenList[i];
	Object.defineProperty(HTMLLinkElement.prototype, property, {
        get: property_getter('HTMLLinkElement', property+'_getter'),
        set: property_setter_DOMTokenList('HTMLLinkElement', property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLinkElement_property_setter_getter_DOMTokenList] 

// begin[override HTMLLinkElement_property_getter_interaction] 
let HTMLLinkElement_property_getter_interaction = ['sheet'];
for(let i=0; i<HTMLLinkElement_property_getter_interaction.length; i++){
    let property = HTMLLinkElement_property_getter_interaction[i]
	Object.defineProperty(HTMLLinkElement.prototype, property, {
        get: property_interaction('HTMLLinkElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLLinkElement_property_getter_interaction]
