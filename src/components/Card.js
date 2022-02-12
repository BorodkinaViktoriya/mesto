export default class Card {
  constructor({data}, cardSelector, {handleCardClick, handleDeleteButton,handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButton;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content
      .querySelector('.place')
      .cloneNode(true);
    this._placeLikeButton = this._cardElement.querySelector('.place__like-button');
    this._placeImage = this._cardElement.querySelector('.place__image');
    this._likeContainer = this._cardElement.querySelector('.place__like-counter');
    return this._cardElement;
  }

  removeCardElement = () => {
    this._element.remove();
    this._element = null;
  }

  toggleLikeActive = () => {
    this._placeLikeButton.classList.toggle('place__like-button_active');
  }

  _setEventListeners = () => {
    this._element.querySelector('.place__remove-button').addEventListener('click', this._handleDeleteButtonClick);
    this._placeLikeButton.addEventListener('click', this._handleLikeClick);
    this._placeImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  setLikeNumber = (likes) => {
    this._likeContainer.textContent = likes.length;
  }

  getCardId = () => {
    return this._id;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title').textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = this._name;

    this.setLikeNumber(this._likes);
    return this._element;
  };
}