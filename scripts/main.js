const openPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__cross');

const form = document.querySelector('.popup__form');
const formName = form.querySelector('.popup__input_type_name');
const formJob = form.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

const togglePoput = () => {
  popup.classList.toggle('popup_opened');
};

const openPopup = () => {
    //строки попапа будут заполнены инфой из профиля
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;

    //открытие попапа
     togglePoput();
  };
  
/* Обработчик «отправки» формы, который пока ещё не отправляется на сервер */
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    // получаем значение полей formJob и formName из свойства value и выбираем элементы, куда должны быть вставлены значения полей
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;

    //для закрытия окна после нажатия на отправку формы
    togglePoput();
};


//вызываем функции
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', togglePoput);
//прикрепляем обработчик к форме, он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit); 



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


//вызываем из html пустой список
const cardList = document.querySelector('.cards-grid');
//вызываем из html форму для сохранения юзером новой уникальной карточки
const formNewCard = document.querySelector('.popup__form-adding');
//вызываем из html template блок
const templateCard = document.querySelector('.template-card');


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
    
  //находим все элементы попапа с картинкой
  const popupOpenImage = document.querySelector('.popup_open-image');
  const closePopupButtonOpenImage = popupOpenImage.querySelector('.popup__cross');
  const popupFigcaption = popupOpenImage.querySelector('.popup__figcaption');
  const popupImage = document.querySelector('.popup__image');

//попапу с картинкой назначаются значения из карточки
 cardImage.addEventListener('click', function() {
    popupImage.src = linkValue;
    popupImage.alt = titleValue;
    popupFigcaption.textContent = titleValue; 
    popupOpenImage.classList.add('popup_opened'); 
  });

  //закрытие попапа с картинкой
  closePopupButtonOpenImage.addEventListener('click', function() {
    popupOpenImage.classList.remove('popup_opened');
 });


  return templateCardClone;
}



/* --------обрабортка массива-------- */
initialCards.forEach((card) => {
  const finalCard = addCards(card.name, card.link);
  cardList.append(finalCard);
})



/* ---------открытие и закрытия попапа добавления карточки------------ */


const openPopupButtonAddingCard = document.querySelector('.profile__add-button');
const popupAddingCard = document.querySelector('.popup_addin-card');
const closePopupButtonAddingCard = popupAddingCard.querySelector('.popup__cross');

const togglePoputAddingCard = () => {
  popupAddingCard.classList.toggle('popup_opened');
};


/* ----------настройка инпутов попапа добавления карточки----------- */

const popupPlace = formNewCard.querySelector('.popup__input_type_place');
const popupLink = formNewCard.querySelector('.popup__input_type_link');

const plusFormSubmit = (evt) => {
  evt.preventDefault();

  const finalCardd = addCards(popupPlace.value, popupLink.value);
  cardList.prepend(finalCardd);

  //для закрытия окна после нажатия на отправку формы
  togglePoputAddingCard();

  //инпуты после закрытия становятся пустыми
  popupPlace.value = '';
  popupLink.value = '';
};

/* ----------вызов функций----------- */
openPopupButtonAddingCard.addEventListener('click', togglePoputAddingCard);
closePopupButtonAddingCard.addEventListener('click', togglePoputAddingCard);
formNewCard.addEventListener('submit', plusFormSubmit); 