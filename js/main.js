import { enableForm, debounce } from './util.js';
import { loadMap, showAdMarkers, createMapMarkerMoveEndHandler } from './map.js';
import { fetchData } from './data.js';
import { showPopup } from './custom-popup.js';
import { createFilterChangeHandler } from './filter-form.js';

const MARKERS_TO_SHOW_MAXCOUNT = 10;
const TIMER_DELAY = 500;

const fetchDataSuccessHandler = (ads) => {
  showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT);
  enableForm('map__filters', true);

  createFilterChangeHandler(debounce(() => showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT), TIMER_DELAY));
  createMapMarkerMoveEndHandler(() => showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT));
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
