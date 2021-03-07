import { MIN_PRICES } from './data.js';

const setAdForm = () => {
  const adForm = document.querySelector('.ad-form');

  const priceElement = adForm.querySelector('#price');
  priceElement.max = '1000000';

  const housingTypeElement = adForm.querySelector('#type');
  priceElement.min = priceElement.placeholder = MIN_PRICES[housingTypeElement.value];

  const timeInElement = adForm.querySelector('#timein');
  const timeOutElement = adForm.querySelector('#timeout');

  const adFormChangeHandler = (evt) => {
    const targetEvent = evt.target;

    switch (targetEvent) {
      case housingTypeElement:
        priceElement.min = priceElement.placeholder = MIN_PRICES[targetEvent.value];
        break;
      case timeInElement:
        timeOutElement.value = timeInElement.value;
        break;
      case timeOutElement:
        timeInElement.value = timeOutElement.value;
        break;
    }
  };

  adForm.addEventListener('change', adFormChangeHandler);
};

export default setAdForm;
