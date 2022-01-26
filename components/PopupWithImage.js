import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageInPopup = .querySelector('.popup__image');
    this._titleInPopup = .querySelector('.popup__caption');
  }
}