import { setAdForm } from './ad-form.js';
import setFilterForm from './filter-form.js';

const forms = {
  'ad-form': {
    'className': 'ad-form',
    'handle': null,
  },
  'filter-form': {
    'className': 'map__filters',
    'handle': null,
  },
  // 'map': {
  //   'className': 'map__canvas',
  //   'handle': null,
  // },
}

const getForm = (name) => {
  return forms[name]['handle'];
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

const enableForm = (key, enableFlag) => {
  const formElement = getForm(key);
  const disabledFormClass = `${forms[key]['className']}--disabled`;
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
  forms['ad-form']['handle'] = setAdForm(forms['ad-form']['className']);
  enableForm('ad-form', false);

  forms['filter-form']['handle'] = setFilterForm(forms['filter-form']['className']);
  enableForm('filter-form', false);
}

export { initForms, getForm, enableForm };
