
export const editButton = document.querySelector('.profile__edit-button');
export const profileForm = document.querySelector('[name="profileForm"]');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const addButton = document.querySelector('.lead__add-button');
export const placeForm = document.querySelector('[name="placeForm"]');
export const avatarEditForm = document.querySelector('[name="avatarEditForm"]');
export const avatarContainer = document.querySelector('.profile__foto')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}