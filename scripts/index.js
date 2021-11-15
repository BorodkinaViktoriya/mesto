const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupClose = popup.querySelector(".popup__close-button");
let nameProfile = document.querySelector(".profile__name");
let jobProfile = document.querySelector(".profile__job");
let formElement = document.querySelector(".popup__container");
const nameInput = popup.querySelector(".popup__input_value_name");
const jobInput = popup.querySelector(".popup__input_value_job");

function open() {
  popup.classList.add("popup_opened");
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
}

function close() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", open);
popupClose.addEventListener("click", close);
formElement.addEventListener("submit", formSubmitHandler);
