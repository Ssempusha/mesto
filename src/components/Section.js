export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }
    
    //вставляем карточку
    addItem(element) {
        this._container.prepend(element);//вставляем в начало
    }

    //вызываем функцию генерации карточек с нужными параметрами
    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
};