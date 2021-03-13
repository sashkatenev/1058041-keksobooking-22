import { getHousingMinPrice } from './data.js';
import { getForm } from './init-forms.js';

let addressElement = null;

const setAdForm = (className) => {
  const adForm = document.querySelector(`.${className}`);

  const priceElement = adForm.querySelector('#price');
  priceElement.max = '1000000';

  const housingTypeElement = adForm.querySelector('#type');
  priceElement.min = priceElement.placeholder = getHousingMinPrice(housingTypeElement.value);

  const timeInElement = adForm.querySelector('#timein');
  const timeOutElement = adForm.querySelector('#timeout');

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

  adForm.addEventListener('change', adFormChangeHandler);

  return adForm;
};

const setAddressInput = ({lat, lng}) => {
  if (!addressElement) {
    addressElement = getForm('ad-form').querySelector('#address');
  }
  addressElement.value = `${lat}, ${lng}`;
};

export { setAdForm, setAddressInput };
