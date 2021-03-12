/* global L:readonly */

import { getAreaCenter } from './data.js';

const setMap = (className, loadMapHandler) => {
  const mapElement = document.querySelector(`.${className}`);

  const map = L.map(mapElement);

  if (loadMapHandler) {
    map.on('load', loadMapHandler);
  }

  map.setView(getAreaCenter(), 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return mapElement;
};

export default setMap;
