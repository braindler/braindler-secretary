const { readDocuments, writeDocuments } = require('./DocumentsHelper.js');

/**
 * Add new document to documents.json.
 */
let documents = readDocuments();
const query = $json.message;
const newDocument = query.substring(5);
documents.push(newDocument);
writeDocuments(documents);

return [{
  json: {
      message: "document added"
  }
}];