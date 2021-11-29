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
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let profileForm = popupProfile.querySelector('[name="profileForm"]');
const nameInput = popupProfile.querySelector('.popup__input_value_name');
const jobInput = popupProfile.querySelector('.popup__input_value_job');
const addButton = document.querySelector('.lead__add-button');
const popupPlaces = document.querySelector('.popup_contain_places');
const placeForm = popupPlaces.querySelector('[name="placeForm"]');
const placesCloseButton = popupPlaces.querySelector('.popup__close-button');
const placeNameInput = popupPlaces.querySelector('.popup__input_value_place-name');
const placeLinkInput = popupPlaces.querySelector('.popup__input_value_place-link');

function render() {
  const places = initialPlaces.map((item) => {
    return getItem(item);
  });
  placesContainer.append(...places);
}

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const placeTitle = newItem.querySelector('.place__title');
  const placeImage = newItem.querySelector('.place__image');
  placeTitle.textContent = item.name;
  placeImage.src = item.link;
  placeImage.alt = item.name;
  const removeButton = newItem.querySelector('.place__remove-button');
  removeButton.addEventListener( 'click', handleDelete);
  const likeButton = newItem.querySelector('.place__like-button');
  likeButton.addEventListener( 'click', handleLike);
    return newItem;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileForm() {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}


function ProfileSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}


function placeSubmitHandler(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;
  if (placeNameInput.value ==="" && placeLinkInput.value ==="") {
    closePopup(popupPlaces);
  } else {
    const placeItem = getItem({name: placeName, link: placeLink});
    placesContainer.prepend(placeItem);
    closePopup(popupPlaces);
    placeNameInput.value = '';
    placeLinkInput.value = '';
  }
}

function handleDelete(event) {
  const targetEl = event.target;
  const deletedEL = targetEl.closest('.place');
  deletedEL.remove();
}

function handleLike(event) {
  const targetLike = event.target;
  targetLike.classList.toggle('place__like-button_active');
}




editButton.addEventListener('click', handleProfileForm);
addButton.addEventListener('click',()=>openPopup(popupPlaces));
popupProfileClose.addEventListener('click',()=>closePopup(popupProfile));
profileForm.addEventListener('submit', ProfileSubmitHandler);
placeForm.addEventListener('submit', placeSubmitHandler);
placesCloseButton.addEventListener('click',()=>closePopup(popupPlaces));
render();