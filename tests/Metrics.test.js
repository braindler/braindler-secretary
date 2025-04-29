const Metrics = require('../n8n_code/Metrics');
const fs = require('fs');
jest.mock('fs');

describe('Metrics', () => {
    beforeEach(() => {
        jest.spyOn(Date, 'now').mockReturnValue(0);
        fs.writeFileSync.mockClear();
        fs.readFileSync.mockClear();
    });

    afterEach(() => {
        jest.spyOn(Date, 'now').mockRestore();
    });

    it('should log metrics', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValue(0),
            set: jest.fn()
        };
        const message = {message:"test"};
        Metrics.call({$json:message}, { $node: { 'Metrics': { context: mockContext } } });
        expect(spy).toHaveBeenNthCalledWith(1,"Processing time:", 0, "ms");
        expect(spy).toHaveBeenNthCalledWith(2,"Request count:", 1);
        expect(spy).toHaveBeenNthCalledWith(3,"Success count:", 1);
        expect(spy).toHaveBeenNthCalledWith(4,"Error count:", 0);
        expect(spy).toHaveBeenNthCalledWith(5,"Avg processing time:", 0, "ms");
        expect(spy).toHaveBeenNthCalledWith(6,"Consecutive errors:", 0);
    });

    it('should count errors', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValue(0),
            set: jest.fn()
        };
        const message = {message:"test",error:true};
        Metrics.call({$json:message}, { $node: { 'Metrics': { context: mockContext } } });
        expect(spy).toHaveBeenNthCalledWith(1,"Processing time:", 0, "ms");
        expect(spy).toHaveBeenNthCalledWith(2,"Request count:", 1);
        expect(spy).toHaveBeenNthCalledWith(3,"Success count:", 0);
        expect(spy).toHaveBeenNthCalledWith(4,"Error count:", 1);
        expect(spy).toHaveBeenNthCalledWith(5,"Avg processing time:", 0, "ms");
        expect(spy).toHaveBeenNthCalledWith(6,"Consecutive errors:", 1);
    });

    it('should send 5xx alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValueOnce(0),
            set: jest.fn()
        };
        const message = {message:"test",error:true};
        Metrics.call({$json:message}, { $node: { 'Metrics': { context: mockContext } } });
        expect(mockContext.set).toHaveBeenLastCalledWith("alertType", "5xx_error");
    });

    it('should send service unavailable alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValueOnce(100000).mockReturnValue(0),
            set: jest.fn()
        };
        const message = {message:"test"};
        jest.spyOn(Date, 'now').mockReturnValue(100000);
        Metrics.call({$json:message}, { $node: { 'Metrics': { context: mockContext } } });
        expect(mockContext.set).toHaveBeenLastCalledWith("alertType", "service_unavailable");
    });

    it('should send consecutive errors alert', () => {
        const spy = jest.spyOn(console, "log");
        const mockContext = {
            get: jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(3).mockReturnValue(0),
            set: jest.fn()
        };
        const message = {message:"test",error:true};
        Metrics.call({$json:message}, { $node: { 'Metrics': { context: mockContext } } });
        expect(mockContext.set).toHaveBeenLastCalledWith("alertType", "consecutive_errors");
    });
});