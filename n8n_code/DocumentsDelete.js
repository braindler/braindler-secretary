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
const documentToDelete = query.substring(8);
const index = documents.indexOf(documentToDelete);
if (index > -1) {
    documents.splice(index, 1);
    try {
        fs.writeFileSync(filePath, JSON.stringify(documents));
    } catch (err) {
        console.error('Error writing file:', err);
    }
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