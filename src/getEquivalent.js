import {original} from './original.js';
import {parallelDOM, newID} from './parallelDOM.js';
import {logger} from './interfaces/logger.js';
import {parseHTMLAddId} from './htmlParser.js';

let single_Element_Non_OverriddenMethods = ['createElement', 'createElementNS']
let Document_Overridden_Methods = ['write', 'writeln']
let Elements_Overridden_Element_Methods = {
    'insertAdjacentHTML': 1
};
let multiple_Element_properties = ['innerHTML', 'outerHTML']
let DOMImplementation_Methods = ['createDocument', 'createHTMLDocument']

function setNewId(node) {
    try {
        if(node && node instanceof Element)
            original['element.id_setter'].call(node, newID());
        else
            node['id'] = newID();
    } catch (e) {
    }
}

function getEquivalent(node) {
    if (parallelDOM == null || node == null)
        return node;
    if (!original["element.id_getter"].apply(node)) {
        
        return null
    }
    let node_id = original["element.id_getter"].apply(node);
    if (original["node.ownerDocument_getter"].apply(node) == document) {
        return getEquivalentElem(node_id, node, document, parallelDOM)
        //return original["document.getElementById"].call(parallelDOM, node_id);
    } else if (original["node.ownerDocument_getter"].apply(node) == parallelDOM) {
        return getEquivalentElem(node_id, node, parallelDOM, document)
        //return original["document.getElementById"].call(document, node_id);
    } else
        return node;
};

function getEquivalentElem(node_id, node, _this, _that) {
    let tagName = original["element.tagName_getter"].call(node);
    let that_arr = original["document.querySelectorAll"].call(_that, tagName + "[id='" + node_id + "']")
    let this_arr = original["document.querySelectorAll"].call(_this, tagName + "[id='" + node_id + "']")
    for (let i = 0; i < this_arr.length; i++) {
        if (this_arr[i] == node)
            return that_arr[i]
    }
    return null
}

function generateIdElement() {
    for (let i = 0; i < single_Element_Non_OverriddenMethods.length; i++) {
        let method = single_Element_Non_OverriddenMethods[i];
        Document.prototype[method] = function () {
            logger("logger:  document." + method)
            let result = original['document.' + method].apply(this, arguments);
            setNewId(result);
            if(result && result instanceof Element) {
                let children = original['element.children_getter'].call(result);
                if (children) {
                    for (let i = 0; i < children.length; i++) {
                        let child = children[i];
                        setNewId(child);
                    }
                }
            }
            return result;
        }
    }
};

function generateIdForOverriddenDocumentMethods() {
    for (let i = 0; i < Document_Overridden_Methods.length; i++) {
        let method = Document_Overridden_Methods[i];
        let oldMethod = Document.prototype[method];
        Document.prototype[method] = function () {
            logger("logger:  generate Ids for overridden function of  document." + method);
            let newStr = parseHTMLAddId(arguments[0], 'HTML');
            let result = oldMethod.apply(this, [newStr]);
            return result;
        }
    }
};

function generateIdForNonOverriddenDocumentMethods() {
    let old_method = Document.prototype.open;
    Document.prototype.open = function () {
        logger("document.open");
        let result = old_method.apply(this, arguments);
        result.write('<html><head><title>test</title></head><body></body></html>');
        return result;
    }
};

function generateIdForOverriddenElementMethods() {
    let method_name = Object.getOwnPropertyNames(Elements_Overridden_Element_Methods);
    for (let i = 0; i < method_name.length; i++) {
        let method = method_name[i];
        let argIndex = Elements_Overridden_Element_Methods[method];
        let oldMethod = Element.prototype[method];
        Element.prototype[method] = function () {
            logger("logger:  generate Ids for overridden function: element." + method);
            let newStr = parseHTMLAddId(arguments[argIndex], 'HTML');
            let argsArray = arguments;
            argsArray[argIndex] = newStr;
            let result = oldMethod.apply(this, argsArray);
            return result;
        }
    }
    // // element.removeAttribute
    let oldMethod = Element.prototype.removeAttribute;
    Element.prototype['removeAttribute'] = function () {
        if (this != null && arguments[0] == "id" && this.tagName != 'TEMPLATE') {
            logger("logger:  generate Ids for overridden function: element.removeAttribute");
            let nID = newID()
            let that = getEquivalent(this)
            original['element.id_setter'].call(this, nID);
            this.id_removed = 'true';
            if (that) {
                original['element.id_setter'].call(that, nID);
                that.id_removed = 'true';
            }
            return undefined;

        } else {
            let result = oldMethod.apply(this, arguments);
            return result;
        }
    }

    let oldMethod2 = Element.prototype.__lookupSetter__('id');
    Element.prototype.__defineSetter__('id', function () {
        logger(arguments)
        if (this != null && (arguments[0] == "" || arguments[0] == null)) {
            logger("logger:  generate Ids for overridden function: element.id_setter");
            arguments[0] = newID()
            let result = oldMethod2.call(this, arguments[0]);
            return "";
        }
        let result = oldMethod2.call(this, arguments[0]);
        return result;
    });

    let oldMethod3 = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function () {
        if (arguments[0] == 'id') {
            if (this != null && (arguments[1] == "" || arguments[1] == null)) {
                logger("logger:  generate Ids for overridden function: element.setAttribute");
                arguments[1] = newID();
                let result = oldMethod3.apply(this, arguments);
                return "";
            }

        }
        let result2 = oldMethod3.apply(this, arguments);
        return result2;


    };
};

function generateIdElementsProperty() {
    for (let i = 0; i < multiple_Element_properties.length; i++) {
        let property = multiple_Element_properties[i];
        let oldSetter = Element.prototype.__lookupSetter__(property);
        Element.prototype.__defineSetter__(property, function () {
            let context = 'HTML';
            if (property == 'innerHTML' && this != undefined) {
                if (this.tagName == 'SCRIPT')
                    context = 'SCRIPT';
                else if (this.tagName == 'STYLE')
                    context = 'STYLE';
            }
            let newStr = parseHTMLAddId(arguments[0].toString(), context);
            logger("logger:  generate Ids for overridden property: element." + property);
            let result = oldSetter.call(this, newStr);
            return result;
        });
    }
};

function generateIdForTableElementMethods() {
    HTMLTableElement.prototype.insertRow = function () {
        logger('HTMLTableElement.prototype.insertRow')
        if (original['HTMLTableElement.rows_getter'].call(this).length == 0) {
            if (!arguments[0] || arguments[0] == -1 || arguments[0] == 0) {
                let tbodies = original['HTMLTableElement.tBodies_getter'].call(this)
                if (tbodies.length == 0) {
                    let oldInner = this.innerHTML
                    this.innerHTML = oldInner + '<tbody><tr></tr></tbody>'
                } else {
                    let oldInner = tbodies[tbodies.length - 1].innerHTML
                    tbodies[tbodies.length - 1].innerHTML = oldInner + '<tr></tr>'
                }
            }
        } else if (original['HTMLTableElement.rows_getter'].call(this).length > 0) {
            let rows = original['HTMLTableElement.rows_getter'].call(this)
            if (arguments[0] > rows.length || arguments[0] < -1) {
                throw new DOMException(" Failed to execute 'insertRow' on 'HTMLTableElement': The index provided (" + arguments[0] +
                    ") is greater than the number of rows in the table (" + rows.length + ").\n" + "    at <anonymous>:1:33")
            } else {
                let elm = null
                if (!arguments[0] || arguments[0] == -1 || arguments[0] == rows.length) {
                    rows[rows.length - 1].insertAdjacentHTML('afterend', '<tr></tr>')
                } else {
                    elm = rows[arguments[0]]
                    elm.insertAdjacentHTML('beforebegin', '<tr></tr>')
                }
            }
        }
        let rows = original['HTMLTableElement.rows_getter'].call(this)
        if (arguments[0] == -1 || arguments[0]==undefined)
            return rows[rows.length - 1]
        else
            return rows[arguments[0]]
    }

    HTMLTableSectionElement.prototype.insertRow = function () {
        logger('HTMLTableSectionElement.prototype.insertRow')
        if (original['HTMLTableSectionElement.rows_getter'].call(this).length == 0) {
            if (arguments[0] == -1 || arguments[0] == 0) {
                let oldInner = this.innerHTML
                this.innerHTML = oldInner + '<tr></tr>'
            }
        } else if (original['HTMLTableSectionElement.rows_getter'].call(this).length > 0) {
            let rows = original['HTMLTableSectionElement.rows_getter'].call(this)
            if (arguments[0] > rows.length || arguments[0] < -1) {
                throw new DOMException(" Failed to execute 'insertRow' on 'HTMLTableSectionElement': The index provided (" + arguments[0] +
                    ") is greater than the number of rows in the table (" + rows.length + ").\n" + "    at <anonymous>:1:33")
            } else {
                let elm = null
                if (arguments[0] == -1 || arguments[0] == rows.length) {
                    rows[rows.length - 1].insertAdjacentHTML('afterend', '<tr></tr>')
                } else {
                    elm = rows[arguments[0]]
                    elm.insertAdjacentHTML('beforebegin', '<tr></tr>')
                }
            }
        }
        let rows = original['HTMLTableSectionElement.rows_getter'].call(this)
        if (arguments[0] == -1 || arguments[0]==undefined )
            return rows[rows.length - 1]
        else
            return rows[arguments[0]]
        // return this;
    }

    HTMLTableElement.prototype.createTBody = function () {
        logger('HTMLTableElement.prototype.createTBody')
        let tbodies = original['HTMLTableElement.tBodies_getter'].call(this)
        if (tbodies.length == 0) {
            let oldInner = this.innerHTML
            this.innerHTML = oldInner + '<tbody></tbody>'
        } else {
            tbodies[tbodies.length - 1].insertAdjacentHTML('afterend', '<tbody></tbody>')
        }
        tbodies = original['HTMLTableElement.tBodies_getter'].call(this)
        return tbodies[tbodies.length - 1]
    }

    HTMLTableElement.prototype.createTHead = function () {
        logger('HTMLTableElement.prototype.createTHead')
        let thead = original['HTMLTableElement.tHead_getter'].call(this)
        if (thead == null) {
                let oldInner = this.innerHTML
                this.innerHTML = '<thead></thead>' + oldInner
        }
        return original['HTMLTableElement.tHead_getter'].call(this)
    }

    HTMLTableElement.prototype.createCaption = function () {
        logger('HTMLTableElement.prototype.createCaption')
        let tcap = original['HTMLTableElement.caption_getter'].call(this)
        if (tcap == null) {
            let oldInner = this.innerHTML
            this.innerHTML = '<caption></caption>' + oldInner
        }
        return original['HTMLTableElement.caption_getter'].call(this)
    }

    HTMLTableElement.prototype.createTFoot = function () {
        logger('HTMLTableElement.prototype.createTFoot')
        let tfoot = original['HTMLTableElement.tFoot_getter'].call(this)
        if (tfoot == null) {
            let oldInner = this.innerHTML
            this.innerHTML = oldInner + '<tfoot></tfoot>'
        }
        return  original['HTMLTableElement.tFoot_getter'].call(this)
    }


    HTMLTableRowElement.prototype.insertCell = function () {
        logger('HTMLTableRowElement.prototype.insertCell')
        if (original['HTMLTableRowElement.cells_getter'].call(this).length == 0) {
            if (arguments[0] == -1 || arguments[0] == 0) {
                let oldInner = this.innerHTML
                this.innerHTML = oldInner + '<td></td>'
            }
        } else if (original['HTMLTableRowElement.cells_getter'].call(this).length > 0) {
            let cells = original['HTMLTableRowElement.cells_getter'].call(this)
            if (arguments[0] > cells.length || arguments[0] < -1) {
                // TODO: raise exception here
                throw new DOMException(" Failed to execute 'insertCel;' on 'HTMLTableRowElement': The index provided (" + arguments[0] +
                    ") is greater than the number of cells in the table (" + cells.length + ").\n" + "    at <anonymous>:1:33")
            } else {
                let elm = null
                if (arguments[0] == -1 || arguments[0] == cells.length) {
                    cells[cells.length - 1].insertAdjacentHTML('afterend', '<td></td>')
                } else {
                    elm = cells[arguments[0]]
                    elm.insertAdjacentHTML('beforebegin', '<td></td>')
                }
            }
        }
        let cells = original['HTMLTableRowElement.cells_getter'].call(this)
        if (arguments[0] == -1 || arguments[0]==undefined )
            return cells[cells.length - 1]
        else
            return cells[arguments[0]]
    }
};

function generateIdsForDOMParser() {
    DOMParser.prototype.parseFromString = function () {
        logger("logger: generate Ids for Elements in parseFromString function");
        let preParsedDom = original['DOMParser.parseFromString'].apply(this, arguments);
        let all = original['document.getElementsByTagName'].call(preParsedDom, "*");
        if (all != null) {
            for (let i = 0, max = all.length; i < max; i++) {
                if (original['element.id_getter'].call(all[i]) == "") {
                    logger("logger:  in generate Ids for string" + all[i].tagName);
                    original['element.id_setter'].call(all[i], newID());
                }
            }
        }
        return preParsedDom;
    }
};

function generateIdsForOption() {
    Option = function () {
        let elm = new original['option'](arguments[0], arguments[1], arguments[2], arguments[3]);
        setNewId(elm);
        return elm;
    }
};

function generateIdsForOtherInterfaces() {
    Image = function () {
        logger("logger:  Image");
        let elm = new original['image'](arguments);
        setNewId(elm);
        return elm;
    }
    Audio = function () {
        logger("logger:  Audio");
        let elm = new original['audio'](arguments);
        setNewId(elm);
        return elm;
    }
};

function generateIdDOMImplementation() {
    for (let i = 0; i < DOMImplementation_Methods.length; i++) {
        let method = DOMImplementation_Methods[i];
        DOMImplementation.prototype[method] = function () {
            logger("logger:  DOMImplementation." + method)
            let result = original['DOMImplementation.' + method].apply(this, arguments);
            if (result != null) {
                let all = original['document.getElementsByTagName'].call(result, "*");
                if (all != null) {
                    for (let i = 0, max = all.length; i < max; i++) {
                        if (original['element.id_getter'].call(all[i]) == "") {
                            original['element.id_setter'].call(all[i], newID());
                        }
                    }
                }
            }
            return result;
        }
    }
};

function generateIdsShadowRoot() {
    let oldSetter = original['shadowRoot.prototype.innerHTML_setter']
    ShadowRoot.prototype.__defineSetter__('innerHTML', function () {
        let newStr = parseHTMLAddId(arguments[0], 'HTML');
        logger("logger:  generate Ids for overridden property: innerHTML for shadowRoot");
        oldSetter.call(this, newStr);
    });
};

function generateIdsXMLHttpRequest() {
    XMLHttpRequest.prototype.__defineGetter__('responseXML', function () {
        logger("logger: generate Ids for XML document in XMLHttpRequest.responseXML__getter ");
        let oldDocument = original['XMLHttpRequest.responseXML_getter'].apply(this, arguments);
        if (oldDocument) {
            let all = original['document.getElementsByTagName'].call(oldDocument, "*");
            if (all != null) {
                for (let i = 0, max = all.length; i < max; i++) {
                    if (original['element.id_getter'].call(all[i]) == "") {
                        logger("logger:  in generate Ids for string" + all[i]);
                        original['element.id_setter'].call(all[i], newID());
                    }
                }
            }
            return oldDocument;
        } else {
            return null;
        }
    });
};

function setIdNodeChildren(node) {
    if (node != null) {
        let children = original['node.childNodes_getter'].call(node)
        if (children != null) {
            for (let i = 0, max = children.length; i < max; i++) {
                logger('child in range ')
                setNewId(children[i]);
                setIdNodeChildren(children[i]);
            }
        }
    }
}

function generateIdIframeSrcDoc() {
    let oldSetter = HTMLIFrameElement.prototype.__lookupSetter__('srcdoc');
    HTMLIFrameElement.prototype.__defineSetter__('srcdoc', function () {
        let newStr = parseHTMLAddId(arguments[0], 'HTML');
        logger("logger:  generate Ids for iframe srcdoc attribute");
        oldSetter.call(this, newStr);
    });
};

function rangeId() {
    Range.prototype.createContextualFragment = function () {
        let result = original['Range.createContextualFragment'].apply(this, arguments);
        logger("Range interface");
        setNewId(result);
        let children = original['node.childNodes_getter'].call(result)
        if (children != null) {
            setIdNodeChildren(result);
        }
        return result;
    }
};

function generateIDs() {
    generateIdDOMImplementation();
    generateIdsForDOMParser();
    generateIdsForOption();
    generateIdElement();
    generateIdElementsProperty();
    generateIdForOverriddenDocumentMethods();
    generateIdForNonOverriddenDocumentMethods();
    generateIdForOverriddenElementMethods();
    generateIdForTableElementMethods();
    generateIdsForOtherInterfaces();
    generateIdsShadowRoot();
    generateIdsXMLHttpRequest();
    rangeId();
    generateIdIframeSrcDoc();
};

export {getEquivalent, generateIDs};
