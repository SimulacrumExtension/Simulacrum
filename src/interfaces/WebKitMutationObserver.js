import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {getEquivalentText} from '../getEquivalentText.js';
import {getEquivalentNode} from '../getEquivalentNode.js';
import {logger} from './logger.js'
import {generate_clean_MutationRecord} from '../objectGenerator.js';

let methods_set = ["observe"];
for(let i=0; i<methods_set.length; i++){
    let method = methods_set[i];
    WebKitMutationObserver.prototype[method] = function(){
        logger('WebKitMutationObserver.'+method)
        if (parallelDOM != null && original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
            arguments[0] = getEquivalentNode(arguments[0]);
        return original['WebKitMutationObserver.'+method].apply(this, arguments);
    }
}

let orig_constructor = WebKitMutationObserver;
class new_constructor{
    constructor(){
        let callback = arguments[0];
        arguments[0] = function(){
          if (parallelDOM != null)
            arguments[0] = filterMutations(arguments[0])
          callback.apply(null, arguments);
        }
        return new orig_constructor(arguments[0]);
    }
}
WebKitMutationObserver = new_constructor;

function filterMutations(mutations){
  let filtered = []
  let newMutation;
  for (let mutation of mutations){
    switch(mutation.type){
      case 'attributes':
        newMutation = validAttributes(mutation)
        if (newMutation)
          filtered.push( newMutation )
        break;
      case 'characterData':
        newMutation = validCharacterData(mutation)
        if (newMutation)
          filtered.push( newMutation )
        break;
      case 'childList':
        newMutation = validChildList(mutation)
        if (newMutation)
          filtered.push( newMutation )
        break;
    }
  }
  return filtered
}

function validAttributes(mutation){
  let thatTarget = getEquivalent(mutation.target)
  if (thatTarget && mutation.attributeName in thatTarget && original['element.getAttribute'].call(thatTarget, mutation.attributeName) == original['element.getAttribute'].call(mutation.target, mutation.attributeName)){
    let newMutation = generate_clean_MutationRecord(mutation, thatTarget)
    return newMutation  
  }
  return null
}

function validCharacterData(mutation){
  let thatTarget = getEquivalentText(mutation.target)
  if (thatTarget && original['node.textContent_getter'].call(mutation.target) == original['node.textContent_getter'].call(thatTarget)){
    return mutation  
  }
  return null
}

function validChildList(mutation){
  let thatTarget = getEquivalent(mutation.target)
  if (thatTarget){
    let newMutation = generate_clean_MutationRecord(mutation, thatTarget)
    if (newMutation.addedNodes.length + newMutation.removedNodes.length > 0){
      return newMutation
    }
  } 
  return null
}
