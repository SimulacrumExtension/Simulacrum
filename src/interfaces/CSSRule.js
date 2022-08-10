import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override CSSRule_getter]
let CSSRule_getter = ['parentRule', 'parentStyleSheet', 'type'];
for(let i=0; i<CSSRule_getter.length; i++){
    let property = CSSRule_getter[i];
    Object.defineProperty(CSSRule.prototype, property, {
        get: function () {
            logger("logger:  CSSRule."+property+"_getter");
            let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
            if (getEquivalent(parentElement)){
                return original["CSSRule."+property+"_getter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override CSSRule_getter]

// begin[override CSSRule_cssText]
Object.defineProperty(CSSRule.prototype, 'cssText', {
    get: function () {
        logger("logger:  CSSRule.cssText_getter");
        let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
        let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
        if (getEquivalent(parentElement)){
            return original["CSSRule.cssText_getter"].apply(this, arguments);
        } else {
            throw `TypeError: Cannot read property 'cssText' of null\n    at <anonymous>:1:6`;           
        }
    },
    set: function () {
        logger("logger:  CSSRule.cssText_setter");
        let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
        let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
        if (getEquivalent(parentElement)){
            return original["CSSRule.cssText_setter"].apply(this, arguments);
        } else {
            throw `TypeError: Cannot read property 'cssText' of null\n    at <anonymous>:1:6`;           
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override CSSRule_cssText]