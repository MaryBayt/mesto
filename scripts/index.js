// choose popup
const popup = document.querySelector('.popup');

// choose buttons
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('.popup__button-save');

document.querySelector('.popup__container').addEventListener('click', (event) => {
  event.preventDefault();
})

// function for opening popup
function openPopup(event) {
  popup.classList.add('popup_opened');
}

// function for closing popup
function closePopup(event) {
  if(!event.defaultPrevented) {
    popup.classList.remove('popup_opened');
  }
}

// open by clicking on edit button
editButton.addEventListener('click', openPopup);

// close by clicking on close button
popupCloseButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_about');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

