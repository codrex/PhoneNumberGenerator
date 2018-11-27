(function fn() {
  const ASC = 'ASC';
  const DESC = 'DESC';
  let sortIn = ASC;

  this.onLoad = function onLoad() {
    const form = document.querySelector('.form');
    const generatePhoneNumbers = this.generatePhoneNumbers.bind(this);
    form.addEventListener('submit', generatePhoneNumbers);
    this.addSortEventListener();
  };

  this.addSortEventListener = function addSortEventListener() {
    const phoneNumberHeader = document.querySelector('#phone-number');
    const sortNumbers = this.sortNumbers.bind(this);
    phoneNumberHeader.addEventListener('click', sortNumbers);
  };

  this.generatePhoneNumbers = function generatePhoneNumbers(event) {
    event.preventDefault();
    const input = document.querySelector('.num-input');
    const number = input.value;
    const isValid = this.validateInput(number);
    if (isValid) {
      this.makeRequest('POST', `/generate/${number}`, this.updateTable);
      input.value = '';
    }
  };

  this.sortNumbers = function sortNumbers() {
    sortIn = sortIn === ASC ? DESC : ASC;
    this.makeRequest('GET', `/sort/${sortIn}`, this.updateTable);
  };

  this.updateTable = function updateTable(response) {
    const tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = response.responseText;
    this.addSortEventListener();
  };

  this.validateInput = function validateInput(value) {
    const helpText = document.querySelector('.help-text');
    if (value < 1 || value > 500) {
      helpText.style.visibility = 'visible';
      return false;
    }
    helpText.style.visibility = 'hidden';
    return true;
  };

  this.makeRequest = function makeRequest(method, url, cBack) {
    const requester = new XMLHttpRequest();
    requester.onreadystatechange = function onreadystatechange() {
      if (this.readyState === 4 && this.status === 200) {
        cBack(this);
      }
    };
    requester.open(method, url, true);
    requester.send();
  };

  window.addEventListener('load', this.onLoad, false);
}());
