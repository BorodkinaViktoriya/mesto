export const popupZoomCards = document.querySelector('.popup_contain_image');
const popupCard = popupZoomCards.querySelector('.popup__image');
const popupCardDescription = popupZoomCards.querySelector('.popup__caption');

export class Card {
  constructor(name, link, cardSelector, openPopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard = () => {
    this._element.remove();
  }

  _handleLikeCard = () => {
    this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
  }

  _handleImageClick = () => {
    this._openPopup(popupZoomCards);
    popupCard.src = this._link;
    popupCardDescription.textContent = this._name;
    popupCard.alt = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.place__remove-button').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.place__like-button').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.place__image').addEventListener('click', this._handleImageClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__image').alt = this._name;

    return this._element;
  };
}