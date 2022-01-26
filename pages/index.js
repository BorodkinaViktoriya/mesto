import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage  from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_contain_profile');
const popupProfileClose = popupProfile.querySelector('.popup__close-button');
//const nameProfile = document.querySelector('.profile__name');
//const jobProfile = document.querySelector('.profile__job');
const profileForm = popupProfile.querySelector('[name="profileForm"]');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const addButton = document.querySelector('.lead__add-button');
const popupPlaces = document.querySelector('.popup_contain_places');
const placeForm = popupPlaces.querySelector('[name="placeForm"]');
const placesCloseButton = popupPlaces.querySelector('.popup__close-button');
const placeNameInput = popupPlaces.querySelector('.popup__input_type_place-name');
const placeLinkInput = popupPlaces.querySelector('.popup__input_type_place-link');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);

// Создаем экземпляр попапа с увеличенной картинкой
const popupWithImage = new PopupWithImage('.popup_contain_image');
popupWithImage.setEventListeners();

// Создаем класс секции для добавления карточек
const cardList = new Section({
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.place-template',() => popupWithImage.open(item.name, item.link) )
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  '.places'
);

cardList.renderItems();

//Сщздаем экземпляр класса с профилем

const userProfile = new UserInfo({nameSelector:'.profile__name', jobSelector:'.profile__job'});

/*function handleEscButton(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}
*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция открытия попапа с формой профиля
function handleProfileForm() {
  openPopup(popupProfile);
  userProfile.getUserInfo(nameInput, jobInput)
  //nameInput.value = nameProfile.textContent;
 // jobInput.value = jobProfile.textContent;
  profileFormValidator.resetValidation();
}

//функция открытия формы добавления места
function handleOpenAddForm(item) {
  openPopup(popupPlaces);
  placeForm.reset();
  placeFormValidator.resetValidation();
}

// функция сохранения профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  userProfile.setUserInfo(nameInput, jobInput)
  //nameProfile.textContent = nameInput.value;
 // jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}

// функция сохранения фотографии места
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const card = new Card(placeName,placeLink, '.place-template', () => popupWithImage.open(placeName, placeLink));
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
  closePopup(popupPlaces);
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

editButton.addEventListener('click', handleProfileForm);
addButton.addEventListener('click', handleOpenAddForm);
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
profileForm.addEventListener('submit', handleProfileSubmit);
placeForm.addEventListener('submit', handlePlaceSubmit);
placesCloseButton.addEventListener('click', () => closePopup(popupPlaces));