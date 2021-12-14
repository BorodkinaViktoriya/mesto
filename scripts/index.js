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

const placesContainer = document.querySelector('.places')
const templateEl = document.querySelector('template')
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
const imageInPopup = popupZoomImages.querySelector('.popup__image');
const titleInPopup = popupZoomImages.querySelector('.popup__caption');
const zoomImagesCloseButton = popupZoomImages.querySelector('.popup__close-button');
const popupOverlays = document.querySelectorAll('.popup__overlay');


// функция создания карточки
function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const placeTitle = newItem.querySelector('.place__title');
  const placeImage = newItem.querySelector('.place__image');
  const removeButton = newItem.querySelector('.place__remove-button');

  placeTitle.textContent = item.name;
  placeImage.src = item.link;
  placeImage.alt = item.name;

  return newItem;
}

// функция добавления 6 катрочек 'Из коробки'
function render() {
  const places = initialPlaces.map((item) => {
    return getItem(item);
  });
  placesContainer.append(...places);
}

function handleEscButton(evt){
  if(evt.keyCode == 27) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener ('keydown', handleEscButton);
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
}

// функция сщхранения профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}

// функция сохранения фотографии места
function handleplaceSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  const placeItem = getItem({name: placeName, link: placeLink});
  placesContainer.prepend(placeItem);
  closePopup(popupPlaces);
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

function handleZoom(evt) {
  if(evt.target.classList.contains('place__image')) {
    openPopup(popupZoomImages)

    const targetImage = evt.target;
    const placeWithImage = targetImage.closest('.place');
    const captionInPlace = placeWithImage.querySelector('.place__title');

    imageInPopup.src = targetImage.src;
    titleInPopup.textContent = captionInPlace.textContent;
    imageInPopup.alt = targetImage.alt;
  }
}

function handleDelete(evt) {
  if (evt.target.classList.contains('place__remove-button')) {
    const deletedEL = evt.target.closest('.place');
    deletedEL.remove();
  }
}
//функция лайка карточки
function handleLike(evt) {
  if (evt.target.classList.contains('place__like-button')) {
    evt.target.classList.toggle('place__like-button_active');
  }
}

popupOverlays.forEach((elem) => {
  elem.addEventListener('click', () => {
    closePopup(elem.closest('.popup'));
  });
})

editButton.addEventListener('click', handleProfileForm);
addButton.addEventListener('click', () => openPopup(popupPlaces));
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));
profileForm.addEventListener('submit', handleProfileSubmit);
placeForm.addEventListener('submit', handleplaceSubmit);
placesCloseButton.addEventListener('click', () => closePopup(popupPlaces));
zoomImagesCloseButton.addEventListener('click', () => closePopup(popupZoomImages));
placesContainer.addEventListener('click', handleLike);
placesContainer.addEventListener('click', handleDelete);
placesContainer.addEventListener('click', handleZoom);

render();