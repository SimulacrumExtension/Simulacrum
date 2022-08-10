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
    MutationObserver.prototype[method] = function(){
        logger('MutationObserver.'+method)
        if (parallelDOM != null && original["node.ownerDocument_getter"].call(arguments[0]) == parallelDOM)
            arguments[0] = getEquivalentNode(arguments[0]);
        return original['MutationObserver.'+method].apply(this, arguments);
    }
}

let orig_constructor = MutationObserver;
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
MutationObserver = new_constructor;

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
  let thatTarget;
  if (mutation.target instanceof Element)
    thatTarget = getEquivalent(mutation.target)
  else
    thatTarget = mutation.target
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
  let thatTarget;
  if (mutation.target instanceof Element)
    thatTarget = getEquivalent(mutation.target)
  else
    thatTarget = mutation.target
  if (thatTarget){
    let newMutation = generate_clean_MutationRecord(mutation, thatTarget)
    if (newMutation.addedNodes.length + newMutation.removedNodes.length > 0){
      return newMutation
    }
  } 
  return null
}

/*
let oldObserver=MutationObserver.prototype.observe;
let mutationObservers_list=[]
let mutationObservers_targets={}
let mutationObservers_configs={}

MutationObserver.prototype.observe=function(){
  logger("logger: Overrding observe function in mutationObserver");
  let newArgs=arguments;
  if(parallelDOM==null){
    mutationObservers_list.push(this);
    mutationObservers_targets[this]=arguments[0];
    mutationObservers_configs[arguments[0]]=arguments[1];
  }
  else{
    if(arguments[0]==document){
      if(parallelDOM!=null){
        arguments[0]=parallelDOM;
      }
    }
    else{
      if(original['node.isConnected_getter'].call(arguments[0]) && original["node.ownerDocument_getter"].call(arguments[0]) == document){
        newArgs[0]=getEquivalent(arguments[0]);
      }
    }
      let result=oldObserver.apply(this,newArgs);
      return result;
  }
};

export {mutationObservers_list,mutationObservers_targets,mutationObservers_configs};
*/