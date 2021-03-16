import { getHousingMinPrice } from './data.js';
import { getForm } from './init-forms.js';

let adForm = null;
let addressElement = null;
let priceElement = null;
let housingTypeElement = null;
let timeInElement = null;
let timeOutElement = null;

const adFormChangeHandler = (evt) => {
  const targetEvent = evt.target;

  switch (targetEvent) {
    case housingTypeElement:
      priceElement.min = priceElement.placeholder = getHousingMinPrice(targetEvent.value);
      break;
    case timeInElement:
      timeOutElement.value = targetEvent.value;
      break;
    case timeOutElement:
      timeInElement.value = targetEvent.value;
      break;
  }
};

const setAdForm = (className) => {
  adForm = document.querySelector(`.${className}`);

  priceElement = adForm.querySelector('#price');
  priceElement.max = '1000000';

  housingTypeElement = adForm.querySelector('#type');
  priceElement.min = priceElement.placeholder = getHousingMinPrice(housingTypeElement.value);

  timeInElement = adForm.querySelector('#timein');
  timeOutElement = adForm.querySelector('#timeout');

  adForm.addEventListener('change', adFormChangeHandler);

  return adForm;
};

const setAddressInput = ({latitude, longitude}) => {
  if (!addressElement) {
    addressElement = getForm('ad-form').querySelector('#address');
  }
  addressElement.value = `${latitude}, ${longitude}`;
};

export { setAdForm, setAddressInput };
