import { createElementFromTemplate, isEscapeEvent } from './util.js';

let popup = null;
let popupEscapeHandler = null;
let closePopupElement = null;
let textPopupElement = null;

const showPopup = (templateSelector, blockSelector, popupMessage) => {
  popup = createElementFromTemplate(templateSelector, blockSelector);
  popup.style.zIndex = 400;
  if (popupMessage) {
    popup.querySelector('p').textContent = popupMessage;
  }

  popupEscapeHandler = createEscapeHandler(popup);
  document.addEventListener('keydown', popupEscapeHandler);

  closePopupElement = popup.querySelector('.error__button');
  textPopupElement = popup.querySelector('p');

  document.addEventListener('click', clickHandler);

  document.querySelector('main').append(popup);
};

const clickHandler = (evt) => {
  const target = evt.target;

  switch (target) {
    case textPopupElement:
      break;

    case closePopupElement:
    default:
      destroyPopup(popup);
      break;
  }
};

const destroyPopup = (popup) => {
  document.removeEventListener('keydown', popupEscapeHandler);
  document.removeEventListener('click', clickHandler);
  popup.remove();
  popup = null;
};

const createEscapeHandler = (element) => {
  return (evt) => {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      destroyPopup(element);
    }
  };
};

export { showPopup };
