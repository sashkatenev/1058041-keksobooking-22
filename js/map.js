/* global L:readonly */

import { getAreaCenter } from './data.js';
import { setAddressInput } from './ad-form.js';

const setMap = (className, loadMapHandler) => {
  const mapElement = document.querySelector(`.${className}`);

  const map = L.map(mapElement);

  if (loadMapHandler) {
    map.on('load', loadMapHandler);
  }

  map.setView(getAreaCenter(), 15);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    getAreaCenter(),
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const lat = parseFloat(evt.target.getLatLng().lat).toFixed(5);
    const lng = parseFloat(evt.target.getLatLng().lng).toFixed(5);
    setAddressInput({ lat, lng });
  });

  setAddressInput(getAreaCenter());

  return mapElement;
};

export { setMap };
