import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  enableValidationConfig,
  profileOpenButton,
  popupProfileSelector,
  profileForm,
  profileName,
  profileJob,
  cardList,
  formNewCard,
  formNewAvatar,
  templateCard,
  popupZoomImageCardSelector,
  openPopupButtonAddingCard,
  popupAddingCardSelector,
  popupDeleteCardConfirmSelector,
  openPopupEditAvatar,
  popupEditAvatarSelector,
  profileAvatarImage
} from '../utils/constants.js';
let userId;
import { data } from 'autoprefixer';

//экземплары класса. назначаем классу попапы которые нужно валидировать и нужный конфиг
const validationProfileForm = new FormValidator(profileForm, enableValidationConfig);
const validationFormNewCard = new FormValidator(formNewCard, enableValidationConfig);
const validationAvatarForm = new FormValidator(formNewAvatar, enableValidationConfig);

//вызов валидации на формы
validationProfileForm.enableValidation();
validationFormNewCard.enableValidation();
validationAvatarForm.enableValidation();

//объявляем переменную, которой мы назначили, с каким попапом будем работать внутри класса
const popupPicture = new PopupWithImage(popupZoomImageCardSelector);
//вызов функции из класса
popupPicture.setEventListeners();

//функция добавления карточки. карточка сразу возвращается
function renderCard(cardData) {
  const card = new Card({
    items: cardData,
    handleCardClick: () => {
      popupPicture.open(cardData);
    },
    }, templateCard, userId, handleLikeCard, handleDeleteCard);
  const cardElement = card.createCard();
  return cardElement;
}

//экземпляр класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '72174a37-993f-461a-b1bd-4e35a7b39078',
    'Content-Type': 'application/json'
  },
});

//данные с серва вставляются в профиль
const userInfo = new UserInfo({
  elementName: profileName,
  elementJob: profileJob,
  elementAvatar: profileAvatarImage
});

const renderInitialCards = new Section({
  renderer: (items) => {
    renderInitialCards.addItem(renderCard(items));
  }}, cardList);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about
    });
    userId = userData._id;
    renderInitialCards.renderItems(cardsData.reverse());
    userInfo.setUserAvatar(userData);
  })
  .catch((err) => alert(err));

const popupWithConfirmation = new PopupWithConfirmation(popupDeleteCardConfirmSelector);
popupWithConfirmation.setEventListeners();

function handleDeleteCard(card) {
  const cardId = card.getCardId();
  popupWithConfirmation.setConfirmation(() => {
    api.deleteCardFromServer(cardId)
    .then(() => {
      card.deleteCard();
      popupWithConfirmation.close();
    })
    .catch((err) => alert(err));
  });
  popupWithConfirmation.open();
};

//редактирование данных профиля
const handleFormEditProfile = (data) => {
  popupEditeProfile.renderLoading("Сохранение...");
  api.setInfoProfile(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupEditeProfile.close();
  })
  .catch((err) => alert(err))
  .finally(() => {
    popupEditeProfile.renderLoading("Сохранить");
  });
};

const popupEditeProfile = new PopupWithForm(popupProfileSelector, handleFormEditProfile);
popupEditeProfile.setEventListeners();
//------

//добавление карточки
const handleAddCard = (items) => {
  popupAddCard.renderLoading("Сохранение...");
  api.createNewCard(items)
  .then((res) => {
    renderInitialCards.addItem(renderCard(res));
    popupAddCard.close();
  })
  .catch((err) => alert(err))
  .finally(() => {
    popupAddCard.renderLoading("Создать");
  });
};

//объявление попапа добавления новой карточки
const popupAddCard = new PopupWithForm(popupAddingCardSelector, handleAddCard);
//вызов метода, в котором присутствует submit
popupAddCard.setEventListeners();
//--------

//аватарка
const handleNewAvatar = (data) => {
  popupEddAvatar.renderLoading("Сохранение...");
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupEddAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupEddAvatar.renderLoading("Сохранить");
    });
};

const popupEddAvatar = new PopupWithForm(popupEditAvatarSelector, handleNewAvatar);
popupEddAvatar.setEventListeners();
//-------

//------лайки
const handleLikeCard = (card, likes, userId, setLikes) => {
  if (likes.some((userInfo) => userInfo._id === userId)) {
    api
      .dislikeCard(card.getCardId())
      .then((card) => {
        setLikes(card.likes);
      })
      .catch((err) => alert(err));
  } else {
    api
      .likeCard(card.getCardId())
      .then((card) => {
        setLikes(card.likes);
      })
      .catch((err) => alert(err));
  }
};
//-----------

/* ----------слушатели----------- */ 
//вызываем функциию открытия попапа редактирования профиля 
profileOpenButton.addEventListener('click', () => {
  popupEditeProfile.open();
  popupEditeProfile.setInputValues(userInfo.getUserInfo());
  //вызов валидации
  validationProfileForm.resetValidation();
  validationProfileForm.unDdisableButton();
});

//вызываем функциию открытия попапа добавления карточки 
openPopupButtonAddingCard.addEventListener('click', function () {
  popupAddCard.open();
  validationFormNewCard.resetValidation();
});

//вызываем функциию открытия попапа изменения аватарки
openPopupEditAvatar.addEventListener('click', function () {
  popupEddAvatar.open();
  validationAvatarForm.resetValidation();
});