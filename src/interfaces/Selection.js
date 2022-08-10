import { getEquivalentNode } from "../getEquivalentNode.js";
import { original } from "../original.js";
import { parallelDOM } from "../parallelDOM.js";

// begin[override Selection_property_getters]
let Selection_property_getters = ['anchorNode', 'focusNode', 'baseNode', 'extentNode']
for(let i=0; i<Selection_property_getters.length; i++){
    let property = Selection_property_getters[i];
	Object.defineProperty(Selection.prototype, property, {
        get: function(){
            let result = original['Selection.'+property+'_getter'].apply(this, arguments);
            return getEquivalentNode(result);
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override Selection_property_getters]

// begin[override Selection_deleteFromDocument]
Selection.prototype['deleteFromDocument'] = function(){
    this.getRangeAt(0).deleteContents()
}
// end[override Selection_deleteFromDocument]

// begin[override Selection_toString]
Selection.prototype['toString'] = function(){
    return this.getRangeAt(0).toString()
}
// end[override Selection_toString]

// begin[override Selection_containsNode]
Selection.prototype['containsNode'] = function(){
    let node = arguments[0]
    if (original['node.getRootNode'].call(node)==parallelDOM)
        arguments[0] = getEquivalentNode(node)
    return original['Selection.containsNode'].apply(this, arguments)
}
// end[override Selection_containsNode]
