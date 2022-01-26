export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
  }

  getUserInfo(nameInput, jobInput) {
    nameInput.value = this._nameProfile.textContent;
    jobInput.value = this._jobProfile.textContent;
  }

  setUserInfo(nameInput, jobInput) {
    this._nameProfile.textContent = nameInput.value;
    this._jobProfile.textContent = jobInput.value;
  }
}