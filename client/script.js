const ASC = 'ASC';
const DESC = 'DESC';
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
      Fn.makeRequest('POST', `/generate/${number}`, this.updateTable);
      input.value = '';
    }
  };

  sortNumbers = () => {
    this.sortIn = this.sortIn === ASC ? DESC : ASC;
    Fn.makeRequest('GET', `/sort/${this.sortIn}`, this.updateTable);
  };

  updateTable = (response) => {
    const tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = response.responseText;
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
      if (this.readyState === 4 && this.status === 200) {
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
