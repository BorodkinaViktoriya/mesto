export default class Card {
  constructor(name, link, cardSelector, handlePopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePopup = handlePopup;
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

  _setEventListeners() {
    this._element.querySelector('.place__remove-button').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.place__like-button').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.place__image').addEventListener('click', () => this._handlePopup(this._name, this._link));
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