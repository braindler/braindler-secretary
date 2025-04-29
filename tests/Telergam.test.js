const Telergam = require('../n8n_code/Telergam');
describe('Telergam', () => {
    it('should get data from text message', () => {
      const result = Telergam.call({$json:{message:{from:{id:"test_user_id"},chat:{id:"test_chat_id"}}}});
      expect(result).toEqual([{ json: { telegram: { message: { from: { id: 'test_user_id' }, chat: { id: 'test_chat_id' } }, from: { id: 'test_user_id' }, user_id: 'test_user_id', chat_id: 'test_chat_id' } } }]);
    });
    it('should get data from callback_query message', () => {
        const result = Telergam.call({$json:{callback_query:{from:{id:"test_user_id"},message:{chat:{id:"test_chat_id"}}}}});
        expect(result).toEqual([{ json: { telegram: { callback_query: { from: { id: 'test_user_id' }, message: { chat: { id: 'test_chat_id' } } }, from: { id: 'test_user_id' }, user_id: 'test_user_id', chat_id: 'test_chat_id' } } }]);
    });
  });