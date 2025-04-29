const { readDocuments, writeDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');
const DocumentsDelete = require('../n8n_code/DocumentsDelete');

// Mock the fs module and DocumentsHelper
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');

describe('DocumentsDelete', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    readDocuments.mockClear();
    writeDocuments.mockClear();
  });

  it('should delete an existing document', () => {
    const mockDocuments = ['document1', 'document2'];
    readDocuments.mockReturnValue(mockDocuments);
    const message = { message: '/delete document1' };
    const expectedDocuments = ['document2'];
    const result = DocumentsDelete.call({$json:message});
    expect(writeDocuments).toHaveBeenCalledWith(expectedDocuments);
    expect(result).toEqual([{ json: { message: 'document deleted' } }]);
  });

  it('should return "document not found" if document does not exist', () => {
    const mockDocuments = ['document1', 'document2'];
    readDocuments.mockReturnValue(mockDocuments);
    const message = { message: '/delete document3' };

    const result = DocumentsDelete.call({$json:message});

    expect(writeDocuments).not.toHaveBeenCalled();
    expect(result).toEqual([{ json: { message: 'document not found' } }]);
  });
});