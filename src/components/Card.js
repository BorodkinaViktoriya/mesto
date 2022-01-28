export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content
      .querySelector('.place')
      .cloneNode(true);
    this._placeLikeButton = this._cardElement.querySelector('.place__like-button');
    this._placeImage = this._cardElement.querySelector('.place__image');

    return this._cardElement;
  }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard = () => {
    this._placeLikeButton.classList.toggle('place__like-button_active');
  }

  _setEventListeners = () => {
    this._element.querySelector('.place__remove-button').addEventListener('click', this._handleDeleteCard);
    this._placeLikeButton.addEventListener('click', this._handleLikeCard);
    this._placeImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;

    return this._element;
  };
}