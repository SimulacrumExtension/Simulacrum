import {newID} from './parallelDOM.js';

function removeEmptyID(htmlStr) {
    let idIndex1 = htmlStr.indexOf(" id ");
    let idIndex2 = htmlStr.indexOf(" id>");
    if (index > idIndex1 && idIndex1 > -1) {
        let slice_1 = htmlStr.slice(0, idIndex1);
        let slice_2 = htmlStr.slice(idIndex1 + 3, htmlStr.length);
        htmlStr = slice_1 + slice_2;
        index -= 3;
    } else if (index > idIndex2 && idIndex2 > -1) {
        let slice_1 = htmlStr.slice(0, idIndex2);
        let slice_2 = htmlStr.slice(idIndex2 + 3, htmlStr.length);
        htmlStr = slice_1 + slice_2;
        index -= 4;
    }
    return htmlStr;
}

function checkTR(htmlStr) {
    let index1 = htmlStr.indexOf("<tr")
    let index2 = htmlStr.indexOf("<tbody")
    if (index2 == -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index1);
        let slice_2 = htmlStr.slice(index1, htmlStr.length);
        htmlStr = slice_1 + "<tbody>" + slice_2;
    }
    return htmlStr;
}

function checkTD(htmlStr) {
    let index1 = htmlStr.indexOf("<td")
    let index2 = htmlStr.indexOf("<tr")
    let index3 = htmlStr.indexOf("<tbody")
    if (index2 == -1 && index3 == -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index1);
        let slice_2 = htmlStr.slice(index1, htmlStr.length);
        htmlStr = slice_1 + "<tbody><tr>" + slice_2;
    } else if (index2 = !-1 && index3 == -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index2);
        let slice_2 = htmlStr.slice(index2, htmlStr.length);
        htmlStr = slice_1 + "<tbody>" + slice_2;
    } else if (index2 == -1 && index3 != -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index1);
        let slice_2 = htmlStr.slice(index1, htmlStr.length);
        htmlStr = slice_1 + "<tr>" + slice_2;
    }
    return htmlStr;
}

function checkTH(htmlStr) {
    let index1 = htmlStr.indexOf("<th")
    let index2 = htmlStr.indexOf("<tr")
    let index3 = htmlStr.indexOf("<tbody")
    if (index2 == -1 && index3 == -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index1);
        let slice_2 = htmlStr.slice(index1, htmlStr.length);
        htmlStr = slice_1 + "<tbody><tr>" + slice_2;
    } else if (index2 = !-1 && index3 == -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index2);
        let slice_2 = htmlStr.slice(index2, htmlStr.length);
        htmlStr = slice_1 + "<tbody>" + slice_2;
    } else if (index2 == -1 && index3 != -1 && index1 != -1) {
        let slice_1 = htmlStr.slice(0, index1);
        let slice_2 = htmlStr.slice(index1, htmlStr.length);
        htmlStr = slice_1 + "<tr>" + slice_2;
    }
    return htmlStr;
}

function checkForTableMissingElements(htmlStr) {
    let index1 = htmlStr.indexOf("<table")
    let index2 = htmlStr.indexOf("<thead")
    if (index1 != -1) {
        let substr = '';
        if (index2 != -1) {
            let index4 = htmlStr.indexOf("</thead>")
            if (index4 != -1) {
                substr = htmlStr.substring(index2 + 6, index4)
                substr = checkTD(substr)
                substr = checkTR(substr)
                substr = checkTH(substr)
                htmlStr = htmlStr.substring(0, index2 + 6) + substr + htmlStr.substring(index4)
            }
        }
        if (index2 != -1) {
            let substr = '';
            let index4 = htmlStr.indexOf("</thead>")
            if (index4 != -1) {
                substr = htmlStr.substring(index4 + 9)
                substr = checkTD(substr)
                substr = checkTR(substr)
                substr = checkTH(substr)
                htmlStr = htmlStr.substring(0, index4 + 9) + substr
            }
        } else {
            htmlStr = checkTD(htmlStr)
            htmlStr = checkTR(htmlStr)
            htmlStr = checkTH(htmlStr)
        }
        let index3 = htmlStr.indexOf("<tfoot")
        if (index3 != -1) {
            let substr = '';
            substr = htmlStr.substring(index3)
            substr = checkTD(substr)
            substr = checkTR(substr)
            substr = checkTH(substr)
            htmlStr = htmlStr.substring(0, index3 - 1) + substr
        }
    }
    return htmlStr;
}

function parseHTMLAddId(htmlStr, context) {
    let index = -1;
    let direction = 'R';
    let topOfStack = '';
    let openingTag = -1;
    let idFound = false;
    let scriptContext = false;
    let styleContext = false;
    let state = 'Data';
    let idValue = '';
    let js_input_char = '';
    let js_state = 'JS_Data';
    let js_topOfStack = '';
    let css_input_char = '';
    let css_state = 'CSS_Data';
    let css_topOfStack = '';
    if (context.includes('SCRIPT') || context.includes('STYLE'))
        return htmlStr;
    else {
        if (htmlStr.length > 6) {
            let tableCount = htmlStr.split("<table")
            if (tableCount.length > 1) {
                let temp = tableCount[0]
                let i = 1
                while (i < tableCount.length) {
                    if (tableCount[i])
                        temp += checkForTableMissingElements('<table' + tableCount[i])
                    i += 1
                }
                htmlStr = temp
            }
            while (htmlStr != undefined && tableCount && index < tableCount) {
                htmlStr = checkForTableMissingElements(htmlStr)
                index += 1

            }
        }
        while (htmlStr != undefined && index < htmlStr.length) {
            switch (context) {
                case 'HTML':
                    if (direction == 'R') {
                        index += 1;
                    }
                    direction = 'R';
                    let input_char = htmlStr[index];
                    let ascii = htmlStr.charCodeAt(index);
                    switch (state) {
                        case 'Data':
                            if (input_char == '<') {
                                state = 'Tag_open';
                                openingTag = 0;
                            }
                            break;
                        case 'Tag_open':
                            if (input_char == '!') {
                                state = 'Markup_declaration_open';
                                openingTag = -1;
                            } else if (input_char == '/') {
                                state = 'End_tag_open';
                                topOfStack = 'FET';
                                openingTag = -1;
                            } else if (47 < htmlStr.charCodeAt(index) < 58 || 64 < htmlStr.charCodeAt(index) < 91 || 96 < htmlStr.charCodeAt(index) < 123) {
                                state = 'Tag_name';
                                topOfStack = 'FT';
                                direction = 'L';
                            } else {
                                state = 'Data';
                                direction = 'L';
                            }
                            break;
                        case 'End_tag_open':
                            if (topOfStack == 'FET' && (input_char == 'b' || input_char == 'B'))
                                topOfStack = 'B';
                            else if (topOfStack == 'B' && (input_char == 'r' || input_char == 'R'))
                                topOfStack = 'BR';
                            else if (topOfStack == 'BR' && (input_char == '>' || ([9, 10, 12, 32].includes(ascii)))) {
                                topOfStack = '';
                                direction = 'L';
                                state = 'BR_modify'
                            } else if (topOfStack == 'B' && (input_char == '>' || ([9, 10, 12, 32].includes(ascii)))) {
                                topOfStack = '';
                                direction = 'R';
                                state = 'Data'
                            } else if (topOfStack == 'FET' || topOfStack == 'BR' || topOfStack == 'B') {
                                topOfStack = '';
                                direction = 'L'
                            } else if (47 < htmlStr.charCodeAt(index) < 58 || 64 < htmlStr.charCodeAt(index) < 91 || 96 < htmlStr.charCodeAt(index) < 123)
                                state = 'Tag_name';
                            else if (input_char == '>')
                                state = 'Data';
                            else {
                                state = 'Bogus_comment';
                                direction = 'L';
                            }
                            break;
                        case 'BR_modify':
                            let slice_1 = htmlStr.slice(0, index - 3);
                            let slice_2 = htmlStr.slice(index, htmlStr.length);
                            htmlStr = slice_1 + "br id='" + newID() + "'" + slice_2;
                            index -= 3;
                            state = 'Tag_name';
                            break;
                        case 'Markup_declaration_open':
                            if (input_char == '-' && topOfStack == '')
                                topOfStack = '-';
                            else if (input_char == '-' && topOfStack == '-')
                                topOfStack = '--';
                            else if (input_char != '-' && topOfStack == '-') {
                                topOfStack = '';
                                state = 'Data';
                            } else if (input_char == '-' && topOfStack == '--')
                                topOfStack = '---';
                            else if (input_char != '-' && topOfStack == '--') {
                                topOfStack = '';
                                state = 'Data';
                            } else if (input_char == '-' && topOfStack == '---')
                                topOfStack = '----'
                            else if (input_char == '>' && topOfStack == '----') {
                                topOfStack = '';
                                state = 'Data';
                            } else if (input_char == '>' && topOfStack == '') {
                                state = 'Data';
                            }
                            break;
                        case 'Tag_name':
                            if ([9, 10, 12, 32].includes(ascii)) {
                                if (topOfStack == 'SCRIPT' && openingTag == 0) {
                                    scriptContext = true;
                                } else if (topOfStack == 'STYLE' && openingTag == 0) {
                                    styleContext = true;
                                }
                                state = 'Before_attribute_name';
                                if (openingTag == 0) {
                                    openingTag = index;
                                }
                            } else if (input_char == '/')
                            {
                                openingTag=index;
                                state = 'Self_closing_start_tag';
                            }
                            else if (input_char == '>') {
                                direction = 'L';
                                state = 'Add_id';
                                if (openingTag == 0) {
                                    if (topOfStack == 'SCRIPT') {
                                        scriptContext = true;
                                    } else if (topOfStack == 'STYLE') {
                                        styleContext = true;
                                    }
                                    openingTag = index;
                                }
                            } else {
                                if (topOfStack == 'FT') {
                                    if (input_char == 's' || input_char == 'S') {
                                        topOfStack = 'S';
                                        break;
                                    } else {
                                        topOfStack = '';

                                    }
                                } else if (topOfStack == 'S') {
                                    if (input_char == 't' || input_char == 'T') {
                                        topOfStack = 'ST';
                                        break;
                                    }
                                    if (input_char == 'c' || input_char == 'C') {
                                        topOfStack = 'SC';
                                        break;
                                    }
                                }
                                if (topOfStack == 'SC') {
                                    if (input_char == 'r' || input_char == 'R') {
                                        topOfStack = 'SCR';
                                        break;
                                    }
                                }
                                if (topOfStack == 'SCR') {
                                    if (input_char == 'i' || input_char == 'I') {
                                        topOfStack = 'SCRI';
                                        break;
                                    }
                                }
                                if (topOfStack == 'SCRI') {
                                    if (input_char == 'p' || input_char == 'P') {
                                        topOfStack = 'SCRIP';
                                        break;
                                    }
                                }
                                if (topOfStack == 'SCRIP') {
                                    if (input_char == 't' || input_char == 'T') {
                                        topOfStack = 'SCRIPT';
                                        break;
                                    }
                                }
                                if (topOfStack == 'ST') {
                                    if (input_char == 'y' || input_char == 'Y') {
                                        topOfStack = 'STY';
                                        break;
                                    }
                                }
                                if (topOfStack == 'STY') {
                                    if (input_char == 'l' || input_char == 'L') {
                                        topOfStack = 'STYL';
                                        break;
                                    }
                                }
                                if (topOfStack == 'STYL') {
                                    if (input_char == 'e' || input_char == 'E') {
                                        topOfStack = 'STYLE';
                                        break;
                                    }
                                } else {
                                    topOfStack = '';
                                }
                            }
                            break;
                        case 'Before_attribute_name':
                            if (topOfStack == 'ID' && idValue != '') {
                                topOfStack = '';
                                idValue = '';
                                idFound = true;
                            } else {
                                topOfStack = '';
                                idValue = '';
                                if ([9, 10, 12, 32].includes(ascii))
                                    state = 'Before_attribute_name';
                                else if (input_char == '/' || input_char == '>') {
                                    state = 'After_attribute_name';
                                    direction = 'L';
                                } else {
                                    state = 'Attribute_name';
                                    topOfStack = 'FC';
                                    direction = 'L';
                                }
                            }
                            break;
                        case 'Attribute_name':
                            if ([9, 10, 12, 32].includes(ascii))
                                state = 'After_attribute_name';
                            else if (input_char == '/' || input_char == '>') {
                                state = 'After_attribute_name';
                                // topOfStack = '';
                                direction = 'L';
                            } else if (input_char == '=') {
                                state = 'Before_attribute_value';
                            } else if (topOfStack == 'FC' && input_char == 'i') {
                                state = 'Attribute_name';
                                topOfStack = 'I';
                            } else if (topOfStack == 'I' && input_char == 'd') {
                                state = 'Attribute_name';
                                topOfStack = 'ID';
                            } else {
                                topOfStack = '';
                            }
                            break;
                        case 'After_attribute_name':
                            if ([9, 10, 12, 32].includes(ascii))
                                state = 'After_attribute_name';
                            else if (input_char == '/') {
                                state = 'Self_closing_start_tag';
                                topOfStack = '';
                            } else if (input_char == '>') {
                                direction = 'L';
                                state = 'Add_id';
                            } else if (input_char == '=')
                                state = 'Before_attribute_value';
                            else {
                                topOfStack = 'FC';
                                direction = 'L'
                                state = 'Attribute_name';
                            }
                            break;
                        case 'Before_attribute_value':
                            if ([9, 10, 12, 32].includes(ascii))
                                state = 'Before_attribute_value';
                            else if (input_char == '"') {
                                state = 'Attribute_value_double_quoted';
                            } else if (input_char == "'") {
                                state = 'Attribute_value_single_quoted';
                            } else {
                                state = 'Attribute_value_unquoted';
                                direction = 'L';
                            }
                            break;
                        case 'Attribute_value_double_quoted':
                            if (input_char == '"') {
                                state = 'After_attribute_value_quoted';
                            } else if (topOfStack == 'ID') {
                                idValue += input_char;
                            }
                            break;
                        case 'Attribute_value_single_quoted':
                            if (input_char == "'") {
                                state = 'After_attribute_value_quoted';
                            } else if (topOfStack == 'ID') {
                                idValue += input_char;
                            }
                            break;
                        case 'Attribute_value_unquoted':
                            if ([9, 10, 12, 32].includes(ascii))
                                state = 'Before_attribute_name';
                            else if (input_char == '>') {
                                if (topOfStack == 'ID' && idValue != '') {
                                    idValue = '';
                                    topOfStack = '';
                                    idFound = true;
                                }
                                direction = 'L';
                                state = 'Add_id';
                            } else if (topOfStack == 'ID') {
                                idValue += input_char;
                            }
                            break;
                        case 'After_attribute_value_quoted':
                            if (topOfStack == 'ID' && idValue != '') {
                                idValue = '';
                                topOfStack = '';
                                idFound = true;
                                direction = 'L';
                            } else {
                                topOfStack = '';
                                idValue = '';
                                if ([9, 10, 12, 32].includes(ascii))
                                    state = 'Before_attribute_name';
                                else if (input_char == '/') {
                                    state = 'Self_closing_start_tag';
                                } else if (input_char == '>') {
                                    direction = 'L';
                                    state = 'Add_id';
                                } else {
                                    state = 'Before_attribute_name';
                                    direction = 'L';
                                }
                            }
                            break;
                        case 'Self_closing_start_tag':
                            if (input_char == '>') {
                                state = 'Add_id';
                                direction = 'L';
                            } else {
                                state = 'Before_attribute_name';
                                direction = 'L';
                            }
                            break;
                        case 'Add_id':
                            if (input_char == '>') {
                                if (openingTag > 0) {
                                    if (topOfStack == 'ID' && idValue == '' || idFound == false) {
                                        if (topOfStack == 'ID' && idValue == '') {
                                            htmlStr = removeEmptyID(htmlStr);
                                        }
                                        let slice_1 = htmlStr.slice(0, openingTag);
                                        let slice_2 = htmlStr.slice(openingTag, htmlStr.length);
                                        let newIdStr = " id='" + newID() + "' ";
                                        htmlStr = slice_1 + newIdStr + slice_2;
                                        index += newIdStr.length - 1;
                                    }
                                }
                                topOfStack = '';
                                idValue = '';
                                idFound = false;
                                openingTag = -1;
                                if (scriptContext == false && styleContext == false) {
                                    state = 'Data';
                                } else if (styleContext == true) {
                                    context = 'STYLE';
                                    index -= 1;
                                    topOfStack = '';
                                } else {
                                    context = 'SCRIPT';
                                    index -= 1;
                                    topOfStack = '';
                                }
                            }
                    }
                    break;
                case 'SCRIPT':
                    index += 1;
                    js_input_char = htmlStr[index];
                    switch (js_state) {
                        case 'JS_Data':
                            if (js_input_char == '<') {
                                js_topOfStack = '<';
                            } else if (js_topOfStack == '<' && js_input_char == '/') {
                                js_topOfStack = '</';
                            } else if (js_topOfStack == '</' && (js_input_char == 's' || js_input_char == 'S')) {
                                js_topOfStack = '</S';
                            } else if (js_topOfStack == '</S' && (js_input_char == 'c' || js_input_char == 'C')) {
                                js_topOfStack = '</SC';
                            } else if (js_topOfStack == '</SC' && (js_input_char == 'r' || js_input_char == 'R')) {
                                js_topOfStack = '</SCR';
                            } else if (js_topOfStack == '</SCR' && (js_input_char == 'i' || js_input_char == 'I')) {
                                js_topOfStack = '</SCRI';
                            } else if (js_topOfStack == '</SCRI' && (js_input_char == 'p' || js_input_char == 'P')) {
                                js_topOfStack = '</SCRIP';
                            } else if (js_topOfStack == '</SCRIP' && (js_input_char == 't' || js_input_char == 'T')) {
                                js_topOfStack = '</SCRIPT';
                            } else if (js_topOfStack == '</SCRIPT' && (js_input_char == '>')) {
                                context = "HTML";
                                state = 'Data';
                                topOfStack = '';
                                js_topOfStack = '';
                                js_state = 'JS_Data';
                                scriptContext = false;
                                openingTag = false;
                            } else {
                                js_topOfStack = '';
                            }
                            break;
                    }
                    break;
                case 'STYLE':
                    index += 1;
                    css_input_char = htmlStr[index];
                    switch (css_state) {
                        case 'CSS_Data':
                            if (css_input_char == '<') {
                                css_topOfStack = '<';
                            } else if (css_topOfStack == '<' && css_input_char == '/') {
                                css_topOfStack = '</';
                            } else if (css_topOfStack == '</' && (css_input_char == 's' || css_input_char == 'S')) {
                                css_topOfStack = '</S';
                            } else if (css_topOfStack == '</S' && (css_input_char == 't' || css_input_char == 'T')) {
                                css_topOfStack = '</ST';
                            } else if (css_topOfStack == '</ST' && (css_input_char == 'y' || css_input_char == 'Y')) {
                                css_topOfStack = '</STY';
                            } else if (css_topOfStack == '</STY' && (css_input_char == 'l' || css_input_char == 'L')) {
                                css_topOfStack = '</STYL';
                            } else if (css_topOfStack == '</STYL' && (css_input_char == 'e' || css_input_char == 'E')) {
                                css_topOfStack = '</STYLE';
                            } else if (css_topOfStack == '</STYLE' && (css_input_char == '>')) {
                                context = "HTML";
                                state = 'Data';
                                topOfStack = '';
                                css_topOfStack = '';
                                css_state = 'CSS_Data';
                                styleContext = false;
                                openingTag = false;
                            } else {
                                css_topOfStack = '';
                            }
                            break;
                    }
                    break;
            }
        }
    }
    return htmlStr;
};

export {parseHTMLAddId};
