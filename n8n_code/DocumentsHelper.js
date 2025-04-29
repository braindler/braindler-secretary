const fs = require('fs');
const filePath = 'documents.json';
const backupsDir = 'backups/';
//Check if backups dir exist
if (!fs.existsSync(backupsDir)){
  fs.mkdirSync(backupsDir);
}
/**
 * Reads the documents from the documents.json file.
 * @returns {Array} An array of documents.
 */

function readDocuments() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
}

/**
 * Writes the documents to the documents.json file.
 * @param {Array} documents An array of documents to write.
 */
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