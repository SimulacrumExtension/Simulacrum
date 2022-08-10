import {original} from './original.js';
import { parallelDOM } from './parallelDOM.js';

const config = {
    childList: true,
    subtree: true
  };

function observeResize(elem){
    let RO = original['ResizeObserver']
    let observer = new RO(RO_callback);
    observer.observe(elem, config);
}

const RO_callback = function(entries) {
    let start = performance.now()
    for (let entry of entries){
        addSize(entry.target)
    }
    window.__rmElems += performance.now() - start
};

function observeMutations(){
    let MO = original['MutationObserver']
    let observer = new MO(MO_callback);
    observer.observe(document, config);
}

const MO_callback = function(mutationsList, observer) {
    let start = performance.now()
    for(const mutation of mutationsList) {
        for (let item of mutation.addedNodes){
            if (item instanceof Element){
                if (original['element.className_getter'].apply(item) == 'addedNoise' || ( original['node.parentElement_getter'].apply(item) && original['element.className_getter'].apply( original['node.parentElement_getter'].apply(item) ) == 'addedNoise') )
                    continue;
                setSizes(item);
                observeResize(item);
            }
        }
        for (let item of mutation.removedNodes){
            if (item instanceof Element){
                if (original['element.className_getter'].apply(item) == 'addedNoise' || ( original['node.parentElement_getter'].apply(item) && original['element.className_getter'].apply( original['node.parentElement_getter'].apply(item) ) == 'addedNoise') )
                    continue;
                if ( original['document.getElementById'].apply(parallelDOM,[item.id]) && (item.__width>0 || item.__height>0) ){
                    replaceRemovedElem(item, mutation.target, mutation.nextSibling)
                } 
            }
        }
    }
    window.__rmElems += performance.now() - start
};

function addSize(elem){
    let rect = elem.getBoundingClientRect()
    elem.__width = rect.width
    elem.__height = rect.height
}

function setSizes(root = original['document.documentElement_getter'].apply(document)){
    let elems = original['element.getElementsByTagName'].apply(root, ['*']);
    for(let elem of elems){
        addSize(elem);
        observeResize(elem);
    }
}

function createReplacement(elem){
    let replacement = original['document.createElement'].apply(document, ['div']);
    replacement.className = 'replacement'
    replacement.style = 'width:'+elem.__width+'px; height:'+elem.__height+'px;'//+' border:1px solid black;'
    return replacement
}

function replaceRemovedElem(elem, parent, nextSibling){
    let replacement = createReplacement(elem);
    if (nextSibling)
        original['node.insertBefore'].apply(parent, [replacement, nextSibling])
    else
        original['node.appendChild'].apply(parent, [replacement])
}

function handlingRemoveElems(){
    window.__rmElems = 0
    if ( original['document.readyState_getter'].apply(document) == 'loading' ) { 
        original['EventTarget.addEventListener'].apply(document, ['DOMContentLoaded', (event) => {
            let start = performance.now()
            setSizes()
            observeMutations()
            window.__rmElems += performance.now() - start
        }]);
    } else { // if DOMContentLoaded is already fired
        let start = performance.now()
        setSizes()
        observeMutations()
        window.__rmElems += performance.now() - start
    }
}

export{handlingRemoveElems}