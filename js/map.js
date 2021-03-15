/* global L:readonly */

import { getData, getAreaCenter } from './data.js';
import { setAddressInput } from './ad-form.js';
import { createCustomPopup } from './create-custom-popup.js';

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

const createPinMarker = ({ latitude, longitude }, isDraggable, iconData) => {
  return L.marker(
    { lat: latitude,
      lng: longitude,
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
    const coordinates = {
      latitude: points[i].location.x,
      longitude: points[i].location.y,
    };
    createPinMarker(coordinates, false, REGULAR_PIN_ICON)
      .addTo(map)
      .bindPopup(
        createCustomPopup(points[i], '#card'),
        {
          keepInView: true,
        },
      );
  }
};

const setMap = (className, loadMapHandler) => {
  const mapElement = document.querySelector(`.${className}`);

  map = L.map(mapElement);

  if (loadMapHandler) {
    map.on('load', loadMapHandler);
  }

  const center = getAreaCenter();
  map.setView(
    {
      lat: center.latitude,
      lng: center.longitude,
    },
    13,
  );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinMarker = createPinMarker(center, true, MAIN_PIN_ICON)
    .addTo(map);

  mainPinMarker.on('move', (evt) => {
    const latitude = parseFloat(evt.target.getLatLng().lat).toFixed(5);
    const longitude = parseFloat(evt.target.getLatLng().lng).toFixed(5);
    setAddressInput({ latitude, longitude });
  });

  setAddressInput(getAreaCenter());

  return map;
};

export { setMap, showAdMarkers };
