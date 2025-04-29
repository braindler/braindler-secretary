const Logging = require('../n8n_code/Logging');
describe('Logging', () => {
    it('should log request and response', () => {
        const spy = jest.spyOn(console, "log");
        Logging.call({$json:{message:"test"}});
        expect(spy).toHaveBeenNthCalledWith(1,"Request:", "test");
        expect(spy).toHaveBeenNthCalledWith(2,"Response:", "test");
    });
    it('should log error', () => {
        const spy = jest.spyOn(console, "error");
        Logging.call({$json:{message:"test",error:"test_error"}});
        expect(spy).toHaveBeenCalledWith("Error:", "test_error");
    });
  });