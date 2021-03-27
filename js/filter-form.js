import { showAdMarkers } from './map.js';
import { enableForm } from './util.js';

const FORM_CLASS_NAME = 'map__filters';

const filterForm = document.querySelector(`.${FORM_CLASS_NAME}`);
enableForm('map__filters', false);

let housingTypeCriteria  = filterForm.querySelector('#housing-type').value;
let priceCriteria  = filterForm.querySelector('#housing-price').value;
let roomsCriteria = filterForm.querySelector('#housing-rooms').value;
let guestsCriteria = filterForm.querySelector('#housing-guests').value;

const setFilterChangeHandler = (data, maxCount) => {
  filterForm.addEventListener('change', (evt) => {
    setCriteria(evt.target);
    const filteredData = filterAds(data);
    showAdMarkers(filteredData, maxCount);
  });
};

const filterAds = (ads) => {
  return ads.slice().filter((value) => {
    return ((value.offer.type === housingTypeCriteria) || (housingTypeCriteria === 'any')) &&
      (getPriceGrade(value.offer.price) === priceCriteria || (priceCriteria === 'any')) &&
      (value.offer.rooms === parseInt(roomsCriteria) || (roomsCriteria === 'any')) &&
      (value.offer.guests === parseInt(guestsCriteria) || (guestsCriteria === 'any'));
  });
};

const setCriteria = (element) => {
  switch (element.id) {
    case 'housing-type':
      housingTypeCriteria = element.value;
      break;

    case 'housing-price':
      priceCriteria = element.value;
      break;

    case 'housing-rooms':
      roomsCriteria = element.value;
      break;

    case 'housing-guests':
      guestsCriteria = element.value;
      break;

    case 'filter-wifi':
    case 'filter-dishwasher':
    case 'filter-parking':
    case 'filter-washer':
    case 'filter-elevator':
    case 'filter-conditioner':
      break;
  }
};

const getPriceGrade = (priceValue) => {
  return priceValue < 10000 ? 'low' : priceValue > 50000 ? 'high' : 'middle';
};

export { setFilterChangeHandler, filterAds };
