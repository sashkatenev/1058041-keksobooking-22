import { showAdMarkers, getMainPoint } from './map.js';
import { enableForm } from './util.js';

const FORM_CLASS_NAME = 'map__filters';
const MATCHING_FEATURE_RANK = 100;
const BONUSE_FEATURE_RANK = 1;

const filterForm = document.querySelector(`.${FORM_CLASS_NAME}`);
enableForm('map__filters', false);

let housingTypeCriteria  = filterForm.querySelector('#housing-type').value;
let priceCriteria  = filterForm.querySelector('#housing-price').value;
let roomsCriteria = filterForm.querySelector('#housing-rooms').value;
let guestsCriteria = filterForm.querySelector('#housing-guests').value;
let featuresCriteria = [];

const setFilterChangeHandler = (data, maxCount) => {
  filterForm.addEventListener('change', (evt) => {
    setCriteria(evt.target);
    const filteredData = filterAds(data);
    showAdMarkers(filteredData, maxCount);
  });
};

const filterAds = (ads) => {
  const filteredAds = ads.slice().filter((value) => {
    return (value.offer.type === housingTypeCriteria || housingTypeCriteria === 'any') &&
      (getPriceGrade(value.offer.price) === priceCriteria || priceCriteria === 'any') &&
      (value.offer.rooms === parseInt(roomsCriteria) || roomsCriteria === 'any') &&
      (value.offer.guests === parseInt(guestsCriteria) || guestsCriteria === 'any');
  });

  filteredAds.forEach((ad) => {
    ad.rank = getAdRank(ad);
    ad.distance = getDistance(ad);
  });

  filteredAds.sort(compareAds);
  return filteredAds;
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
      if (element.checked) {
        featuresCriteria.push(element.value)
      } else {
        featuresCriteria.splice(featuresCriteria.indexOf(element.value), 1);
      }
      break;
  }
};

const getPriceGrade = (priceValue) => {
  return priceValue < 10000 ? 'low' : priceValue > 50000 ? 'high' : 'middle';
};

const getAdRank = (ad) => {
  return ad.offer.features.reduce((accumulator, value) => {
    return featuresCriteria.includes(value) ? accumulator + MATCHING_FEATURE_RANK : accumulator + BONUSE_FEATURE_RANK;
  }, 0);
};

const getDistance = (ad) => {
  const mainPoint = getMainPoint();
  return Math.sqrt(Math.pow(mainPoint.lat - ad.location.lat, 2) + Math.pow(mainPoint.lng - ad.location.lng, 2));
};

const compareAds = (adA, adB) => {
  if (adB.rank === adA.rank) {
    return adA.distance - adB.distance;
  }
  return adB.rank - adA.rank;
}

export { setFilterChangeHandler, filterAds };
