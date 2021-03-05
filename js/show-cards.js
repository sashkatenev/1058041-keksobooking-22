import { createAd, HOUSING_TYPES } from './data.js';

const makeElement = function (tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }

  return element;
};


const fillCard = (element, datum) => {
  element.querySelector('.popup__title').textContent = datum.offer.title;
  element.querySelector('.popup__text--address').textContent = datum.offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${datum.offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = HOUSING_TYPES[datum.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${datum.offer.rooms} комнаты для ${datum.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${datum.offer.checkin}, выезд до ${datum.offer.checkout}`;

  const popupFeatures = element.querySelector('.popup__features');
  popupFeatures.innerHTML = '';
  datum.offer.features.forEach((item) => {
    const feature = makeElement('li', 'popup__feature');
    feature.classList.add(`popup__feature--${item}`);
    popupFeatures.appendChild(feature);
  });

  element.querySelector('.popup__description').textContent = datum.offer.description;

  const popupPhotos = element.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  datum.offer.photos.forEach((item) => {
    const photo = makeElement('img', 'popup__photo');
    photo.src = item;
    photo.alt = 'Фотография жилья';
    popupPhotos.appendChild(photo);
  });

  element.querySelector('.popup__avatar').src = datum.author.avatar;
};

const showCards = (cardsCount) => {
  const cardModel = document.querySelector('#card').content;
  const popupTemplate = cardModel.querySelector('.popup');
  const cardContainer = document.createDocumentFragment();

  for (let i = 0; i < cardsCount; i++) {
    const newPopup = popupTemplate.cloneNode(true);
    const cardData = createAd();
    fillCard(newPopup, cardData);
    cardContainer.appendChild(newPopup);
  }

  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(cardContainer);
};

export default showCards;
