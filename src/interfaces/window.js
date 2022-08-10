import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';


window.getComputedStyle = function() {
    if (arguments[0] instanceof Element){
        if (original['node.ownerDocument_getter'].call(arguments[0]) == parallelDOM){
            arguments[0] = getEquivalent(arguments[0]);
        }
        if(arguments[0])
            return original['window.getComputedStyle'].apply(this, arguments)
    } else {
        return {}
    }
}