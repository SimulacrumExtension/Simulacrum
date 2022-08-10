import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override CSSStyleSheet_getter]
let CSSStyleSheet_getter = ['cssRules', 'ownerRule', 'rules'];
for(let i=0; i<CSSStyleSheet_getter.length; i++){
    let property = CSSStyleSheet_getter[i];
    Object.defineProperty(CSSStyleSheet.prototype, property, {
        get: function () {
            logger("logger:  CSSStyleSheet."+property+"_getter");
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(this,arguments);
            if (getEquivalent(parentElement)){
                return original["CSSStyleSheet."+property+"_getter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override CSSStyleSheet_getter]

// begin[override CSSStyleSheet_methods]
let CSSStyleSheet_methods = ['addRule', 'deleteRule', 'insertRule', 'removeRule', 'replace', 'replaceSync'];
for(let i=0; i<CSSStyleSheet_methods.length; i++){
    let method = CSSStyleSheet_methods[i];
    CSSStyleSheet.prototype[method] = function(){
            logger("logger:  CSSStyleSheet."+method);
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(this,arguments);
            if (getEquivalent(parentElement)){
                return original["CSSStyleSheet."+method].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+method+`' of null\n    at <anonymous>:1:6`;           
            }
    }
}
// end[override CSSStyleSheet_methods]
