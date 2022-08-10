import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {getEquivalentNode} from '../getEquivalentNode.js';
import {logger} from './logger.js'

// begin[override Object_method_get]
let Object_method_get = ['keys', 'entries', 'values']
for(let i=0; i<Object_method_get.length; i++){
    let property = Object_method_get[i];
    Object[property] = function(){
        if (arguments[0] instanceof Element){
            let elem = arguments[0];
            logger("t-logger:  Object."+property);
            if (parallelDOM == null || !original["node.isConnected_getter"].apply(elem))
                return original['Object.'+property].apply(this, arguments);
            if (original["node.ownerDocument_getter"].apply(elem) == document){
                let that = getEquivalent(elem);
                if (that){
                    arguments[0] = that
                    return original["Object."+property].apply(this,arguments);
                } else {
                    let name = property.split('_')[0];
                    throw `TypeError: Cannot read property '`+name+`' of null\n    at <anonymous>:1:6`;
                }
            }
        } 
        return original['Object.'+property].apply(this,arguments);
    }
}
// end[override Object_method_get]

// begin[override Object_method_set]
let Object_method_set = ['assign', 'defineProperties', 'defineProperty']
for(let i=0; i<Object_method_set.length; i++){
    let property = Object_method_set[i];
    Object[property] = function(){
        if (arguments[0] instanceof Element){
            let elem = arguments[0];
            logger("t-logger:  Object."+property)
            try {
                if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(elem)))
                    return original['Object.'+property].apply(this, arguments);
            } catch (error) {
                return original['Object.'+property].apply(this, arguments);
            }
            
            if (original["node.ownerDocument_getter"].apply(elem) == document){
                original["Object."+property].apply(this,arguments);
                let that = getEquivalentNode(elem);
                if (that){
                    arguments[0] = that;
                    let result = original["Object."+property].apply(this,arguments);
                    if ([document, parallelDOM].includes(result))
                        return document
                    return result
                }
            } else if (original["node.ownerDocument_getter"].apply(elem) == parallelDOM){
                let that = getEquivalentNode(elem);
                if (that){
                    arguments[0] = that;
                    original["Object."+property].apply(this,arguments);
                    arguments[0] = elem;
                }
                let result = original["Object."+property].apply(this,arguments);
                if ([document, parallelDOM].includes(result))
                    return document
                return result
            }
        } 
        return original['Object.'+property].apply(this,arguments);
    }
}
// end[override Object_method_set]
