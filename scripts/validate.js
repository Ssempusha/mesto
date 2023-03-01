const enableFormValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
  };

function toggleButton(form, config) {
    //находим кнопку без дизейбла
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    //проверяем встроенной функцией валидна ли форма (тру/фолс)
    const ifFormValid = form.checkValidity();
    //если форма не валидна, то включаем ей дизейбл
    buttonSubmit.disabled = !ifFormValid;
    //добавляем стиль дизейбла кнопке, если форма не валидна, и убираем, если не валидна
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !ifFormValid);
    //при использовании в форме reset, сработает этот слушатель, чтобы задизейблить кнопку при повторном открытии попапа
    form.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButton(form, config);
        }, 0);
    });
}

function handleFormInput(evt, config) {
    //находим инпут на котором сработало событие
    const input = evt.target;
    //находим айди инпута который будет в таргете, чтобы связать его в дельнейшем со спаноп
    const inputId = input.id;
    //находим спан который привязан к нужному инпут таргету
    const errorElement = document.querySelector(`#${inputId}-error`);
    //проверяем инпут на валидность
    if (input.validity.valid) {
        //если инпут валиден, то удаляется красное подчёркивание и текст становится пустым
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
    } else {
        //если инпут не валиден, то добавляется подчёркивание и текст спана равен браузерной ошибке
        input.classList.add(config.inputErrorClass);
        //input.validationMessage --- сообщение об ошибке хранится в поле инпута
        errorElement.textContent = input.validationMessage;
    }
}

function addInpitListener(form, config) {
    //находим инпуты внутри формы и делалаем их массивом
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    //на каждый инпут срабатывает вызов функции проверки валидации при вводе каждой буквы из-за ('input') 
    inputList.forEach((item) => {
        item.addEventListener('input', (evt) => {
            handleFormInput(evt, config);
        });
    });
}

function validationConfig(form, config) {
    //делаем слушатель на toggleButton, чтобы он срабатывал не только при старте страницы, но и при событии 'input'
 form.addEventListener('input', () => {
    toggleButton(form, config);
    });
    //функция показывает или убирает текст ошибки
    addInpitListener(form, config);
    //изначальная проверка кнопки, иначе если юзер не повзаимодействует с формой, то кнопка будет такой, как изначально в html
    toggleButton(form, config);
}


function enableValidation(config) { 
    //находим все формы на странице, и делаем их массивом
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    //перебираем формы и навешиваем на них функцию
    formList.forEach((form) => {
        validationConfig(form, config)
  });
};



enableValidation(enableFormValidationConfig);