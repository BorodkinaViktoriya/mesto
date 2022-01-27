import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
const profileForm = document.querySelector('[name="profileForm"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const addButton = document.querySelector('.lead__add-button');
const placeForm = document.querySelector('[name="placeForm"]');

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


// Создаем экземпляр секции для добавления карточек
const cardList = new Section({
    items: initialPlaces,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.place-template', () => popupWithImage.open(item.name, item.link))
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  '.places'
);

cardList.renderItems();

//Сщздаем экземпляр класса профиля
const userProfile = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

// Создаем экземпляр класса попапа с формой добавления картинки
const placeFormPopup = new PopupWithForm('.popup_contain_places', (data) => {
  const name = data.placeName;
  const link = data.placeLink;
  const card = new Card(name, link, '.place-template', () => popupWithImage.open(name, link));
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
});

placeFormPopup.setEventListeners();

//создаем экземпляр класса попап с формой редактирования профиля
const profileFormPopup = new PopupWithForm('.popup_contain_profile', (data) => {
  userProfile.setUserInfo(data.name, data.job);
});

profileFormPopup.setEventListeners();


function handleOpenPlaceFormPopup() {
  placeFormValidator.resetValidation();
  placeFormPopup.open()
}

function handleOpenProfileFormPopup() {

  const profile = userProfile.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
  profileFormValidator.resetValidation();
  profileFormPopup.open()
}

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

editButton.addEventListener('click', handleOpenProfileFormPopup);
addButton.addEventListener('click', handleOpenPlaceFormPopup);