import {object_setter_withParent} from '../templates.js';

let SVGStringList_method = ['clear', 'initialize', 'getItem', 'insertItemBefore', 'replaceItem', 'removeItem', 'appendItem'];
for(let i=0; i<SVGStringList_method.length; i++){
    let method = SVGStringList_method[i];
    SVGStringList.prototype[method] = object_setter_withParent('SVGStringList',method);
}
