import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    open(card, cardId) {
        super.open();
        this.card = card;
        this.cardId = cardId;
    }

    setConfirmation(callback) {
        this._confirmation = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._confirmation();
        });
    }

    close() {
        super.close();
        this._form.reset();
      }
};