export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close(); 
          }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
          this.close(evt.target);
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__cross').addEventListener('click', () => this.close());
        this._popupSelector.addEventListener('click', this._handleOverlayClose.bind(this));
    }
};