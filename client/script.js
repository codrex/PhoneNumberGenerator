const ASC = 'ASC';
const DESC = 'DESC';
const GEN_NUMBERS_SUCCESS_MSG = 'Phone numbers generated successfully';
const GENERATING_NUMB_MSG = 'Generating numbers...';
class Fn {
  constructor() {
    this.sortIn = ASC;
  }

  addSortEventListener = () => {
    const phoneNumberHeader = document.querySelector('#phone-number');
    phoneNumberHeader.addEventListener('click', this.sortNumbers);
  };

  onLoad = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', this.generatePhoneNumbers);
    this.addSortEventListener();
  };

  generatePhoneNumbers = (event) => {
    event.preventDefault();
    const input = document.querySelector('.num-input');
    const number = input.value;
    const isValid = Fn.validateInput(number);
    if (isValid) {
      Fn.makeRequest('POST', `/generate/${number}`, this.afterPhoneNumbersGen);
      this.delayButtonUpdate();
    }
  };

  afterPhoneNumbersGen = (response) => {
    this.updateView(response);
    const button = document.querySelector('.c-btn');
    button.classList.remove('c-btn--disable');
    button.innerHTML = this.buttonText;
    this.showToast(GEN_NUMBERS_SUCCESS_MSG)();
  };

  delayButtonUpdate() {
    const button = document.querySelector('.c-btn');
    this.buttonText = document.querySelector('.c-btn').innerHTML;
    this.timeout = setTimeout(() => {
      button.classList.add('c-btn--disable');
      button.innerHTML = GENERATING_NUMB_MSG;
    }, 100);
  }

  sortNumbers = () => {
    this.sortIn = this.sortIn === ASC ? DESC : ASC;
    Fn.makeRequest('GET', `/sort/${this.sortIn}`, this.updateView);
  };

  showToast = (message) => {
    const toast = document.querySelector('.toast');
    const toastText = document.querySelector('.toast-text');
    toast.classList.add('toast--show');
    toastText.innerHTML = message;
    return (time = 2000) => {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('toast--show');
        toastText.innerHTML = '';
      }, time);
    };
  };

  updateView = ({ responseText, status }) => {
    clearTimeout(this.timeout);
    const tableContainer = document.querySelector('.table-container');
    const body = document.querySelector('body');
    const input = document.querySelector('.num-input');
    const htmlParent = status === 200 ? tableContainer : body;
    htmlParent.innerHTML = responseText;
    input.value = '';
    this.addSortEventListener();
  };

  static validateInput(value) {
    const helpText = document.querySelector('.help-text');
    if (value < 1 || value > 500) {
      helpText.style.visibility = 'visible';
      return false;
    }
    helpText.style.visibility = 'hidden';
    return true;
  }

  static makeRequest(method, url, cBack) {
    const requester = new XMLHttpRequest();
    requester.onreadystatechange = function onreadystatechange() {
      if (this.readyState === 4) {
        cBack(this);
      }
    };
    requester.open(method, url, true);
    requester.send();
  }
}

const fn = new Fn();
window.addEventListener('load', fn.onLoad, false);

if (window && window.testEnv) {
  module.exports = Fn;
}
