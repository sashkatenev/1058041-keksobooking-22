import { showAdMarkers } from './map.js';

const FORM_CLASS_NAME = 'map__filters';

const filterForm = document.querySelector(`.${FORM_CLASS_NAME}`);
let housingTypeCriteria = filterForm.querySelector('#housing-type').value;

const setFilterChangeHandler = (data, maxCount) => {
  filterForm.addEventListener('change', (evt) => {
    const idControl = evt.target.id;

    switch (idControl) {
      case 'housing-type':
        housingTypeCriteria = idControl.value;
        break;

      case 'housing-price':
        break;

      case 'housing-rooms':
        break;

      case 'housing-guests':
        break;

      case 'filter-wifi':
      case 'filter-dishwasher':
      case 'filter-parking':
      case 'filter-washer':
      case 'filter-elevator':
      case 'filter-conditioner':
        break;
    }
    const filteredData = filterAds(data);
    showAdMarkers(filteredData, maxCount);
  });
};

const filterAds = (ads) => {
  return ads.slice().filter((value) => {
    return (value.offer.type === housingTypeCriteria) || (housingTypeCriteria === 'any');
  });
};

export { setFilterChangeHandler, filterAds };
