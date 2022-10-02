export default class FormValidator {
  // sprint 6
  // show error & error message
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._activeErrorClass = config.activeErrorClass;
    this._formSelector = config.formSelector;
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError (input) {
    const error = this._form.parentNode.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._activeErrorClass);
    error.textContent = input.validationMessage;
    //debug
    console.log('показываю ошибку');
  };

  // hide error & error message
  _hideInputError (input) {
    const error = this._form.parentNode.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._activeErrorClass);
    error.textContent = '';
    //debug
    console.log('скрываю ошибку');
  };

  // check if input is valid
  _isValid (input) {
    if (!input.validity.valid) {
      this._showInputError(input);
      //debug
      console.log('показала ошибку');
    } else {
      this._hideInputError(input);
      //debug
      console.log('убрала ошибку');
    }
  };

  // check each input
  _hasInvalidInput () {
    //debug
    console.log('проверю есть ли инвалид инпуты');
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };

  // toggle the state of the save button
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableSaveButton();
      //debug
      console.log('переключаю кнопку на неактивную');
    } else {
      this._enableSaveButton();
      //debug
      console.log('переключаю кнопку на активную');
    }
  };

  disableSaveButton () {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.remove(this._activeButtonClass);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableSaveButton () {
    this._submitButton.removeAttribute('disabled', true);
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.classList.add(this._activeButtonClass);
  }

  // main function - validate inputs and toggle the save button
  _setEventListeners () {
    this._toggleButtonState();
    //debug
    console.log('выключила кнопку изначально');
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        //debug
        console.log('прогоняю по инпутам валидацию');
        this._toggleButtonState();
        //debug
        console.log('переключила состояние кнопки');
      });
    });
  };

  // initial function - prevent standard form behavior and set listeners to each input
  enableValidation () {
    this._formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        //debug
        console.log('отменила стандартную отправку форм');
      });
      this._setEventListeners();
      //debug
      console.log('повесила слушатель инпута');
    });
  };
}
