// import showCards from './show-cards.js';
import { initForms } from './init-forms.js';
import { setMap, showAdMarkers } from './map.js';
import { loadData } from './data.js';
import { enableForm } from './init-forms.js';

const SIMILAR_AD_COUNT = 20;

initForms();

const map = setMap('map__canvas', () => {
  enableForm('ad-form', true);
  loadData(SIMILAR_AD_COUNT, () => {
    showAdMarkers(10);
    enableForm('filter-form', true);
  })
});
