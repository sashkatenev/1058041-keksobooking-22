// import { getRandomInt, getRandomFloat, getRandomArrayItem, getStringArrayFromTemplate, getRandomSetOfItems, zeroPad } from './util.js';

const MARKERS_TO_SHOW_MAXCOUNT = 10;
// const AVATAR_FILENAME_TEMPLATE = 'img/avatars/user{xx}.png';
// const MIN_USER_NUMBER = 1;
// const MAX_USER_NUMBER = 8;
// const USER_NUMBER_DIGITS = 2;
// const OFFER_TITLE_TEMPLATE = 'Предложение №';
// const MAX_PRICE = 100000;
// const MAX_ROOMS = 10;
// const MAX_GUESTS = 5;
// const HOUSE_DESCRIPTION_TEMPLATE = 'Описание помещения ';
// const PHOTO_TEMPLATE_REPLACE_STRING = '{number}';
// const PHOTO_FILENAME_TEMPLATE = `http://o0.github.io/assets/images/tokyo/hotel${PHOTO_TEMPLATE_REPLACE_STRING}.jpg`;
// const PHOTO_COUNT = 3;

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

// const CHECK_POINTS = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];

// const FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];

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

// const getRandomAvatar = (template) => {
//   let userNumber = zeroPad(getRandomInt(MIN_USER_NUMBER, MAX_USER_NUMBER), USER_NUMBER_DIGITS);
//   return template.replace('{xx}', userNumber);
// };

// const createAuthor = () => ({
//   avatar: getRandomAvatar(AVATAR_FILENAME_TEMPLATE),
// });

// const createLocation = () => ({
//   x: getRandomFloat(TARGET_AREA.startPoint.latitude, TARGET_AREA.endPoint.latitude, 5),
//   y: getRandomFloat(TARGET_AREA.startPoint.longitude, TARGET_AREA.endPoint.longitude, 5),
// });

// const makeOffer = () => {
//   let adCounter = 0;

//   return (location) => ({
//     title: OFFER_TITLE_TEMPLATE + ++adCounter,
//     address: `${location.x}, ${location.y}`,
//     price: getRandomInt(MAX_PRICE),
//     type: getRandomArrayItem(Object.keys(HOUSING_TYPES)),
//     rooms: getRandomInt(1, MAX_ROOMS),
//     guests: getRandomInt(MAX_GUESTS),
//     checkin: getRandomArrayItem(CHECK_POINTS),
//     checkout: getRandomArrayItem(CHECK_POINTS),
//     features: getRandomSetOfItems(FEATURES),
//     description: HOUSE_DESCRIPTION_TEMPLATE + adCounter,
//     photos: getRandomSetOfItems(getStringArrayFromTemplate(PHOTO_COUNT, PHOTO_FILENAME_TEMPLATE, PHOTO_TEMPLATE_REPLACE_STRING)),
//   });
// };

// const createOffer = makeOffer();

// const createAd = () => {
//   const newAuthor = createAuthor();
//   const newLocation = createLocation();
//   const newOffer = createOffer(newLocation);

//   return {
//     author: newAuthor,
//     offer: newOffer,
//     location: newLocation,
//   };
// };

let similarNearAds = null;

const fetchAds = (succesHandler, errorHandler) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response) {
        similarNearAds = response.json();
        return similarNearAds;
      }

      throw new Error(`${response.status} ${response.statusText}`);
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
