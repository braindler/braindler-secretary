const { readDocuments } = require('./DocumentsHelper');

/**
 * Get documents from file and search string in it.
 */
function call($json){
let documents = readDocuments();
let searchResult = "";
for (let doc of documents) {
    if (doc.toLowerCase().includes($json.message.toLowerCase())) {
        searchResult += doc + "\n";
    }
}
return [{
    json: {
        message: searchResult === "" ? "no result" : searchResult
    }
}];
}

module.exports = {
    call
};