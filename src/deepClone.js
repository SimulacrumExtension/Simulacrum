import {original} from './original.js';
import {listeners} from './interfaces/EventTarget.js';
import {logger} from './interfaces/logger.js'
import {parallelDOM, newID} from './parallelDOM.js';



let allEvents = ['oncopy', 'oncut', 'onpaste', 'onabort', 'onblur', 'oncancel', 'oncanplay', 'oncanplaythrough',
    'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncuechange', 'ondblclick', 'ondrag', 'ondragend',
    'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied',
    'onended', 'onerror', 'onfocus', 'onformdata', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup',
    'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmouseenter', 'onmouseleave',
    'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying',
    'onprogress', 'onratechange', 'onreset', 'onresize', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onstalled',
    'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'onvolumechange', 'onwaiting', 'onwebkitanimationend',
    'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkittransitionend', 'onwheel', 'onauxclick', 'ongotpointercapture',
    'onlostpointercapture', 'onpointerdown', 'onpointermove', 'onpointerup', 'onpointercancel', 'onpointerover', 'onpointerout',
    'onpointerenter', 'onpointerleave', 'onselectstart', 'onselectionchange', 'onanimationend', 'onanimationiteration', 'onanimationstart',
    'ontransitionend', 'onpointerrawupdate', 'scrollLeft', 'scrollTop', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 
    'onsearch', 'onfullscreenchange', 'onfullscreenerror', 'onwebkitfullscreenchange' , 'onwebkitfullscreenerror'];

function clone(oElm, bDeep, bEvents) {
    
    if (oElm instanceof Element && !original["element.id_getter"].apply(oElm) ){
        let new_id = newID()
        original["element.id_setter"].call(oElm, new_id);
    }
    // initial clone
    let eNodeCopy =  oElm.cloneNode( bDeep );
    
    
    if (oElm instanceof Element) {
        let aInputSubElements = original['element.getElementsByTagName'].call(oElm, '*'); /*oElm.getElementsByTagName('*'); */
        let aNodeCopySubElements = original['element.getElementsByTagName'].call(eNodeCopy, '*'); /*eNodeCopy.getElementsByTagName('*') */
        
        transferProperties(oElm, eNodeCopy)
        // Node descendants
        for (let n1 = 0; n1 < aInputSubElements.length; n1++) {
            if (!original["element.id_getter"].apply(aInputSubElements[n1])){
                let new_id = newID()
                original["element.id_setter"].call(aInputSubElements[n1], new_id);
                original["element.id_setter"].call(aNodeCopySubElements[n1], new_id);
            }
            transferProperties(aInputSubElements[n1], aNodeCopySubElements[n1]);
        }

    } else if (oElm instanceof DocumentFragment) {
        let aInputSubElements = original['DocumentFragment.querySelectorAll'].call(oElm, '*'); //oElm.getElementsByTagName('*'); 
        let aNodeCopySubElements = original['DocumentFragment.querySelectorAll'].call(eNodeCopy, '*'); //eNodeCopy.getElementsByTagName('*') 

        addEntries(oElm, eNodeCopy);
        // Node descendants
        for (let n1 = 0; n1 < aInputSubElements.length; n1++) {
            if (!original["element.id_getter"].apply(aInputSubElements[n1])){
                let new_id = newID()
                original["element.id_setter"].call(aInputSubElements[n1], new_id);
                original["element.id_setter"].call(aNodeCopySubElements[n1], new_id);
            }
            transferProperties(aInputSubElements[n1], aNodeCopySubElements[n1]);
        }
    } else if (oElm instanceof Document){
        let aInputSubElements = original['document.getElementsByTagName'].call(oElm, '*'); //oElm.getElementsByTagName('*'); 
        let aNodeCopySubElements = original['document.getElementsByTagName'].call(eNodeCopy, '*'); //eNodeCopy.getElementsByTagName('*') 

        addEntries(oElm, eNodeCopy);
        // Node descendants
        for (let n1 = 0; n1 < aInputSubElements.length; n1++) {
            if (!original["element.id_getter"].apply(aInputSubElements[n1])){
                let new_id = newID()
                original["element.id_setter"].call(aInputSubElements[n1], new_id);
                original["element.id_setter"].call(aNodeCopySubElements[n1], new_id);
            }
            transferProperties(aInputSubElements[n1], aNodeCopySubElements[n1]);
        }
    }
    else if(oElm instanceof CharacterData){
        transferPropertiesText(oElm, eNodeCopy);
    }
    return eNodeCopy;
};

function transferProperties(origElem, clonedElem) {
    for (let n2 = 0; n2 < allEvents.length; n2++) {
        if (origElem[allEvents[n2]]) {
            clonedElem[allEvents[n2]] = origElem[allEvents[n2]];
        }
    }
    fixEventHandlers(origElem, clonedElem);
    addEntries(origElem, clonedElem);
}

function transferPropertiesText(origElem, clonedElem) {
    for (let n2 = 0; n2 < allEvents.length; n2++) {
        if (origElem[allEvents[n2]]) {
            clonedElem[allEvents[n2]] = origElem[allEvents[n2]];
        }
    }
    addEntries(origElem, clonedElem);
}

function fixEventHandlers(node, eNode) {
    if (node) {
        let id = original["element.id_getter"].call(node);
        logger('logger: fixing eventHandlers on the original DOM');
        if (id in listeners) {
            let argArray = listeners[id];
            for (let args of argArray) {
                original['EventTarget.addEventListener'].apply(eNode, args);
            }
        }
    }
}

function addEntries(origElem, clonedElem) {
    let keys = original['Object.keys'].apply(Object, [origElem])
    for (let key of keys) {
        try {
            if (!clonedElem[key]) {
                clonedElem[key] = origElem[key]
            }
        } catch (error) {
            
        }
        
    }
}

export {clone, fixEventHandlers};