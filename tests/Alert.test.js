const Alert = require('../n8n_code/Alert');
const fs = require('fs');
jest.mock('fs');

describe('Alert', () => {
    beforeEach(() => {
        fs.writeFileSync.mockClear();
        fs.readFileSync.mockClear();
    });

    it('should log 5xx alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValue("5xx_error"),
            set: jest.fn()
        };
        Alert.call({$json:{}}, { $node: { 'Metrics': { context: mockContext } } });
        expect(spy).toHaveBeenCalledWith("ALERT: 5xx error rate exceeded threshold!");
    });

    it('should log service unavailable alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValue("service_unavailable"),
            set: jest.fn()
        };
        Alert.call({$json:{}}, { $node: { 'Metrics': { context: mockContext } } });
        expect(spy).toHaveBeenCalledWith("ALERT: Service unavailable for too long!");
    });
    it('should log consecutive errors alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValue("consecutive_errors"),
            set: jest.fn()
        };
        Alert.call({$json:{}}, { $node: { 'Metrics': { context: mockContext } } });
        expect(spy).toHaveBeenCalledWith("ALERT: Too many consecutive errors from RAG/LLM!");
    });
});