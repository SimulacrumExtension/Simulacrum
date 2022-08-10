import {parallelDOM} from './parallelDOM.js';
import {original} from './original.js';
import {getEquivalent} from './getEquivalent.js';
import {logger} from './interfaces/logger.js'
import {generate_clean_HTMLCollection,generate_clean_NodeList} from './objectGenerator.js';
import { getEquivalentText } from './getEquivalentText.js';
import {clone} from './deepClone.js'

function property_getter(interfaceName, property) {
    return function () {
        if (this.id_removed == "true") {
            if (property == 'attributes_getter') {
                let cloned = clone(this);
                let result = original[interfaceName + "." + property].apply(cloned, arguments);
                if (result) {
                    if ('id' in result) {
                        result = original['NamedNodeMap.removeNamedItem'].call(result, 'id');
                        return result;
                    }
                }
            }
            if (property == 'id_getter')
                return undefined
            if (property == 'hasAttribute' && arguments[0] == 'id')
                return false;
            if (property == 'getAttribute' && arguments[0] == 'id')
                return undefined;
        }
        logger("t-logger:  " + interfaceName + "." + property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)))
            return original[interfaceName + '.' + property].apply(this, arguments);
        let result;
        if (original["node.ownerDocument_getter"].apply(this) == document) {
            let that = getEquivalent(this);
            if (that) {
                result = original[interfaceName + "." + property].apply(that, arguments);
                if (result)
                    return setParent(result, that, interfaceName + "." + property, arguments);
                else
                    return result;
            }
        } else {
            result = original[interfaceName + "." + property].apply(this, arguments);
            if (result)
                return setParent(result, this, interfaceName + "." + property, arguments);
            else
                return result;
        }

    };
}

function property_getter_text(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+'.'+property].apply(this, arguments);
        let result;
        if (original["node.ownerDocument_getter"].apply(this) == document){
            let that = getEquivalentText(this);
            if (that){
                return original[interfaceName+"."+property].apply(that,arguments);
            } 
        } else {
            return original[interfaceName+"."+property].apply(this,arguments);
        }
    };
}

function property_setter(interfaceName, property) {
    return function () {
        if (this.id_removed == "true") {
            if (property == 'id_setter') {
                this.id_removed = "false"
                let that = getEquivalent(this);
                if (that)
                    that.id_removed = "false"
            }
            if (property == 'setAttribute' && arguments[0] == 'id') {
                this.id_removed = "false"
                let that = getEquivalent(this);
                if (that)
                    that.id_removed = "false"
            }
        }
        logger("t-logger:  " + interfaceName + "." + property)
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)))
            return original[interfaceName + '.' + property].apply(this, arguments);
        if (original["node.ownerDocument_getter"].apply(this) == document) {
            let that = getEquivalent(this);
            if (that) {
                original[interfaceName + "." + property].apply(this, arguments);
                return original[interfaceName + "." + property].apply(that, arguments);
            } 
        } else if (original["node.ownerDocument_getter"].apply(this) == parallelDOM) {
            let that = getEquivalent(this);
            if (that) original[interfaceName + "." + property].apply(that, arguments);
            return original[interfaceName + "." + property].apply(this, arguments);
        } else {
            return original[interfaceName + "." + property].apply(this, arguments);
        }
    };
}

function property_setter_text(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property)
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+'.'+property].apply(this, arguments);
        if (original["node.ownerDocument_getter"].apply(this) == document){
            let that = getEquivalentText(this);
            if (that){
                original[interfaceName+"."+property].apply(this,arguments);
                return original[interfaceName+"."+property].apply(that,arguments);
            } 
        } else if (original["node.ownerDocument_getter"].apply(this) == parallelDOM){
            let that = getEquivalentText(this);
            if(that) original[interfaceName+"."+property].apply(that,arguments);
            return original[interfaceName+"."+property].apply(this,arguments);
        } else {
            return original[interfaceName+"."+property].apply(this,arguments);
        }
    };
}

function property_interaction(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) ){
            if (original['node.ownerDocument_getter'].apply(this)==parallelDOM){
                original['document.adoptNode'].call(document, this)
            }
            return original[interfaceName+'.'+property].apply(this, arguments);
        }
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (getEquivalent(this)){
                return original[interfaceName+'.'+property].apply(this, arguments);
            } 
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let that = getEquivalent(this);
            if (that) return original[interfaceName+'.'+property].apply(that, arguments);
        }
        return original[interfaceName+'.'+property].apply(this, arguments);
    };
}

function property_background(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null ||  ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+'.'+property].apply(this, arguments);
        if (original["node.ownerDocument_getter"].call(this) == document){
            let that = getEquivalent(this);
            if (that){
                return original[interfaceName+'.'+property].apply(that, arguments);
            } 
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            return original[interfaceName+'.'+property].apply(this, arguments);
        }
        return original[interfaceName+'.'+property].apply(this, arguments);
    };
}

function property_setter_DOMTokenList(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+"."+property].apply(this,arguments);
        if (original['node.ownerDocument_getter'].call(this) == document){
            let that = getEquivalent(this);
            if  (that){
                setTokenList(interfaceName,property, that, arguments[0]);
                setTokenList(interfaceName,property, this, arguments[0]);
                return arguments[0];
            } 
        } else if (original['node.ownerDocument_getter'].call(this) == parallelDOM) {
            let that = getEquivalent(this);
            setTokenList(interfaceName,property, that, arguments[0]);
            setTokenList(interfaceName,property, this, arguments[0]);
            return arguments[0];
        } else {
            return original[interfaceName+"."+property].apply(this,arguments);
        }
    };
}

function property_elementAppender(interfaceName,property){
    return function(){
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+'.'+property].apply(this, arguments);
        
        let domArguments;
        let parallelArguments;
        [domArguments,parallelArguments] = node_getArguments(arguments);
        let that = getEquivalent(this);
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (that){
                let result = original[interfaceName+'.'+property].apply(that, parallelArguments);
                original[interfaceName+'.'+property].apply(this, domArguments);
                return result;
            } 
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let result = original[interfaceName+'.'+property].apply(this, parallelArguments);
            original[interfaceName+'.'+property].apply(that, domArguments);
            return result
        } else {
            return original[interfaceName+'.'+property].apply(this, parallelArguments);
        }
    };
}

function property_elementAppender_text(interfaceName,property){
    return function(){
        logger("t-logger:  "+interfaceName+"."+property);
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) )
            return original[interfaceName+'.'+property].apply(this, arguments);
        let domArguments;
        let parallelArguments;
        [domArguments,parallelArguments] = node_getArguments(arguments);
        let that = getEquivalentText(this);
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (that){
                let result = original[interfaceName+'.'+property].apply(that, parallelArguments);
                original[interfaceName+'.'+property].apply(this, domArguments);
                return result;
            }
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let result = original[interfaceName+'.'+property].apply(this, parallelArguments);
            original[interfaceName+'.'+property].apply(that, domArguments);
            return result
        } else {
            return original[interfaceName+'.'+property].apply(this, parallelArguments);
        }
    };
}

function property_getter_HTMLCollection_interaction(interfaceName,property){
    return function(){
        logger("t-logger:  "+interfaceName+"."+property)
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) ){
            if (original['node.ownerDocument_getter'].apply(this)==parallelDOM){
                original['document.adoptNode'].call(document, this)
            }
            return original[interfaceName+'.'+property].apply(this, arguments);
        }
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (getEquivalent(this)){
                let real = original[interfaceName+"."+property].apply(this, arguments);
                return generate_clean_HTMLCollection(real);
            } 
        }  else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let real = original[interfaceName+"."+property].apply(getEquivalent(this), arguments);
            return generate_clean_HTMLCollection(real);
        }
        return original[interfaceName+"."+property].apply(this, arguments);
    };
}

function property_getter_NodeList_interaction(interfaceName,property){
    return function(){
        logger("t-logger:  "+interfaceName+"."+property)
        if (parallelDOM == null ||  ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) ){
            if (original['node.ownerDocument_getter'].apply(this)==parallelDOM){
                original['document.adoptNode'].call(document, this)
            }
            return original[interfaceName+'.'+property].apply(this, arguments);
        }
        if (original["node.ownerDocument_getter"].call(this) == document){
            if (getEquivalent(this)){
                let real = original[interfaceName+"."+property].apply(this, arguments);
                return generate_clean_NodeList(real);
            } 
        }  else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let real = original[interfaceName+"."+property].apply(getEquivalent(this), arguments);
            return generate_clean_NodeList(real);
        }
        return original[interfaceName+"."+property].apply(this, arguments);
    };
}

function object_getter_withParent(interfaceName,property){
    return function () {
        logger("t-logger:  "+interfaceName+"."+property);
        let result = original[interfaceName+'.'+property].apply(this, arguments);
        return setParent(result,this,interfaceName+"."+property,arguments);
    };
}

function object_setter_withParent(interfaceName,property){
    return function(){
        logger("logger:  "+interfaceName+"."+property)
        let current = this;
        while (current.function_getter)
            current = current.parentElement
        if (current instanceof Element &&  [document, parallelDOM].includes(original['node.getRootNode'].call(current)) ){
            let that = getEquivalent_Parent_node(this, arguments);
            original[interfaceName+'.'+property].apply(that, arguments);
            return original[interfaceName+'.'+property].apply(this, arguments);
        }else if (current != null){
            return original[interfaceName+'.'+property].apply(this, arguments);
        } 
    };
}

function object_setter_withParent_elementAppender(interfaceName,property){
    return function(){
        logger("logger:  "+interfaceName+"."+property)
        let domArguments;
        let parallelArguments;
        [domArguments,parallelArguments] = node_getArguments(arguments);
        let current = this;
        while (current.function_getter)
            current = current.parentElement
        if (current instanceof Element && [document, parallelDOM].includes(original['node.getRootNode'].call(current)) ){
            if (original["node.ownerDocument_getter"].call(current) == document) {
                let that = getEquivalent_Parent_node(this, domArguments);
                original[interfaceName+'.'+property].apply(this, domArguments);
                return original[interfaceName+'.'+property].apply(that, parallelArguments);
            } else {
                let that = getEquivalent_Parent_node(this, parallelArguments);
                if (that) original[interfaceName+'.'+property].apply(that, domArguments);
                return original[interfaceName+'.'+property].apply(this, parallelArguments);
            }

        } else if (current != null){
            return original[interfaceName+'.'+property].apply(this, arguments);
        } 
    };
}

function node_getArguments(_arguments){
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
            let domArg = clone(arg,true, true);
            domArguments.push(domArg);
            parallelArguments.push(arg);
        } else {
            domArguments.push(original["node.cloneNode"].apply(arg,[true]));
            parallelArguments.push(arg);
        }
    }
    return [domArguments,parallelArguments]
}

export {property_getter, property_setter, property_getter_text, property_setter_text, property_background, property_setter_DOMTokenList, property_interaction, property_elementAppender, property_elementAppender_text, property_getter_HTMLCollection_interaction, property_getter_NodeList_interaction,object_setter_withParent,object_getter_withParent, object_setter_withParent_elementAppender, node_getArguments}


/*** private functions */

function setTokenList(interfaceName, property, node, value) {
    property = property.replace('_setter', '_getter');
    let token = original[interfaceName+"."+property].apply(node);
    original['DOMTokenList.value_setter'].call(token,value);
}

const setParentList = ['DOMTokenList', 'StylePropertyMap','SVGAnimatedString','SVGPoint', 'SVGAnimatedEnumeration', 'SVGAnimatedLength', 'SVGLength', 'SVGAnimatedPreserveAspectRatio', 'SVGPreserveAspectRatio', 'SVGAnimatedRect', 'SVGRect', 'SVGAnimatedInteger', 'SVGAnimatedBoolean', 'SVGAnimatedNumberList','SVGNumberList', 'SVGAnimatedNumber', 'SVGAnimatedAngle', 'SVGAngle', 'SVGStringList'];

function setParent(result, parent, function_getter, _arguments){
    if ((result instanceof Object) && !(result instanceof Node)){
        result.parentElement = parent;
        result.function_getter = function_getter;
        result.function_arguments = _arguments;
    }
    return result;
}

function getEquivalent_Parent_node(_this, _arguments){
    if (!_this.parentElement.function_getter){
        let that_parent = getEquivalent(_this.parentElement)
        let that = original[_this.function_getter].apply(that_parent,_arguments);
        return that
    } else {
        let that_parent = getEquivalent_Parent_node(_this.parentElement, _this.function_arguments);
        let that = original[_this.function_getter].apply(that_parent,_arguments);
        return that
    }
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
        /// domArg = clone(arg,true, true);
        /// parallelArg = arg

        domArg = arg
        parallelArg = clone(arg,true, true);
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
        /// domArg = original["node.cloneNode"].apply(arg,[true]);
        /// parallelArg = arg;

        parallelArg = original["node.cloneNode"].apply(arg,[true]);
        domArg = arg;
    }
    return [domArg,parallelArg]
}