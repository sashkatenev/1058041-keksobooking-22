'use strict';

const getRandomInt = function (lowerBound = 0, upperBound = 0) {
  let result = null;
  if (arguments.length == 1) {
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

for (let i = 0; i < 10; i++) {
  console.log(getRandomInt(1, 3));
}
