import { initialCards } from '../utils/data.js';
import { validationConfig, editButton, addCardButton } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
