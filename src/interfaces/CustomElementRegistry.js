import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'

let method = 'define';
CustomElementRegistry.prototype[method] = function (){
    let result = original['CustomElementRegistry.'+method].apply(this,arguments);
    return result;
}


