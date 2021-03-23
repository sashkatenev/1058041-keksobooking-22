/* global L:readonly */

import { getMainPoint, setMainPoint, getHousingCaption } from './data.js';
import { setAddressInput } from './ad-form.js';
import { createElementFromTemplate } from './util.js';

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

const showAdMarkers = (points, maxCount) => {
  const count = Math.min(maxCount, points.length);
  for (let i = 0; i < count; i++) {
    const coordinates = {
      latitude: points[i].location.lat,
      longitude: points[i].location.lng,
    };
    const popup = createElementFromTemplate('#card', '.popup');
    fillMapPopup(popup, points[i]);
    createPinMarker(coordinates, false, REGULAR_PIN_ICON)
      .addTo(map)
      .bindPopup(
        popup,
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

  const mainPoint = getMainPoint();
  map.setView(
    {
      lat: mainPoint.latitude,
      lng: mainPoint.longitude,
    },
    10,
  );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinMarker = createPinMarker(mainPoint, true, MAIN_PIN_ICON)
    .addTo(map);

  mainPinMarker.on('move', (evt) => {
    setMainPoint(
      {
        latitude: parseFloat(evt.target.getLatLng().lat).toFixed(5),
        longitude: parseFloat(evt.target.getLatLng().lng).toFixed(5),
      },
    );
    setAddressInput(getMainPoint());
  });

  setAddressInput(getMainPoint());

  return map;
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

export { setMap, showAdMarkers };
