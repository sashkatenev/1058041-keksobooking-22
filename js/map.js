/* global L:readonly */

import { getAreaCenter } from './data.js';
import { setAddressInput } from './ad-form.js';

const MAIN_PIN_ICON = {
  iconPath: '../img/main-pin.svg',
  iconWidth: 52,
  iconHeight: 52,
};

const createPinIcon = (_icon) => {
  return L.icon({
    iconUrl: _icon.iconPath,
    iconSize: [_icon.iconWidth, _icon.iconHeight],
    iconAnchor: [_icon.iconWidth / 2, _icon.iconHeight],
  });
};

const createPinMarker = ({ lat, lng }, isDraggable, icon) => {

  return L.marker(
    { lat,
      lng,
    },
    {
      draggable: isDraggable,
      icon: createPinIcon(icon),
    },
  );
};

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

  const mainPinMarker = createPinMarker (getAreaCenter(), true, MAIN_PIN_ICON)
    .addTo(map);

  mainPinMarker.on('move', (evt) => {
    const lat = parseFloat(evt.target.getLatLng().lat).toFixed(5);
    const lng = parseFloat(evt.target.getLatLng().lng).toFixed(5);
    setAddressInput({ lat, lng });
  });

  setAddressInput(getAreaCenter());

  return mapElement;
};

export { setMap };
