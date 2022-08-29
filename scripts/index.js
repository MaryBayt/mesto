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
// const saveCardButton = document.querySelector('.popup__button-save_card');
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



// all functions

// open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// open edit popup
function openEditPopup(popup) {
  nameInput.textContent = profileName.textContent;
  jobInput.textContent = profileJob.textContent;
  openPopup(popup);
}

// close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// submit edit form
function handleEditFormSubmit (event) {
    event.preventDefault(); // cancel default submit action

    // fill in with new values with textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

// sprint 5
// like photo
function likeCard(evt) {
  evt.target.classList.toggle('place__button-like_state_active');
}

// delete card
function deleteCard(evt) {
  const oldCard = evt.target.closest('.place');
  oldCard.remove();
}

// make a new card
function makeNewCard(cardName, cardLink) {
  const newCard = card.cloneNode(true);
  const newCardPicture = newCard.querySelector('.place__pic');
  newCardPicture.src = cardLink;
  newCardPicture.alt = cardName;
  newCard.querySelector('.place__name').textContent = cardName;
  // like listener
  const buttonLike = newCard.querySelector('.place__button-like');
  buttonLike.addEventListener('click', likeCard);
  // delete card listener
  const buttonDelete = newCard.querySelector('.place__button-delete');
  buttonDelete.addEventListener('click', deleteCard);
  // zoom in card listener
  newCardPicture.addEventListener('click', openPhoto);
  return newCard;
}

// add initial cards from cards.js
initialCards.forEach(function (cardData) {
  const defaultCard = makeNewCard(cardData.name, cardData.link);
  cardsContainer.prepend(defaultCard);
}
)

// submit add card form
function handleAddCardFormSubmit (event) {
    event.preventDefault(); // cancel default submit action

    // fill in with new values and add a new card
    cardsContainer.prepend(makeNewCard(placeInput.value, linkInput.value));
    formAddCard.reset();

    closePopup(popupAddCard);
}

// open whole photo popup
function openPhoto(evt) {
  zoomPhoto.src = evt.target.closest('.place__pic').src;
  zoomPhoto.alt = evt.target.closest('.place__pic').alt;
  zoomName.textContent = evt.target.parentElement.querySelector('.place__name').textContent;
  openPopup(popupZoom);
}




// all listeners

// open edit popup by clicking on edit button
editButton.addEventListener('click', () => openEditPopup(popupEdit));
// close it by clicking on close button
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
