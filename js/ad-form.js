import { getHousingMinPrice } from './data.js';
import { getForm } from './init-forms.js';

let adForm = null;
let titleInput = null;
let addressInput = null;
let priceInput = null;
let housingTypeInput = null;
let timeInInput = null;
let timeOutInput = null;

const adFormChangeHandler = (evt) => {
  const control = evt.target;

  switch (control) {
    case housingTypeInput:
      priceInput.min = priceInput.placeholder = getHousingMinPrice(control.value);
      break;
    case timeInInput:
      timeOutInput.value = control.value;
      break;
    case timeOutInput:
      timeInInput.value = control.value;
      break;
  }
};

const adFormInvalidHandler = (evt) => {
  const control = evt.target;

  switch (true) {
    case control.validity.valueMissing:
      control.setCustomValidity('Это поле обязательно для заполнения');
      break;
    case control.validity.rangeOverflow:
      control.setCustomValidity(`Максимальное значение для этого поля: ${control.max}`);
      break;
    case control.validity.rangeUnderflow:
      control.setCustomValidity(`Минимальное значение для этого поля: ${control.min}`);
      break;
    case control.validity.tooShort:
      control.setCustomValidity(`Это поле должно содержать не менее ${control.minLength} символов (ещё хотя бы ${control.minLength - control.value.length})`);
      break;
    case control.validity.tooLong:
      control.setCustomValidity(`Это поле должно содержать не более ${control.maxLength} символов`);
      break;
    case control.validity.badInput:
      control.setCustomValidity(`Это поле должно содержать число`);
      break;
    case (control == priceInput) && (!(priceInput.value.match('^[0-9]+$'))):   // e.g. '1e4' rejected by the server
      control.setCustomValidity('Это поле должно содержать только цифры');
      break;
    default:
      control.setCustomValidity('');
      break;
  }
};

const setAdForm = (className) => {
  adForm = document.querySelector(`.${className}`);

  titleInput = adForm.querySelector('#title');

  priceInput = adForm.querySelector('#price');
  priceInput.min = priceInput.placeholder = getHousingMinPrice(housingTypeInput.value);
  priceInput.max = '1000000';

  housingTypeInput = adForm.querySelector('#type');

  timeInInput = adForm.querySelector('#timein');
  timeOutInput = adForm.querySelector('#timeout');

  adForm.addEventListener('change', adFormChangeHandler);

  titleInput.addEventListener('invalid', adFormInvalidHandler);
  titleInput.addEventListener('input', adFormInvalidHandler);

  priceInput.addEventListener('invalid', adFormInvalidHandler);
  priceInput.addEventListener('input', adFormInvalidHandler);

  return adForm;
};

const setAddressInput = ({latitude, longitude}) => {
  if (!addressInput) {
    addressInput = getForm('ad-form').querySelector('#address');
  }
  addressInput.value = `${latitude}, ${longitude}`;
};

export { setAdForm, setAddressInput };
