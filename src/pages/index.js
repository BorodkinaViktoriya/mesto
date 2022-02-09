import './index.css';

import Card from '../components/Card.js';

import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '1a9c130a-42c2-4c9b-811e-578089f7924f',
  });

/*
// Создаем экземпляр секции для добавления карточек
const cardList = new Section({
    items,
    renderer: (item) => {
      creatingCardElement(item.name, item.link, cardList);
    },
  },
  '.places'
);
*/

api.getInitialCards()
  .then((cards) => {
    console.log(cards)

    const cardList = new Section({
        items: cards,
        renderer: (item) => {
          creatingCardElement(item.name, item.link, cardList);
          console.log(item.name)
          console.log(item.link)
          },
      },
      '.places' );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });



//cardList.renderItems();

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

/*fetch('https://nomoreparties.co/v1/cohort-35/users/me', {
  headers: {
    authorization: '1a9c130a-42c2-4c9b-811e-578089f7924f'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });*/