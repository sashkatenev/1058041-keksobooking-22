'use strict';

const DEFAULT_LOWER_BOUND = 0;
const DEFAULT_UPPER_BOUND = 0;
const DEFAULT_DECIMAL_PLACES = 5;
const SIMILAR_AD_COUNT = 10;
const AVATAR_FILENAME_TEMPLATE = 'img/avatars/user{xx}.png';
const MIN_USER_NUMBER = 1;
const MAX_USER_NUMBER = 8;
const USER_NUMBER_DIGITS = 2;

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

// alert(getRandomInt(1, 10));

// alert(getRandomFloat(1.11, 1.12, 3));

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

class SimilarNearAd {
  constructor (author) {
    this.author = author;
  }
}

const createAd = () => {
  const author = new Author(getRandomAvatarFileName(AVATAR_FILENAME_TEMPLATE));

  const similarNearAd = new SimilarNearAd(
    author
  );

  return similarNearAd;
};

let similarNearAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

console.log(similarNearAds);
