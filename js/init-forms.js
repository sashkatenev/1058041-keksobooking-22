import { setAdForm } from './ad-form.js';
import { enableForm } from './util.js';

const initForms = () => {
  setAdForm();
  enableForm('ad-form', false);

  // setFilterForm();
  enableForm('map__filters', false);
}

export { initForms, enableForm };
