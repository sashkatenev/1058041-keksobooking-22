import setAdForm from './ad-form.js';

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

const initForms = () => {
  forms['ad-form']['handle'] = setAdForm(forms['ad-form']['className']);
}

const getFormElement = (key) => {
  return forms[key]['handle'];
};

export { initForms, getFormElement };
