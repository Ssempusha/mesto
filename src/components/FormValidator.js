export default class FormValidator {
    constructor(form, config) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._templateSelector = config.templateSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._spanSelector = config.spanSelector;
        //кнопка без стайла дизейбла
        this._buttonSubmit = form.querySelector(this._submitButtonSelector);
        //находим инпуты внутри формы и делалаем их массивом
        this._inputsList = Array.from(form.querySelectorAll(this._inputSelector));
        //находим спаны внутри формы и делалаем их массивом
        this._spanList = Array.from(form.querySelectorAll(this._spanSelector));
        this._form = form;
    }

    _toggleButton = (form, config) => {
        //проверяем встроенной функцией валидна ли форма (тру/фолс)
        const ifFormValid = form.checkValidity();
        //если форма не валидна, то включаем ей дизейбл
        this._buttonSubmit.disabled = !ifFormValid;
        //добавляем стиль дизейбла кнопке, если форма не валидна, и убираем, если не валидна
        this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !ifFormValid);
        //при использовании в форме reset, сработает этот слушатель, чтобы задизейблить кнопку при повторном открытии попапа
        form.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButton(form, config);
            }, 0);
        });
    }

    _handleFormInput = (evt) => {
        //находим инпут на котором сработало событие
        const input = evt.target;
        //находим айди инпута который будет в таргете, чтобы связать его в дельнейшем со спаноп
        const inputId = input.id;
        //находим спан который привязан к нужному инпут таргету
        const errorElement = this._form.querySelector(`#${inputId}-error`);
        //проверяем инпут на валидность
        if (input.validity.valid) {
            //если инпут валиден, то удаляется красное подчёркивание и текст становится пустым
            input.classList.remove(this._inputErrorClass);
            errorElement.textContent = '';
        } else {
            //если инпут не валиден, то добавляется подчёркивание и текст спана равен браузерной ошибке
            input.classList.add(this._inputErrorClass);
            //input.validationMessage --- сообщение об ошибке хранится в поле инпута
            errorElement.textContent = input.validationMessage;
        }
    }

    _addInpitListener = (config) => {
        //на каждый инпут срабатывает вызов функции проверки валидации при вводе каждой буквы из-за ('input') 
        this._inputsList.forEach((item) => {
            item.addEventListener('input', (evt) => {
                this._handleFormInput(evt, config);
            });
        });
    }
    
    _validationConfig = (form, config) => {
        //делаем слушатель на toggleButton, чтобы он срабатывал не только при старте страницы, но и при событии 'input'
        form.addEventListener('input', () => {
        this._toggleButton(form, config);
        });
        //функция показывает или убирает текст ошибки
        this._addInpitListener(form, config);
        //изначальная проверка кнопки, иначе если юзер не повзаимодействует с формой, то кнопка будет такой, как изначально в html
        this._toggleButton(form, config);
    }

    //функция ресета красной обводки инпута при открытии попапа
    _resetBorderInput = () => {
        this._inputsList.forEach((input) => {
          input.classList.remove(this._inputErrorClass);
        });
      };

    //функция ресета ошибок в span при открытии попапа
    _resetSpanError = () => {
        this._spanList.forEach((span) => {
        span.textContent = '';
        });
    };

    _disableButtonSubmit = () => {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false; 
    }

    disableButton = () => {
        this._disableButtonSubmit();
    }

    resetValidation = () => {
        this._resetBorderInput();
        this._resetSpanError();
    }; 

    enableValidation = (config) => {
        //вызов валидации
        this._validationConfig(this._form, config);
    };
}