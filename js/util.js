const createElementFromTemplate = (templateSelector, blockSelector) => {
  const elementTemplate = document.querySelector(templateSelector).content.querySelector(blockSelector);
  const newElement = elementTemplate.cloneNode(true);
  return newElement;
};

const isEscapeEvent = (evt) => {
  return (evt.keyCode === 27);
};

const isEnterEvent = (evt) => {
  return (evt.keyCode === 13) || (evt.keyCode === 32);
};

export { createElementFromTemplate, isEscapeEvent, isEnterEvent }
