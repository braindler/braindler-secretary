const { readDocuments, writeDocuments } = require('./DocumentsHelper.js');

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