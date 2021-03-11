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

const getForm = (name) => {
  return forms[name]['handle'];
};

const activateForm = (key, activateFlag) => {
  const formElement = getForm(key);
  const disabledFormClassName = `${forms[key]['className']}--disabled`;
  const fieldsets = formElement.querySelectorAll('fieldset');
  if (activateFlag) {
    formElement.classList.remove(disabledFormClassName);
    fieldsets.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  } else {
    formElement.classList.add(disabledFormClassName);
    fieldsets.forEach((fieldset) => {
      fieldset.setAttribute('disabled', '');
    });
  }
}

const initForms = () => {
  forms['ad-form']['handle'] = setAdForm(forms['ad-form']['className']);

  activateForm('ad-form', false);
}


export { initForms, getForm };
