import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {getEquivalentNode} from '../getEquivalentNode.js';
import {getEquivalentText} from '../getEquivalentText.js';
import {logger} from './logger.js'
import {clone} from '../deepClone.js'
import {node_getArguments} from '../templates.js';

// begin[override node_property_getters]
let node_property_getters = ['childNodes', 'firstChild', 'isConnected', 'lastChild', 'nextSibling', /*'nodeName', 'nodeType',*/ 'parentElement', 'previousSibling', 'baseURI'];
for(let i=0; i<node_property_getters.length; i++){
    let property = node_property_getters[i];
	Object.defineProperty(Node.prototype, property, {
        get: function () {
            logger("logger:  node."+property+"_getter")
            if (parallelDOM == null)
                return original["node."+property+"_getter"].apply(this);
            if (original["node.nodeType_getter"].call(this)!=1 || !original["node.isConnected_getter"].apply(this)){
                if (this == document)
                    return original["node."+property+"_getter"].apply(parallelDOM);
                return original["node."+property+"_getter"].apply(this);
            }   
            if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                if (original["node.ownerDocument_getter"].apply(this) == document){
                    let that = getEquivalent(this);
                    if (that)
                        return original["node."+property+"_getter"].apply(that);
                    //else
                        //throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;
                }
            } 
            return original["node."+property+"_getter"].apply(this);
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override node_property_getters]

// begin[override node_property_getter_document]
let node_property_getter_document = ['parentNode'];
for(let i=0; i<node_property_getter_document.length; i++){
    let property = node_property_getter_document[i];
	Object.defineProperty(Node.prototype, property, {
        get: function () {
            logger("logger:  node."+property+"_getter")
            if (parallelDOM == null)
                return original["node."+property+"_getter"].apply(this);
            if (original["node.nodeType_getter"].call(this)!=1 || !original["node.isConnected_getter"].apply(this)){
                let result = original["node."+property+"_getter"].apply(this);
                if (result == parallelDOM)
                    return document
                return result
            }   
            if (original['node.getRootNode'].call(this)==document){
                let that = getEquivalent(this);
                if (that){
                    let result = original["node."+property+"_getter"].apply(that);
                    if (result == parallelDOM)
                        return document
                    else
                        return result
                } //else
                    //throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;
            } else if (original['node.getRootNode'].call(this)==parallelDOM){
                let result = original["node."+property+"_getter"].apply(this);
                if (result == parallelDOM)
                    return document
                else
                    return result
            } 
            return original["node."+property+"_getter"].apply(this);
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override node_property_getter_document]

// begin[override node_property_getters_interaction]
let node_property_getters_interaction = ['ownerDocument'];
for(let i=0; i<node_property_getters_interaction.length; i++){
    let property = node_property_getters_interaction[i];
	Object.defineProperty(Node.prototype, property, {
        get: function () {
            logger("logger:  node."+property+"_getter")
            if (this == null)
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;
            if (parallelDOM == null)
                return original["node."+property+"_getter"].apply(this);

            //if (this instanceof Element && original['node.getRootNode'].call(this)==document && getEquivalent(this) == null){
                //throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;
            //}
            let result = original["node."+property+"_getter"].apply(this);
            if (result == parallelDOM)
                return document
            else
                return result
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override node_property_getters_interaction]


// begin[override textContent]
Object.defineProperty(Node.prototype, "textContent", {
    get: function () {
        logger("logger:  node.textContent_getter")
        if (parallelDOM == null)
            return original["node.textContent_getter"].apply(this, arguments);

        if (this instanceof Element || this instanceof CharacterData){
            if (![document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                return original["node.textContent_getter"].apply(this, arguments);
            }  
            if (original["node.ownerDocument_getter"].apply(this) == document){
                let that = getEquivalentNode(this);
                if (that)
                    return original["node.textContent_getter"].apply(that);
                //else
                    //throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
            } else {
                return original["node.textContent_getter"].apply(this);
            }
        } else if (this instanceof Attr){
            let this_ownerElement = original['Attr.ownerElement_getter'].apply(this);
            if (this_ownerElement){
                if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                    return original["node.textContent_getter"].apply(this,arguments);
                if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    if (that_ownerElement){
                        let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                        return original["node.textContent_getter"].apply(that_attr,arguments);
                    } //else
                        //throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
                }
            }
            return original["node.textContent_getter"].apply(this,arguments);
        } else {
            return original["node.textContent_getter"].apply(this, arguments);
        }
    },
    set: function(){
        logger("logger:  node.textContent_setter")
        if (parallelDOM == null)
            return original["node.textContent_setter"].apply(this, arguments);
         
        if (this instanceof Element || this instanceof CharacterData){
            if (![document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                return original["node.textContent_setter"].apply(this, arguments);
            }  
            if (original["node.ownerDocument_getter"].apply(this) == document){
                let that = getEquivalentNode(this);
                if (that){
                    original["node.textContent_setter"].apply(this, arguments);
                    return original["node.textContent_setter"].apply(that, arguments);
                } //else
                    //throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
            } else if (original["node.ownerDocument_getter"].apply(this) == parallelDOM){
                let that = getEquivalentNode(this);
                if(that) original["node.textContent_setter"].apply(that, arguments);
                return original["node.textContent_setter"].apply(this, arguments);
            } else {
                return original["node.textContent_setter"].apply(this, arguments);
            }
        } else if (this instanceof Attr){
            let this_ownerElement = original['Attr.ownerElement_getter'].apply(this);
            if (this_ownerElement){
                if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                    return original["node.textContent_setter"].apply(this,arguments);
                if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    if (that_ownerElement){
                        let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                        original["node.textContent_setter"].apply(this,arguments);
                        return original["node.textContent_setter"].apply(that_attr,arguments);
                    } //else
                        //throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
                } else {
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                    if (that_attr) original["node.textContent_setter"].apply(that_attr,arguments);
                    return original["node.textContent_setter"].apply(this,arguments);
                }
            }
            return original["node.textContent_setter"].apply(this,arguments);
        } else {
            return original["node.textContent_setter"].apply(this, arguments);
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override textContent]

// begin[override nodeValue]
Object.defineProperty(Node.prototype, "nodeValue", {
    get: function () {
        logger("logger:  node.nodeValue_getter")
        if (parallelDOM == null)
            return original["node.nodeValue_getter"].apply(this, arguments);

        if (this instanceof Attr){
            let this_ownerElement = original['Attr.ownerElement_getter'].apply(this);
            if (this_ownerElement){
                if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                    return original["node.nodeValue_getter"].apply(this,arguments);
                if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    if (that_ownerElement){
                        let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                        return original["node.nodeValue_getter"].apply(that_attr,arguments);
                    } //else
                        //throw `TypeError: Cannot read property 'nodeValue' of null\n    at <anonymous>:1:6`;
                }
            }
            return original["node.nodeValue_getter"].apply(this,arguments);
        } else if (this instanceof CharacterData){
            if (![document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                return original["node.nodeValue_getter"].apply(this);
            }   
            if (original["node.ownerDocument_getter"].apply(this) == document){
                let that = getEquivalentNode(this);
                if (that)
                    return original["node.nodeValue_getter"].apply(that);
                //else
                //    throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
            } else {
                return original["node.nodeValue_getter"].apply(this);
            }
        } else {
            return original["node.nodeValue_getter"].apply(this, arguments);
        }

    },
    set: function(){
        logger("logger:  node.nodeValue_setter")
        if (parallelDOM == null)
            return original["node.nodeValue_setter"].apply(this, arguments);

        if (this instanceof Attr){
            let this_ownerElement = original['Attr.ownerElement_getter'].apply(this);
            if (this_ownerElement){
                if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                    return original["node.nodeValue_setter"].apply(this,arguments);
                if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    if (that_ownerElement){
                        let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                        original["node.nodeValue_setter"].apply(this,arguments);
                        return original["node.nodeValue_setter"].apply(that_attr,arguments);
                    } //else
                        //throw `TypeError: Cannot read property 'nodeValue' of null\n    at <anonymous>:1:6`;
                } else {
                    let that_ownerElement = getEquivalent(this_ownerElement);
                    let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                    if (that_attr) original["node.nodeValue_setter"].apply(that_attr,arguments);
                    return original["node.nodeValue_setter"].apply(this,arguments);
                }
            }
            return original["node.nodeValue_setter"].apply(this,arguments);
        } else if (this instanceof CharacterData){
            if (![document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                return original["node.nodeValue_setter"].apply(this, arguments);
            }   
            if (original["node.ownerDocument_getter"].apply(this) == document){
                let that = getEquivalentNode(this);
                if (that){
                    original["node.nodeValue_setter"].apply(this, arguments);
                    return original["node.nodeValue_setter"].apply(that, arguments);
                } //else
                    //throw `TypeError: Cannot read property 'textContent' of null\n    at <anonymous>:1:6`;
            } else {
                let that = getEquivalentNode(this);
                if(that) original["node.nodeValue_setter"].apply(that, arguments);
                return original["node.nodeValue_setter"].apply(this, arguments);
            }
        } else {
            return original["node.nodeValue_setter"].apply(this, arguments);
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override nodeValue]

// begin[override node_method_set]
let node_method_set = ['normalize', 'removeChild', 'replaceChild', 'contains', 'isSameNode', 'isEqualNode', 'compareDocumentPosition'];
for(let i=0; i<node_method_set.length; i++){
    let method = node_method_set[i];
    Node.prototype[method] = function(){
        try {
            logger("logger:  node."+method);
            if (parallelDOM == null )
                return original['node.'+method].apply(this, arguments);
            if (original["node.nodeType_getter"].call(this)!=1 || !original['node.isConnected_getter'].call(this)){
                if (original["node.nodeType_getter"].call(this)==9){
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments(arguments);
                    if (this == document){
                        original['node.'+method].apply(this, domArguments);
                        return original['node.'+method].apply(parallelDOM, parallelArguments);
                    } else if (this == parallelDOM) {
                        original['node.'+method].apply(document, domArguments);
                        return original['node.'+method].apply(this, parallelArguments);
                    }
                }
                return original['node.'+method].apply(this, arguments);
            }
            if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                let that = getEquivalent(this);
                if (original["node.ownerDocument_getter"].call(this) == document){
                    if (that) {
                        let domArguments;
                        let parallelArguments;
                        [domArguments,parallelArguments] = node_getArguments(arguments);
                        let result = original['node.'+method].apply(that, parallelArguments);
                        original['node.'+method].apply(this, domArguments);
                        return result;
                    } //else {
                        //throw  `Uncaught TypeError: Cannot read property '`+method+`' of null\n    at <anonymous>:1:6`;
                    //}
                } else if (this && original["node.ownerDocument_getter"].call(this) == parallelDOM) {
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments(arguments);
                    let result = original['node.'+method].apply(this, parallelArguments);
                    if (that) {
                        if(!(domArguments.length==1 && !domArguments[0]))
                            original['node.'+method].apply(that, domArguments);
                    }
                    return result;
                }
            }
            return original['node.'+method].apply(this, arguments);

        } catch (error) {
                //console.log('ERROR: Node.'+method)
                //console.log(this)
                //console.log(arguments)
                // throw error
                logger(error)
        }
    }
}
// end[override node_method_set]

// begin[override node_method_set_CloneAfter]
let node_method_set_CloneAfter = ['appendChild', 'insertBefore'];
for(let i=0; i<node_method_set_CloneAfter.length; i++){
    let method = node_method_set_CloneAfter[i];
    Node.prototype[method] = function(){
        try {
            logger("logger:  node."+method);
            if (parallelDOM == null )
                return original['node.'+method].apply(this, arguments);
            if (original["node.nodeType_getter"].call(this)!=1 || !original['node.isConnected_getter'].call(this)){
                if (original["node.nodeType_getter"].call(this)==9){
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments(arguments);
                    if (this == document){
                        original['node.'+method].apply(this, domArguments);
                        return original['node.'+method].apply(parallelDOM, parallelArguments);
                    } else if (this == parallelDOM) {
                        original['node.'+method].apply(document, domArguments);
                        return original['node.'+method].apply(this, parallelArguments);
                    }
                }
                return original['node.'+method].apply(this, arguments);
            }
            if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
                let that = getEquivalent(this);
                if (original["node.ownerDocument_getter"].call(this) == document){
                    
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments_CloneAfter(arguments);
                    /// let result = original['node.'+method].apply(that, parallelArguments);
                    /// if (domArguments[0]=='clone'){
                    ///     domArguments[0] = clone(result, true, true)
                    /// }
                    /// if (domArguments[0] instanceof Array){
                    ///     let elems = domArguments[0]
                    ///     domArguments[0] = original['document.createDocumentFragment'].call(document)
                    ///     for (let i=0; i<elems.length;  i++){
                    ///         original['node.appendChild'].call(domArguments[0], clone(elems[i], true, true))
                    ///     }
                    /// }
                    /// original['node.'+method].apply(this, domArguments);
                    let result = original['node.'+method].apply(this, domArguments);
                    if (parallelArguments[0]=='clone'){
                        parallelArguments[0] = clone(result, true, true)
                    }
                    if (parallelArguments[0] instanceof Array){
                        let elems = parallelArguments[0]
                        parallelArguments[0] = original['document.createDocumentFragment'].call(document)
                        for (let i=0; i<elems.length;  i++){
                            original['node.appendChild'].call(parallelArguments[0], clone(elems[i], true, true))
                        }
                    }
                    if (that) 
                        return original['node.'+method].apply(that, parallelArguments);
                    return result;

                } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM) {
                    let domArguments;
                    let parallelArguments;
                    [domArguments,parallelArguments] = node_getArguments_CloneAfter(arguments);
                    /// let result = original['node.'+method].apply(this, parallelArguments);
                    /// if (domArguments[0]=='clone'){
                    ///    domArguments[0] = clone(result, true, true)
                    /// }
                    /// if (domArguments[0] instanceof Array){
                    ///    let elems = domArguments[0]
                    ///    domArguments[0] = original['document.createDocumentFragment'].call(document)
                    ///    for (let i=0; i<elems.length;  i++){
                    ///        original['node.appendChild'].call(domArguments[0], clone(elems[i], true, true))
                    ///    }
                    /// }
                    /// if (that) original['node.'+method].apply(that, domArguments);

                    let result;
                    if (that)
                        result = original['node.'+method].apply(that, domArguments);
                    if (parallelArguments[0]=='clone'){
                        parallelArguments[0] = clone(domArguments[0], true, true)
                    }
                    if (parallelArguments[0] instanceof Array){
                        let elems = parallelArguments[0]
                        parallelArguments[0] = original['document.createDocumentFragment'].call(document)
                        for (let i=0; i<elems.length;  i++){
                            original['node.appendChild'].call(parallelArguments[0], clone(elems[i], true, true))
                        }
                    }
                    
                    return original['node.'+method].apply(this, parallelArguments);
                    /// return result;
                }
            }
            return original['node.'+method].apply(this, arguments);

        } catch (error) {
                //console.log('ERROR: Node.'+method)
                //console.log(this)
                //console.log(arguments)
                // throw error
                logger(error)
        }
    }
}
// end[override node_method_set_CloneAfter]

// begin[override node_method_get]
let node_method_get = ['hasChildNodes', /*'cloneNode',*/ 'isDefaultNamespace', 'lookupNamespaceURI', 'lookupPrefix'];
for(let i=0; i<node_method_get.length; i++){
    let method = node_method_get[i];
	Node.prototype[method] = function(){
        logger("logger:  node."+method);
        if (parallelDOM == null)
            return original['node.'+method].apply(this, arguments);

		if (original["node.nodeType_getter"].call(this)!=1 || !original['node.isConnected_getter'].call(this)){
            if (this == document)
                return original['node.'+method].apply(parallelDOM, arguments);
            return original['node.'+method].apply(this, arguments);
        }
        if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
            if (original['node.ownerDocument_getter'].call(this) == document){
                let that = getEquivalent(this);
                if (that)
                    return original['node.'+method].apply(that, arguments);
                //else
                //    throw `TypeError: Cannot read property '`+method+`' of null\n    at <anonymous>:1:6`;
            }
        }
		return original['node.'+method].apply(this, arguments);
	};
}
// end[override node_method_get]


// begin[override node_method_get_document]
/* if it returns document, it shouldn't be  parallelDOM */
let node_method_get_document = ['getRootNode'];
for(let i=0; i<node_method_get_document.length; i++){
    let method = node_method_get_document[i];
	Node.prototype[method] = function(){
        logger("logger:  node."+method);
        let result = original['node.'+method].apply(this, arguments);
        if (parallelDOM == null)
            return result;

		if (original["node.nodeType_getter"].call(this)!=1 || !original['node.isConnected_getter'].call(this)){
            if (this == document)
                return original['node.'+method].apply(parallelDOM, arguments);
            return result;
        }
        if ([document, parallelDOM].includes(original['node.getRootNode'].call(this))){
            if (original['node.ownerDocument_getter'].call(this) == document){
                let that = getEquivalent(this);
                if (that)
                    return document;
                //else
                //    throw `TypeError: Cannot read property '`+method+`' of null\n    at <anonymous>:1:6`;
            }
        }
		return result;
	};
}
// end[override node_method_get_document]

// Private Methods

function node_getArguments_CloneAfter(_arguments){
	let domArguments = [];
    let parallelArguments = [];
    for(let i=0; i<_arguments.length; i++){
        let arg = _arguments[i];
        let domArg = null;
        let parallelArg = null;
        if (typeof(arg)!='object' || arg==null){
            domArguments.push(arg);
            parallelArguments.push(arg);
        } else if ( arg instanceof Element ){
            [domArg,parallelArg] = node_getArguments_element(arg)
            domArguments.push(domArg);
            parallelArguments.push(parallelArg);
        } else if ( arg instanceof CharacterData ){
            [domArg,parallelArg] = node_getArguments_Text(arg)
            domArguments.push(domArg);
            parallelArguments.push(parallelArg);
        } else if ( arg instanceof DocumentFragment ){
            //domArguments.push(domArg);
            //domArguments.push(clone(arg,true,true))

            /// domArguments.push(Array.prototype.slice.call(original['node.childNodes_getter'].call(arg)))
            /// parallelArguments.push(arg);

            parallelArguments.push(Array.prototype.slice.call(original['node.childNodes_getter'].call(arg)))
            domArguments.push(arg);
        } else {
            /// domArguments.push(original["node.cloneNode"].apply(arg,[true]));
            /// parallelArguments.push(arg);

            parallelArguments.push(original["node.cloneNode"].apply(arg,[true]));
            domArguments.push(arg);
        }
    }
    return [domArguments,parallelArguments]
}

function node_getArguments_element(arg){
    let domArg = null;
    let parallelArg = null;
    if (original["node.ownerDocument_getter"].call(arg) == document && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalent(arg);
        domArg = arg;
        parallelArg = that;
    } else if (original["node.ownerDocument_getter"].call(arg) == parallelDOM && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalent(arg);
        domArg = that;
        parallelArg = arg;
    } else {
        // domArg = original["node.cloneNode"].apply(arg,[true]);
        //domArg = clone(arg,true, true);


        /// domArg = 'clone';
        /// parallelArg = arg;
        domArg = arg;
        parallelArg = 'clone'
    }
    return [domArg,parallelArg]
}

function node_getArguments_Text(arg){
    let domArg = null;
    let parallelArg = null;
    if (original["node.ownerDocument_getter"].call(arg) == document && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalentText(arg);
        domArg = arg;
        parallelArg = that;
    } else if (original["node.ownerDocument_getter"].call(arg) == parallelDOM && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalentText(arg);
        domArg = that;
        parallelArg = arg;
    } else {
         domArg = clone(arg,true,true);
         parallelArg = arg;
        //
        // parallelArg = original["node.cloneNode"].apply(arg,[true]);
        // domArg = arg;
    }
    return [domArg,parallelArg]
}

export {node_getArguments_CloneAfter}