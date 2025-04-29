const Message = require('../n8n_code/Message');
describe('Message', () => {
    it('should transform text message to lower case', () => {
      const result = Message.call({$json:{message:{text:"TEST"}}});
      expect(result).toEqual([{ json: { message: 'test' } }]);
    });
    it('should transform callback_query message to lower case', () => {
      const result = Message.call({$json:{callback_query:{data:"TEST"}}});
      expect(result).toEqual([{ json: { message: 'test' } }]);
    });
  });