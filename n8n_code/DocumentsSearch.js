const fs = require('fs');
const filePath = 'documents.json';

let documents = [];
try {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  documents = JSON.parse(fileData);
} catch (err) {
  console.error('Error reading file:', err);
}
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