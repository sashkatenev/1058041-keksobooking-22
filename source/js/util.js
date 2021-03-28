const ESCAPE_KEY_CODE = 27;

const createElementFromTemplate = (templateSelector, blockSelector, attributes) => {
  const elementTemplate = document.querySelector(templateSelector).content.querySelector(blockSelector);
  const newElement = elementTemplate.cloneNode(true);

  if (attributes) {
    for (let key in attributes) {
      newElement[key] = attributes[key];
    }
  }

  return newElement;
};

const setElementAttributes = (element, attributes) => {
  if (attributes) {
    for (let key in attributes) {
      element[key] = attributes[key];
    }
  }
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

const generateElementEvent = (element, eventName) => {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(eventName, true, true);
  element.dispatchEvent(evt);
};

export { createElementFromTemplate, setElementAttributes, isEscapeEvent, enableForm, debounce, generateElementEvent }
