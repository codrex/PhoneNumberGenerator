const { getPhoneNumbers } = require('../');
const { GET_NUMBER_ERROR_MSG } = require('../../constants');

jest.mock('../../lib/modelRepositories/phoneNumber', () => ({
  getNumbers: () => Promise.resolve([]),
}));
jest.mock('../../lib/adapters/builders.js', () => ({
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

    it('should throw when an error occurs', async () => {
      await expect(getPhoneNumbers({}, {})).rejects.toThrow(
        new Error(GET_NUMBER_ERROR_MSG),
      );
    });
  });
});
