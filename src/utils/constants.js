export const profileOpenButton = document.querySelector('.profile__edit-button');
export const popupProfileSelector = '.popup';

export const profileForm = document.forms.poputEdit;

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__occupation');

//вызываем из html пустой список
export const cardList = document.querySelector('.cards-grid');
//вызываем из html форму для сохранения юзером новой уникальной карточки
export const formNewCard = document.forms.poputAdd;
//вызываем из html template блок
export const templateCard = document.querySelector('.template-card');

export const popupOpenImageSelector = '.popup_open-image';

export const openPopupButtonAddingCard = document.querySelector('.profile__add-button');
export const popupAddingCardSelector = '.popup_addin-card';

export const initialCards = [
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


  export const enableValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    spanSelector: '.popup__error-input',
};