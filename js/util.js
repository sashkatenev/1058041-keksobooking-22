const DEFAULT_LOWER_BOUND = 0;
const DEFAULT_UPPER_BOUND = 0;
const DEFAULT_DECIMAL_PLACES = 5;

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

const getStringArrayFromTemplate = (count, template, replaceSubString) => {
  return Array(count).fill(null).map((value, index) => template.replace(replaceSubString, index + 1));
};

const getRandomSetOfItems = (items) => {
  return Array.from(items).filter(() => Math.random() > 0.5);
};

const zeroPad = (number, numberDigits) => {
  return (Array(numberDigits).fill('0') + number).slice(-numberDigits);
}

export { getRandomInt, getRandomFloat, getRandomArrayItem, getStringArrayFromTemplate, getRandomSetOfItems, zeroPad };
