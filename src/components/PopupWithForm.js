import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formInPopup = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputList = this._formInPopup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }


  renderLoading(isLoading, buttonText){
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...';
    }else {
      this._submitButton.textContent = buttonText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._formInPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formInPopup.reset();
  }
}