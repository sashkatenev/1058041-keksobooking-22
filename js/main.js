import { enableForm } from './util.js';
import { loadMap, showAdMarkers, setMapMarkerMoveEndHandler } from './map.js';
import { fetchData } from './data.js';
import { showPopup } from './custom-popup.js';
import { setAdForm } from './ad-form.js';
import { filterAds, setFilterChangeHandler } from './filter-form.js';

const MARKERS_TO_SHOW_MAXCOUNT = 10;

const fetchDataSuccessHandler = (ads) => {
  showAdMarkers(ads, MARKERS_TO_SHOW_MAXCOUNT);
  enableForm('map__filters', true);

  setFilterChangeHandler(ads, MARKERS_TO_SHOW_MAXCOUNT);
  setMapMarkerMoveEndHandler(() => filterAds(ads), MARKERS_TO_SHOW_MAXCOUNT);
};

const fetchDataErrorHandler = (err) => {
  showPopup('#error', '.error', `Ошибка загрузки данных (${err})`);
};

setAdForm();
enableForm('ad-form', false);
enableForm('map__filters', false);

loadMap('map__canvas')
  .then(() => {
    enableForm('ad-form', true);
    fetchData(fetchDataSuccessHandler, fetchDataErrorHandler);
  })
  .catch((err) => {
    showPopup('#error', '.error', `Ошибка загрузки карты (${err})`);
  });
