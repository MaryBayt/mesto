import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    // this._formValues = {};
  }

  _getInputValues() {
    // this._formValues = {};
    return this._inputs.reduce((values, input) => {
      values[input.name] = input.value;
      return values;
      }, {});
    // this._inputs.forEach((input) => {
    //   this._formValues[input.name] = input.value;
    // });
    // return this._formValues;
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
    this._form.reset();
    super.close();
  }
}
