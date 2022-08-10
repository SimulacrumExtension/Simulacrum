import {getEquivalent} from './getEquivalent.js';
import { parallelDOM } from './parallelDOM.js';
import {original} from './original.js';

function getEquivalentText(arg){
    if (!arg)
        return arg
    let parent = original['node.parentElement_getter'].call(arg);
    let thatParent = getEquivalent( parent );
    if (!thatParent)
        return null
    if (original['node.ownerDocument_getter'].apply(arg)==parallelDOM){
        return getEquivalentTextDOM(arg, thatParent)
    }
    if (original['node.ownerDocument_getter'].apply(arg)==document){
        return getEquivalentTextParallel(arg, thatParent)
    }
    return null
}

function getEquivalentTextParallel(arg, thatParent){
    let nextElem = original["CharacterData.nextElementSibling_getter"].call(arg)
    let origNextElem = nextElem
    let ignoredR = 0
    let thatNextElem = getEquivalent(nextElem)
    while (!thatNextElem && nextElem){
        ignoredR += 1
        nextElem = original["element.nextElementSibling_getter"].call(nextElem)
        thatNextElem = getEquivalent(nextElem)
    }
    
    let prevElem = original["CharacterData.previousElementSibling_getter"].call(arg)
    let origPrevElem = prevElem
    let ignoredL = 0
    let thatPrevElem = getEquivalent(prevElem)
    while (!thatPrevElem && prevElem){
        ignoredL += 1
        prevElem = original["element.previousElementSibling_getter"].call(prevElem)
        thatPrevElem = getEquivalent(prevElem)
    }

    if (thatNextElem || thatPrevElem){
        if (thatNextElem){
            let counter = 0
            let current = arg
            while (original["node.nextSibling_getter"].call(current) != origNextElem){
                counter+=1
                current = original["node.nextSibling_getter"].call(current)
            }
            let thatArg = original["node.previousSibling_getter"].call(thatNextElem)
            while (counter>0){
                counter -= 1
                thatArg = original["node.previousSibling_getter"].call(thatArg)
            }
            return thatArg
        }
        if (thatPrevElem){
            let counter = 0
            let current = arg
            while (original["node.previousSibling_getter"].call(current) != origPrevElem){
                counter+=1
                current = original["node.previousSibling_getter"].call(current)
            }
            let thatArg = original["node.nextSibling_getter"].call(thatPrevElem)
            while (counter>0){
                counter -= 1
                thatArg = original["node.nextSibling_getter"].call(thatArg)
            }
            return thatArg
        }
    }

    let counter = 0
    let current = arg
    while (original["node.previousSibling_getter"].call(current) != origPrevElem){
        counter+=1
        current = original["node.previousSibling_getter"].call(current)
    }
    let thatArg = original["node.childNodes_getter"].call(thatParent)[0]
    while (counter>0){
        counter -= 1
        thatArg = original["node.nextSibling_getter"].call(thatArg)
    }
    return thatArg
}

function getEquivalentTextDOM(arg, thatParent){
    let nextElem = original["CharacterData.nextElementSibling_getter"].call(arg)
    let thatNextElem = getEquivalent(nextElem)
    let prevElem = original["CharacterData.previousElementSibling_getter"].call(arg)
    let thatPrevElem = getEquivalent(prevElem)

    if (nextElem || prevElem){
        if (nextElem){
            let counter = 0
            let current = arg
            while (original["node.nextSibling_getter"].call(current) != nextElem){
                counter+=1
                current = original["node.nextSibling_getter"].call(current)
            }
            let thatArg = original["node.previousSibling_getter"].call(thatNextElem)
            while ((thatArg instanceof CharacterData && original['node.textContent_getter'].call(thatArg) === '\n') || (thatArg instanceof Element)){
                thatArg = original["node.previousSibling_getter"].call(thatArg)
            }
            while (counter>0){
                if (!(thatArg instanceof CharacterData && original['node.textContent_getter'].call(thatArg) === '\n') && !(thatArg instanceof Element))
                    counter -= 1
                thatArg = original["node.previousSibling_getter"].call(thatArg)
            }
            return thatArg
        }
        if (prevElem){
            let counter = 0
            let current = arg
            while (original["node.previousSibling_getter"].call(current) != prevElem){
                if (!(current instanceof CharacterData && original['node.textContent_getter'].call(current) === '\n'))
                    counter+=1
                current = original["node.previousSibling_getter"].call(current)
            }
            let thatArg = original["node.nextSibling_getter"].call(thatPrevElem)
            while ((thatArg instanceof CharacterData && original['node.textContent_getter'].call(thatArg) === '\n') || (thatArg instanceof Element)){
                thatArg = original["node.nextSibling_getter"].call(thatArg)
            }
            while (counter>0){
                if (!(thatArg instanceof CharacterData && original['node.textContent_getter'].call(thatArg) === '\n') && !(thatArg instanceof Element))
                    counter -= 1
                thatArg = original["node.nextSibling_getter"].call(thatArg)
            }
            return thatArg
        }
    }

    let counter = 0
    let current = arg
    while (original["node.previousSibling_getter"].call(current) != prevElem){
        //if (!(current instanceof CharacterData && original['node.textContent_getter'].call(current) === '\n'))
            counter+=1
        current = original["node.previousSibling_getter"].call(current)
    }
    let thatArg = original["node.childNodes_getter"].call(thatParent)[0]
    while (counter>0){
        //if (!(thatArg instanceof CharacterData && original['node.textContent_getter'].call(thatArg) === '\n') && !(thatArg instanceof Element))
            counter -= 1
        thatArg = original["node.nextSibling_getter"].call(thatArg)
    }
    return thatArg
}

export {getEquivalentText}
