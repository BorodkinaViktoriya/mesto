import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector('.popup__button');
  }

  setConfirmAction = (confirm) => {
    this._confirm = confirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._confirm()
    })
  }
}
