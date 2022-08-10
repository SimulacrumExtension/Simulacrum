import {getEquivalent} from './getEquivalent.js';
import {getEquivalentText} from './getEquivalentText.js';
import {getEquivalentNode} from './getEquivalentNode.js';
import { parallelDOM } from './parallelDOM.js';
import {fingerprints} from './fingerprints.js';
import { original } from './original.js';

function generate_clean_HTMLCollection(real){
    let output = {}
    let length = 0
    for (let i=0; i<real.length; i++){
		let item = real[i];
		let thatItem = getEquivalent(item);
        if (thatItem){
			output[i.toString()] = {value: thatItem, enumerable: true};
			if (thatItem.id.length>0)
				output[thatItem.id] = {value: thatItem, enumerable: false};
            length ++;
        }
    }
    output['length'] = {value: length, enumerable: true};
	output['item'] = {value: function(i){return this[+i || 0];} };
	output['namedItem'] = {value: function(i){return output[i];} };

    return Object.create(HTMLCollection.prototype, output);
}

function generate_clean_NodeList(real){
    let output = {}
    let length = 0
    for (let i=0; i<real.length; i++){
        let item = real[i];
        let thatItem = getEquivalentNode(item);
        if (thatItem){
			output[i.toString()] = {value: thatItem, enumerable: true};
            length ++;
        }
    }
    output['length'] = {value: length, enumerable: true};
	output['item'] = {value: function(i){return this[+i || 0];} };

    return Object.create(NodeList.prototype, output);
}

function generate_clean_MutationRecord(real, target){
    let output = {}
    
    output['type'] = {value: real.type, enumerable: true};
    output['target'] = {value: target, enumerable: true};
    output['addedNodes'] = {value: generate_clean_NodeList(real.addedNodes), enumerable: true};
    output['removedNodes'] = {value: removedNodes(real.removedNodes), enumerable: true};
    output['previousSibling'] = {value: getEquivalentNode(real.previousSibling), enumerable: true};
    output['nextSibling'] = {value: getEquivalentNode(real.nextSibling), enumerable: true};
    output['attributeName'] = {value: real.attributeName, enumerable: true};
    output['attributeNamespace'] = {value: real.attributeNamespace, enumerable: true};
    output['oldValue'] = {value: real.oldValue, enumerable: true};

    return Object.create(MutationRecord.prototype, output);
}

export {generate_clean_HTMLCollection, generate_clean_NodeList, generate_clean_MutationRecord};



// Private

function removedNodes(nodes){
    let output = {}
    length = 0
    for (let node of nodes){
        if (node instanceof Element){
            let node_id = original["element.id_getter"].call(node)
            if (  node_id &&
                ( (original['document.getElementById'].call(parallelDOM,node_id) == null) == 
                  (original['document.getElementById'].call(document,node_id) == null) ) && //both exist or do not exist 
                !(node in fingerprints)
                ){
                    output[length.toString()] = {value: node, enumerable: true};
                    length ++;
                }
        } else {
            output[length.toString()] = {value: node, enumerable: true};
            length ++;
        }
    }
    output['length'] = {value: length, enumerable: true};
	output['item'] = {value: function(i){return this[+i || 0];} };
    return Object.create(NodeList.prototype, output);
}