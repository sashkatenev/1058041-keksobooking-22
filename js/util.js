const ESCAPE_KEY_CODE = 27;

const createElementFromTemplate = (templateSelector, blockSelector) => {
  const elementTemplate = document.querySelector(templateSelector).content.querySelector(blockSelector);
  const newElement = elementTemplate.cloneNode(true);
  return newElement;
};

const isEscapeEvent = (evt) => {
  return (evt.keyCode === ESCAPE_KEY_CODE);
};

const enableCollection = (collection) => {
  collection.forEach((element) => {
    element.disabled = false;
  });
};

const disableCollection = (collection) => {
  collection.forEach((element) => {
    element.disabled = true;
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

const debounce = (cb, timeout) => {
  let timerId = null;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(cb, timeout);
  };
};

export { createElementFromTemplate, isEscapeEvent, enableForm, debounce }
