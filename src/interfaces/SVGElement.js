import {property_getter,property_setter,property_interaction, property_background} from '../templates.js';

// begin[override SVGElement_property_setter_getters]
let SVGElement_property_setter_getters = ['oncopy', 'oncut', 'onpaste', 'onabort', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onformdata', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkittransitionend', 'onwheel', 'onauxclick', 'ongotpointercapture', 'onlostpointercapture', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onselectstart', 'onselectionchange', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'ontransitionend', 'nonce', 'autofocus', 'tabIndex', 'onpointerrawupdate'];
for(let i=0; i<SVGElement_property_setter_getters.length; i++){
    let property = SVGElement_property_setter_getters[i];
	Object.defineProperty(SVGElement.prototype, property, {
        get: property_getter('SVGElement',property+'_getter'),
        set: property_setter('SVGElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGElement_property_setter_getters]

// begin[override SVGElement_property_style]
Object.defineProperty(SVGElement.prototype, 'style', {
    get: property_interaction('SVGElement','style_getter'),
    set: property_setter('SVGElement','style_setter'),
    configurable: true,
    enumerable: true,
});
// end[override SVGElement_property_style]

// begin[override SVGElement_property_getters]
let SVGElement_property_getters = ['className', 'ownerSVGElement', 'viewportElement', 'dataset'];
for(let i=0; i<SVGElement_property_getters.length; i++){
    let property = SVGElement_property_getters[i];
	Object.defineProperty(SVGElement.prototype, property, {
        get: property_getter('SVGElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGElement_property_getters]

// begin[override SVGElement_property_getter_background]
let SVGElement_property_getter_background = ['dataset'];
for(let i=0; i<SVGElement_property_getter_background.length; i++){
    let property = SVGElement_property_getter_background[i]
	Object.defineProperty(SVGElement.prototype, property, {
        get: property_background('SVGElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override SVGElement_property_getter_background]

// begin[override SVGElement_method_interaction]
let SVGElement_method_interaction = ['focus', 'blur'];
for(let i=0; i<SVGElement_method_interaction.length; i++){
    let method = SVGElement_method_interaction[i]
	SVGElement.prototype[method] = property_interaction('SVGElement',method);
}
// end[override HTMLElement_method_interaction]
