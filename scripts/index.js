const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupClose = popup.querySelector(".popup__close-button");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
let formElement = document.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_value_name");
const jobInput = popup.querySelector(".popup__input_value_job");

function openProfileForm() {
  popup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfileForm() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeProfileForm();
}

editButton.addEventListener("click", openProfileForm);
popupClose.addEventListener("click", closeProfileForm);
formElement.addEventListener("submit", formSubmitHandler);
