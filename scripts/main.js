let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__cross');

let form = document.querySelector('.popup__form');
let formName = form.querySelector('.popup__input_name');
let formJob = form.querySelector('.popup__input_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__occupation');

//строки формы будут заполнены инфой из профиля
formName.value = profileName.textContent;
formJob.value = profileJob.textContent;

//вызываем функции
openPopup.addEventListener('click', openClick);
closePopup.addEventListener('click', crossClick);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit); 

function openClick() {
    popup.classList.add('popup__opened');
  }
  


function crossClick() {
    popup.classList.remove('popup__opened');

    //несохранённый текст сбрасывается из формы при нажатии на крестик
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
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

    popup.classList.remove('popup__opened');
    //для закрытия окна после нажатия на отправку формы
}



