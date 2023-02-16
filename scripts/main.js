const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profileCloseButton = document.querySelectorAll('.popup__cross');

const profileForm = document.forms["poputEdit"];
const formName = profileForm.querySelector('.popup__input_type_name');
const formJob = profileForm.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

//вызываем из html пустой список
const cardList = document.querySelector('.cards-grid');
//вызываем из html форму для сохранения юзером новой уникальной карточки
const formNewCard = document.forms["poputAdd"];
//вызываем из html template блок
const templateCard = document.querySelector('.template-card');

const popupOpenImage = document.querySelector('.popup_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');

const openPopupButtonAddingCard = document.querySelector('.profile__add-button');
const popupAddingCard = document.querySelector('.popup_addin-card');

const popupPlace = formNewCard.querySelector('.popup__input_type_place');
const popupLink = formNewCard.querySelector('.popup__input_type_link');


//универсальное закрытие любого попапа на крестик
const closePopup = (profilePopup) => {
  profilePopup.classList.remove('popup_opened');
};
//универсальное открытие любого попапа
const openPopup = (profilePopup) => {
  profilePopup.classList.add('popup_opened');
};

const openPopupProfile = () => {
    //строки попапа будут заполнены инфой из профиля
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
    //открытие попапа
    openPopup(profilePopup);
  };
  
/* Обработчик «отправки» формы, который пока ещё не отправляется на сервер */
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    // получаем значение полей formJob и formName из свойства value и выбираем элементы, куда должны быть вставлены значения полей
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;

    //для закрытия окна после нажатия на отправку формы
    closePopup(profilePopup);
};


//вызываем функциию открытия попапа
profileOpenButton.addEventListener('click', openPopupProfile);
//прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit); 

//универсальный обработчик ВСЕХ крестиков на странице
profileCloseButton.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


/* --------------------ПР5------------------------- */

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


const addCards = (titleValue, linkValue) => {
  //клонируем контент
  const templateCardClone = templateCard.content.cloneNode(true);
  //находим поле куда будет вставляться название места, и присваиваем ему значение которое введёт юзер
  templateCardClone.querySelector('.cards-grid__title').textContent = titleValue;
   //находим поле куда будет вставляться ссылка на картинку, и присваиваем ему значения которые введёт юзер
  const cardImage = templateCardClone.querySelector('.cards-grid__image');
  cardImage.src = linkValue;
  cardImage.alt = titleValue;

//активное и не активное состояние лайка
  templateCardClone.querySelector('.cards-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards-grid__like_active');
  });

//удаление карточек
  templateCardClone.querySelector('.cards-grid__delete').addEventListener('click', function (evt) {
    evt.target.closest('.cards-grid__item').remove();
  });


/* --------попап с картинкой-------- */ 
//попапу с картинкой назначаются значения из карточки
 cardImage.addEventListener('click', function() {
    popupImage.src = linkValue;
    popupImage.alt = titleValue;
    popupFigcaption.textContent = titleValue;
    //открытие попапа
    openPopup(popupOpenImage);
  });


  return templateCardClone;
}



/* --------обрабортка массива-------- */
initialCards.forEach((card) => {
  const finalCard = addCards(card.name, card.link);
  cardList.append(finalCard);
})



/* ----------настройка инпутов попапа добавления карточки----------- */

const openPopupAddinCard = () => {
  //строки попапа при открытии будут пустыми
  formNewCard.reset();
  //открытие попапа
  openPopup(popupAddingCard);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  const finalCardd = addCards(popupPlace.value, popupLink.value);
  cardList.prepend(finalCardd);

  //для закрытия окна после нажатия на отправку формы
  closePopup(popupAddingCard);
};

/* ----------вызов функций----------- */
openPopupButtonAddingCard.addEventListener('click', openPopupAddinCard);
formNewCard.addEventListener('submit', handleCardFormSubmit);