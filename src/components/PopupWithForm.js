import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formInPopup = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._formInPopup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formInPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close()
    })
  }

  close() {
    super.close();
    this._formInPopup.reset();
  }
}