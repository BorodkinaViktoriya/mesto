export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameProfile = document.querySelector(nameSelector);
    this._jobProfile = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      job: this._jobProfile.textContent
    }
  }

  setUserInfo(name, job) {
    this._nameProfile.textContent = name;
    this._jobProfile.textContent = job;
  }
}