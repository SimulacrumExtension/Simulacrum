import {parallelDOM} from '../parallelDOM.js';
import {original} from '../original.js';
import {getEquivalent} from '../getEquivalent.js';
import {logger} from './logger.js'
import { property_setter } from '../templates.js';

// begin[override test]
let test = ['add', 'remove'];
for(let i=0; i<test.length; i++){
    let method = test[i];
	HTMLOptionsCollection.prototype[method] = function(){
        console.log('*** HTMLOptionsCollection ***');
        return original['HTMLOptionsCollection.'+method].apply(this, arguments);
    };
}
// end[override test]

