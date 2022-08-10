import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

let StylePropertyMap_methods = ['set', 'delete', 'clear', 'append']
for(let i=0; i<StylePropertyMap_methods.length; i++){
    let method = StylePropertyMap_methods[i];
    StylePropertyMap.prototype[method] = function(){
        logger("logger:  StylePropertyMap."+method)
        if (this.parentElement != null && original["node.nodeType_getter"].call(this.parentElement)!=null)
            return styleMap_node(this,method,arguments);
        else
            return original['StylePropertyMap.'+method].apply(this, arguments); // Sometimes, it is from CSSStyleSheet
    };
}

function styleMap_node(_this, method, _arguments){
    if (original["node.isConnected_getter"].apply(_this.parentElement)){
        let that_parent = getEquivalent(_this.parentElement)
        let that = original['element.attributeStyleMap_getter'].call(that_parent);
        original['StylePropertyMap.'+method].apply(that, _arguments);
        return original['StylePropertyMap.'+method].apply(_this, _arguments);
    } else {
        return original['StylePropertyMap.'+method].apply(_this, _arguments);
    }
}
