import { initForms, enableForm } from './init-forms.js';
import { setMap, showAdMarkers } from './map.js';
import { fetchData } from './data.js';
import { showPopup } from './custom-popup.js';

const MARKERS_TO_SHOW_MAXCOUNT = 10;

initForms();

setMap('map__canvas', () => {
  enableForm('ad-form', true);
  fetchData(
    (ads) => {
      showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT);
      enableForm('filter-form', true);
    },
    (err) => {
      showPopup('#error', '.error', `Ошибка загрузки данных (${err})`);
    },
  );
});
