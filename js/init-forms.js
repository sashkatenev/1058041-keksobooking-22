import { setAdForm } from './ad-form.js';

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

const initForms = () => {
  setAdForm();
  enableForm('ad-form', false);

  // setFilterForm();
  enableForm('map__filters', false);
}

export { initForms, enableForm };
