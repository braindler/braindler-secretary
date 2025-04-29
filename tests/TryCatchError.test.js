const TryCatchError = require('../n8n_code/TryCatchError');
describe('TryCatchError', () => {
    it('should return error', () => {
      const result = TryCatchError.call({$json:{message:"test_error"}});
      expect(result).toEqual([{ json: { message: 'Ошибка, попробуйте позже', error: 'test_error' } }]);
    });
  });