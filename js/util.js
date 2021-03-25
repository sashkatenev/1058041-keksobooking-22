const createElementFromTemplate = (templateSelector, blockSelector) => {
  const elementTemplate = document.querySelector(templateSelector).content.querySelector(blockSelector);
  const newElement = elementTemplate.cloneNode(true);
  return newElement;
};

const isEscapeEvent = (evt) => {
  return (evt.keyCode === 27);
};

const enableCollection = (collection) => {
  collection.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const disableCollection = (collection) => {
  collection.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const enableForm = (className, enableFlag) => {
  const formElement = document.querySelector(`.${className}`);
  const disabledFormClass = `${className}--disabled`;
  const selectors = ['fieldset', 'input', 'select'];
  if (enableFlag) {
    formElement.classList.remove(disabledFormClass);
    selectors.forEach((selector) => {
      enableCollection(formElement.querySelectorAll(selector));
    });
  } else {
    formElement.classList.add(disabledFormClass);
    selectors.forEach((selector) => {
      disableCollection(formElement.querySelectorAll(selector));
    });
  }
}

export { createElementFromTemplate, isEscapeEvent, enableCollection, disableCollection, enableForm }
