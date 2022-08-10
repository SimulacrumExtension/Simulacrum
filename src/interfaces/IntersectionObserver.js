import { getEquivalent } from "../getEquivalent.js";
import { original } from "../original.js";
import { parallelDOM } from "../parallelDOM.js";
import { logger } from "./logger.js";

let methods_set = ["observe", "unobserve"];
for(let i=0; i<methods_set.length; i++){
    let method = methods_set[i];
    IntersectionObserver.prototype[method] = function(){
        logger('IntersectionObserver.'+method)
        if (parallelDOM != null && original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
            arguments[0] = getEquivalent(arguments[0]);
        return original['IntersectionObserver.'+method].apply(this, arguments);
    }
}

let properties_get = ["root"];
for(let i=0; i<properties_get.length; i++){
    let property = properties_get[i];
    Object.defineProperty(IntersectionObserver.prototype, property, {
        get: function(){
            logger('IntersectionObserver.'+property+'_getter')
            let result = original['IntersectionObserver.'+property+'_getter'].apply(this, arguments);
            if (parallelDOM != null && result && original["node.ownerDocument_getter"].call(result) == document)
                result = getEquivalent(result);
            return result
        },
        configurable: true,
        enumerable: true,
    });
}

let orig_constructor = IntersectionObserver;
          
class new_constructor{
    constructor(){
        if (arguments.length==1)
                return new orig_constructor(arguments[0]);
        if (arguments.length==2){
                if (parallelDOM != null && arguments[1]!=undefined && 'root' in arguments[1])
                    arguments[1].root = equivalentRoot(arguments[1].root)
                return new orig_constructor(arguments[0], arguments[1]);
        }
    }
}

IntersectionObserver = new_constructor;

function equivalentRoot(root){
    if (root == null)
        return root
    if (root instanceof Document){
        if (root == parallelDOM)
            return document
        return root
    }
    if (original["node.ownerDocument_getter"].call(root) == parallelDOM)
        return getEquivalent(root);
    return root;
}