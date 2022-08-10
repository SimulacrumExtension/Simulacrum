import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override CSSStyleRule_styleMap]
Object.defineProperty(CSSStyleRule.prototype, "styleMap", {
    get: function () {
        logger("logger:  CSSStyleRule.styleMap_getter");
        let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
        let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
        if (getEquivalent(parentElement)){
            return original["CSSStyleRule.styleMap_getter"].apply(this, arguments);
        } else {
            throw `TypeError: Cannot read property 'styleMap' of null\n    at <anonymous>:1:6`;           
        }
    },
    configurable: true,
    enumerable: true,
});
// end[override CSSStyleRule_styleMap]

// begin[override CSSStyleRule_setter_getter]
let CSSStyleRule_setter_getter = ['style', 'selectorText']
for(let i=0; i<CSSStyleRule_setter_getter.length; i++){
    let property = CSSStyleRule_setter_getter[i];
    Object.defineProperty(CSSStyleRule.prototype, property, {
        get: function () {
            logger("logger:  CSSStyleRule."+property+"_getter");
            let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
            if (getEquivalent(parentElement)){
                return original["CSSStyleRule."+property+"_getter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        set: function () {
            logger("logger:  CSSStyleRule."+property+"_setter");
            let parentCSS = original["CSSRule.parentStyleSheet_getter"].apply(this,arguments);
            let parentElement = original["StyleSheet.ownerNode_getter"].apply(parentCSS,arguments);
            if (getEquivalent(parentElement)){
                return original["CSSStyleRule."+property+"_setter"].apply(this, arguments);
            } else {
                throw `TypeError: Cannot read property '`+property+`' of null\n    at <anonymous>:1:6`;           
            }
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override CSSStyleRule_setter_getter]