import { initialCards } from '../utils/data.js';
import { validationConfig, editButton, addCardButton } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// // all functions

// // open popup
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeOnEsc);
//   document.addEventListener('click', closeOnOverlay);
// };

// // open edit popup
// function openEditPopup(popup) {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup(popup);
// };

// // close popup
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeOnEsc);
//   document.removeEventListener('click', closeOnOverlay);
// };

// // submit edit form
// function handleEditFormSubmit(event) {
//     event.preventDefault(); // cancel default submit action

//     // fill in with new values with textContent
//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;

//     closePopup(popupEdit);
// };

// make a new card
function makeNewCard(data) {
  console.log(data);
  const newCard = new Card({ cardName: data.popup__input_value_place, cardLink: data.popup__input_value_link }, '#card-template', popupZoom.open.bind(popupZoom));
  return newCard.generateCard();
};

const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupZoom = new PopupWithImage('.popup_zoom');

const popupAddCard = new PopupWithForm('.popup_card', (data) => {
  console.log(data);
  photosSection.addItem(makeNewCard(data));
});
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  console.log(data);
  userInfo.setUserInfo(data.popup__input_value_name, data.popup__input_value_about
    );
});

const photosSection = new Section({
  items: initialCards,
  renderer: (item) => {
    photosSection.addItem(makeNewCard(item));
  }},
  '.places__list'
);

photosSection.renderItems();

const addFormEditValidator = new FormValidator(validationConfig, popupEdit.getForm());
const addFormAddCardValidator = new FormValidator(validationConfig, popupAddCard.getForm());

addFormEditValidator.enableValidation();
addFormAddCardValidator.enableValidation();

function handleClickEditButton() {
  popupEdit.open();
  const userInfoData = userInfo.getUserInfo();
  popupEdit.setInputValues({
    popup__input_value_name: userInfoData.name,
    popup__input_value_about: userInfoData.about
  });
  addFormEditValidator.enableValidation();
}

function handleClickAddButton() {
  popupAddCard.open();
  addFormAddCardValidator.enableValidation();
}

popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupZoom.setEventListeners();

editButton.addEventListener("click", handleClickEditButton);
addCardButton.addEventListener("click", handleClickAddButton);

// // add initial cards from data.js
// initialCards.forEach((cardData) => {
//   const defaultCard = makeNewCard(cardData.name, cardData.link);
//   cardsContainer.prepend(defaultCard);
// });

// // submit add card form
// function handleAddCardFormSubmit(event) {
//     event.preventDefault(); // cancel default submit action

//     // fill in with new values and add a new card
//     cardsContainer.prepend(makeNewCard(placeInput.value, linkInput.value));
//     formAddCard.reset();

//     closePopup(popupAddCard);
//     addFormAddCardValidator.disableSaveButton();

// };

// // open whole photo popup
// function openPhoto(cardName, cardLink) {
//   zoomPhoto.setAttribute('src', cardLink)
//   zoomPhoto.setAttribute('alt', cardName);
//   zoomName.textContent = cardName;
//   openPopup(popupZoom);
// };

// // sprint 6
// // close popup with Esc key
// function closeOnEsc(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// };

// // close popup with clicking on overlay
// function closeOnOverlay(evt) {
//   const popup = document.querySelector('.popup_opened');
//   if (evt.target === popup) {
//     closePopup(popup);
//   }
// };

// validation


// // all listeners
// open edit popup by clicking on edit button
// // close it by clicking on close button
// popupCloseEditButton.addEventListener('click', () => closePopup(popupEdit));
// // submit edit form listener

// // open add new card popup by clicking on add new card button
// // close it by clicking on close button
// popupCloseAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// // submit add new card form listener
// formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// // close zoom popup by clicking on close button
// popupClosePhoto.addEventListener('click', () => closePopup(popupZoom));
