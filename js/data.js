const MARKERS_TO_SHOW_MAXCOUNT = 10;
const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data1';

const TARGET_AREA = {
  startPoint: {
    latitude: 35.65,
    longitude: 139.7,
  },
  endPoint: {
    latitude: 35.7,
    longitude: 139.8,
  },
};

let mainPoint = {
  latitude: null,
  longitude: null,
};

const HOUSING_TYPES = {
  'palace': {
    'caption': 'Дворец',
    'minPrice': 10000,
  },
  'flat': {
    'caption': 'Квартира',
    'minPrice': 1000,
  },
  'house': {
    'caption': 'Дом',
    'minPrice': 5000,
  },
  'bungalow': {
    'caption': 'Бунгало',
    'minPrice': 0,
  },
};

const getAreaCenter = () => {
  return {
    latitude: (TARGET_AREA.startPoint.latitude + TARGET_AREA.endPoint.latitude) / 2,
    longitude: (TARGET_AREA.startPoint.longitude + TARGET_AREA.endPoint.longitude) / 2,
  };
};

const getMainPoint = () => {
  if (!mainPoint.latitude) {
    mainPoint = getAreaCenter();
  }
  return mainPoint;
};

const setMainPoint = ({ latitude, longitude }) => {
  mainPoint.latitude = latitude;
  mainPoint.longitude = longitude;
};

const getHousingCaption = (value) => {
  return HOUSING_TYPES[value]['caption'];
};

const getHousingMinPrice = (value) => {
  return HOUSING_TYPES[value]['minPrice'];
};

let similarNearAds = null;

const fetchAds = (succesHandler, errorHandler) => {
  fetch(DATA_URL)
    .then((response) => {
      if (response.ok) {
        similarNearAds = response.json();
        return similarNearAds;
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((json) => {
      succesHandler(json, MARKERS_TO_SHOW_MAXCOUNT);
    })
    .catch((err) => {
      errorHandler(err);
    })
};

const getData = () => {
  return similarNearAds;
};

export { getHousingCaption, getHousingMinPrice, getMainPoint, setMainPoint, fetchAds, getData };
