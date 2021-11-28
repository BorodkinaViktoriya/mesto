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

const PlacesContainer = document.querySelector('.places')
const templateEl = document.querySelector('template')
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close-button');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_value_name');
const jobInput = popup.querySelector('.popup__input_value_job');

function render() {
  const card = initialPlaces.map((item) => {
    return getItem(item);
  });
  PlacesContainer.append(...card);
}

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const placeTitle = newItem.querySelector('.place__title');
  const placeImage = newItem.querySelector('.place__image');
  placeTitle.textContent = item.name;
  placeImage.src = item.link;
  placeImage.alt = item.name;
  return newItem;
}

render();

function openProfileForm() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfileForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeProfileForm();
}


editButton.addEventListener('click', openProfileForm);
popupClose.addEventListener('click', closeProfileForm);
formElement.addEventListener('submit', formSubmitHandler);
