let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__cross');

let form = document.querySelector('.popup__form');
let formName = form.querySelector('.popup_input_name');
let formJob = form.querySelector('.popup_input_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__occupation');




function openPopup() {
    popup.classList.add('popup_opened');

    //строки попапа будут заполнены инфой из профиля
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
  }
  

function closePopup() {
    popup.classList.remove('popup_opened');
  }
 


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();
    // Получите значение полей formJob и formName из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;

    closePopup();
    //для закрытия окна после нажатия на отправку формы
}


//вызываем функции
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit); 