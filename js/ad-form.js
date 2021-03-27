import { getHousingMinPrice, postData } from './data.js';
import { resetMainPoint } from './map.js';
import { checkCustomValidity, checkAndLoadImage } from './validation.js';
import { showPopup } from './custom-popup.js';
import { enableForm } from './util.js';

const FORM_CLASS_NAME = 'ad-form';

const adForm = document.querySelector(`.${FORM_CLASS_NAME}`);
const titleInput = adForm.querySelector('#title');
const addressInput = adForm.querySelector('#address');
const priceInput = adForm.querySelector('#price');
const housingTypeInput = adForm.querySelector('#type');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const avatarInput = adForm.querySelector('#avatar');
const avatarImage = adForm.querySelector('.ad-form-header__preview img');
const userPictureInput = adForm.querySelector('.ad-form__input');
const userPictureContainer = adForm.querySelector('.ad-form__photo');

const adFormChangeHandler = (evt) => {
  const control = evt.target;
  let userPictureImage = null;

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

    case userPictureInput:
      userPictureContainer.innerHTML = '';
      userPictureImage = document.createElement('img');
      checkAndLoadImage(userPictureInput, userPictureImage);
      userPictureContainer.appendChild(userPictureImage);
      break;
  }
};

const adFormInvalidHandler = (evt) => {
  checkCustomValidity(evt.target);
};

const adFormResetHandler = () => {
  setTimeout(() => {
    roomNumberInput.selectedIndex = -1;
    resetMainPoint();
  }, 0);
};

const setAdForm = () => {
  priceInput.min = priceInput.placeholder = getHousingMinPrice(housingTypeInput.value);
  priceInput.max = '1000000';
  roomNumberInput.selectedIndex = -1;

  adForm.addEventListener('change', adFormChangeHandler);

  [titleInput, priceInput, roomNumberInput].forEach((element) => {
    ['invalid', 'input'].forEach((event) => {
      element.addEventListener(event, adFormInvalidHandler);
    });
  });

  adForm.addEventListener('reset', adFormResetHandler);

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    adForm.querySelector('.ad-form__submit').blur();

    postData(
      () => {
        showPopup('#success', '.success');
        adForm.reset();
      },
      (err) => {
        showPopup('#error', '.error', `Ошибка загрузки данных (${err})`);
      },
      new FormData(evt.target),
    );
  });

  enableForm('ad-form', false);
};

const setAddressInput = (point) => {
  addressInput.value = `${point.lat}, ${point.lng}`;
};

setAdForm();

export { setAdForm, setAddressInput };
