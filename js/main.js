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

const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow'
];

const CHECK_POINTS = [
  '12:00',
  '13:00',
  '14:00'
];

const getRandomInt = (...args) => {
  let lowerBound = args[0] || DEFAULT_LOWER_BOUND;
  let upperBound = args[1] || DEFAULT_UPPER_BOUND;
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
  let lowerBound = args[0] || DEFAULT_LOWER_BOUND;
  let upperBound = args[1] || DEFAULT_UPPER_BOUND;
  const decimalPlaces = args[2] || DEFAULT_DECIMAL_PLACES;
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

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const zeroPad = (number, lengthNumber) => {
  return (Array(lengthNumber).fill('0') + number).slice(-lengthNumber);
}

const getRandomAvatarFileName = (template) => {
  let userNumber = zeroPad(getRandomInt(MIN_USER_NUMBER, MAX_USER_NUMBER), USER_NUMBER_DIGITS);
  return `${template.replace('{xx}', userNumber)}`;
};

class Author {
  constructor (avatar) {
    this.avatar = avatar;
  }
}

class Location {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Offer {
  constructor(title, address, price, type, rooms, guests, checkin, checkout, features, description, photos) {
    // this.owner = null;
    this.title = title + ++Offer.staticCounter;
    this.address = address;
    this.price = price;
    this.type = type;
    this.rooms = rooms;
    this.guests = guests;
    this.checkin = checkin;
    this.checkout = checkout;
    this.features = features;
    this.description = description + Offer.staticCounter;
    this.photos = photos;
  }
}

Offer.staticCounter = 0;

class SimilarNearAd {
  constructor(author, offer, location) {
    this.author = author;
    this.offer = offer;
    this.location = location;
  }

  // getLocation() {
  //   return `${this.location.x}, ${this.location.y}`;
  // }
}

const createAd = () => {
  const author = new Author(getRandomAvatarFileName(AVATAR_FILENAME_TEMPLATE));
  const location = new Location(getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, 5), getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, 5));
  const offer = new Offer(
    OFFER_TITLE_TEMPLATE,
    `${location.x}, ${location.y}`,
    getRandomInt(MAX_PRICE),
    getRandomArrayElement(HOUSING_TYPES),
    getRandomInt(1, MAX_ROOMS),
    getRandomInt(MAX_GUESTS),
    getRandomArrayElement(CHECK_POINTS),
    getRandomArrayElement(CHECK_POINTS),
    [],
    HOUSE_DESCRIPTION,
    []
  );

  const similarNearAd = new SimilarNearAd(
    author,
    offer,
    location
  );

  // offer.owner = similarNearAd;

  return similarNearAd;
};

let similarNearAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

console.log(similarNearAds);
