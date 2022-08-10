import { getEquivalent } from '../getEquivalent.js';
import {getEquivalentText} from '../getEquivalentText.js';
import {original} from '../original.js';
import { parallelDOM } from '../parallelDOM.js';
import {node_getArguments} from '../templates.js';

// begin[override Range_property_getters]
let Range_property_getters = ['startContainer', 'endContainer', 'commonAncestorContainer', 'collapsed', 'startOffset', 'endOffset']
for(let i=0; i<Range_property_getters.length; i++){
    let property = Range_property_getters[i];
    Object.defineProperty(Range.prototype, property, {
        get: function(){
            let that = getEquivalentRange(this);
            return original['Range.'+property+'_getter'].apply(that, arguments);
        },
        configurable: true,
        enumerable: true,
    });
}
// end[override Range_property_getters]

// begin[override Range_method_set]
let Range_method_set = ['deleteContents', 'extractContents', 'insertNode', 'surroundContents'];
for(let i=0; i<Range_method_set.length; i++){
    let method = Range_method_set[i];
    Range.prototype[method] = function(){
        let that = getEquivalentRange(this);
        let domArguments = [];
        let parallelArguments = [];
        [domArguments,parallelArguments] = node_getArguments(arguments);
        original['Range.'+method].apply(this, domArguments);
        return original['Range.'+method].apply(that, parallelArguments);
    }
}
// end[override Range_method_set]

// begin[override Range_method_get]
let Range_method_get = ['toString', 'cloneContents', 'intersectsNode', 'isPointInRange', 'comparePoint'];
for(let i=0; i<Range_method_get.length; i++){
    let method = Range_method_get[i];
    Range.prototype[method] = function(){
        let that = getEquivalentRange(this);
        let domArguments = [];
        let parallelArguments = [];
        [domArguments,parallelArguments] = node_getArguments(arguments);
        return original['Range.'+method].apply(that, parallelArguments);
    }
}
// end[override Range_method_get]

function getEquivalentRange(range){
    let that = new Range();

    let start = original['Range.startContainer_getter'].call(range);
    let startOffset = original['Range.startOffset_getter'].call(range);

    let end = original['Range.endContainer_getter'].call(range);
    let endOffset = original['Range.endOffset_getter'].call(range);

    let rangeList = convertRangeToList(range, start, startOffset, end, endOffset);

    let thatStart;
    let startIndex = 0;
    [thatStart, startOffset, startIndex] = getEquivalentContainerStart(start, startOffset, rangeList);
    let thatEnd;
    [thatEnd, endOffset] = getEquivalentContainerEnd(end, endOffset, startIndex, rangeList);

    original['Range.setStart'].apply(that, [thatStart, startOffset]);
    original['Range.setEnd'].apply(that, [thatEnd, endOffset]);
    return that;
}

function getEquivalentContainerStart(start, startOffset, rangeList){
    if (start instanceof CharacterData)
        return getEquivalentContainerText(start, startOffset, 'start');
    else
        return getEquivalentContainerElementStart(start, startOffset, rangeList);
}

function getEquivalentContainerEnd(end, endOffset, startIndex, rangeList){
    if (end instanceof CharacterData)
        return getEquivalentContainerText(end, endOffset, 'end');
    else
        return getEquivalentContainerElementEnd(end, endOffset, startIndex, rangeList);
}

function getEquivalentContainerText(node, offset, loc){
    let that = getEquivalentText(node);
    while (!that){

        if (!node){ // there  is no next sibilibg
            let parentText = original["node.parentElement_getter"].call(node);
            if (loc=='start'){
                node = original['node.nextSibling_getter'].call(parentText)
                offset = 0
            } else {
                node = original['node.previousSibling_getter'].call(parentText)
                if (node instanceof CharacterData)
                    offset = node.length-1
            }
        } else if (node instanceof Element){
            node = original['node.childnodes_getter'].call(node)[0]
            if (node instanceof Element)
                continue
        } else {
            if (loc=='start'){
                node = original['node.nextSibling_getter'].call(node)
                offset = 0
            } else {
                node = original['node.previousSibling_getter'].call(node)
                if (node instanceof CharacterData)
                    offset = node.length-1
            }
        }
        if (node instanceof CharacterData && original['node.textContent_getter'].call(node) === '\n')
            continue;
        that = getEquivalentText(node);

    }
    return [that, Math.min(offset,that.length)]
}

function getEquivalentContainerElementStart(node, offset, rangeList){
    let that = getEquivalent(node);
    let i = 0
    let l = rangeList.length
    while (!that && i<l){
        if (rangeList[i] instanceof Text && i<l){
            i++
            continue;
        }
        that = getEquivalent(rangeList[i])
        i++
    }
    if (i>0){
        if (i==1)
            return [that, 0, i]
        else if (rangeList[i-2] instanceof Text && rangeList[i-1] instanceof Text)
            return [getEquivalentText(rangeList[i-1]),0, i-1]
        else
            return [that,0, i]
    } else
        return [that, Math.min(offset, original['node.childNodes_getter'].call(that)-1), i]
}

function getEquivalentContainerElementEnd(node, offset, start, rangeList){
    let that = getEquivalent(node);
    let l = rangeList.length-1
    let i = l
    while (!that && i>=start){
        if (rangeList[i] instanceof Text && i>=start){
            i--
            continue;
        }
        that = getEquivalent(rangeList[i])
        i--
    }
    if (i<l){
        return [getEquivalentNode(rangeList[i+1]),0]
    } else
        return [that, Math.min(offset, original['node.childNodes_getter'].call(that)-1)]
}

function getEquivalentNode(node){
    if (node instanceof Document){
        if (node == document)
            return parallelDOM
        else if (node == parallelDOM)
            return document
        else
            return node
    }
    if (node instanceof Element){
        return getEquivalent(node);
    }
    if (node instanceof CharacterData){
        return getEquivalentText(node);
    }
}

function convertRangeToList(range, start, startOffset, end, endOffset){
    if (start instanceof Element && startOffset)
        start = original['node.childNodes_getter'].call(start)[startOffset]
    if (end instanceof Element && endOffset)
        end = original['node.childNodes_getter'].call(end)[endOffset]

    let ancestor = original['Range.commonAncestorContainer_getter'].call(range);
    if (ancestor instanceof Element && getEquivalent(ancestor)){
        let traverser = original['document.createNodeIterator'].apply(document, [
            ancestor,
            NodeFilter.SHOW_ALL,
            () => {return NodeFilter.FILTER_ACCEPT}])
        let current = original['NodeIterator.nextNode'].call(traverser);
        while (current != start){
            current = original['NodeIterator.nextNode'].call(traverser);
        }
        let toReturn = []
        toReturn.push(current)
        while (current != end){
            current = original['NodeIterator.nextNode'].call(traverser);
            toReturn.push(current)
        }
        return toReturn
    } else if (ancestor instanceof Text && getEquivalentText(ancestor))
        return [ancestor]
    else
        return []
}

/*
function node_getArguments(_arguments){
	let domArguments = [];
    let parallelArguments = [];
    for(let i=0; i<_arguments.length; i++){
        let arg = _arguments[i];
        let domArg = null;
        let parallelArg = null;
        if (typeof(arg)!='object' || arg==null){
            domArguments.push(arg);
            parallelArguments.push(arg);
        } else if ( arg instanceof Element ){
            [domArg,parallelArg] = node_getArguments_element(arg)
            domArguments.push(domArg);
            parallelArguments.push(parallelArg);
        } else if ( arg instanceof CharacterData ){
            [domArg,parallelArg] = node_getArguments_Text(arg)
            domArguments.push(domArg);
            parallelArguments.push(parallelArg);
        } else {
            domArguments.push(original["node.cloneNode"].apply(arg,[true]));
            parallelArguments.push(arg);
        }
    }
    return [domArguments,parallelArguments]
}

function node_getArguments_element(arg){
    let domArg = null;
    let parallelArg = null;
    if (original["node.ownerDocument_getter"].call(arg) == document && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalent(arg);
        if (that){ 
            domArg = arg;
            parallelArg = that;
        }
    } else if (original["node.ownerDocument_getter"].call(arg) == parallelDOM && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalent(arg);
        domArg = that;
        parallelArg = arg;
    } else {
        domArg = original["node.cloneNode"].apply(arg,[true]);
        parallelArg = arg
    }
    return [domArg,parallelArg]
}

function node_getArguments_Text(arg){
    let domArg = null;
    let parallelArg = null;
    if (original["node.ownerDocument_getter"].call(arg) == document && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalentText(arg);
        domArg = arg;
        parallelArg = that;
    } else if (original["node.ownerDocument_getter"].call(arg) == parallelDOM && original['node.isConnected_getter'].call(arg)){
        let that = getEquivalentText(arg);
        domArg = that;
        parallelArg = arg;
    } else {
        domArg = original["node.cloneNode"].apply(arg,[true]);
        parallelArg = arg;
    }
    return [domArg,parallelArg]
}*/
