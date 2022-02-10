export default class UserInfo {
  constructor({nameSelector, jobSelector}, avatarContainer) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
    this._avatarContainer = avatarContainer;
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(name, about) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = about;
  }

  setAvatar(link) {
    this._avatarContainer.style.backgroundImage = `url(${link})`
  }
}