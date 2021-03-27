/* global L:readonly */

import { getHousingCaption } from './data.js';
import { setAddressInput } from './ad-form.js';
import { createElementFromTemplate } from './util.js';
import { filterAds } from './filter-form.js';

const DEFAULT_DECIMAL_PLACES = 5;

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

const MapPinIconData = {
  MAIN_PIN_ICON: {
    iconPath: '../img/main-pin.svg',
    iconWidth: 52,
    iconHeight: 52,
  },

  REGULAR_PIN_ICON: {
    iconPath: '../img/pin.svg',
    iconWidth: 40,
    iconHeight: 40,
  },
}

let map = null;
let mainPinMarker = null;
let regularPinMarkers = [];

const getAreaCenter = () => {
  return {
    lat: (TARGET_AREA.startPoint.latitude + TARGET_AREA.endPoint.latitude) / 2,
    lng: (TARGET_AREA.startPoint.longitude + TARGET_AREA.endPoint.longitude) / 2,
  };
};

const getMainPoint = () => {
  return {
    lat: mainPinMarker.getLatLng().lat.toFixed(DEFAULT_DECIMAL_PLACES),
    lng: mainPinMarker.getLatLng().lng.toFixed(DEFAULT_DECIMAL_PLACES),
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
  removeRegularMarkers();
  const filteredAds = filterAds(ads);
  const count = Math.min(maxCount, filteredAds.length);
  for (let i = 0; i < count; i++) {
    const popupElement = createElementFromTemplate('#card', '.popup');
    fillMapPopup(popupElement, ads[i]);
    regularPinMarkers.push(
      createPinMarker(filteredAds[i].location, false, MapPinIconData.REGULAR_PIN_ICON)
        .addTo(map)
        .bindPopup(popupElement, { keepInView: true }),
    );
  }
};

const moveMarker = (marker, point) => {
  marker.setLatLng(point);
};

const removeRegularMarkers = () => {
  regularPinMarkers.forEach((marker) => {
    marker.remove();
  })
  regularPinMarkers.splice(0, regularPinMarkers.length);
};

const loadMap = (className) => {
  return new Promise((resolve) => {
    const mapElement = document.querySelector(`.${className}`);
    map = L.map(mapElement);
    map.on('load', resolve);

    const point = getAreaCenter();
    map.setView(point, 10);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);

    mainPinMarker = createPinMarker(point, true, MapPinIconData.MAIN_PIN_ICON).addTo(map);

    mainPinMarker.on('move', () => {
      setAddressInput(getMainPoint());
    });

    resetMainPoint();
  });
};

const createMapMarkerMoveEndHandler = (cb) => {
  mainPinMarker.on('moveend', () => {
    setAddressInput(getMainPoint());
    cb();
  });
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

export { loadMap, showAdMarkers, resetMainPoint, createMapMarkerMoveEndHandler, getMainPoint };
