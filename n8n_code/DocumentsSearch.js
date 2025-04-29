const { readDocuments } = require('./DocumentsHelper.js');
let documents = readDocuments();
const query = $json.message;
let searchResult = "";

for (const document of documents) {
  if (document.includes(query)) {
    searchResult += document + "\n";
  }
}
return [{
    json: {
        message: searchResult === "" ? "no result" : searchResult
    }
}];