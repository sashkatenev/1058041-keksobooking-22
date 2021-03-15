import { getHousingCaption } from './data.js';

const fillListElement = (owner, template, datum) => {
  owner.innerHTML = '';
  if (datum.length > 0) {
    datum.forEach((item) => {
      owner.insertAdjacentHTML('beforeend', template.replace('{}', item));
    });
  } else {
    owner.style.display = 'none';
  }
}

const fillPopup = (element, data) => {
  element.querySelector('.popup__title').textContent = data.offer.title;
  element.querySelector('.popup__text--address').textContent = data.offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${data.offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = getHousingCaption(data.offer.type);
  element.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  fillListElement(
    element.querySelector('.popup__features'),
    '<li class="popup__feature popup__feature--{}"></li>',
    data.offer.features);

  element.querySelector('.popup__description').textContent = data.offer.description;

  fillListElement(
    element.querySelector('.popup__photos'),
    '<img src="{}" class="popup__photo" width="45" height="40" alt="Фотография жилья">',
    data.offer.photos);

  element.querySelector('.popup__avatar').src = data.author.avatar;
};

const createCustomPopup = (point, selector) => {
  const popupTemplate = document.querySelector(selector).content.querySelector('.popup');
  // const popup = cardTemplate.querySelector('.popup');
  // const cardsContainer = document.createDocumentFragment();

  // for (let i = 0; i < cardsCount; i++) {
  const newPopup = popupTemplate.cloneNode(true);
  // const cardData = createAd();
  fillPopup(newPopup, point);
  //   cardsContainer.appendChild(newPopup);
  // }
  return newPopup;
  // document.querySelector('#map-canvas').appendChild(cardsContainer);
};

export { createCustomPopup };
