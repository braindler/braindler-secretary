const { readDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');
const DocumentsList = require('../n8n_code/DocumentsList');

// Mock the fs module and DocumentsHelper
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');

describe('DocumentsList', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    readDocuments.mockClear();
  });

  it('should list all documents', () => {
    const mockDocuments = ['document1', 'document2'];
    readDocuments.mockReturnValue(mockDocuments);
    const expectedList = 'document1\ndocument2';
    const result = DocumentsList.call({$json:{}});
    expect(result).toEqual([{ json: { message: expectedList } }]);
  });

  it('should return "no result" if no documents exist', () => {
    readDocuments.mockReturnValue([]);
    const result = DocumentsList.call({$json:{}});
    expect(result).toEqual([{ json: { message: 'no result' } }]);
  });
});