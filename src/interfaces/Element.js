import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import {property_interaction,property_getter,property_setter, property_setter_DOMTokenList, property_elementAppender} from '../templates.js';
import {node_getArguments_CloneAfter} from './Node.js';
import {clone} from '../deepClone.js'

// begin[override element_property_getters]
let element_property_getters = ['assignedSlot', 'attributes', 'childElementCount', 'children', 'firstElementChild', 'lastElementChild', 'localName', 'namespaceURI', 'nextElementSibling', 'prefix', 'previousElementSibling', 'tagName']
for(let i=0; i<element_property_getters.length; i++){
    let property = element_property_getters[i];
	Object.defineProperty(Element.prototype, property, {
        get: property_getter('element',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override element_property_getters]

// begin[override element_property_getter_interaction]
let element_property_getter_screen = ['attributeStyleMap', 'shadowRoot', 'clientHeight', 'clientLeft', 'clientTop', 'clientWidth', 'scrollHeight', 'scrollWidth'];
for(let i=0; i<element_property_getter_screen.length; i++){
    let property = element_property_getter_screen[i]
	Object.defineProperty(Element.prototype, property, {
        get: property_interaction('element',property+"_getter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override element_property_getter_interaction]

// begin[override element_property_setter_getter_interaction]
let element_property_setter_getter_screen = ['scrollLeft', 'scrollTop'];
for(let i=0; i<element_property_setter_getter_screen.length; i++){
    let property = element_property_setter_getter_screen[i]
	Object.defineProperty(Element.prototype, property, {
        get: property_interaction('element',property+"_getter"),
        set: property_interaction('element',property+"_setter"),
        configurable: true,
        enumerable: true,
    });
}
// end[override element_property_setter_getter_interaction]

// begin[override element_property_setter_getters]
let element_property_setter_getters = ['className', 'id', 'innerHTML', 'outerHTML', 'elementTiming', 'slot', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 'onsearch', 'onfullscreenchange', 'onfullscreenerror', 'onwebkitfullscreenchange' , 'onwebkitfullscreenerror'];
for(let i=0; i<element_property_setter_getters.length; i++){
    let property = element_property_setter_getters[i];
	Object.defineProperty(Element.prototype, property, {
        get: property_getter('element',property+'_getter'),
        set: property_setter('element',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override element_property_setter_getters]

// begin[override element_property_setter_getters_DOMTokenList]
let element_property_setter_getters_DOMTokenList = ['classList', 'part'];
for(let i=0; i<element_property_setter_getters_DOMTokenList.length; i++){
    let property = element_property_setter_getters_DOMTokenList[i];
	Object.defineProperty(Element.prototype, property, {
        get: property_getter('element', property+'_getter'),
        set: property_setter_DOMTokenList('element', property+'_setter'),
        configurable: true,
        enumerable: true,
	});  
}     
// end[override element_property_setter_getters_DOMTokenList]

// begin[override element_method_get]
let element_methods_get = ['closest', 'getAttribute', 'getAttributeNS', 'getAttributeNames', 'getAttributeNode', 'getAttributeNodeNS', 'getElementsByClassName', 'getElementsByTagName', 'getElementsByTagNameNS', 'hasAttribute', 'hasAttributeNS', 'hasAttributes', 'matches', 'querySelector', 'querySelectorAll', 'webkitMatchesSelector']
for(let i=0; i<element_methods_get.length; i++){
    let method = element_methods_get[i];
	Element.prototype[method] = property_getter('element',method);
}
// end[override element_method_get]

// begin[override element_method_interaction]
let element_methods_screen = ['attachShadow', 'getBoundingClientRect', 'getClientRects', 'computedStyleMap', 'hasPointerCapture', 'releasePointerCapture', 'requestFullscreen', 'requestPointerLock', 'scroll', 'scrollBy', 'scrollIntoView', 'scrollIntoViewIfNeeded', 'scrollTo', 'setPointerCapture', 'webkitRequestFullScreen', 'webkitRequestFullscreen', 'animate']
for(let i=0; i<element_methods_screen.length; i++){
    let method = element_methods_screen[i]
	Element.prototype[method] = property_interaction('element',method);
}
// end[override element_method_interaction]

// begin[override element_method_elementAppender]
let element_method_elementAppender = [ 'insertAdjacentHTML', 'insertAdjacentText', 'setAttributeNode', 'setAttributeNodeNS'];
for(let i=0; i<element_method_elementAppender.length; i++){
    let method = element_method_elementAppender[i];
    Element.prototype[method] = property_elementAppender('element', method);
}
// end[override element_method_elementAppender]

// begin[override element_method_elementAppender2]
let element_method_elementAppender2 = ['prepend', 'append', 'replaceWith', 'insertAdjacentElement', 'before', 'after'];
for(let i=0; i<element_method_elementAppender2.length; i++){
    let method = element_method_elementAppender2[i];
    Element.prototype[method] = function(){
        try {
            logger("logger:  element."+method);
            if (parallelDOM == null || !original['node.isConnected_getter'].call(this))
                return original['element.'+method].apply(this, arguments);
            
            if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                let that = getEquivalent(this);
                if (original["node.ownerDocument_getter"].call(this) == document){
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments_CloneAfter(arguments);
                    /// let result = original['element.'+method].apply(that, parallelArguments);
                    /// for (let i=0; i<domArguments.length; i++){
                    ///    if (domArguments[i]=='clone'){
                    ///        domArguments[i] = clone(parallelArguments[i], true, true)
                    ///    }
                    ///    if (domArguments[i] instanceof Array){
                    ///        let elems = domArguments[i]
                    ///        domArguments[i] = original['document.createDocumentFragment'].call(document)
                    ///        for (let j=0; j<elems.length;  j++){
                    ///            original['node.appendChild'].call(domArguments[i], clone(elems[j], true, true))
                    ///        }
                    ///    }
                    /// }
                    /// original['element.'+method].apply(this, domArguments);

                    let result = original['element.'+method].apply(this, domArguments);
                    for (let i=0; i<parallelArguments.length; i++){
                        if (parallelArguments[i]=='clone'){
                            parallelArguments[i] = clone(domArguments[i], true, true)
                        }
                        if (parallelArguments[i] instanceof Array){
                            let elems = parallelArguments[i]
                            parallelArguments[i] = original['document.createDocumentFragment'].call(document)
                            for (let j=0; j<elems.length;  j++){
                                original['node.appendChild'].call(parallelArguments[i], clone(elems[j], true, true))
                            }
                        }
                    }
                    if (that) 
                        return original['element.'+method].apply(that, parallelArguments);
                    return result;
                } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM) {
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments_CloneAfter(arguments);
                    /// let result = original['element.'+method].apply(this, parallelArguments);
                    /// for (let i=0; i<domArguments.length; i++){
                    ///    if (domArguments[i]=='clone'){
                    ///        domArguments[i] = clone(parallelArguments[i], true, true)
                    ///    }
                    ///    if (domArguments[i] instanceof Array){
                    ///        let elems = domArguments[i]
                    ///        domArguments[i] = original['document.createDocumentFragment'].call(document)
                    ///        for (let j=0; j<elems.length;  j++){
                    ///            original['node.appendChild'].call(domArguments[i], clone(elems[j], true, true))
                    ///        }
                    ///    }
                    /// }
                    /// if (that) original['element.'+method].apply(that, domArguments);
                    let result;
                    if (that){
                        result = original['element.'+method].apply(that, domArguments);
                        for (let i=0; i<parallelArguments.length; i++){
                            if (parallelArguments[i]=='clone'){
                                parallelArguments[i] = clone(domArguments[i], true, true)
                            }
                            if (parallelArguments[i] instanceof Array){
                                let elems = parallelArguments[i]
                                parallelArguments[i] = original['document.createDocumentFragment'].call(document)
                                for (let j=0; j<elems.length;  j++){
                                    original['node.appendChild'].call(parallelArguments[i], clone(elems[j], true, true))
                                }
                            }
                        }
                    }
                    return original['element.'+method].apply(this, parallelArguments);
                    //return result;
                }
            }
            return original['element.'+method].apply(this, arguments);

        } catch (error) {
                //console.log('ERROR: Node.'+method)
                //console.log(this)
                //console.log(arguments)
                // throw error
                logger(error)
        }
    }
}
// end[override element_method_elementAppender2]

// begin[override element_method_set]
let element_methods_set = ['setAttribute', 'setAttributeNS', 'toggleAttribute',  'remove', 'removeAttribute', 'removeAttributeNS'];
for(let i=0; i<element_methods_set.length; i++){
    let method = element_methods_set[i];
    Element.prototype[method] = property_setter('element',method);
}
// end[override element_method_set]

// begin[override removeAttributeNode()]
Element.prototype['removeAttributeNode'] = function(){
    logger("logger:  element.removeAttributeNode");
    if (parallelDOM == null || !original['node.isConnected_getter'].call(this))
        return original['element.removeAttributeNode'].apply(this, arguments);
    let that = getEquivalent(this);
    if (original["node.ownerDocument_getter"].call(this) == document){
        if (that){
            let that_attr;
            let this_attr;
            [this_attr,that_attr] = removeAttributeNode_getAttr(this,that,arguments[0])
            original['element.removeAttributeNode'].apply(this, [this_attr]);
            return original['element.removeAttributeNode'].apply(that, [that_attr]);
        }
    } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM) {
        let that_attr;
        let this_attr;
        [this_attr,that_attr] = removeAttributeNode_getAttr(this,that,arguments[0])
        original['element.removeAttributeNode'].apply(that, [that_attr]);
        return original['element.removeAttributeNode'].apply(this, [this_attr]);
    } else {
        return original['element.removeAttributeNode'].apply(this, arguments);
    }
}

function removeAttributeNode_getAttr(_this,_that,attr){
    let that_attr;
    let this_attr;
    logger(attr);
    if (original['Attr.ownerElement_getter'].call(attr) == _that){
        that_attr = attr;
        this_attr = original['element.getAttributeNode'].call(_this,that_attr.localName);
    } else {
        this_attr = attr;
        that_attr = original['element.getAttributeNode'].call(_that,this_attr.localName);
    }
    return [this_attr,that_attr]
}
// end[override removeAttributeNode()]

