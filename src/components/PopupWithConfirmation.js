import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
    }

    close() {
      super.close();
    }

    open(data) {
      super.open();
      this._data = data;
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._data);
      });
    }
}