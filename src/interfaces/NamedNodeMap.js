import {object_setter_withParent, object_setter_withParent_elementAppender} from '../templates.js';

let SVGAngle_method = ['removeNamedItem', 'removeNamedItemNS'];
for(let i=0; i<SVGAngle_method.length; i++){
    let method = SVGAngle_method[i]
	NamedNodeMap.prototype[method] = object_setter_withParent('NamedNodeMap',method);
}

let SVGAngle_method_element = ['setNamedItem', 'setNamedItemNS'];
for(let i=0; i<SVGAngle_method_element.length; i++){
    let method = SVGAngle_method_element[i]
	NamedNodeMap.prototype[method] = object_setter_withParent_elementAppender('NamedNodeMap',method);
}
