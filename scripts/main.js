import { FormValidator, enableValidationConfig } from './FormValidator.js';
import { Card, initialCards } from './Card.js';

const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profileCloseButton = document.querySelectorAll('.popup__cross');

const profileForm = document.forms.poputEdit;
const profileFormNameInput = profileForm.elements.userName;
const profileFormJobInput = profileForm.elements.userJob;

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

//вызываем из html пустой список
const cardList = document.querySelector('.cards-grid');
//вызываем из html форму для сохранения юзером новой уникальной карточки
const formNewCard = document.forms.poputAdd;
//вызываем из html template блок
const templateCard = document.querySelector('.template-card');

const popupOpenImage = document.querySelector('.popup_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

const openPopupButtonAddingCard = document.querySelector('.profile__add-button');
const popupAddingCard = document.querySelector('.popup_addin-card');

const formNewCardPlaceInput = formNewCard.elements.placeName;
const formNewCardLinkInput = formNewCard.elements.linkImage;

const validationProfileForm = new FormValidator(profileForm, enableValidationConfig);
const validationFormNewCard = new FormValidator(formNewCard, enableValidationConfig);

//универсальное закрытие на esc
const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
};

//универсальное закрытие кликом на фон
const closePopupByBackgroundClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

//универсальное закрытие любого попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('click', closePopupByBackgroundClick);
};

//универсальное открытие любого попапа с доп. функционалом
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  //вызов закрытия на esc
  document.addEventListener('keydown', closePopupByEscape);
  //вызов закрытия кликом на фон
  popup.addEventListener('click', closePopupByBackgroundClick);
};

//открытие попапа редактирования профиля
const openPopupProfile = () => {
  //строки попапа будут заполнены инфой из профиля
  profileFormNameInput.value = profileName.textContent;
  profileFormJobInput.value = profileJob.textContent;
  //открытие попапа
  openPopup(profilePopup);
};
  
/* Обработчик «отправки» формы, который пока ещё не отправляется на сервер */
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  // получаем значение полей formJob и formName из свойства value и выбираем элементы, куда должны быть вставлены значения полей
  profileName.textContent = profileFormNameInput.value;
  profileJob.textContent = profileFormJobInput.value;
  //для закрытия окна после нажатия на отправку формы
  closePopup(profilePopup);
};

//универсальный обработчик ВСЕХ крестиков на странице
profileCloseButton.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//открытие попапа с большой картинкой
function openPopupOpenImage() {
  popupImage.src = this._link;
  popupImage.alt = this._name;
  popupFigcaption.textContent = this._name;
  //открытие попапа
  openPopup(popupOpenImage);
};

//универсальная функция генерирования карточек
function generateCard(link, place) {
  const card = new Card(link, place, templateCard, openPopupOpenImage);  
  const cardElement = card.createCard();
  return cardElement;
}

/* --------обрабортка и вывод заготовленного массива-------- */
initialCards.forEach((item) => {
  //вызываем функцию генерации карточек с нужными параметрами
  cardList.append(generateCard(item.link, item.name));
})

/* ----------настройка инпутов попапа добавления карточки----------- */
//функция открытия попапа добавления карточки
const openPopupAddinCard = () => {
  //строки попапа при открытии будут пустыми, а кнопка задизейблена
  formNewCard.reset();
  //открытие попапа
  openPopup(popupAddingCard);
};

/* ----------создание карточки при нажатии на сабмит----------- */
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  //вызываем функцию генерации карточек с нужными параметрами, карточка будет добавляться в начало
  cardList.prepend(generateCard(formNewCardLinkInput.value, formNewCardPlaceInput.value));
  //для закрытия окна после нажатия на отправку формы
  closePopup(popupAddingCard);
};

/* ----------вызов валидации на формы----------- */
validationProfileForm.enableValidation();
validationFormNewCard.enableValidation();

/* ----------слушатели----------- */
//вызываем функциию открытия попапа редактирования профиля
profileOpenButton.addEventListener('click', () => {
  openPopupProfile();
  //вызов валидации
  validationProfileForm.resetValidation();
  validationProfileForm.disableButton();
});
//прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit); 

//вызываем функциию открытия попапа добавления карточки
openPopupButtonAddingCard.addEventListener('click', () => {
  openPopupAddinCard();
  //вызов валидации
  validationFormNewCard.resetValidation();
});
//обработчик submit попапа добавления карточки
formNewCard.addEventListener('submit', handleCardFormSubmit);