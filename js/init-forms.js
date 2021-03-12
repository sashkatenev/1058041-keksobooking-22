import setAdForm from './ad-form.js';
import setFilterForm from './filter-form.js';
import setMap from './map.js';

const forms = {
  'ad-form': {
    'className': 'ad-form',
    'handle': null,
  },
  'filter-form': {
    'className': 'map__filters',
    'handle': null,
  },
  'map': {
    'className': 'map__canvas',
    'handle': null,
  },
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
  const disabledFormClassName = `${forms[key]['className']}--disabled`;
  if (enableFlag) {
    formElement.classList.remove(disabledFormClassName);
    enableCollection(formElement.querySelectorAll('fieldset'));
    enableCollection(formElement.querySelectorAll('input'));
    enableCollection(formElement.querySelectorAll('select'));
  } else {
    formElement.classList.add(disabledFormClassName);
    disableCollection(formElement.querySelectorAll('fieldset'));
    disableCollection(formElement.querySelectorAll('input'));
    disableCollection(formElement.querySelectorAll('select'));
  }
}

const loadMapHandler = () => {
  enableForm('ad-form', true);
  enableForm('filter-form', true);
};

const initForms = () => {
  forms['ad-form']['handle'] = setAdForm(forms['ad-form']['className']);
  enableForm('ad-form', false);

  forms['filter-form']['handle'] = setFilterForm(forms['filter-form']['className']);
  enableForm('filter-form', false);

  forms['map']['handle'] = setMap(forms['map']['className'], loadMapHandler);
}


export { initForms, getForm };
