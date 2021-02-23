import createAd from './data.js';

const SIMILAR_AD_COUNT = 10;

let similarNearAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

// console.log(similarNearAds);

alert(similarNearAds);
