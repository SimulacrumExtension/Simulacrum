import {getEquivalent} from './getEquivalent.js';
import {getEquivalentText} from './getEquivalentText.js';
import { parallelDOM } from './parallelDOM.js';

function getEquivalentNode(node){
    if (!node){
        return node
    }
    if (node instanceof CharacterData){
        return getEquivalentText(node)
    }
    if (node instanceof Element){
        return getEquivalent(node)
    }
    if (node instanceof Document){
        if (node == parallelDOM)
            return document
        if (node == document)
            return parallelDOM
        return node
    }
}

export {getEquivalentNode}