const { writeDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');

// Mock the fs module and DocumentsHelper
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');
const restore = require('../n8n_code/Restore');

describe('Restore', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    fs.readdirSync.mockClear();
    writeDocuments.mockClear();
  });

  it('should restore from most recent backup', () => {
    const mockBackupFiles = ['documents_2024-01-01_00-00-00.json', 'documents_2024-01-02_00-00-00.json'];
    fs.readdirSync.mockReturnValue(mockBackupFiles);

    const mockDocuments = ['document1', 'document2'];
    fs.readFileSync.mockReturnValue(JSON.stringify(mockDocuments));

    restore;
    expect(fs.readdirSync).toHaveBeenCalledWith('backups/');
    expect(fs.readFileSync).toHaveBeenCalledWith('backups/documents_2024-01-02_00-00-00.json', 'utf-8');
    expect(writeDocuments).toHaveBeenCalledWith(mockDocuments);
  });

  it('should handle no backups found', () => {
    fs.readdirSync.mockReturnValue([]);

    restore;

    expect(fs.readdirSync).toHaveBeenCalledWith('backups/');
    expect(fs.readFileSync).not.toHaveBeenCalled();
    expect(writeDocuments).not.toHaveBeenCalled();
  });
});