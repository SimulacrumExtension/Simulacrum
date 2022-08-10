import {original} from '../original.js';
import { parallelDOM } from '../parallelDOM.js';
import {property_interaction, property_background, property_setter} from '../templates.js';
import {logger} from './logger.js';
import {getEquivalent} from '../getEquivalent.js';
import {fixEventHandlers} from '../deepClone.js';

let listeners = {};

// begin[override EventTarget_method_set]
let EventTarget_method_set = ['addEventListener', 'removeEventListener'];
for(let i=0; i<EventTarget_method_set.length; i++){
    let method = EventTarget_method_set[i];
    EventTarget.prototype[method] = function(){
        if (this instanceof Element){
            collect(method, this, arguments)
            return property_setter('EventTarget',method).apply(this,arguments);
        } else if (parallelDOM && [parallelDOM, document].includes(this)){
            original['EventTarget.'+method].apply(parallelDOM,arguments);
            return original['EventTarget.'+method].apply(document,arguments);
        } else
            return original['EventTarget.'+method].apply(this,arguments);
    }
}
// end[override EventTarget_method_set]

// begin[override EventTarget_dispatchEvent]
EventTarget.prototype['dispatchEvent'] = function(){
    if (this instanceof Element){
        logger("t-logger:  EventTarget.dispatchEvent");
        /*let elem_id = original["element.id_getter"].apply(this);
        let onDOM = original['document.getElementById'].call(document, elem_id)
        if (onDOM){
            fixEventHandlers(onDOM,this)
        }
        let onParallel = original['document.getElementById'].call(document, elem_id )
        if (onParallel){
            fixEventHandlers(onParallel,this)
        }*/
        if (parallelDOM == null || ![document, parallelDOM].includes(original['node.getRootNode'].call(this)) ){
            if (original['node.ownerDocument_getter'].apply(this)==parallelDOM){
                original['document.adoptNode'].call(document, this)
            }
            return original['EventTarget.dispatchEvent'].apply(this, arguments);
        }
        if (original["node.ownerDocument_getter"].call(this) == document){
            let that = getEquivalent(this)
            if (that){
                addEntries(that, this)
                return original['EventTarget.dispatchEvent'].apply(this, arguments);
            } //else {
                //throw `TypeError: Cannot read property 'dispatchEvent' of null\n    at <anonymous>:1:6`;
            //}
        } else if (original["node.ownerDocument_getter"].call(this) == parallelDOM){
            let that = getEquivalent(this);
            if (that){ 
                addEntries(this, that)
                return original['EventTarget.dispatchEvent'].apply(that, arguments);
            }
        }
        return original['EventTarget.dispatchEvent'].apply(this, arguments);
    } else if (this == parallelDOM)
        return original['EventTarget.dispatchEvent'].apply(document,arguments);
      else
        return original['EventTarget.dispatchEvent'].apply(this,arguments);
}
// end[override EventTarget_dispatchEvent]

function collect(method, _this, _arguments){
    let id = original["element.id_getter"].apply(_this)
    if (method == 'addEventListener'){
        if (id in listeners)
            listeners[id].push(_arguments)
        else
            listeners[id] = [_arguments]
    }
    if (method == 'removeEventListener'){
        if (id in listeners){
            let index = getIndex(listeners[id], _arguments)
            if (index > -1) {
                listeners[id].splice(index, 1);
                if (listeners[id].length == 0)
                    delete listeners[id];
            }
        }
    }
}

function getIndex(arr, args){
    for (let i=0; i<arr.length; i++){
        if (arr[i][0]==args[0] && arr[i][1]==args[1]){
            return i
        }
    }
    return -1
}
export {listeners}

// private methods

function addEntries(origElem, clonedElem) {
    let keys = original['Object.keys'].apply(Object, [origElem])
    for (let key of keys) {
        if (!clonedElem[key]) {
            clonedElem[key] = origElem[key]
        }
    }
}