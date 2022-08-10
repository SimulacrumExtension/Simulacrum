import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import {property_interaction,property_getter,property_setter, property_background} from '../templates.js';

// begin[override HTMLelement_property_getters]
let HTMLelement_property_getters = ['isContentEditable'];
for(let i=0; i<HTMLelement_property_getters.length; i++){
    let property = HTMLelement_property_getters[i];
	Object.defineProperty(HTMLElement.prototype, property, {
        get: property_getter('HTMLElement',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLelement_property_getters]

// begin[override HTMLElement_property_getter_interaction]
let HTMLElement_property_getter_screen = ['offsetTop', 'offsetLeft', 'offsetWidth', 'offsetHeight'];
for(let i=0; i<HTMLElement_property_getter_screen.length; i++){
    let property = HTMLElement_property_getter_screen[i]
	Object.defineProperty(HTMLElement.prototype, property, {
        get: property_interaction('HTMLElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLElement_property_getter_interaction]

// begin[override HTMLElement_offsetParent_custom]
Object.defineProperty(HTMLElement.prototype, "offsetParent", {
    get: function () {
        logger("logger:  HTMLElement.offsetParent_getter");
        if (parallelDOM == null || !original["node.isConnected_getter"].apply(this))
            return original['HTMLElement.offsetParent_getter'].apply(this, arguments);
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (getEquivalent(this))
                return getEquivalent(original['HTMLElement.offsetParent_getter'].apply(this, arguments));
            else {
                throw `TypeError: Cannot read property 'offsetParent' of null\n    at <anonymous>:1:6`;
            }
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            return getEquivalent(original['HTMLElement.offsetParent_getter'].apply(getEquivalent(this), arguments));
        }
        return original['HTMLElement.offsetParent_getter'].apply(this, arguments);
    },
    configurable: true,
    enumerable: true,
});
// end[override HTMLElement_offsetParent]

// begin[override HTMLelement_property_setter_getter]
let HTMLelement_property_setter_getter = ['title', 'lang', 'translate', 'dir', 'hidden', 'accessKey', 'draggable', 'spellcheck', 'autocapitalize', 'contentEditable', 'inputMode', 'innerText', 'outerText', 'nonce', 'autofocus', 'tabIndex', 'enterKeyHint', 'oncopy', 'oncut', 'onpaste', 'onabort', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onformdata', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkittransitionend', 'onwheel', 'onauxclick', 'ongotpointercapture', 'onlostpointercapture', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onselectstart', 'onselectionchange', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'ontransitionend', 'onpointerrawupdate'];
for(let i=0; i<HTMLelement_property_setter_getter.length; i++){
    let property = HTMLelement_property_setter_getter[i];
	Object.defineProperty(HTMLElement.prototype, property, {
        get: property_getter('HTMLElement',property+'_getter'),
        set: property_setter('HTMLElement',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLelement_property_setter_getter]

// begin[override HTMLelement_property_style]
Object.defineProperty(HTMLElement.prototype, 'style', {
    get: property_interaction('HTMLElement','style_getter'),
    set: property_setter('HTMLElement','style_setter'),
    configurable: true,
    enumerable: true,
});
// end[override HTMLelement_property_style]

// begin[override HTMLElement_method_interaction]
let HTMLElement_method_screen = ['click', 'focus', 'blur', 'attachInternals'];
for(let i=0; i<HTMLElement_method_screen.length; i++){
    let method = HTMLElement_method_screen[i]
	HTMLElement.prototype[method] = property_interaction('HTMLElement',method);
}
// end[override HTMLElement_method_interaction]

// begin[override HTMLElement_property_getter_background]
let HTMLElement_property_getter_background = ['dataset'];
for(let i=0; i<HTMLElement_property_getter_background.length; i++){
    let property = HTMLElement_property_getter_background[i]
	Object.defineProperty(HTMLElement.prototype, property, {
        get: property_background('HTMLElement',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override HTMLElement_property_getter_background]