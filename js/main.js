import { initForms, enableForm } from './init-forms.js';
import { setMap, showAdMarkers } from './map.js';
import { loadData } from './data.js';

const SIMILAR_AD_COUNT = 20;
const COUNT_MARKERS_TO_SHOW = 10;

initForms();

setMap('map__canvas', () => {
  enableForm('ad-form', true);
  loadData(SIMILAR_AD_COUNT, () => {
    showAdMarkers(COUNT_MARKERS_TO_SHOW);
    enableForm('filter-form', true);
  })
});
