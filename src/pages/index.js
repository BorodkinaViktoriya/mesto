import './index.css';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {
  addButton,
  profileForm,
  nameInput,
  jobInput,
  editButton,
  placeForm,
  avatarEditForm,
  avatarContainer,
  validationConfig
} from "../utils/constants.js";



const profileFormValidator = new FormValidator(validationConfig, profileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);
const avatarFormValidation = new FormValidator(validationConfig, avatarEditForm);

// Создаем экземпляр попапа с увеличенной картинкой
const popupWithImage = new PopupWithImage('.popup_contain_image');
popupWithImage.setEventListeners();

//создаем функцию с описанием логики добавления карточки
function creatingCardElement(name, link, section) {
  const card = new Card(name, link, '.place-template', () => popupWithImage.open(name, link));
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '1a9c130a-42c2-4c9b-811e-578089f7924f',
    'Content-Type': 'application/json'
  }
});

// отобразим на странице карточки с сервера
api.getInitialCards()
  .then((cards) => {
    const cardList = new Section({
        items: cards,
        renderer: (item) => {
          creatingCardElement(item.name, item.link, cardList);
          },
      },
      '.places' );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Сщздаем экземпляр класса профиля
const userProfile = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'},  avatarContainer);

api.getUserServerData()
  .then((userInfo) => {
    userProfile.setAvatar(userInfo.avatar);
    userProfile.setUserInfo(userInfo.name, userInfo.about)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//

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

//создаем экземпляр класса попап с формой редактирования аватара

const avatarFormPopup = new PopupWithForm('.popup_contain_avatar-form', (data) => {
//закрыть попап, поменять аватар  == позже будет отправить запрос на сервер и поменять там аватар

  userProfile.setAvatar(data.avatarLink)
  avatarFormPopup.close()
  console.log(nameInput.value)
});

avatarFormPopup.setEventListeners();

function handleOpenAvatarFormPopup() {
  avatarFormValidation.resetValidation();
  avatarFormPopup.open()
}


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
avatarFormValidation.enableValidation();

editButton.addEventListener('click', handleOpenProfileFormPopup);
addButton.addEventListener('click', handleOpenPlaceFormPopup);
avatarContainer.addEventListener('click', handleOpenAvatarFormPopup)