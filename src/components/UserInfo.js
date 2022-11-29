export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
  }

  getUserInfo() {
    return {
      person: this._profileName.textContent,
      about: this._profileAbout.textContent
    };
  }

  setUserInfo(person, about) {
    this._profileName.textContent = person;
    this._profileAbout.textContent = about;
  }
}
