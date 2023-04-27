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

export const openPopupEditAvatar = document.querySelector('.profile__avatar-edit');
export const popupEditAvatarSelector = '.popup_edit-avatar';
export const formNewAvatar = document.forms.poputEditAvatar;
export const profileAvatarImage = document.querySelector('.profile__avatar');

export const openPopupButtonAddingCard = document.querySelector('.profile__add-button');
export const popupAddingCardSelector = '.popup_addin-card';

export const popupDeleteCardConfirmSelector = '.popup_delete-card';

export const popupZoomImageCardSelector = '.popup_open-image';

  export const enableValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    spanSelector: '.popup__error-input',
};