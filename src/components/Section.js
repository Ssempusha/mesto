export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }
    
    //вставляем карточку
    addItem(element) {
        this._container.prepend(element);//вставляем в начало
    }

    //вызываем функцию генерации карточек с нужными параметрами
    renderItems() {
        this._items.forEach((items) => {
            this._renderer(items);
        });
    }
};