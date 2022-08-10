import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override StyleSheet_getter]
let StyleSheet_getter = ['href', 'ownerNode', 'parentStyleSheet', 'title', 'type'];
for(let i=0; i<StyleSheet_getter.length; i++){
    let property = StyleSheet_getter[i];
    Object.defineProperty(StyleSheet.prototype, property, {
        get: function () {
            logger("logger:  StyleSheet."+property+"_getter");
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(this,arguments);
            if (getEquivalent(parentElement)){
                return original["StyleSheet."+property+"_getter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override StyleSheet_getter]

// begin[override StyleSheet_setter_getter]
let StyleSheet_setter_getter = ['disabled', 'media'];
for(let i=0; i<StyleSheet_setter_getter.length; i++){
    let property = StyleSheet_setter_getter[i];
    Object.defineProperty(StyleSheet.prototype, property, {
        get: function () {
            logger("logger:  StyleSheet."+property+"_getter");
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(this,arguments);
            if (getEquivalent(parentElement)){
                return original["StyleSheet."+property+"_getter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        set: function () {
            logger("logger:  StyleSheet."+property+"_setter");
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(this,arguments);
            if (getEquivalent(parentElement)){
                return original["StyleSheet."+property+"_setter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override StyleSheet_setter_getter]

