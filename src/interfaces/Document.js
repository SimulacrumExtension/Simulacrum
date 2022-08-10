import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import { getEquivalentNode } from '../getEquivalentNode.js';
import { clone } from '../deepClone.js';
import {node_getArguments} from '../templates.js';

// begin[override document_property_getters]
let document_property_getters = ['documentElement', 'head', 'images', 'embeds', 'plugins', 'links', 'forms', 'scripts', 'anchors', 'applets', 'all', 'scrollingElement', 'children', 'firstElementChild', 'lastElementChild', 'childElementCount', 'rootElement'];
for(let i=0; i<document_property_getters.length; i++){
    let property = document_property_getters[i];
    Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property)
            if (this == document && parallelDOM != null){
                return original['document.'+property+'_getter'].apply(parallelDOM, arguments);
            } else {
                return original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override document_property_getters]

// begin[override document_getter_interaction]
let document_getter_interaction = ['implementation', 'URL', 'documentURI', 'compatMode', 'characterSet', 'charset', 'inputEncoding', 'contentType', 'doctype', 'xmlEncoding', 'referrer', 'readyState', 'defaultView', 'hidden', 'visibilityState', 'wasDiscarded', 'webkitVisibilityState', 'webkitHidden', 'webkitIsFullScreen', 'webkitFullscreenEnabled', 'fonts', 'pictureInPictureEnabled', 'featurePolicy', 'lastModified'];
for(let i=0; i<document_getter_interaction.length; i++){
    let property = document_getter_interaction[i];
    Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && this == parallelDOM){
                return original['document.'+property+'_getter'].apply(document, arguments);
            } else {
                return original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override document_getter_interaction]

// begin[override document_property_setter_getter]
let document_property_setter_getter = ['title', 'fgColor', 'linkColor', 'vlinkColor', 'alinkColor', 'bgColor'];
for(let i=0; i<document_property_setter_getter.length; i++){
    let property = document_property_setter_getter[i];
	Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property+"_getter");
            if (this == document && parallelDOM != null){
                return original['document.'+property+'_getter'].apply(parallelDOM, arguments);
            } else {
                return original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        set: function(){
            logger("logger:  document."+property+"setter")
            if (parallelDOM != null && (this == document || this == parallelDOM)){
                original['document.'+property+'_setter'].apply(document, arguments);
                return original['document.'+property+'_setter'].apply(parallelDOM, arguments);
            } else {
                return original['document.'+property+'_setter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true,
    });
}  
// end[override document_property_setter_getter]

// begin[override document_getter_setter_interaction]
let document_getter_setter_interaction = ['xmlVersion', 'xmlStandalone', 'domain', 'cookie', 'fullscreen', 'dir', 'adoptedStyleSheets', 'designMode', 'fullscreenEnabled'];
for(let i=0; i<document_getter_setter_interaction.length; i++){
    let property = document_getter_setter_interaction[i];
    Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && this == parallelDOM){
                return original['document.'+property+'_getter'].apply(document, arguments);
            } else {
                return original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        set: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && this == parallelDOM){
                return original['document.'+property+'_setter'].apply(document, arguments);
            } else {
                return original['document.'+property+'_setter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override document_getter_setter_interaction]

// begin[override document_getter_setter_interaction_events]
let document_getter_setter_interaction_events = ['onpointerlockchange', 'onpointerlockerror', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 'onfreeze', 'onresume', 'onsearch', 'onsecuritypolicyviolation', 'onvisibilitychange', 'oncopy', 'oncut', 'onpaste', 'onabort', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onformdata', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting', 'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkittransitionend', 'onwheel', 'onauxclick', 'ongotpointercapture', 'onlostpointercapture', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onselectstart', 'onselectionchange', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'ontransitionend', 'onfullscreenchange', 'onfullscreenerror', 'onwebkitfullscreenchange', 'onwebkitfullscreenerror', 'onpointerrawupdate', 'onreadystatechange'];
for(let i=0; i<document_getter_setter_interaction_events.length; i++){
    let property = document_getter_setter_interaction_events[i];
    Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && this == parallelDOM){
                return original['document.'+property+'_getter'].apply(document, arguments);
            } else {
                return original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        set: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && this == parallelDOM){
                return original['document.'+property+'_setter'].apply(document, arguments);
            } else {
                return original['document.'+property+'_setter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override document_getter_setter_interaction_events]

// begin[override document_styleSheets]
Object.defineProperty(Document.prototype, 'styleSheets', {
    get: function(){
        logger("logger:  document.styleSheets")
        if (parallelDOM != null && (this == document || this == parallelDOM)){
            let real = original['document.styleSheets_getter'].apply(document, arguments);
            return document_styleSheets_filter(real);
        } else {
            return original['document.styleSheets_getter'].apply(this, arguments);
        }
    },
    configurable: true,
    enumerable: true,
});

function document_styleSheets_filter(styleSheets){
    let output = {}
    length = 0
    for (let i=0; i<styleSheets.length; i++){
        let styleSheet = styleSheets[i];
        let owner = original['StyleSheet.ownerNode_getter'].call(styleSheet);
        if (getEquivalent(owner)){
            output[i.toString()] = {value: styleSheet, enumerable: true};
            length ++;
        }
    }
    output['length'] = {value: length, enumerable: true}
    output['item'] = {value: function(i){return this[+i || 0];} }

    return Object.create(StyleSheetList.prototype, output);
}
// end[override document_styleSheets]

// begin[override document_property_getter_element_interaction]
let document_property_getter_element_interaction = ['activeElement', 'pointerLockElement' , 'webkitCurrentFullScreenElement', 'webkitFullscreenElement' ,'pictureInPictureElement']
for(let i=0; i<document_property_getter_element_interaction.length; i++){
	let property = document_property_getter_element_interaction[i]
	Object.defineProperty(Document.prototype, property, {
        get: function(){
            logger("logger:  document."+property)
            if (parallelDOM != null && (this == document || this == parallelDOM)){
                let real = original['document.'+property+'_getter'].apply(document, arguments);
                while (real){
                    let output = getEquivalent(real);
                    if (output)
                        return output;
                    real = original["node.parentNode_getter"].apply(real);
                }
                return real;
            } else {
                original['document.'+property+'_getter'].apply(this, arguments);
            }
        },
        set: function(){},
        configurable: true,
        enumerable: true,
    });
}
// end[override document_property_getter_element_interaction]

// begin[override fullscreenElement_getter_setter_interaction]
Object.defineProperty(Document.prototype, 'fullscreenElement', {
    get: function(){
        logger("logger:  document.fullscreenElement")
        if (parallelDOM != null && (this == document || this == parallelDOM)){
            let real = original['document.fullscreenElement_getter'].apply(document, arguments);
            while (real){
                let output = getEquivalent(real);
                if (output)
                    return output;
                real = original["node.parentNode_getter"].apply(real);
            }
            return real;
        } else {
            original['document.fullscreenElement_getter'].apply(this, arguments);
        }
    },
    set: function(){
        logger("logger:  document.fullscreenElement")
        if (parallelDOM != null)
            return original['document.fullscreenElement_setter'].apply(this, arguments);
        if (this == document || this == parallelDOM){
            if (original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
                arguments[0] = getEquivalent(arguments[0])
            return original['document.fullscreenElement_setter'].apply(document, arguments);
        } else {
            if (original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
                arguments[0] = getEquivalent(arguments[0])
            original['document.fullscreenElement_setter'].apply(this, arguments);
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override fullscreenElement_getter_setter_interaction]

// begin[override body_getter_setter]
Object.defineProperty(Document.prototype, 'body', {
    get: function(){
        logger("logger:  document.body_getter");
        if (this == document && parallelDOM != null){
            return original['document.body_getter'].apply(parallelDOM, arguments);
        } else {
            return original['document.body_getter'].apply(this, arguments);
        }
    },
    set: function(){
        logger("logger:  document.body_setter")
        if (parallelDOM != null && (this == document || this == parallelDOM)){
            let dom_node;
            let parallelDom_node;
            [dom_node, parallelDom_node] = node_getArguments(arguments);
            original['document.body_setter'].apply(document, dom_node);
            return original['document.body_setter'].apply(parallelDOM, parallelDom_node);
        } else {
            return original['document.body_setter'].apply(this, arguments);
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override body_getter_setter]

// begin[override document_method_getter]
let document_method_getter = ['getElementById', 'getElementsByClassName', 'getElementsByName', 'getElementsByTagName', 'getElementsByTagNameNS', 'querySelector', 'querySelectorAll']
for(let i=0; i<document_method_getter.length; i++){
	let method = document_method_getter[i]
	Document.prototype[method] = function(){
		logger("logger:  document."+method)
        if (this == document && parallelDOM != null){
            return original['document.'+method].apply(parallelDOM, arguments);
        } else {
            return original['document.'+method].apply(this, arguments);
        }
	};
}
// end[override document_method_getter]

// begin[override document_method_setter_element]
let document_method_setter_element = ['append', 'prepend', 'importNode','adoptNode'];
for(let i=0; i<document_method_setter_element.length; i++){
    let method = document_method_setter_element[i];
    Document.prototype[method] = function(){
        logger("logger:  document."+method);
        if (parallelDOM == null)
            return original['document.'+method].apply(this, arguments);
	    let domArguments;
	    let parallelArguments;
	    [domArguments,parallelArguments] = node_getArguments(arguments)
	    if (this == document || this == parallelDOM){
        	original['document.'+method].apply(document, domArguments);
            return original['document.'+method].apply(parallelDOM, parallelArguments);
	    } else {
            if( ['importNode','adoptNode'].includes(method) )
                original['document.'+method].apply(this, parallelArguments);
			return original['document.'+method].apply(this, domArguments);
	    }
    };
}
// end[override document_method_setter_element]

// begin[override document_method_setter]
let document_method_setter = ['clear', 'open', 'write', 'writeln', 'close']
for(let i=0; i<document_method_setter.length; i++){
	let method = document_method_setter[i]
	Document.prototype[method] = function(){
		logger("logger:  document."+method)
        if (parallelDOM != null && (this == document || this == parallelDOM)){
			original['document.'+method].apply(parallelDOM, arguments)
            return original['document.'+method].apply(document, arguments);
        } else {
            return original['document.'+method].apply(this, arguments);
        }
	};
}
// end[override document_method_setter]

// begin[override document_method_interaction]
let document_method_interaction = ['hasFocus', 'execCommand', 'queryCommandEnabled', 'queryCommandIndeterm', 'queryCommandState', 'queryCommandSupported', 'queryCommandValue', 'captureEvents', 'releaseEvents', 'exitPointerLock', 'getSelection', 'exitFullscreen', 'webkitCancelFullScreen', 'webkitExitFullscreen', 'exitPictureInPicture', 'caretRangeFromPoint']
for(let i=0; i<document_method_interaction.length; i++){
    let method = document_method_interaction[i];
    Document.prototype[method] = function(){
        logger("logger:  document."+method);
        if (parallelDOM != null && this == parallelDOM){
            return original['document.'+method].apply(document, arguments);
        } else {
            return original['document.'+method].apply(this, arguments);
        }  
    }
}
// end[override document_method_interaction]

// begin[override document_method_elementFromPoint]
Document.prototype['elementFromPoint'] = function(){
    logger("logger:  document.elementFromPoint");
    if (parallelDOM != null && (this == document || this == parallelDOM)){
        let output = original['document.elementFromPoint'].apply(document, arguments);
        while (output){
            let result = getEquivalent(output);
            if (result)
                return result;
            output = original["node.parentNode_getter"].apply(output);
        }
    } else {
          return original['document.elementFromPoint'].apply(this, arguments);
    }  
}
// end[override document_method_elementFromPoint]

// begin[override document_method_elementsFromPoint]
Document.prototype['elementsFromPoint'] = function(){
    logger("logger:  document.elementsFromPoint");
    if (parallelDOM != null && (this == document || this == parallelDOM)){
        let output = original['document.elementsFromPoint'].apply(document, arguments);
        let result = [];
        for (let j=0; j<output.length; j++){
            let tmp = getEquivalent(output[j]);
            if (tmp)
                result.push(tmp);
        }
        return result;
    } else {
          return original['document.elementsFromPoint'].apply(this, arguments);
    }  
}
// end[override document_method_elementsFromPoint]

// begin[override document.evaluate]
Document.prototype['evaluate'] = function(){
    logger("logger:  document.evaluate");
	if (parallelDOM != null && arguments[1] == document)
		arguments[1] = parallelDOM;
	return original['document.evaluate'].apply(this, arguments);
};
// end[override document.evaluate]

// begin[override document.createNodeIterator]
Document.prototype['createNodeIterator'] = function(){
    logger("logger:  document.createNodeIterator");
	if (parallelDOM != null && original['node.getRootNode'].call(arguments[0])==document)
        arguments[0] = getEquivalentNode(arguments[0]);
	return original['document.createNodeIterator'].apply(this, arguments);
};
// end[override document.createNodeIterator]

// begin[override document.createTreeWalker]
Document.prototype['createTreeWalker'] = function(){
    logger("logger:  document.createTreeWalker");
	if (parallelDOM != null && original['node.getRootNode'].call(arguments[0])==document)
		arguments[0] = getEquivalentNode(arguments[0]);
	return original['document.createTreeWalker'].apply(this, arguments);
};
// end[override document.createTreeWalker]
