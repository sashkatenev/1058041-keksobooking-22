'use strict';

const DEFAULT_LOWER_BOUND = 0;
const DEFAULT_UPPER_BOUND = 0;
const DEFAULT_DECIMAL_PLACES = 5;
const SIMILAR_AD_COUNT = 10;
const AVATAR_FILENAME_TEMPLATE = 'img/avatars/user{xx}.png';
const MIN_USER_NUMBER = 1;
const MAX_USER_NUMBER = 8;
const USER_NUMBER_DIGITS = 2;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;
const OFFER_TITLE_TEMPLATE = 'Предложение №';
const MAX_PRICE = 100000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 5;
const HOUSE_DESCRIPTION = 'Описание помещения ';
const PHOTO_FILENAME_TEMPLATE = 'http://o0.github.io/assets/images/tokyo/hotel{number}.jpg'
const PHOTO_COUNT = 3;

const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_POINTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const getRandomInt = (...args) => {
  let [lowerBound = DEFAULT_LOWER_BOUND, upperBound = DEFAULT_UPPER_BOUND] = args;
  let result = null;
  if (args.length == 1) {
    if (lowerBound > 0) {
      upperBound = lowerBound;
      lowerBound = 0;
    }
  }
  if (Number.isInteger(lowerBound) && Number.isInteger(upperBound) && upperBound >= lowerBound) {
    result = Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }
  return result;
}

const getRandomFloat = (...args) => {
  let [lowerBound = DEFAULT_LOWER_BOUND, upperBound = DEFAULT_UPPER_BOUND] = args;
  const [, , decimalPlaces = DEFAULT_DECIMAL_PLACES] = args;
  let result = null;
  if (args.length == 1) {
    if (lowerBound > 0) {
      upperBound = lowerBound;
      lowerBound = 0;
    }
  }
  if (upperBound >= lowerBound && Number.isInteger(decimalPlaces)) {
    result = Math.random() * (upperBound - lowerBound) + lowerBound;
    const rounder = Math.pow(10, decimalPlaces);
    result = Math.round(result * rounder) / rounder;
  }
  return isNaN(result) ? null : result;
}

const getRandomArrayItem = (items) => {
  return items[getRandomInt(0, items.length - 1)];
};

const getRandomSetOfItems = (items) => {
  return items.slice().filter(() => getRandomInt(1) === 1);  // 0 or 1 (50%)
};

const zeroPad = (number, numberDigits) => {
  return (Array(numberDigits).fill('0') + number).slice(-numberDigits);
}

const getRandomAvatar = (template) => {
  let userNumber = zeroPad(getRandomInt(MIN_USER_NUMBER, MAX_USER_NUMBER), USER_NUMBER_DIGITS);
  return template.replace('{xx}', userNumber);
};

// const getRandomStringArrayFromTemplate = (count, template) => {
//   return getRandomSetOfItems(Array(count).fill(null).map((value, index) => template.replace('{number}', index + 1)));
// };

const createAuthor = () => ({
  avatar: getRandomAvatar(AVATAR_FILENAME_TEMPLATE),
});

const createLocation = () => ({
  x: getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, 5),
  y: getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, 5),
});

const makeOffer = () => {
  let adCounter = 0;

  return (location) => ({
    title: OFFER_TITLE_TEMPLATE + ++adCounter,
    address: `${location.x}, ${location.y}`,
    price: getRandomInt(MAX_PRICE),
    type: getRandomArrayItem(HOUSING_TYPES),
    rooms: getRandomInt(1, MAX_ROOMS),
    guests: getRandomInt(MAX_GUESTS),
    checkin: getRandomArrayItem(CHECK_POINTS),
    checkout: getRandomArrayItem(CHECK_POINTS),
    features: getRandomSetOfItems(FEATURES),
    description: HOUSE_DESCRIPTION + adCounter,
    photos: getRandomSetOfItems(Array(PHOTO_COUNT).fill(null)
      .map((value, index) => PHOTO_FILENAME_TEMPLATE.replace('{number}', index + 1))),
  });
};

const createOffer = makeOffer();

const createAd = () => {
  const newAuthor = createAuthor();
  const newLocation = createLocation();
  const newOffer = createOffer(newLocation);

  return {
    author: newAuthor,
    offer: newOffer,
    location: newLocation,
  };
};

let similarNearAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

// console.log(similarNearAds);

alert(similarNearAds);
