'use strict';

const DEFAULT_LOWER_BOUND = 0;
const DEFAULT_UPPER_BOUND = 1;
const DEFAULT_DECIMAL_PLACES = 3;

const getRandomInt = (lowerBound = DEFAULT_LOWER_BOUND, upperBound = DEFAULT_UPPER_BOUND) => {
  let result = null;
  if (Number.isInteger(lowerBound) && Number.isInteger(upperBound) && upperBound >= lowerBound) {
    result = Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }
  return result;
}

const getRandomFloat = (lowerBound = DEFAULT_LOWER_BOUND, upperBound = DEFAULT_UPPER_BOUND, decimalPlaces = DEFAULT_DECIMAL_PLACES) => {
  let result = null;
  if (upperBound >= lowerBound && Number.isInteger(decimalPlaces)) {
    result = Math.random() * (upperBound - lowerBound) + lowerBound;
    const rounder = Math.pow(10, decimalPlaces);
    result = Math.round(result * rounder) / rounder;
    // result = +result.toFixed(decimalPlaces);
  }
  return isNaN(result) ? null : result;
}

// alert(getRandomInt(1, 10));

// alert(getRandomFloat(1.11, 1.12, 3));

for (let i = 0; i < 10; i++) {
  console.log(getRandomFloat());
}
