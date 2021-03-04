import createAd from './data.js';

const fillCard = (popupElement, datum) => {

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
