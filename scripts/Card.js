export { Card, initialCards };

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

class Card {
    constructor(link, name, templateSelector, openPopupImage) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
        this._openPopupImage = openPopupImage;
    }

    _getTemplate() {
       return this._templateSelector.content.cloneNode(true);
    }

    _toggleLike() {
        this._elementCardLike.classList.toggle('cards-grid__like_active');
    }

    _deleteCard() {
        this._elementCardDelete.closest('.cards-grid__item').remove();
    }

    _setEventListener() {
        this._elementCardLike.addEventListener('click', () => {
            this._toggleLike();
        });

        this._elementCardDelete.addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.cards-grid__image').addEventListener('click', () => {
            this._openPopupImage();
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

