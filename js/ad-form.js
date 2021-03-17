import { getHousingMinPrice } from './data.js';
import { getForm } from './init-forms.js';
import { checkCustomValidity, checkAndLoadImage } from './validation.js';

let adForm = null;
let titleInput = null;
let addressInput = null;
let priceInput = null;
let housingTypeInput = null;
let timeInInput = null;
let timeOutInput = null;
let roomNumberInput = null;
let capacityInput = null;
let avatarInput = null;
let avatarImage = null;

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

    case roomNumberInput:
      capacityInput.options.length = 0;

      if (roomNumberInput.value >= 100) {
        capacityInput.append(new Option('не для гостей', '0'));
      } else {
        for (let i = roomNumberInput.selectedIndex + 1; i > 0; i--) {
          capacityInput.append(new Option(`для ${i} гостей`, i));
        }
      }
      break;

    case avatarInput:
      checkAndLoadImage(avatarInput, avatarImage);
      break;
  }
};

const adFormInvalidHandler = (evt) => {
  checkCustomValidity(evt.target);
};

const setAdForm = (className) => {
  adForm = document.querySelector(`.${className}`);

  titleInput = adForm.querySelector('#title');

  housingTypeInput = adForm.querySelector('#type');

  priceInput = adForm.querySelector('#price');
  priceInput.min = priceInput.placeholder = getHousingMinPrice(housingTypeInput.value);
  priceInput.max = '1000000';

  timeInInput = adForm.querySelector('#timein');
  timeOutInput = adForm.querySelector('#timeout');

  roomNumberInput = adForm.querySelector('#room_number');
  roomNumberInput.selectedIndex = -1;

  capacityInput = adForm.querySelector('#capacity');

  avatarInput = adForm.querySelector('#avatar');
  avatarImage = adForm.querySelector('.ad-form-header__preview img');

  adForm.addEventListener('change', adFormChangeHandler);

  [titleInput, priceInput, roomNumberInput].forEach((element) => {
    ['invalid', 'input'].forEach((event) => {
      element.addEventListener(event, adFormInvalidHandler);
    });
  });

  adForm.addEventListener('submit', (evt) => {
    if (adForm.checkValidity()) {
      evt.preventDefault();
      alert('Форма валидна');
    } else {
      alert('Форма невалидна');
    }
  });

  return adForm;
};

const setAddressInput = ({latitude, longitude}) => {
  if (!addressInput) {
    addressInput = getForm('ad-form').querySelector('#address');
  }
  addressInput.value = `${latitude}, ${longitude}`;
};

export { setAdForm, setAddressInput };
