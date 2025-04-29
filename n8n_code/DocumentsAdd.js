const fs = require('fs');
const filePath = 'documents.json';

let documents = [];
try {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  documents = JSON.parse(fileData);
} catch (err) {
  console.error('Error reading file:', err);
}
$node['DocumentsAdd'].context.set('documents', documents);
const query = $json.message;
const newDocument = query.substring(5);
documents.push(newDocument);
try {
  fs.writeFileSync(filePath, JSON.stringify(documents));
} catch (err) {
  console.error('Error writing file:', err);
}
$node['DocumentsAdd'].context.set('documents', documents);
return [{
  json: {
      message: "document added"
  }
}];