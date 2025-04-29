const SendAlert = require('../n8n_code/SendAlert');
describe('SendAlert', () => {
    it('should send alert', () => {
        const spy = jest.spyOn(console, "log");
        SendAlert.call({$json:{alert:"test"}});
        expect(spy).toHaveBeenCalledWith("Send alert to devops about test");
    });
    it('should not send alert', () => {
        const spy = jest.spyOn(console, "log");
        SendAlert.call({$json:{}});
        expect(spy).not.toHaveBeenCalled();
    });
  });