import './index.css';

import { initialCards } from '../utils/data.js';
import { validationConfig, buttonEdit, buttonAddCard } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// make a new card
function makeNewCard(data) {
  console.log(data);
  const newCard = new Card({ cardName: data.name, cardLink: data.link }, '#card-template', popupZoom.open.bind(popupZoom));
  return newCard.generateCard();
};

const userInfo = new UserInfo({profileName: '.profile__person', profileAbout: '.profile__about'});

const popupZoom = new PopupWithImage('.popup_zoom');

const popupAddCard = new PopupWithForm('.popup_card', (data) => {
  console.log(data);
  photosSection.addItem(makeNewCard(data));
});
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  console.log(data);
  userInfo.setUserInfo(data.person, data.about);
});

const photosSection = new Section({
  items: initialCards,
  renderer: (item) => {
    photosSection.addItem(makeNewCard(item));
  }},
  '.places__list'
);

photosSection.renderItems();

const formEditValidator = new FormValidator(validationConfig, popupEdit.getForm());
const formAddCardValidator = new FormValidator(validationConfig, popupAddCard.getForm());

formEditValidator.enableValidation();
formAddCardValidator.enableValidation();

function handleClickEditButton() {
  popupEdit.open();
  const userInfoData = userInfo.getUserInfo();
  popupEdit.setInputValues({
    popup__input_value_person: userInfoData.person,
    popup__input_value_about: userInfoData.about
  });
  formEditValidator.disableSaveButton();
}

function handleClickAddButton() {
  popupAddCard.open();
  formAddCardValidator.disableSaveButton();
}

popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupZoom.setEventListeners();

buttonEdit.addEventListener("click", handleClickEditButton);
buttonAddCard.addEventListener("click", handleClickAddButton);