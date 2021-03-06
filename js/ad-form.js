import { MIN_PRICES } from './data.js';

const setAdForm = () => {
  const adForm = document.querySelector('.ad-form');

  const priceElement = adForm.querySelector('#price');
  priceElement.max = '1000000';

  const housingTypeElement = adForm.querySelector('#type');
  priceElement.min = priceElement.placeholder = MIN_PRICES[housingTypeElement.value];

  const adFormChangeHandler = (evt) => {
    const target = evt.target;
    if (target === housingTypeElement) {
      priceElement.min = priceElement.placeholder = MIN_PRICES[target.value];
    }
  };

  adForm.addEventListener('change', adFormChangeHandler);
};

export default setAdForm;
