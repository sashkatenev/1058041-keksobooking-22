/* global L:readonly */

import { getHousingCaption } from './data.js';
import { setAddressInput } from './ad-form.js';
import { createElementFromTemplate } from './util.js';

const TARGET_AREA = {
  startPoint: {
    latitude: 35.65,
    longitude: 139.7,
  },
  endPoint: {
    latitude: 35.7,
    longitude: 139.8,
  },
};

const MAIN_PIN_ICON_DATA = {
  iconPath: '../img/main-pin.svg',
  iconWidth: 52,
  iconHeight: 52,
};

const REGULAR_PIN_ICON_DATA = {
  iconPath: '../img/pin.svg',
  iconWidth: 40,
  iconHeight: 40,
};

let map = null;
let mainPinMarker = null;

const getAreaCenter = () => {
  return {
    lat: (TARGET_AREA.startPoint.latitude + TARGET_AREA.endPoint.latitude) / 2,
    lng: (TARGET_AREA.startPoint.longitude + TARGET_AREA.endPoint.longitude) / 2,
  };
};

const getMainPoint = () => {
  return {
    lat: mainPinMarker.getLatLng().lat.toFixed(5),
    lng: mainPinMarker.getLatLng().lng.toFixed(5),
  };
};

const resetMainPoint = () => {
  moveMarker(mainPinMarker, getAreaCenter());
};

const createPinIcon = (_icon) => {
  return L.icon({
    iconUrl: _icon.iconPath,
    iconSize: [_icon.iconWidth, _icon.iconHeight],
    iconAnchor: [_icon.iconWidth / 2, _icon.iconHeight],
  });
};

const createPinMarker = (point, isDraggable, iconData) => {
  return L.marker(
    point,
    {
      draggable: isDraggable,
      icon: createPinIcon(iconData),
    },
  );
};

const showAdMarkers = (ads, maxCount) => {
  const count = Math.min(maxCount, ads.length);
  for (let i = 0; i < count; i++) {
    const popup = createElementFromTemplate('#card', '.popup');
    fillMapPopup(popup, ads[i]);
    createPinMarker(ads[i].location, false, REGULAR_PIN_ICON_DATA)
      .addTo(map)
      .bindPopup(
        popup,
        {
          keepInView: true,
        },
      );
  }
};

const moveMarker = (marker, point) => {
  marker.setLatLng(point);
};

const setMap = (className, loadMapHandler) => {
  const mapElement = document.querySelector(`.${className}`);

  map = L.map(mapElement);

  if (loadMapHandler) {
    map.on('load', loadMapHandler);
  }

  const point = getAreaCenter();
  map.setView(point, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker = createPinMarker(point, true, MAIN_PIN_ICON_DATA)
    .addTo(map);

  mainPinMarker.on('move', () => {
    setAddressInput(getMainPoint());
  });

  resetMainPoint();
};

const fillMapListElement = (owner, template, datum) => {
  owner.innerHTML = '';
  if (datum.length > 0) {
    datum.forEach((item) => {
      owner.insertAdjacentHTML('beforeend', template.replace('{}', item));
    });
  } else {
    owner.style.display = 'none';
  }
}

const fillMapPopup = (element, data) => {
  element.querySelector('.popup__title').textContent = data.offer.title;
  element.querySelector('.popup__text--address').textContent = data.offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${data.offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = getHousingCaption(data.offer.type);
  element.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  fillMapListElement(
    element.querySelector('.popup__features'),
    '<li class="popup__feature popup__feature--{}"></li>',
    data.offer.features);

  element.querySelector('.popup__description').textContent = data.offer.description;

  fillMapListElement(
    element.querySelector('.popup__photos'),
    '<img src="{}" class="popup__photo" width="45" height="40" alt="Фотография жилья">',
    data.offer.photos);

  element.querySelector('.popup__avatar').src = data.author.avatar;
};

export { setMap, showAdMarkers, resetMainPoint };
