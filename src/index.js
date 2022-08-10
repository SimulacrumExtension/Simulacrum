/**
 * Part of the build process:
 * Inject the extension logic into a wrapper meant to execute it in the webpage
 * context.
 */
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
import contentSource from 'raw-loader!BUNDLED_EXTENSION_CONTENT';

var uuid = uuidv4();
var uuid_rmElems = uuidv1();

chrome.storage.sync.get("safelist", function(retrieved_data) {
    let safelist = retrieved_data["safelist"]
    let current_site = window.location.hostname;
    if (safelist.hasOwnProperty(current_site)) {
        window.postMessage({type:"FROM_EXTENSION_SIMULACRUM_PD", uuid: uuid})
    }
});

chrome.storage.sync.get("rmElems", function(retrieved_data) {
    if(retrieved_data['rmElems']){
        window.postMessage({type:"FROM_EXTENSION_SIMULACRUM_PD_RM", uuid: uuid_rmElems})
    }
});

var simulacrum = document.createElement("script");
var temporaryHead = document.createElement("head");
let moddedContent = contentSource.replace("INSERT_UUID_HERE", uuid);
moddedContent = moddedContent.replace("INSERT_UUID_RMELEMS_HERE", uuid_rmElems );
var node = document.createTextNode(moddedContent);
simulacrum.appendChild(node);
temporaryHead.appendChild(simulacrum);
document.documentElement.append(temporaryHead);
