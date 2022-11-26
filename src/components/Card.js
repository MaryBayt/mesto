export default class Card {
  // make a new card
  constructor ({ cardName, cardLink }, templateSelector, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    return this._card;
  }

  _setEventListeners() {
    this._likeButton = this._card.querySelector('.place__button-like');
    this._deleteButton = this._card.querySelector('.place__button-delete');
    this._zoomPhoto = this._card.querySelector('.place__pic');

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._zoomPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardLink);
    });
  }

  // like photo
  _likeCard() {
    this._likeButton.classList.toggle('place__button-like_state_active');
  }

  // delete card
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
