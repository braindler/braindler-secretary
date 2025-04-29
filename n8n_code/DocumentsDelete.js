const { readDocuments, writeDocuments } = require('./DocumentsHelper.js');
/**
 * Delete document from documents.json.
 */
let documents = readDocuments();
const query = $json.message;
const documentToDelete = query.substring(8);
const index = documents.indexOf(documentToDelete);
if (index > -1) {
    documents.splice(index, 1);
    writeDocuments(documents);
    return [{
      json: {
          message: "document deleted"
      }
    }];
} else{
  return [{
    json: {
        message: "document not found"
    }
  }];
}
