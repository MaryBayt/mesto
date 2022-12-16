export default class UserInfo {
  constructor({profileName, profileAbout, avatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._avatar = document.querySelector(avatar);
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

  setAvatar(link) {
    console.log(this._avatar);
    this._avatar.src = link;
  }

}
