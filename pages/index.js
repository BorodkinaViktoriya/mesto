import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
//import PopupWithImage  from "../components/PopupWithImage.js";

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
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const profileForm = popupProfile.querySelector('[name="profileForm"]');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const addButton = document.querySelector('.lead__add-button');
const popupPlaces = document.querySelector('.popup_contain_places');
const placeForm = popupPlaces.querySelector('[name="placeForm"]');
const placesCloseButton = popupPlaces.querySelector('.popup__close-button');
const placeNameInput = popupPlaces.querySelector('.popup__input_type_place-name');
const placeLinkInput = popupPlaces.querySelector('.popup__input_type_place-link');
const popupZoomImages = document.querySelector('.popup_contain_image');
//const imageInPopup = popupZoomImages.querySelector('.popup__image');
//const titleInPopup = popupZoomImages.querySelector('.popup__caption');
const zoomImagesCloseButton = popupZoomImages.querySelector('.popup__close-button');
const popupOverlays = document.querySelectorAll('.popup__overlay');

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





const cardList = new Section({
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.place-template', handleCardClick )
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  '.places'
);

cardList.renderItems();

function handleEscButton(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
}

// функция открытия попапа с формой профиля
function handleProfileForm() {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
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
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}

// функция сохранения фотографии места
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const card = new Card(placeName,placeLink, '.place-template', handleCardClick);
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
  closePopup(popupPlaces);
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

// функция открытия попапа с увеличенной карточкой места
function handleCardClick(name, link) {
  openPopup(popupZoomImages);
  imageInPopup.src = link;
  titleInPopup.textContent = name;
  imageInPopup.alt = name;
}

popupOverlays.forEach((elem) => {
  elem.addEventListener('click', () => {
    closePopup(elem.closest('.popup'));
  });
})

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

editButton.addEventListener('click', handleProfileForm);
addButton.addEventListener('click', handleOpenAddForm);
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
profileForm.addEventListener('submit', handleProfileSubmit);
placeForm.addEventListener('submit', handlePlaceSubmit);
placesCloseButton.addEventListener('click', () => closePopup(popupPlaces));
zoomImagesCloseButton.addEventListener('click', () => closePopup(popupZoomImages));