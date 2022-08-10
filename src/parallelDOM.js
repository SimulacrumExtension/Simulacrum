import {original} from './original.js';
import {getEquivalent} from './getEquivalent.js'
import {observeFingerprints} from './fingerprints.js';
import {addNoise} from './noise.js';
import {handlingRemoveElems} from './removedElems.js';

let counter = 0;
let rand = makeId(10)

let parallelDOM;
var addedListener = false;

original['EventTarget.addEventListener'].apply(document, ['DOMContentLoaded', (event) => {
    if (addedListener === false) {
        setID()
        parallelDOM = original['node.cloneNode'].call(document, true);
        window.__noise = 0;
        addNoise()
        observeFingerprints();
    }
}]);

window.addEventListener("message", (evt) => {
    // Validate the message origin
    if (addedListener === false && evt.data.hasOwnProperty("type") && evt.data.type === "FROM_EXTENSION_SIMULACRUM_PD") {
        // the content script will replace the tag below with a new uuid each time the content script is executed.
        if (evt.data.hasOwnProperty("uuid")){
            let uuid_incoming = evt.data.uuid;
            let uuid = "INSERT_UUID_HERE";
            if (uuid_incoming === uuid){
                console.log("Disabling Simulacrum for current tab");
                parallelDOM = null;
                addedListener = true;
            }
        }
    }
});

window.addEventListener("message", (evt) => {
    // Validate the message origin
    if (evt.data.hasOwnProperty("type") && evt.data.type === "FROM_EXTENSION_SIMULACRUM_PD_RM") {
        // the content script will replace the tag below with a new uuid each time the content script is executed.
        if (evt.data.hasOwnProperty("uuid")){
            let uuid_incoming = evt.data.uuid;
            let uuid = "INSERT_UUID_RMELEMS_HERE";
            if (uuid_incoming === uuid){
                console.log("Considering removed elements by extensions");
                handlingRemoveElems();
            }
        }
    }
});

function setID(){
    createMissingElements();
    let all = original['document.all_getter'].apply(document);
    for (let i=0; i < all.length; i++)
        if(original['element.getAttribute'].call(all[i],'id') === null || original['element.getAttribute'].call(all[i],'id')=='')
            original['element.setAttribute'].apply(all[i],['id', newID()]);
}

//check for existence (and create if missing) of some essential elements including title,
function createMissingElements() {
    let title=original['document.getElementsByTagName'].call(document,'title');
    if(title.length==0){
        document.title=" ";
    }
}

function newID(){
    counter += 1;
    return rand+counter.toString();
}

function makeId(length) {
    let finalStr    = '';
    let chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charsLength = chars.length;
    for (let i = 0; i < length; i++ ) {
        finalStr += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return finalStr;
}

function getEquivalentNode(node){
    if (node == null || node==parallelDOM||original['node.isConnected_getter'].call(node)==false)
        return node;
    if(node==document){
        if(parallelDOM!=null){
            return parallelDOM;
        }
    }
    else{
        return getEquivalent(node);
    }
}


export {parallelDOM, newID};
