import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._imageInPopup = this._popup.querySelector('.popup__image');
    this._titleInPopup = this._popup.querySelector('.popup__caption');
    this._imageInPopup.src = link;
    this._imageInPopup.alt = name;
    this._titleInPopup.textContent = name;
  }
}