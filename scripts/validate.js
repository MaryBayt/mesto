// sprint 6
// show error & error message
function showInputError (form, input, config) {
  const error = form.parentNode.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.classList.add(config.activeErrorClass);
  error.textContent = input.validationMessage;
  //debug
  console.log('показываю ошибку');
};

// hide error & error message
function hideInputError (form, input, config) {
  const error = form.parentNode.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.activeErrorClass);
  error.textContent = '';
  //debug
  console.log('скрываю ошибку');
};

// check if input is valid
function isValid (form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
    //debug
    console.log('показала ошибку');
  } else {
    hideInputError(form, input, config);
    //debug
    console.log('убрала ошибку');
  }
};

// check each input
function hasInvalidInput (inputList) {
  //debug
  console.log('проверю есть ли инвалид инпуты');
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

// toggle the state of the save button
function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSaveButton(buttonElement, config.activeButtonClass, config.inactiveButtonClass);
    //debug
    console.log('переключаю кнопку на неактивную');
  } else {
    enableSaveButton (buttonElement, config.inactiveButtonClass, config.activeButtonClass);
    //debug
    console.log('переключаю кнопку на активную');
  }
};

function disableSaveButton (button, activeButtonClass, inactiveButtonClass) {
  button.setAttribute('disabled', true);
  button.classList.remove(activeButtonClass);
  button.classList.add(inactiveButtonClass);
}

function enableSaveButton (button, inactiveButtonClass, activeButtonClass) {
  button.removeAttribute('disabled', true);
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
}

// main function - validate inputs and toggle the save button
function setEventListeners (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  //debug
  console.log('сделала массив инпутов');
  const buttonElement = form.querySelector(config.submitButtonSelector);
  //debug
  console.log('нашла кнопку');
  toggleButtonState(inputList, buttonElement, config);
  //debug
  console.log('выключила кнопку изначально');
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      //debug
      console.log('прогоняю по инпутам валидацию');
      toggleButtonState(inputList, buttonElement, config);
      //debug
      console.log('переключила состояние кнопки');
    });
  });
};

// initial function - prevent standard form behavior and set listeners to each input
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //debug
  console.log('сделала массив из форм');
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //debug
      console.log('отменила стандартную отправку форм');
    });
    setEventListeners(form, config);
    //debug
    console.log('повесила слушатель инпута');
  });
};

// all classes and elements that will be used
enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_state_disabled',
  activeButtonClass: 'popup__button-save_state_active',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'error_state_active',
});

//debug
console.log('я работаю');
