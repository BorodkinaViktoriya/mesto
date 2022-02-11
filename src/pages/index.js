import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import {
  addButton,
  profileForm,
  nameInput,
  jobInput,
  editButton,
  placeForm,
  avatarEditForm,
  avatarContainer,
  avatarFormSubmitButton,
  placeFormSubmitButton,
  profileFormSubmitButton,
  validationConfig
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);
const avatarFormValidation = new FormValidator(validationConfig, avatarEditForm);

// Создаем экземпляр попапа с увеличенной картинкой
const popupWithImage = new PopupWithImage('.popup_contain_image');
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation('.popup_contain_confirmation')
popupWithConfirmation.setEventListeners();

//создаем функцию с описанием логики добавления карточки
function creatingCardElement(data, section) {
  const card = new Card({data}, '.place-template',
    () => popupWithImage.open(data.name, data.link),
    () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setConfirmAction(() => {

        api.deleteCard(card.getCardId())
          .then(() => {
            card.removeCardElement();
            popupWithConfirmation.close()
          }).catch((err) => {
          console.log(`ошибка при удалении карточек с сервера: ${err}`)
        })

      })

    })

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

const cardList = new Section({
    renderer: (item) => {
      creatingCardElement(item, cardList);
    },
  },
  '.places');

// отобразим на странице карточки с сервера
api.getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`ошибка при загрузке карточек с сервера: ${err}`);
  });

//Сщздаем экземпляр класса профиля
const userProfile = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'}, avatarContainer);

//Получаем и отображаем данные пользователя с сервера
api.getUserServerData()
  .then((userInfo) => {
    userProfile.setAvatar(userInfo.avatar);
    userProfile.setUserInfo(userInfo.name, userInfo.about);
    const myUserId = userInfo._id;
    console.log(userInfo)
    console.log(userInfo._id)
    console.log(myUserId)
    return myUserId;
  })
  .catch((err) => {
    console.log(`ошибка при получении данных пльзователя с сервера: ${err}`);
  });

console.log('теперь айди доступно снаружи', myUserId)

// Создаем экземпляр класса попапа с формой добавления картинки
const placeFormPopup = new PopupWithForm('.popup_contain_places', (data) => {
  placeFormSubmitButton.textContent = 'Сохранение...'
  api.addCard(data.placeName, data.placeLink)
    .then((card) => {
      creatingCardElement(card, cardList);
    })
    .catch((err) => {
      console.log(`ошибка при добавлении карточки сервер: ${err}`);
    })
    .finally(() => {
      placeFormSubmitButton.textContent = 'Создать'
    })
});

placeFormPopup.setEventListeners();

//Функция для изменения кнопки Сохранить при загрузке данныч
function renderLoading(button, text) {
  button.textContent = text;
}

//создаем экземпляр класса попап с формой редактирования профиля
const profileFormPopup = new PopupWithForm('.popup_contain_profile', (data) => {
  profileFormSubmitButton.textContent = 'Сохранение...'
  api.editUserProfileData(data.name, data.job)
    .then((info) => {
      userProfile.setUserInfo(info.name, info.about)
    })
    .catch((err) => {
      console.log(`ошибка при изменении данных пльзователя: ${err}`);
    })
    .finally(() => {
      profileFormSubmitButton.textContent = 'Сохранить'
    })
});

profileFormPopup.setEventListeners();

//создаем экземпляр класса попап с формой редактирования аватара
const avatarFormPopup = new PopupWithForm('.popup_contain_avatar-form', (data) => {
  renderLoading(avatarFormSubmitButton, 'Сохранение...')
  api.editUserAvatar(data.avatarLink)
    .then((info) => {
      userProfile.setAvatar(info.avatar)
    })
    .catch((err) => {
      console.log(`ошибка при изменении аватара пльзователя: ${err}`); // выведем ошибку в консоль
    }).finally(() => {
    renderLoading(avatarFormSubmitButton, 'Сохранить')
  })
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
avatarContainer.addEventListener('click', handleOpenAvatarFormPopup);