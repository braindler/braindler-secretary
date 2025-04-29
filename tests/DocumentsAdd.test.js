const { readDocuments, writeDocuments } = require('../n8n_code/DocumentsHelper');
const fs = require('fs');
const DocumentsAdd = require('../n8n_code/DocumentsAdd');

// Mock the fs module and DocumentsHelper
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');

describe('DocumentsAdd', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
    readDocuments.mockClear();
    writeDocuments.mockClear();
  });

  it('should add a new document', () => {
    const mockDocuments = ['document1', 'document2'];
    readDocuments.mockReturnValue(mockDocuments);
    const message = { message: '/add newDocument' };
    const expectedDocuments = ['document1', 'document2', 'newDocument'];

    const result = DocumentsAdd.call({$json:message});

    expect(writeDocuments).toHaveBeenCalledWith(expectedDocuments);
    expect(result).toEqual([{ json: { message: 'document added' } }]);
  });
});