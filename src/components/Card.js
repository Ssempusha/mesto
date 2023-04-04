export default class Card {
    constructor({items, handleCardClick}, templateSelector) {
        this._link = items.link;
        this._name = items.name;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
       return this._templateSelector.content.querySelector('.cards-grid__item').cloneNode(true);
    }

    _toggleLike() {
        this._elementCardLike.classList.toggle('cards-grid__like_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListener() {
        this._elementCardLike.addEventListener('click', () => {
            this._toggleLike();
        });

        this._elementCardDelete.addEventListener('click', () => {
            this._deleteCard();
        });

        this._elementImageCard.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
        });
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards-grid__title').textContent = this._name;
        this._elementCardLike = this._element.querySelector('.cards-grid__like');
        this._elementCardDelete = this._element.querySelector('.cards-grid__delete');
        this._elementImageCard = this._element.querySelector('.cards-grid__image');
        this._elementImageCard.src = this._link;
        this._elementImageCard.alt = this._name;
        this._setEventListener();

        return this._element;
    }
}

