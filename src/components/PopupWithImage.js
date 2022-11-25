import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomPhoto = this._popup.querySelector('.popup__photo');
    this._zoomDescription = this._popup.querySelector('.popup__description');
  }

  open(cardName, cardLink) {
    super.open();
    this._zoomPhoto.setAttribute('src', cardLink);
    this._zoomPhoto.setAttribute('alt', cardName);
    this._zoomDescription.textContent = cardName;
  }
}
