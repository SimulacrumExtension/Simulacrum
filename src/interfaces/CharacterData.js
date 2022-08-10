import {property_getter_text, property_setter_text, property_elementAppender_text} from '../templates.js';

// begin[override CharacterData_property_getters]
let CharacterData_property_getters = ['previousElementSibling', 'nextElementSibling', 'length'];
for(let i=0; i<CharacterData_property_getters.length; i++){
    let property = CharacterData_property_getters[i];
	Object.defineProperty(CharacterData.prototype, property, {
        get: property_getter_text('CharacterData',property+'_getter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override CharacterData_property_getters]

// begin[override CharacterData_property_setter_getters]
let CharacterData_property_setter_getters = ['data'];
for(let i=0; i<CharacterData_property_setter_getters.length; i++){
    let property = CharacterData_property_setter_getters[i];
	Object.defineProperty(CharacterData.prototype, property, {
        get: property_getter_text('CharacterData',property+'_getter'),
        set: property_setter_text('CharacterData',property+'_setter'),
        configurable: true,
        enumerable: true,
    });
}
// end[override CharacterData_property_setter_getters]

// begin[override CharacterData_method_set]
let CharacterData_method_set = ['appendData', 'insertData', 'deleteData', 'replaceData', 'before', 'after', 'replaceWith', 'remove'];
for(let i=0; i<CharacterData_method_set.length; i++){
    let method = CharacterData_method_set[i];
    CharacterData.prototype[method] = property_setter_text('CharacterData',method);
}
// end[override CharacterData_method_set]

// begin[override CharacterData_method_get]
let CharacterData_method_get = ['substringData']
for(let i=0; i<CharacterData_method_get.length; i++){
    let method = CharacterData_method_get[i];
	CharacterData.prototype[method] = property_getter_text('CharacterData',method);
}
// end[override CharacterData_method_get]

// begin[override CharacterData_method_set_element]
let CharacterData_method_set_element = ['before', 'after'];
for(let i=0; i<CharacterData_method_set_element.length; i++){
    let method = CharacterData_method_set_element[i];
    CharacterData.prototype[method] = property_elementAppender_text('CharacterData',method);
}
// end[override CharacterData_method_set_element]

