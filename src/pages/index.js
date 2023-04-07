import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileOpenButton,
  popupProfileSelector,
  profileForm,
  profileName,
  profileJob,
  cardList,
  formNewCard,
  templateCard,
  popupOpenImageSelector,
  openPopupButtonAddingCard,
  popupAddingCardSelector,
  initialCards,
  enableValidationConfig
} from '../utils/constants.js';


//экземплары класса. назначаем классу попапы которые нужно валидировать и нужный конфиг
const validationProfileForm = new FormValidator(profileForm, enableValidationConfig);
const validationFormNewCard = new FormValidator(formNewCard, enableValidationConfig);

//вызов валидации на формы
validationProfileForm.enableValidation();
validationFormNewCard.enableValidation();

//объявляем переменную, которой мы назначили, с каким попапом будем работать внутри класса
const popupPicture = new PopupWithImage(popupOpenImageSelector);
//вызов функции из класса
popupPicture.setEventListeners();


//функция добавления карточки. карточка сразу возвращается
function renderCard(cardData) {
  const card = new Card({
    items: cardData,
    handleCardClick: () => {
      popupPicture.open(cardData);
    },
    }, templateCard);
  const cardElement = card.createCard();
  return cardElement;
}

const renderNewCard = (items) => {
  renderInitialCards.addItem(renderCard(items));
}

//объявление наполнения страницы начальными карточками
const renderInitialCards = new Section({
  items: initialCards,
  renderer: renderNewCard
  }, cardList);
//вызов метода
renderInitialCards.renderItems();

//переменные из профиля, передаваемые классу
const openPopupProfile = new UserInfo({
  elementName: profileName,
  elementJob: profileJob
});

const handleFormProfile = (input) => {
  openPopupProfile.setUserInfo(input.userName, input.userJob);
  popupEditeProfile.close();
}

const handleAddCard = (items) => {
  renderNewCard(items);
  popupAddCard.close();
}

//объявление попапа редактирования профиля
const popupEditeProfile = new PopupWithForm(popupProfileSelector, handleFormProfile);
//вызов метода, в котором присутствует submit
popupEditeProfile.setEventListeners();

//объявление попапа добавления новой карточки
const popupAddCard = new PopupWithForm(popupAddingCardSelector, handleAddCard);
//вызов метода, в котором присутствует submit
popupAddCard.setEventListeners();


/* ----------слушатели----------- */ 
//вызываем функциию открытия попапа редактирования профиля 
profileOpenButton.addEventListener('click', () => {
  popupEditeProfile.open();
  popupEditeProfile.setInputValues(openPopupProfile.getUserInfo());
  //вызов валидации
  validationProfileForm.resetValidation();
  validationProfileForm.unDdisableButton();
});

//вызываем функциию открытия попапа добавления карточки 
openPopupButtonAddingCard.addEventListener('click', function () {
  popupAddCard.open();
  validationFormNewCard.resetValidation();
});