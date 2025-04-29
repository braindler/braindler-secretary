const fs = require('fs');
const { writeDocuments } = require('./DocumentsHelper.js');
const backupsDir = 'backups/';

/**
 * Gets the most recent backup file from the specified directory.
 * @param {string} directory - The directory to search for backup files.
 * @returns {string|undefined} - The name of the most recent backup file or undefined if no backups are found.
 */
// Function to get the most recent backup file
function getMostRecentBackup(directory) {
  const files = fs.readdirSync(directory);
  return files
    .filter(file => file.startsWith('documents_') && file.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a))[0];
}

const mostRecentBackup = getMostRecentBackup(backupsDir);

/**
 * Restores the most recent backup of the documents.json file.
 */
if (mostRecentBackup) {
  const backupFilePath = backupsDir + mostRecentBackup;
  const fileData = fs.readFileSync(backupFilePath, 'utf-8');
  const documents = JSON.parse(fileData);
  writeDocuments(documents);

  return [{
    json: {
        message: `Restore from ${backupFilePath}`
    }
  }];
} else {
  return [{
    json: {
        message: "No backups found"
    }
  }];
}