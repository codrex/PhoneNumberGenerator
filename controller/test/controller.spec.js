const { getPhoneNumbers, createPhoneNumbers } = require('../');
const {
  GET_NUMBER_ERROR_MSG,
  GEN_NUMBERS_ERROR_MSG,
} = require('../../constants');

jest.mock('../../lib/modelRepositories/phoneNumber', () => ({
  getNumbers: () => Promise.resolve([]),
  addNumbers: () => Promise.resolve([]),
}));
jest.mock('../../lib/adapters/builders.js', () => ({
  buildPhoneNumberPayload: () => ({}),
}));
jest.mock('../../lib/phoneNumberGen', () => ({
  generatePhoneNumbers: () => ({}),
}));

const res = {
  render: jest.fn(),
  status: jest.fn(),
};
const req = {
  db: {},
  params: {},
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
      await getPhoneNumbers({}, res);
      expect(res.render).toBeCalledWith('error', {
        message: GET_NUMBER_ERROR_MSG,
      });
      expect(res.status).toBeCalledWith(500);
    });
  });
  describe('createPhoneNumbers', () => {
    it('should create phone numbers successfully', async () => {
      const next = jest.fn();
      await createPhoneNumbers(req, res, next);
      expect(next).toBeCalled();
    });

    it('should throw when an error occurs', async () => {
      await createPhoneNumbers({}, res);
      expect(res.render).toBeCalledWith('error', {
        message: GEN_NUMBERS_ERROR_MSG,
      });
      expect(res.status).toBeCalledWith(500);
    });
  });
});
