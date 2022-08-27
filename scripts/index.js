// choose edit profile popup
const popup = document.querySelector('.popup');

// choose its buttons
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('.popup__button-save');

// open edit profile popup
function openPopup(event) {
  popup.classList.add('popup_opened');
}

// close edit profile popup
function closePopup(event) {
    popup.classList.remove('popup_opened');
}

// open it by clicking on edit button
editButton.addEventListener('click', openPopup);

// close it by clicking on close button
popupCloseButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_about');
// Выбераем элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault(); // отменяем стандартную отправку формы

    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



// sprint 5
//initial cards

const initialCards = [
  {
    name: 'Сергиев Посад',
    link: 'https://images.unsplash.com/photo-1597090549178-6aa79b7cc9ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80'
  },
  {
    name: 'Челябинск',
    link: 'https://images.unsplash.com/photo-1589793242094-496c3f75bcea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80'
  },
  {
    name: 'Коломна',
    link: 'https://images.unsplash.com/photo-1644942180288-ae34ecd7bae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
  },
  {
    name: 'Тверь',
    link: 'https://images.unsplash.com/photo-1628173893879-99ce5cd0dbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80'
  },
  {
    name: 'Питер',
    link: 'https://images.unsplash.com/photo-1603955129944-7f2dbff89b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1578632220633-824351c0b694?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
  }
];

//all const that we need
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// like photo
function likeCard(evt) {
  evt.target.classList.toggle('place__button-like_state_active');
}

// delete card
function deleteCard(evt) {
  const oldCard = evt.target.closest('.place');
  oldCard.remove();
}

// add a new card
function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__pic').src = cardLink;
  cardElement.querySelector('.place__title').textContent = cardName;

  // like listener
  const buttonLike = cardElement.querySelector('.place__button-like');
  buttonLike.addEventListener('click', likeCard);

  // delete listener
  const buttonDelete = cardElement.querySelector('.place__button-delete');
  buttonDelete.addEventListener('click', deleteCard);

  // zoom listener
  cardElement.querySelector('.place__pic').addEventListener('click', openPhoto);

  return(cardElement);
}

// add initial cards
initialCards.forEach(function (element) {
  const defaultCard = addCard(element.name, element.link);
  cardsContainer.prepend(defaultCard);
}
)

// popup to open & add new card

// choose add new card popup
const popupAddCard = document.querySelector('.popup_card');

// choose its buttons
const addCardButton = document.querySelector('.profile__add-button');
const popupCloseCardButton = popupAddCard.querySelector('.popup__button-close');
const saveCardButton = popupAddCard.querySelector('.popup__button-save');

// open add new card popup
function openAddCardPopup(event) {
  popupAddCard.classList.add('popup_opened');
}

// close add new card popup
function closeAddCardPopup(event) {
    popupAddCard.classList.remove('popup_opened');
}

// open it by clicking on add new card button
addCardButton.addEventListener('click', openAddCardPopup);

// close it by clicking on close button
popupCloseCardButton.addEventListener('click', closeAddCardPopup);

// Находим форму в DOM
let formAddCard = document.querySelector('.popup__form_card');
// Находим поля формы в DOM
let placeInput = document.querySelector('.popup__input_value_place');
let linkInput = document.querySelector('.popup__input_value_link');
// // Выбераем элементы, куда должны быть вставлены значения полей
// let placeTitle = document.querySelector('.place__title');
// let placeLink = document.querySelector('.place__pic');
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function addCardFormSubmitHandler (event) {
    event.preventDefault(); // отменяем стандартную отправку формы

    // Вставляем новые значения и добавляем новую карточку
    cardsContainer.prepend(addCard(placeInput.value, linkInput.value));
    formAddCard.reset();

    closeAddCardPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', addCardFormSubmitHandler);


// open whole photo popup
// choose whole photo popup
const popupZoom = document.querySelector('.popup_zoom');

const zoomPhoto = document.querySelector('.popup__photo');
const zoomName = document.querySelector('.popup__description');
const popupClosePhoto = popupZoom.querySelector('.popup__button-close');

// open whole photo popup
function openPhoto(evt) {
  popupZoom.classList.add('popup_opened');
  zoomPhoto.src = evt.target.closest('.place__pic').src;
  zoomName.textContent = evt.target.parentElement.querySelector('.place__title').textContent;
}

// close whole photo popup
function closePhoto(evt) {
    popupZoom.classList.remove('popup_opened');
}

// close it by clicking on close button
popupClosePhoto.addEventListener('click', closePhoto);
