/* global L:readonly */

import { getAreaCenter } from './data.js';

const setMap = (className) => {
  const mapElement = document.querySelector(`.${className}`);

  const map = L.map(mapElement)
    .setView(getAreaCenter(), 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return mapElement;
};

export default setMap;
