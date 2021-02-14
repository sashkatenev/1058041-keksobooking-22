'use strict';

const getRandomInt = (lowerBound = 0, upperBound = 0) => {
  let result = null;
  if (Number.isInteger(lowerBound) && Number.isInteger(upperBound) && upperBound >= lowerBound) {
    result = Math.round(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }
  return result;
}

const getRandomFloat = (lowerBound = 0, upperBound = 0, decimalPlaces = 0) => {
  let result = null;
  if (upperBound >= lowerBound && Number.isInteger(decimalPlaces)) {
    result = Math.random() * (upperBound - lowerBound) + lowerBound;
    const rounder = Math.pow(10, decimalPlaces);
    result = Math.round(result * rounder) / rounder;
    // result = +result.toFixed(decimalPlaces);
  }
  return isNaN(result) ? null : result;
}

alert(getRandomInt(1, 10));

alert(getRandomFloat(1.11, 1.12, 3));
