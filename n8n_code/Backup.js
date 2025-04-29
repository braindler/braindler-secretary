const fs = require('fs');
const { readDocuments } = require('./DocumentsHelper.js');

const now = new Date();
const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
const backupFilePath = `backups/documents_${timestamp}.json`;
const documents = readDocuments();
/**
 * Creates a timestamped backup of the documents.json file.
 */
try {
  fs.writeFileSync(backupFilePath, JSON.stringify(documents));
  console.log(`Backup created: ${backupFilePath}`);
} catch (err) {
  console.error('Error creating backup:', err);
}

return [{
  json: {
    message: `Backup created: ${backupFilePath}`
  }
}];