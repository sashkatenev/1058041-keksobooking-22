import { initForms, enableForm } from './init-forms.js';
import { setMap, showAdMarkers } from './map.js';
import { fetchAds } from './data.js';
import { showPopup } from './custom-popup.js';

initForms();

setMap('map__canvas', () => {
  enableForm('ad-form', true);
  fetchAds(
    (ads, maxCount) => {
      showAdMarkers(ads, maxCount);
      enableForm('filter-form', true);
    },
    (err) => {
      showPopup('#error', '.error', `Ошибка загрузки данных (${err})`);
    });
});
