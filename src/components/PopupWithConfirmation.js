import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formInPopup = this._popup.querySelector('.popup__form');
    this._confirmationButton = this._popup.querySelector('.popup__button');
  }

  setConfirmAction = (confirm) => {
    this._confirm =confirm;
  }

  open() {
    super.open();
    this._confirmationButton.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formInPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirm();
      console.log(evt)
      console.log('htis:', this)
      console.log('forma: ', this._formInPopup)
    })
  }
}
