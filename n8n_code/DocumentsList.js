const { readDocuments } = require('./DocumentsHelper.js');
let documents = readDocuments();
let searchResult = documents.join("\n");
return [{
    json: {
        message: searchResult === "" ? "no result" : searchResult
    }
}];
