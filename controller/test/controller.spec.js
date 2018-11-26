const { getPhoneNumbers } = require('../');

jest.mock('../../lib/modelRepositories/phoneNumber', () => ({
  getNumbers: () => Promise.resolve([]),
}));
jest.mock('../../lib/adapters', () => ({
  buildPhoneNumberPayload: () => ({}),
}));

const res = {
  render: jest.fn(),
};
const req = {
  db: {},
};

describe('controller', () => {
  describe('getPhoneNumbers', () => {
    it('should render the index page', async () => {
      await getPhoneNumbers(req, res);
      expect(res.render).toBeCalledWith('index', {
        title: 'phone number generator',
      });
    });
  });
});
