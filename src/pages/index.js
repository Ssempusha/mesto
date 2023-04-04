import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileOpenButton,
  profilePopup,
  profileForm,
  profileFormNameInput,
  profileFormJobInput,
  profileName,
  profileJob,
  cardList,
  formNewCard,
  templateCard,
  popupOpenImage,
  openPopupButtonAddingCard,
  popupAddingCard,
  formNewCardPlaceInput,
  formNewCardLinkInput,
  initialCards,
  enableValidationConfig
} from '../utils/constants.js';

//назначаем классу попапы которые нужно валидировать и нужный конфиг
const validationProfileForm = new FormValidator(profileForm, enableValidationConfig);
const validationFormNewCard = new FormValidator(formNewCard, enableValidationConfig);

//объявляем переменную, которой мы назначили, с каким попапом будем работать внутри класса
const popupPicture = new PopupWithImage(popupOpenImage);
//вызов функции из класса
popupPicture.setEventListeners();

//объявление наполнения страницы начальными карточками
const renderInitialCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card({
      items: cardData,
      handleCardClick: () => {
        popupPicture.open(cardData);
      },
      }, templateCard);
    renderInitialCards.addItem(card.createCard());
  }
}, cardList);
//вызов метода
renderInitialCards.renderItems();

//объявление переменной, внутри которой функция добавления карточки. карточка сразу возвращается
const renderCard = function (cardData) {
  const renderCardItem = new Card({
    items: cardData,
    handleCardClick: () => {
      popupPicture.open(cardData);
    },
    }, templateCard);
  return renderCardItem.createCard();
}

//объявление попапа добавления новой карточки
const popupAddCard = new PopupWithForm(popupAddingCard, {
  submitCallback: () => {
    renderInitialCards.addItem(renderCard({
      name: formNewCardPlaceInput.value,
      link: formNewCardLinkInput.value
    }, templateCard, popupPicture));
    popupAddCard.close();
  }
});
//вызов метода, в котором присутствует submit
popupAddCard.setEventListeners();

//переменные из профиля, передаваемые классу
const openPopupProfile = new UserInfo({
  elementName: profileName,
  elementJob: profileJob
});

//объявление попапа редактирования профиля
const popupEditeProfile = new PopupWithForm(profilePopup, {
  submitCallback: () => {
  openPopupProfile.setUserInfo(profileFormNameInput, profileFormJobInput);
  }
});
popupEditeProfile.setEventListeners();

/* ----------вызов валидации на формы----------- */ 
validationProfileForm.enableValidation();
validationFormNewCard.enableValidation();

/* ----------слушатели----------- */ 
//вызываем функциию открытия попапа редактирования профиля 
profileOpenButton.addEventListener('click', () => {
  popupEditeProfile.open();
  //меняем у инпутов значения атрибутов value на новые, которые берутся из значений профиля
  profileFormNameInput.setAttribute('value', openPopupProfile.getUserInfo().name);
  profileFormJobInput.setAttribute('value', openPopupProfile.getUserInfo().job);
  //вызов валидации
  validationProfileForm.resetValidation();
  validationProfileForm.disableButton();
});

//вызываем функциию открытия попапа добавления карточки 
openPopupButtonAddingCard.addEventListener('click', function () {
  popupAddCard.open();
  validationFormNewCard.resetValidation();
});