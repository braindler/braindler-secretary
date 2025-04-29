const { readDocuments } = require('./DocumentsHelper.js');
/**
 * List all documents from documents.json.
 */
let documents = readDocuments();
let searchResult = documents.join("\n");
return [{
    json: {
        message: searchResult === "" ? "no result" : searchResult
    }
}];
