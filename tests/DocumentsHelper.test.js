const { readDocuments, writeDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');

// Mock the fs module
jest.mock('fs');

describe('DocumentsHelper', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.readFileSync.mockClear();
    fs.writeFileSync.mockClear();
    fs.existsSync.mockClear();
    fs.mkdirSync.mockClear();
  });

  it('should read documents from file', () => {
    const mockDocuments = ['document1', 'document2'];
    fs.readFileSync.mockReturnValue(JSON.stringify(mockDocuments));

    const documents = readDocuments();
    expect(documents).toEqual(mockDocuments);
    expect(fs.readFileSync).toHaveBeenCalledWith('documents.json', 'utf-8');
  });

  it('should return an empty array if file does not exist', () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    const documents = readDocuments();
    expect(documents).toEqual([]);
    expect(fs.readFileSync).toHaveBeenCalledWith('documents.json', 'utf-8');
  });

  it('should write documents to file', () => {
    const mockDocuments = ['document3', 'document4'];
    writeDocuments(mockDocuments);
    expect(fs.writeFileSync).toHaveBeenCalledWith('documents.json', JSON.stringify(mockDocuments));
  });
});