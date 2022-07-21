import { constants } from './constants.js';

const form = document.querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-error'
});

function initFormValidation() {
  initPriceValidation();
  initCapacityValidation();
  return pristine;
}

function validateForm() {
  return pristine.validate();
}

function initPriceValidation() {
  const priceElement = form.querySelector('#price');
  const typeElement = form.querySelector('#type');

  pristine.addValidator(priceElement, (value) => {
    if (value < constants.MIN_PRICES_BY_TYPE.get(typeElement.value)) {
      return false;
    }
    return true;
  }, () => `Прайс должен быть выше ${constants.MIN_PRICES_BY_TYPE.get(typeElement.value)}`);
}

const capacitySelect = form.querySelector('#capacity');
const roomsCountElement = form.querySelector('#room_number');
function initCapacityValidation() {
  pristine.addValidator(capacitySelect, (value) => {
    if (constants.CAPACITIES_BY_ROOMS.get(roomsCountElement.value).has(value)) {
      return true;
    }
    return false;
  }, 'Недоступное для выбора значение');
}

export { initFormValidation, validateForm };


