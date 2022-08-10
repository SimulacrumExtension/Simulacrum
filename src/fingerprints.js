import { getEquivalent } from "./getEquivalent.js";
import { original } from "./original.js";
import {addNoise} from "./noise.js";

let fingerprints = new Set();

const config = {
    childList: true,
    subtree: true
  };

function observeFingerprints(){
    let MO = original['MutationObserver']
    let observer = new MO(callback);
    observer.observe(document, config);
}

const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        for (let item of mutation.addedNodes){
            if (item instanceof Element){
                if (original['element.className_getter'].apply(item) == 'replacement' || original['element.className_getter'].apply(item) == 'addedNoise' || ( original['node.parentElement_getter'].apply(item) && original['element.className_getter'].apply( original['node.parentElement_getter'].apply(item) ) == 'addedNoise') )
                    continue;
                if (getEquivalent(item) == null && original['node.getRootNode'].apply(item)==document){
                    addToFingerprint(item);
                    addNoise(item, original['element.tagName_getter'].apply(item), true);
                } else {
                    addNoise(item, original['element.tagName_getter'].apply(item), false);
                }
            } 
            
        }
    }
};

function addToFingerprint(item){
    fingerprints.add(item)
    for (let child of original['element.getElementsByTagName'].call(item, "*") ){
        if (getEquivalent(item) == null && original['node.getRootNode'].apply(item)==document){
            fingerprints.add(child)
        }
    }
}

export{observeFingerprints, fingerprints}