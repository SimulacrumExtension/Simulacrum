import {property_setter_text} from '../templates.js';

// begin[override Text_method_set]
let Text_method_set = ['splitText'];
for(let i=0; i<Text_method_set.length; i++){
    let method = Text_method_set[i];
    Text.prototype[method] = property_setter_text('Text',method);
}
// end[override Text_method_set]

