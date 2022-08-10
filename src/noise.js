import {original} from './original.js';

let elementsWithNoise = new Set([
    'BODY', 
    'TR', 
    'DIALOG', 
    'FORM', 
    'FIELDSET', 
    'DD', 
    'DT', 
    'H1', 
    'H2', 
    'H3', 
    'H4', 
    'H5', 
    'H6', 
    'HR', 
    'LI', 
    'P', 
    'IMG',
    'PRE',
    'BLOCKQUOTE',
    'Q',
    'SELECT',
    'TABLE',
    'TEXTAREA'
]);

function addNoise(root = original['document.documentElement_getter'].apply(document)){
    let start = performance.now()
    let elems = getElems(root)
    for(let elem of elems){
        appendNoise(elem[0],elem[1])
    }
    window.__noise += performance.now()-start;
}

function getElems(root){
    let elems = []
    let all = original['element.getElementsByTagName'].apply(root, ['*']);
    for (let elem of all){
        let tagName = original['element.tagName_getter'].apply(elem);
        if (elementsWithNoise.has(tagName) && isVisible(elem)){
            elems.push([elem,tagName])
        }
    }
    return elems;
}

function appendNoise(elem, tagName, fg=false){
    switch (tagName) {
        case 'BODY':
            body_appendNoise(elem, 0, fg);
            break;
        case 'TR':
            insertBefore_noise(elem, fg);
            break;
        case 'DIALOG':
            appendChild_noise(elem, fg)
            break;
        case 'FORM':
            form_appendNoise(elem, fg)
            break;
        case 'FIELDSET':
            form_appendNoise(elem, fg)
            break;
        case 'DD':
            insertBefore_noise(elem, fg)
            break;
        case 'DT':
            insertBefore_noise(elem, fg)
            break;
        case 'H1':
            insertBefore_noise(elem, fg)
            break;
        case 'H2':
            insertBefore_noise(elem, fg)
            break;
        case 'H3':
            insertBefore_noise(elem, fg)
            break;
        case 'H4':
            insertBefore_noise(elem, fg)
            break;
        case 'H5':
            insertBefore_noise(elem, fg)
            break;
        case 'H6':
            insertBefore_noise(elem, fg)
            break;
        case 'HR':
            insertBefore_noise(elem, fg)
            break;
        case 'LI':
            inLine_noise(elem, fg)
            break;
        case 'P':
            insertBefore_noise(elem, fg)
            appendChild_noise(elem, fg)
            break;
        case 'PRE':
            insertBefore_noise(elem, fg)
            appendChild_noise(elem, fg)
            break;
        case 'IMG':
            inLine_noise(elem, fg)
            break;
        case 'BLOCKQUOTE':
            insertBefore_noise(elem, fg)
            break;
        case 'Q':
            inLine_noise(elem, fg)
            break;
        case 'SELECT':
            inLine_noise(elem, fg)
            break;
        case 'TABLE':
            insertBefore_noise(elem, fg)
            break;
        case 'TEXTAREA':
            insertBefore_noise(elem, fg)
            break;
    }
}

function getNoise(noiseType, min_noise, max_noise){
    let noise = original['document.createElement'].apply(document, [noiseType]);
    let random_width = min_noise + Math.floor(Math.random() * max_noise-min_noise);
    let random_height = min_noise + Math.floor(Math.random() * max_noise-min_noise);
    let random_padding = min_noise + Math.floor(Math.random() * max_noise-min_noise);
    noise.className = 'addedNoise'
    if (noiseType == 'div'){
        noise.style = 'width:'+random_width+'px; height:'+random_height +'px;'//+' border:1px solid black;'
    } else if (noiseType == 'span'){
        noise.style = 'display: inline-block; padding:'+random_padding+'px;'//+' border:1px solid black;'
    }
    return noise
}

function isVisible(elem){
    if (original['element.className_getter'].apply(elem) == 'addedNoise')
        return false;
    return original['element.getClientRects'].apply(elem).length>0
}

function body_appendNoise(elem, depth, fg){
    let toInsertBefore = []
    for (let child of original['element.children_getter'].apply(elem)){ 
        if (isVisible(child)){
            toInsertBefore.push(child)
        }
    }
    if (toInsertBefore.length>1 || depth==1){
        for (let item of toInsertBefore){
            let noise = getNoise('div', 0, 10)
            original['node.insertBefore'].apply(elem, [noise, item])
        }
    } else if (toInsertBefore.length==1){
        body_appendNoise(toInsertBefore[0], depth+1)
    }
}

function form_appendNoise(elem, fg){
    let toInsertBefore = []
    let innerElement = []
    for (let child of original['element.children_getter'].apply(elem)){ 
        if (isVisible(child)){
            if (child.constructor.name == 'HTMLDivElement')
                toInsertBefore.push(child)
            else
                innerElement.push(child)
        }
    }
    for (let item of innerElement)
        form_appendNoise(item)
    for (let item of toInsertBefore){
        let noise = getNoise('div', 0, 10)
        original['node.insertBefore'].apply(elem, [noise, item])
    }
}

function isNoisy(elem, fg){
    let prevElem = original['element.previousElementSibling_getter'].apply(elem);
    if ((prevElem && original['element.className_getter'].apply(prevElem) == 'addedNoise') || original['element.className_getter'].apply(elem) == 'addedNoise')
        return true
    else
        return false
}

function insertBefore_noise(elem, fg){
    if (isNoisy(elem))
        return;
    let noise = getNoise('div', 0, 10)
    let parent = original['node.parentElement_getter'].apply(elem)
    original['node.insertBefore'].apply(parent, [noise, elem])
}

function appendChild_noise(elem, fg){
    let noise = getNoise('div', 0, 10)
    original['node.appendChild'].apply(elem, [noise])
}

function inLine_noise(elem, isExtension){
    if (isExtension){
        let parent = original['node.parentElement_getter'].apply(elem);
        let noise = getNoise('span', 0, 5)
        original['node.insertBefore'].apply(parent, [noise, elem])
        original['node.appendChild'].apply(noise, [elem])
    } else {
        let parent = original['node.parentElement_getter'].apply(elem);
        let noise = getNoise('span', 0, 7)
        original['node.insertBefore'].apply(parent, [noise, elem])
    }
}

export {addNoise};