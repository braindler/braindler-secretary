const { readDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');
const DocumentsSearch = require('../n8n_code/DocumentsSearch');

// Mock the fs module and DocumentsHelper
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');

describe('DocumentsSearch', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    readDocuments.mockClear();
  });

  it('should search for documents', () => {
    const mockDocuments = ['document1', 'document2', 'document3_test'];
    readDocuments.mockReturnValue(mockDocuments);
    const message = { message: 'document3' };
    const expectedList = 'document3_test\n';
    const result = DocumentsSearch.call({$json:message});
    expect(result).toEqual([{ json: { message: expectedList } }]);
  });

  it('should return "no result" if no documents exist', () => {
    readDocuments.mockReturnValue([]);
    const message = { message: 'test' };
    const result = DocumentsSearch.call({$json:message});
    expect(result).toEqual([{ json: { message: 'no result' } }]);
  });
});