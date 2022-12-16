import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
  }

  _getInputValues() {
    return this._inputs.reduce((values, input) => {
      values[input.id] = input.value;
      return values;
      }, {});
  }

  changeSubmitCallback(newSubmitCallback) {
    this._submitCallback = newSubmitCallback;
  }

  setInputValues(values) {
    this._inputs.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
