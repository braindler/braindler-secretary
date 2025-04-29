const DocumentsSearch = require('../n8n_code/DocumentsSearch');
const LLM = require('../n8n_code/LLM');
const fs = require('fs');
const { readDocuments } = require('../n8n_code/DocumentsHelper');

jest.mock('../n8n_code/DocumentsHelper');
jest.mock('../n8n_code/DocumentsSearch');
jest.mock('fs');
jest.mock('../n8n_code/DocumentsHelper');
const mockDocuments = ['document1', 'document2', 'document3_test'];
readDocuments.mockReturnValue(mockDocuments);

const mockDocumentsSearch = jest.spyOn(DocumentsSearch, "call")
  .mockReturnValue([{ json: { message: 'Test' } }]);

describe('LLM', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
        fs.readFileSync.mockClear();
        readDocuments.mockClear();
    });

    it('should return "document added" message', () => {
        const mockDocumentsSearch = jest.spyOn(DocumentsSearch, "call")
            .mockReturnValue([{ json: { message: 'document added' } }]);
        const result = LLM.call({$json:{message:"test"}},{ $node: { 'DocumentsSearch': { json: [{ message: 'document added' }] } } });
        expect(result).toEqual([{ json: { message: 'document added' } }]);
    });
    it('should return "document deleted" message', () => {
        const mockDocumentsSearch = jest.spyOn(DocumentsSearch, "call")
            .mockReturnValue([{ json: { message: 'document deleted' } }]);
        const result = LLM.call({$json:{message:"test"}},{ $node: { 'DocumentsSearch': { json: [{ message: 'document deleted' }] } } });
        expect(result).toEqual([{ json: { message: 'document deleted' } }]);
    });
    it('should return "document not found" message', () => {
        const mockDocumentsSearch = jest.spyOn(DocumentsSearch, "call")
            .mockReturnValue([{ json: { message: 'document not found' } }]);
        const result = LLM.call({$json:{message:"test"}},{ $node: { 'DocumentsSearch': { json: [{ message: 'document not found' }] } } });
        expect(result).toEqual([{ json: { message: 'document not found' } }]);
    });
    it('should return llm message', () => {
        const result = LLM.call({$json:{message:"test"}},{ $node: { 'DocumentsSearch': { json: [{ message: 'test' }] } } });
        expect(result).toEqual([{ json: { message: 'Ответ на: test\ntest' } }]);
    });
});