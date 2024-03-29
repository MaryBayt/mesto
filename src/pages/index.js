import './index.css';

// import { initialCards } from '../utils/data.js';
import { validationConfig, buttonEdit, buttonAddCard, buttonAvatar } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId;

Promise.all([
    api.getProfile(),
    api.getInitialCards()
])
.then(([userData, cardList])=>{
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setAvatar(userData.avatar);
  userId = userData._id;
  const cardsReversed = cardList.reverse();
  photosSection.renderItems(cardsReversed);
})
.catch((err)=>{
    console.log(err);
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
      popupDelete.open({_id, callback: newCard.deleteCard.bind(newCard)});
    },
    (id) => {
      if(newCard.isLiked()) {
        api.deleteLike(id)
          .then((res) => {
            console.log(res);
            newCard.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка.....: ${err}`))
      } else {
        api.addLike(id)
          .then((res) => {
            console.log(res);
            newCard.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка.....: ${err}`))
      } 
    }
  );
  return newCard.generateCard();
};

const userInfo = new UserInfo({profileName: '.profile__person', profileAbout: '.profile__about', avatar: '.profile__avatar'});

const popupZoom = new PopupWithImage('.popup_zoom');

const popupAvatar = new PopupWithForm('.popup_avatar', (data) => {
  popupAvatar.changeLoadingText(true);
  api.editAvatar(data.avatar)
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => popupAvatar.changeLoadingText(false));
});

const popupAddCard = new PopupWithForm('.popup_card', (data) => {
  popupAddCard.changeLoadingText(true);
  api.addCard(data.name, data.link)
    .then((data) => {
      photosSection.addItem(makeNewCard(data));
      popupAddCard.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => popupAddCard.changeLoadingText(false));
});

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  popupEdit.changeLoadingText(true);
  api.editProfile(data.person, data.about)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => popupEdit.changeLoadingText(false));
});

const popupDelete = new PopupWithConfirmation('.popup_delete', ({ _id, callback }) => {
  api.deleteCard(_id)
    .then(() => {
      callback();
      popupDelete.close();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  }
);

const photosSection = new Section((item) => {
    photosSection.addItem(makeNewCard(item));
  },
  '.places__list'
);

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
};

function handleClickAddButton() {
  popupAddCard.open();
  formAddCardValidator.disableSaveButton();
};

function handleClickAvatar() {
  popupAvatar.open();
  formAvatarValidator.disableSaveButton();
};

popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupZoom.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();

buttonEdit.addEventListener("click", handleClickEditButton);
buttonAddCard.addEventListener("click", handleClickAddButton);
buttonAvatar.addEventListener("click", handleClickAvatar);