export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_state_disabled',
  activeButtonClass: 'popup__button-save_state_active',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'error_state_active',
};

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonAvatar = document.querySelector('.profile__picture');

// old const

// // profile name and job
// const profileName = document.querySelector('.profile__person');
// const profileJob = document.querySelector('.profile__about');

// edit button

// // edit profile popup
// const popupEdit = document.querySelector('.popup_edit');
// // its buttons
// const popupCloseEditButton = document.querySelector('.popup__button-close_edit');
// // const saveEditButton = document.querySelector('.popup__button-save_edit');
// // edit form

// // edit form inputs
// const nameInput = document.querySelector('.popup__input_value_person');
// const jobInput = document.querySelector('.popup__input_value_about');

// add new card button

// // add new card popup
// const popupAddCard = document.querySelector('.popup_card');
// // its buttons
// const popupCloseAddCardButton = document.querySelector('.popup__button-close_card');
// // add form

// // add form inputs
// const placeInput = document.querySelector('.popup__input_value_name');
// const linkInput = document.querySelector('.popup__input_value_link');

// // place to insert new cards in
// const cardsContainer = document.querySelector('.places__list');
// // template for cards
// const cardTemplate = document.querySelector('#card-template').content;

// // // card
// // const card = cardTemplate.querySelector('.place');

// // zoom photo popup
// const popupZoom = document.querySelector('.popup_zoom');
// // its parts
// const zoomPhoto = document.querySelector('.popup__photo');
// const zoomName = document.querySelector('.popup__description');
// const popupClosePhoto = document.querySelector('.popup__button-close_zoom');
