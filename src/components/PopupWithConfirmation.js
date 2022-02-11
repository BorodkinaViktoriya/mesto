import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmAction) {
    super(popupSelector);
    this._confirmAction= confirmAction;
    this._confirmationButton = this._popup.querySelector('.popup__button');
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', this._confirmAction)
  }
}