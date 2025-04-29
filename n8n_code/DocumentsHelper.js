const fs = require('fs');
const filePath = 'documents.json';

function readDocuments() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

function writeDocuments(documents) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(documents));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
module.exports = {
  readDocuments,
  writeDocuments
};