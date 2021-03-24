import { initForms, enableForm } from './init-forms.js';
import { loadMap, showAdMarkers } from './map.js';
import { fetchData } from './data.js';
import { showPopup } from './custom-popup.js';

const MARKERS_TO_SHOW_MAXCOUNT = 10;

initForms();

const fetchDataSuccessHandler = (ads) => {
  showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT);
  enableForm('map__filters', true);
};

const fetchDataErrorHandler = (err) => {
  showPopup('#error', '.error', `Ошибка загрузки данных (${err})`);
};

loadMap('map__canvas')
  .then(() => {
    enableForm('ad-form', true);
    fetchData(fetchDataSuccessHandler, fetchDataErrorHandler);
  })
  .catch((err) => {
    showPopup('#error', '.error', `Ошибка загрузки карты (${err})`);
  });
