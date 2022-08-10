import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

// begin[override Attr_property_getters]
Object.defineProperty(Attr.prototype, 'ownerElement', {
    get: function(){
        logger("t-logger:  Attr.ownerElement_getter")
        if (parallelDOM == null)
            return original['Attr.ownerElement_getter'].apply(this,arguments);
        let this_ownerElement = original['Attr.ownerElement_getter'].apply(this,arguments);
        if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
            return original['Attr.ownerElement_getter'].apply(this,arguments);
        if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
            let that_ownerElement = getEquivalent(this_ownerElement);
            if (that_ownerElement)
                return that_ownerElement
            //else
            //    throw `TypeError: Cannot read property 'ownerElement' of null\n    at <anonymous>:1:6`;
        }
        return original['Attr.ownerElement_getter'].apply(this,arguments);
    },
    configurable: true,
    enumerable: true,
});
// end[override Attr_property_getters]

// begin[override Attr_property_getter_setter]
Object.defineProperty(Attr.prototype, 'value', {
    get: function(){
        logger("t-logger:  Attr.value_getter")
        if (parallelDOM == null)
            return original['Attr.value_getter'].apply(this,arguments);
        let this_ownerElement = original['Attr.ownerElement_getter'].apply(this,arguments);
        if (this_ownerElement){
            if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                return original['Attr.value_getter'].apply(this,arguments);
            if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                let that_ownerElement = getEquivalent(this_ownerElement);
                if (that_ownerElement){
                    let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                    return original['Attr.value_getter'].apply(that_attr,arguments);
                } //else
                    //throw `TypeError: Cannot read property 'value' of null\n    at <anonymous>:1:6`;
            }
        }
        return original['Attr.value_getter'].apply(this,arguments);
    },
    set: function() {
        logger("t-logger:  Attr.value_setter")
        if (parallelDOM == null)
            return original['Attr.value_setter'].apply(this,arguments);
        let this_ownerElement = original['Attr.ownerElement_getter'].apply(this,arguments);
        if (this_ownerElement){
            if ( ![document, parallelDOM].includes(original['node.getRootNode'].call(this_ownerElement)) )
                return original['Attr.value_setter'].apply(this,arguments);
            if (original["node.ownerDocument_getter"].apply(this_ownerElement) == document){
                original['Attr.value_setter'].apply(this,arguments);
                let that_ownerElement = getEquivalent(this_ownerElement);
                if (that_ownerElement){
                    let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                    return original['Attr.value_setter'].apply(that_attr,arguments);
                } //else
                    //throw `TypeError: Cannot read property 'value' of null\n    at <anonymous>:1:6`;
            }
            if (original["node.ownerDocument_getter"].apply(this_ownerElement) == parallelDOM){
                let that_ownerElement = getEquivalent(this_ownerElement);
                let that_attr = original['element.getAttributeNode'].apply(that_ownerElement,[this.name]);
                original['Attr.value_setter'].apply(that_attr,arguments);
                return original['Attr.value_setter'].apply(this,arguments);
            }
        }
        return original['Attr.value_setter'].apply(this,arguments);
    },
    configurable: true,
    enumerable: true,
});
// end[override Attr_property_getter_setter]