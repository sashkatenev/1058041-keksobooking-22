import { createElementFromTemplate, isEscapeEvent } from './util.js';

let popupElement = null;
let popupKeydownHandler = null;
let closePopupElement = null;
let textPopupElement = null;

const showPopup = (templateSelector, blockSelector, popupMessage) => {
  popupElement = createElementFromTemplate(templateSelector, blockSelector);
  popupElement.style.zIndex = 400;
  if (popupMessage) {
    popupElement.querySelector('p').textContent = popupMessage;
  }

  popupKeydownHandler = createKeydownHandler(popupElement);
  document.addEventListener('keydown', popupKeydownHandler);

  closePopupElement = popupElement.querySelector('.error__button');
  textPopupElement = popupElement.querySelector('p');

  document.addEventListener('click', clickHandler);

  document.querySelector('main').append(popupElement);
};

const clickHandler = (evt) => {
  const target = evt.target;

  switch (target) {
    case textPopupElement:
      break;

    case closePopupElement:
    default:
      destroyPopup(popupElement);
      break;
  }
};

const destroyPopup = (popup) => {
  document.removeEventListener('keydown', popupKeydownHandler);
  document.removeEventListener('click', clickHandler);
  popup.remove();
  popup = null;
};

const createKeydownHandler = (element) => {
  return (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      destroyPopup(element);
    }
  };
};

export { showPopup };
