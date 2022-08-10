import {object_setter_withParent} from '../templates.js';

let SVGNumberList_method = ['clear', 'initialize', 'getItem', 'insertItemBefore', 'replaceItem', 'removeItem', 'appendItem'];
for(let i=0; i<SVGNumberList_method.length; i++){
    let method = SVGNumberList_method[i];
    SVGNumberList.prototype[method] = object_setter_withParent('SVGNumberList',method);
}
