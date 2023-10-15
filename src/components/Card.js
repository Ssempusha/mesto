export default class Card {
    constructor({items, handleCardClick}, templateSelector, userId, handleLikeCard, handleDeleteCard) {
        this._link = items.link;
        this._name = items.name;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        this._userId = userId;
        this._cardId = items._id;
        this._ownerId = items.owner._id;
        this._handleLikeCard = handleLikeCard;
        this._likes = items.likes;
        this._handleDeleteCard = handleDeleteCard;
    }

    _getTemplate() {
       return this._templateSelector.content.querySelector('.cards-grid__item').cloneNode(true);
    }

    _toggleLike() {
        this._elementCardLike.classList.toggle('cards-grid__like_active');
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    getCardId = () => {
        return this._cardId;
    }; 

    _deleteCardClick = () => {
        this._handleDeleteCard(this);
    };

    _updateLike = () => {
        this._handleLikeCard(this, this._likes, this._userId, (likes) => {
          this._toggleLike();
          this._likes = likes;
          this._likeNumber.textContent = this._likes.length;
        });
      };

    _setEventListener() {
        this._elementCardLike.addEventListener('click', () => {
            this._updateLike();
        });

        this._elementCardDelete.addEventListener('click', () => {
            this._deleteCardClick();
        });

        this._elementImageCard.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
        });
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards-grid__title').textContent = this._name;
        this._elementCardDelete = this._element.querySelector('.cards-grid__delete');
        this._elementImageCard = this._element.querySelector('.cards-grid__image');
        this._elementImageCard.src = this._link;
        this._elementImageCard.alt = this._name;
        this._elementCardLike = this._element.querySelector('.cards-grid__like');
        this._likeNumber = this._element.querySelector(".cards-grid__like-number");
        this._likeNumber.textContent = this._likes.length;
        this._setEventListener();

        if (this._likes.some((user) => user._id === this._userId)) {
            this._elementCardLike.classList.add("cards-grid__like_active");
        }

        if (this._ownerId !== this._userId) {
            this._elementCardDelete.remove();
        }

          return this._element;
        }
    }