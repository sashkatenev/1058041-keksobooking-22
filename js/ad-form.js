import { getHousingMinPrice } from './data.js';

const setAdForm = () => {
  const adForm = document.querySelector('.ad-form');

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
};

export default setAdForm;
