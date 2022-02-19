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
  confirmButton,
  validationConfig
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);
const avatarFormValidation = new FormValidator(validationConfig, avatarEditForm);

// Создаем экземпляр попапа с увеличенной картинкой
const popupWithImage = new PopupWithImage('.popup_contain_image');
popupWithImage.setEventListeners();



//С0здаем экземпляр класса профиля
const userProfile = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'}, avatarContainer);


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: '1a9c130a-42c2-4c9b-811e-578089f7924f',
    'Content-Type': 'application/json'
  }
});

const popupWithConfirmation = new PopupWithConfirmation('.popup_contain_confirmation')
popupWithConfirmation.setEventListeners();

//создаем функцию с логикой добавления карточки
function createCard(data, section, myId) {
  const card = new Card({data}, '.place-template',
    {
      handleCardClick: () => popupWithImage.open(data.name, data.link),
      handleDeleteButton: (card) => {
        popupWithConfirmation.open();
        popupWithConfirmation.setConfirmAction(() => {
          confirmButton.textContent = 'Удаление...';
          api.deleteCard(card.getCardId())
            .then(() => {
              card.removeCardElement();
              popupWithConfirmation.close();
            }).catch((err) => {
            console.log(`ошибка при удалении карточек с сервера: ${err}`)
          })
            .finally(() => {
              confirmButton.textContent = 'Да';
            })
        })
      },
      handleLikeClick: (evt) => {
        if (!evt.target.classList.contains('place__like-button_active')) {
          api.addLike(card.getCardId())
            .then((data) => {
              card.toggleLikeActive();
              card.setLikeNumber(data.likes)
            })
            .catch((err) => {
              console.log(`ошибка при лайке карточки: ${err}`);
            });
        } else {
          api.removeLike(card.getCardId())
            .then((data) => {
              card.toggleLikeActive();
              card.setLikeNumber(data.likes)
            }).catch((err) => {
            console.log(`ошибка при лайке карточки: ${err}`);
          })
        }
      }
    })
  const cardElement = card.generateCard(myId);
  return cardElement;
}

// делаем обработку после получения данных от сервераq
Promise.all([api.getUserServerData(), api.getInitialCards()]).then(([userInfo, cards]) => {

  userProfile.setAvatar(userInfo.avatar);
  userProfile.setUserInfo(userInfo.name, userInfo.about);
  const myUserId = userInfo._id;

  // отобразим на странице карточки с сервера после получения myID
  const cardList = new Section({
      renderer: (items) => {
        const itemList = items.map((item) => {
          return createCard(item, cardList, myUserId);
        });
        return itemList;
      },
    },
    '.places');

      cardList.renderItems(cards);

      // Создаем экземпляр класса попапа с формой добавления картинки
      const placeFormPopup = new PopupWithForm('.popup_contain_places', (data) => {
        placeFormPopup.renderLoading(true);
        api.addCard(data.placeName, data.placeLink)
          .then((card) => {
            const newCard = createCard(card, cardList, myUserId);
            cardList.addItem(newCard)
            placeFormPopup.close()
          })
          .catch((err) => {
            console.log(`ошибка при добавлении карточки сервер: ${err}`);
          })
          .finally(() => {
            placeFormPopup.renderLoading(false, "Создать");
          })
      });

      placeFormPopup.setEventListeners();

      function handleOpenPlaceFormPopup() {
        placeFormValidator.resetValidation();
        placeFormPopup.open()
      }

      addButton.addEventListener('click', handleOpenPlaceFormPopup);
})
  .catch((err) => {
    console.log(`ошибка при получении данных пльзователя с сервера: ${err}`);
  })

//создаем экземпляр класса попап с формой редактирования профиля
const profileFormPopup = new PopupWithForm('.popup_contain_profile', (data) => {
  profileFormPopup.renderLoading(true)
  api.editUserProfileData(data.name, data.job)
    .then((info) => {
      profileFormPopup.close()
      userProfile.setUserInfo(info.name, info.about)
    })
    .catch((err) => {
      console.log(`ошибка при изменении данных пльзователя: ${err}`);
    })
    .finally(() => {
      profileFormPopup.renderLoading(false, "Сохранить")
    })
});

profileFormPopup.setEventListeners();

//создаем экземпляр класса попап с формой редактирования аватара
const avatarFormPopup = new PopupWithForm('.popup_contain_avatar-form', (data) => {
  //avatarFormSubmitButton.textContent = 'Сохранение...'
  avatarFormPopup.renderLoading(true)
  api.editUserAvatar(data.avatarLink)
    .then((info) => {
      avatarFormPopup.close()
      userProfile.setAvatar(info.avatar)
    })
    .catch((err) => {
      console.log(`ошибка при изменении аватара пльзователя: ${err}`); // выведем ошибку в консоль
    }).finally(() => {
    //avatarFormSubmitButton.textContent = 'Сохранить'
    avatarFormPopup.renderLoading(false, "Сохранить")
  })
});

avatarFormPopup.setEventListeners();

function handleOpenAvatarFormPopup() {
  avatarFormValidation.resetValidation();
  avatarFormPopup.open()
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
avatarContainer.addEventListener('click', handleOpenAvatarFormPopup);