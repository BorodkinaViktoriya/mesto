import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  initialPlaces,
  addButton,
  profileForm,
  nameInput,
  jobInput,
  editButton,
  placeForm,
  validationConfig
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);

// Создаем экземпляр попапа с увеличенной картинкой
const popupWithImage = new PopupWithImage('.popup_contain_image');
popupWithImage.setEventListeners();

//создаем функцию с описанием логики добавления карточки
function creatingCardElement(name, link, section) {
  const card = new Card(name, link, '.place-template', () => popupWithImage.open(name, link));
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

// Создаем экземпляр секции для добавления карточек
const cardList = new Section({
    items: initialPlaces,
    renderer: (item) => {
      creatingCardElement(item.name, item.link, cardList);
    },
  },
  '.places'
);

cardList.renderItems();

//Сщздаем экземпляр класса профиля
const userProfile = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

// Создаем экземпляр класса попапа с формой добавления картинки
const placeFormPopup = new PopupWithForm('.popup_contain_places', (data) => {
  creatingCardElement(data.placeName, data.placeLink, cardList);
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