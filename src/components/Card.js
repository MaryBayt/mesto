export default class Card {
  // make a new card
  constructor ({ cardName, cardLink, likes, id, userId, ownerId }, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._likes = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const newCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
    return newCard;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._zoomPhoto.src = this._cardLink;
    this._zoomPhoto.alt = this._cardName;
    this._card.querySelector('.place__name').textContent = this._cardName;
    this._likeCountElement = this._card.querySelector('.place__like-counter');
    this.setLikes(this._likes);
    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }

    return this._card;
  }

  _setEventListeners() {
    this._likeButton = this._card.querySelector('.place__button-like');
    this._deleteButton = this._card.querySelector('.place__button-delete');
    this._zoomPhoto = this._card.querySelector('.place__pic');

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
    this._zoomPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }

  // like photo
  isLiked() {
    const userHasLiked = this._likes.find(user => user._id === this._userId);
    return userHasLiked;
  }

  _likeCard() {
    this._likeButton.classList.add('place__button-like_state_active');
  }

  _unlikeCard() {
    this._likeButton.classList.remove('place__button-like_state_active');
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._likeCard();
    } else {
      this._unlikeCard();
    }
  }

  // delete card
  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
