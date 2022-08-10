import { getEquivalent } from "../getEquivalent.js";
import { original } from "../original.js";
import { parallelDOM } from "../parallelDOM.js";
import { logger } from "./logger.js";

let methods_set = ["observe", "unobserve"];
for(let i=0; i<methods_set.length; i++){
    let method = methods_set[i];
    ResizeObserver.prototype[method] = function(){
        logger('ResizeObserver.'+method)
        if (parallelDOM != null && original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
            arguments[0] = getEquivalent(arguments[0]);
        return original['ResizeObserver.'+method].apply(this, arguments);
    }
}

