global.window = { addEventListener: jest.fn(), testEnv: true };
const eventListenerObj = {
  addEventListener: jest.fn(),
  classList: { add: jest.fn(), remove: jest.fn() },
};
global.document = { querySelector: () => eventListenerObj };

const Fn = require('../script');

const fn = new Fn();
const { makeRequest, validateInput } = Fn;

describe('Script Fn', () => {
  afterEach(() => {
    jest.clearAllMocks();
    Fn.makeRequest = makeRequest;
    Fn.validateInput = validateInput;
  });

  describe('addSortEventListener', () => {
    it('should add sort event listener', () => {
      fn.addSortEventListener();
      expect(eventListenerObj.addEventListener).toBeCalledWith(
        'click',
        fn.sortNumbers,
      );
    });
  });

  describe('onLoad', () => {
    it('should add event listeners', () => {
      fn.onLoad();
      expect(eventListenerObj.addEventListener).toBeCalledTimes(2);
    });
  });

  describe('generatePhoneNumbers', () => {
    it('should make a request call to generate phone numbers', () => {
      eventListenerObj.value = '20';
      Fn.makeRequest = jest.fn();
      Fn.validateInput = jest.fn(() => true);
      fn.generatePhoneNumbers({ preventDefault: jest.fn() });
      expect(Fn.makeRequest).toBeCalled();
    });
    it('should not make a request call to generate phone numbers', () => {
      eventListenerObj.value = '0';
      Fn.makeRequest = jest.fn();
      Fn.validateInput = jest.fn(() => false);
      fn.generatePhoneNumbers({ preventDefault: jest.fn() });
      expect(Fn.makeRequest).not.toBeCalled();
    });
  });

  describe('sortNumbers', () => {
    it('should set sortIn to DESC when sortIn is ASC', () => {
      Fn.makeRequest = jest.fn();
      fn.sortIn = 'ASC';
      fn.sortNumbers();
      expect(fn.sortIn).toBe('DESC');
    });

    it('should set sortIn to ASC when sortIn is DESC', () => {
      Fn.makeRequest = jest.fn();
      fn.sortIn = 'DESC';
      fn.sortNumbers();
      expect(fn.sortIn).toBe('ASC');
    });
  });

  describe('updateView', () => {
    it('should update DOM with new html string ', () => {
      const response = { responseText: '<div>new table</div>' };
      fn.addSortEventListener = jest.fn();
      fn.updateView(response);
      expect(eventListenerObj.innerHTML).toBe(response.responseText);
    });

    it('should call addSortEventListener ', () => {
      const response = { responseText: '' };
      fn.addSortEventListener = jest.fn();
      fn.updateView(response);
      expect(fn.addSortEventListener).toBeCalled();
    });
  });

  describe('validateInput', () => {
    it('should return true when value is > 1 and < 500 ', () => {
      eventListenerObj.style = { visibility: '' };
      const result = Fn.validateInput(300);
      expect(result).toBe(true);
    });
    it('should set help text visibility to visible when value is > 1 and < 500 ', () => {
      eventListenerObj.style = { visibility: '' };
      Fn.validateInput(300);
      expect(eventListenerObj.style.visibility).toBe('hidden');
    });

    it('should return false when value is < 1 or > 500 ', () => {
      eventListenerObj.style = { visibility: '' };
      const result = Fn.validateInput(600);
      expect(result).toBe(false);
    });
    it('should set help text visibility to hidden when value is < 1 or > 500 ', () => {
      eventListenerObj.style = { visibility: '' };
      Fn.validateInput(600);
      expect(eventListenerObj.style.visibility).toBe('visible');
    });
  });

  describe('makeRequest', () => {
    it('should send an ajax request when called ', () => {
      const open = jest.fn();
      const send = jest.fn(function xmlFn() {
        this.onreadystatechange();
      });
      global.XMLHttpRequest = function XMLHttpRequestMock() {
        return {
          open,
          send,
        };
      };
      const cb = jest.fn();
      Fn.makeRequest('GET', 'url', cb);
      expect(open).toBeCalledWith('GET', 'url', true);
      expect(send).toBeCalled();
    });

    it('should call the call back function passed in as arg when request is successful', () => {
      const open = jest.fn();
      const send = jest.fn(function xmlFn() {
        this.onreadystatechange();
      });
      global.XMLHttpRequest = function XMLHttpRequestMock() {
        return {
          readyState: 4,
          open,
          send,
        };
      };
      const cb = jest.fn();
      Fn.makeRequest('GET', 'url', cb);
      expect(cb).toBeCalled();
    });
  });

  describe('afterPhoneNumbersGen', () => {
    const response = {
      responseText: '',
      status: 200,
    };
    it('should update view after phone number generation', () => {
      const spy = jest.spyOn(fn, 'updateView');
      fn.afterPhoneNumbersGen(response);
      expect(spy).toBeCalled();
    });

    it('should remove css class', () => {
      fn.afterPhoneNumbersGen(response);
      expect(eventListenerObj.classList.remove).toBeCalled();
    });

    it('should update button text', () => {
      fn.buttonText = 'button';
      const { showToast } = fn;
      fn.showToast = () => () => {};
      fn.afterPhoneNumbersGen(response);
      expect(eventListenerObj.innerHTML).toBe(fn.buttonText);
      fn.showToast = showToast;
    });

    it('should display toast', () => {
      const spy = jest.spyOn(fn, 'showToast');
      fn.afterPhoneNumbersGen(response);
      expect(spy).toBeCalled();
    });
  });

  describe('delayButtonUpdate', () => {
    it('should update button after 100ms', () => {
      jest.useFakeTimers();
      fn.delayButtonUpdate();
      jest.runAllTimers();
      expect(eventListenerObj.classList.add).toBeCalled();
    });
  });

  describe('showToast', () => {
    it('should show toast', () => {
      jest.useFakeTimers();
      fn.delayButtonUpdate();
      jest.runAllTimers();
      expect(eventListenerObj.classList.add).toBeCalled();
    });

    it('should show toast', () => {
      const message = 'hello';
      fn.showToast(message);
      expect(eventListenerObj.classList.add).toBeCalledWith('toast--show');
      expect(eventListenerObj.innerHTML).toBe(message);
    });

    it('should hide toast after 2000ms', () => {
      jest.useFakeTimers();
      fn.showToast()();
      jest.runAllTimers();
      expect(eventListenerObj.classList.remove).toBeCalledWith('toast--show');
      expect(eventListenerObj.innerHTML).toBe('');
    });
  });
});
