const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__button-close');

editButton.addEventListener('click', (event) => {
  popup.classList.add('popup_opened');
})

document.querySelector('.popup__container').addEventListener('click', (event) => {
  event.preventDefault();
})

popupCloseButton.addEventListener('click', (event) => {
  if(!event.defaultPrevented) {
    popup.classList.remove('popup_opened');
  }
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.getAttribute('value');
    let jobValue = jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__about');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
