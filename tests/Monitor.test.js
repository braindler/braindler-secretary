const Monitor = require('../n8n_code/Monitor');
const Metrics = require('../n8n_code/Metrics');
const fs = require('fs');
jest.mock('../n8n_code/Metrics');
jest.mock('fs');

describe('Monitor', () => {
    it('should log metrics', () => {
        const spy = jest.spyOn(console, "log");
        const mockMetrics = [{
            message: 'test',
        }];
        const mockContext = {
            get: jest.fn((key) => {
                if (key === 'requestCount') {
                    return 1;
                }
                if (key === 'successCount') {
                    return 1;
                }
                if (key === 'errorCount') {
                    return 0;
                }
                if (key === 'totalProcessingTime') {
                    return 100;
                }
            }),
            set: jest.fn()
        };
        Monitor.call({ $node: { 'Metrics': { json: mockMetrics, context: mockContext } } });
        expect(spy).toHaveBeenCalledWith("Sending data to monitoring system:", { processingTime: 'test', requestCount: 1, successCount: 1, errorCount: 0, avgProcessingTime: 100 });
    });
});