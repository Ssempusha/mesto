import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._callback = submitCallback;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupFormInputs = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
      //создаём пустой объект
      this._newValues = {};
      //берём массив инпутов и заполняем объект
      this._popupFormInputs.forEach((inputElement) => {
        this._newValues[inputElement.name] = inputElement.value;
        });
      return this._newValues;
    }

    //метод отвечает за то, чтобы данные юзера в профиле подставлялись под инпуты
    setInputValues(item) {
      this._popupFormInputs.forEach((inputElement) => {
        inputElement.value = item[inputElement.name];
        });
    }

    setEventListeners() {
      //обращаемся к методу из родительского класса
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._callback(this._getInputValues());
        });
      }

      close() {
        super.close();
        this._popupForm.reset();
      }
};