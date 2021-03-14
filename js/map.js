/* global L:readonly */

import { getAreaCenter } from './data.js';
import { setAddressInput } from './ad-form.js';
import { getData } from './data.js';

let map = null;

const MAIN_PIN_ICON = {
  iconPath: '../img/main-pin.svg',
  iconWidth: 52,
  iconHeight: 52,
};

const REGULAR_PIN_ICON = {
  iconPath: '../img/pin.svg',
  iconWidth: 40,
  iconHeight: 40,
};

const createPinIcon = (_icon) => {
  return L.icon({
    iconUrl: _icon.iconPath,
    iconSize: [_icon.iconWidth, _icon.iconHeight],
    iconAnchor: [_icon.iconWidth / 2, _icon.iconHeight],
  });
};

const createPinMarker = ({ lat, lng }, isDraggable, iconData) => {
  return L.marker(
    { lat,
      lng,
    },
    {
      draggable: isDraggable,
      icon: createPinIcon(iconData),
    },
  );
};

const showAdMarkers = (maxCount) => {
  const points = getData();
  const count = Math.min(maxCount, points.length);
  for (let i = 0; i < count; i++) {
    const latLng = {
      lat: points[i].location.x,
      lng: points[i].location.y,
    };
    createPinMarker(latLng, false, REGULAR_PIN_ICON).addTo(map);
  }
};

const setMap = (className, loadMapHandler) => {
  const mapElement = document.querySelector(`.${className}`);

  map = L.map(mapElement);

  if (loadMapHandler) {
    map.on('load', loadMapHandler);
  }

  map.setView(getAreaCenter(), 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinMarker = createPinMarker (getAreaCenter(), true, MAIN_PIN_ICON)
    .addTo(map);

  mainPinMarker.on('move', (evt) => {
    const lat = parseFloat(evt.target.getLatLng().lat).toFixed(5);
    const lng = parseFloat(evt.target.getLatLng().lng).toFixed(5);
    setAddressInput({ lat, lng });
  });

  setAddressInput(getAreaCenter());

  return map;
};

export { setMap, showAdMarkers };
