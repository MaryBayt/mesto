import { initialCards } from './data.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

// all const

// profile name and job
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

// edit button
const editButton = document.querySelector('.profile__edit-button');
// edit profile popup
const popupEdit = document.querySelector('.popup_edit');
// its buttons
const popupCloseEditButton = document.querySelector('.popup__button-close_edit');
// const saveEditButton = document.querySelector('.popup__button-save_edit');
// edit form
const formEdit = document.querySelector('.popup__form_edit');
// edit form inputs
const nameInput = document.querySelector('.popup__input_value_name');
const jobInput = document.querySelector('.popup__input_value_about');

// add new card button
const addCardButton = document.querySelector('.profile__add-button');
// add new card popup
const popupAddCard = document.querySelector('.popup_card');
// its buttons
const popupCloseAddCardButton = document.querySelector('.popup__button-close_card');
// add form
const formAddCard = document.querySelector('.popup__form_card');
// add form inputs
const placeInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');

// place to insert new cards in
const cardsContainer = document.querySelector('.places__list');
// template for cards
const cardTemplate = document.querySelector('#card-template').content;

// card
const card = cardTemplate.querySelector('.place');

// zoom photo popup
const popupZoom = document.querySelector('.popup_zoom');
// its parts
const zoomPhoto = document.querySelector('.popup__photo');
const zoomName = document.querySelector('.popup__description');
const popupClosePhoto = document.querySelector('.popup__button-close_zoom');


// all classes and elements that will be used for validation
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_state_disabled',
  activeButtonClass: 'popup__button-save_state_active',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'error_state_active',
};

const addFormEditValidator = new FormValidator(validationConfig, formEdit);
const addFormAddCardValidator = new FormValidator(validationConfig, formAddCard);

addFormEditValidator.enableValidation();
addFormAddCardValidator.enableValidation();

// all functions

// open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
  document.addEventListener('click', closeOnOverlay);
};

// open edit popup
function openEditPopup(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
};

// close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
  document.removeEventListener('click', closeOnOverlay);
};

// submit edit form
function handleEditFormSubmit(event) {
    event.preventDefault(); // cancel default submit action

    // fill in with new values with textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEdit);
};

// make a new card
function makeNewCard(cardName, cardLink) {
  const newCard = new Card(cardName, cardLink, '#card-template', openPhoto);
  return newCard.generateCard();
};

// add initial cards from data.js
initialCards.forEach((cardData) => {
  const defaultCard = new Card(cardData.name, cardData.link, '#card-template', openPhoto);
  const cardElement = defaultCard.generateCard();
  cardsContainer.prepend(cardElement);
});

// submit add card form
function handleAddCardFormSubmit(event) {
    event.preventDefault(); // cancel default submit action

    // fill in with new values and add a new card
    cardsContainer.prepend(makeNewCard(placeInput.value, linkInput.value));
    formAddCard.reset();

    closePopup(popupAddCard);
    addFormAddCardValidator.disableSaveButton();

};

// open whole photo popup
function openPhoto(cardName, cardLink) {
  zoomPhoto.setAttribute('src', cardLink)
  zoomPhoto.setAttribute('alt', cardName);
  zoomName.textContent = cardName;
  openPopup(popupZoom);
};

// sprint 6
// close popup with Esc key
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// close popup with clicking on overlay
function closeOnOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
};



// all listeners

// open edit popup by clicking on edit button
editButton.addEventListener('click', () => openEditPopup(popupEdit));
// close it by clicking on close button
// NEED TO REFACTOR - see the instructions in review 1 ---------------------------------------------------
popupCloseEditButton.addEventListener('click', () => closePopup(popupEdit));
// submit edit form listener
formEdit.addEventListener('submit', handleEditFormSubmit);

// open add new card popup by clicking on add new card button
addCardButton.addEventListener('click', () => openPopup(popupAddCard));
// close it by clicking on close button
popupCloseAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// submit add new card form listener
formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// close zoom popup by clicking on close button
popupClosePhoto.addEventListener('click', () => closePopup(popupZoom));
