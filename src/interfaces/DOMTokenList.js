import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override DOMTokenList_property_getter_setter]
let DOMTokenList_property_getter_setter = ['value'];
for(let i=0; i<DOMTokenList_property_getter_setter.length; i++){
    let property = DOMTokenList_property_getter_setter[i];
    Object.defineProperty(DOMTokenList.prototype, property, {
        get: function () {
            return original['DOMTokenList.'+property+'_getter'].apply(this, arguments);
        },
        set: function () {
            logger("logger:  DOMTokenList."+property+"_setter");
            if (parallelDOM == null || this.parentElement == null || this.function_getter == null)
                return original['DOMTokenList.'+property+'_setter'].apply(this, arguments);
            if (!original["node.isConnected_getter"].apply(this.parentElement))
                return original['DOMTokenList.'+property+'_setter'].apply(this, arguments);
            let thisParent = this.parentElement;
            let thatParent = getEquivalent(this.parentElement);
            if (original["node.ownerDocument_getter"].call(thisParent) == document){
                if (thatParent) {
                    let that = original[this.function_getter].apply(thatParent);
                    let result = original['DOMTokenList.'+property+'_setter'].apply(that, arguments);
                    original['DOMTokenList.'+property+'_setter'].apply(this, arguments);
                    return result;
                } /*else {
                    throw  `Uncaught TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;
                }*/
            } else if (original["node.ownerDocument_getter"].call(thisParent) == parallelDOM) {
                let that = original[this.function_getter].apply(thatParent);
                let result = original['DOMTokenList.'+property+'_setter'].apply(this, arguments);
                original['DOMTokenList.'+property+'_setter'].apply(that, arguments);
                return result;
            } else {
                return original['DOMTokenList.'+property+'_setter'].apply(this, arguments);
            }
        },
        configurable: true,
        enumerable: true
    });
}
// end[override DOMTokenList_property_getter_setter]

// begin[override DOMTokenList_methods_set]
let DOMTokenList_methods_set = ['add', 'remove', 'toggle', 'replace', 'forEach'];
for(let i=0; i<DOMTokenList_methods_set.length; i++){
    let method = DOMTokenList_methods_set[i];
    DOMTokenList.prototype[method] = function(){
        logger("logger:  DOMTokenList."+method);
        if (parallelDOM == null || this.parentElement == null || this.function_getter == null)
            return original['DOMTokenList.'+method].apply(this, arguments);
        if (!original["node.isConnected_getter"].apply(this.parentElement))
            return original['DOMTokenList.'+method].apply(this, arguments);
        let thisParent = this.parentElement;
        let thatParent = getEquivalent(this.parentElement);
        if (original["node.ownerDocument_getter"].call(thisParent) == document){
            if (thatParent) {
                let result = original['DOMTokenList.'+method].apply(this, arguments);
                let that = original[this.function_getter].apply(thatParent);
                if (that)
                    result = original['DOMTokenList.'+method].apply(that, arguments);
                return result;
            } /*else {
                throw  `Uncaught TypeError: Cannot read property '`+method+`' of null\n    at <anonymous>:1:6`;
            }*/
        } else if (original["node.ownerDocument_getter"].call(thisParent) == parallelDOM) {
            let result = original['DOMTokenList.'+method].apply(this, arguments);
            if (thatParent){
                let that = original[this.function_getter].apply(thatParent);
                if (that) original['DOMTokenList.'+method].apply(that, arguments);
            }
            return result;
        } else {
            return original['DOMTokenList.'+method].apply(this, arguments);
        }
    }
}
// end[override DOMTokenList_methods_set]
