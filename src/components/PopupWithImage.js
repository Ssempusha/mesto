import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupFigcaption = this._popupSelector.querySelector('.popup__figcaption');
    }

    open(items){
        super.open();

        this._popupImage.src = items.link;
        this._popupImage.alt = items.name;
        this._popupFigcaption.textContent = items.name;
      }
};