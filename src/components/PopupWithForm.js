import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitCallback}) {
        super(popupSelector);
        this._callback = submitCallback;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        this._popupFormInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._newValues = {};
        this._popupFormInputs.forEach((inputElement) => {
            this._newValues[inputElement.name] = inputElement.value;
          });
        return this._newValues;
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._popupForm.addEventListener('submit', (evt) => {
          evt.preventDefault();
    
          this._callback(this._getInputValues());
          this.close();
        });
      }

      close() {
        super.close();
        this._popupForm.reset();
      }
};