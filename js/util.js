const createCustomPopup = (templateSelector, blockSelector) => {
  const popupTemplate = document.querySelector(templateSelector).content.querySelector(blockSelector);
  const newPopup = popupTemplate.cloneNode(true);
  return newPopup;
};

const showPopup = (templateSelector, blockSelector, popupMessage) => {
  const popup = createCustomPopup(templateSelector, blockSelector);
  popup.style.zIndex = 400;
  if (popupMessage) {
    popup.querySelector('p').textContent = popupMessage;
  }
  document.querySelector('main').append(popup);
};

export { createCustomPopup, showPopup };
