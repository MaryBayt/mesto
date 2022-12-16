import './index.css';

// import { initialCards } from '../utils/data.js';
import { validationConfig, buttonEdit, buttonAddCard, buttonAvatar } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId;

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
    userId = res._id;
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach((data) => {
      photosSection.addItem(makeNewCard(data));
    })
  })

// make a new card
function makeNewCard(data) {
  const newCard = new Card(
    { 
      cardName: data.name, 
      cardLink: data.link, 
      likes: data.likes, 
      id: data._id, 
      userId: userId, 
      ownerId: data.owner._id 
    }, 
    '#card-template', 
    popupZoom.open.bind(popupZoom),
    (_id) => {
      // console.log('clicked button!');
      console.log("It's me: " + _id);
      popupDelete.open();
      popupDelete.changeSubmitCallback(() => {
        api.deleteCard(_id)
          .then(res => {
            newCard.deleteCard()
          })
      });
    },
    (id) => {
      if(newCard.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            console.log(res);
            newCard.setLikes(res.likes)
          })
      } else {
        api.addLike(id)
          .then(res => {
            console.log(res);
            newCard.setLikes(res.likes)
          })
      } 
    }
  );
  return newCard.generateCard();
};

const userInfo = new UserInfo({profileName: '.profile__person', profileAbout: '.profile__about', avatar: '.profile__avatar'});

const popupZoom = new PopupWithImage('.popup_zoom');

const popupAvatar = new PopupWithForm('.popup_avatar', (data) => {
  api.editAvatar(data.avatar)
    .then(() => {
      console.log(data.avatar);
      userInfo.setAvatar(data.avatar);
    })
})

const popupAddCard = new PopupWithForm('.popup_card', (data) => {
  api.addCard(data.name, data.link, data.likes, data._id, userId, data.ownerId)
    .then((data) => {
      photosSection.addItem(makeNewCard(data));
    })
});

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  api.editProfile(data.person, data.about)
    .then(() => {
      userInfo.setUserInfo(data.person, data.about);
    })
});

const popupDelete = new PopupWithForm('.popup_delete', () => {
  // console.log('DELETE ME!!!');
  api.deleteCard(id)
    .then(res => {
      console.log('res', res);
    })
})

const photosSection = new Section({
  items: [],
  renderer: (item) => {
    photosSection.addItem(makeNewCard(item));
  }},
  '.places__list'
);

photosSection.renderItems();

const formEditValidator = new FormValidator(validationConfig, popupEdit.getForm());
const formAddCardValidator = new FormValidator(validationConfig, popupAddCard.getForm());
const formAvatarValidator = new FormValidator(validationConfig, popupAvatar.getForm());

formEditValidator.enableValidation();
formAddCardValidator.enableValidation();
formAvatarValidator.enableValidation();

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

function handleClickAvatar() {
  popupAvatar.open();
  formAvatarValidator.disableSaveButton();
}

popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupZoom.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

buttonEdit.addEventListener("click", handleClickEditButton);
buttonAddCard.addEventListener("click", handleClickAddButton);
buttonAvatar.addEventListener("click", handleClickAvatar);