export default class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        //если с ответом всё ок, преобразуем его от jsonа к обычному js объекту
        return res.json();
        }
        //если же произошла ошибка, то выведется данный текст и статус
        return Promise.reject(`Произошла ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      //получили ответ и обрабатываем его
      .then((res) => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }
  
    setInfoProfile({name, about}) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        //js объект преобразуется в JSON
        body: JSON.stringify({
          name,
          about
          }),
        })
      .then((res) => this._checkResponse(res));
    }

    createNewCard({name, link}) {
      return fetch(`${this._url}/cards`, {
        //метод для создания карточки
        method: 'POST',
        headers: this._headers,
        //js объект преобразуется в JSON
        body: JSON.stringify({
          name,
          link
        }),
      })
      .then((res) => this._checkResponse(res));
    }

    likeCard(likeId) {
      return fetch(`${this._url}/cards/${likeId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
    }

    dislikeCard(likeId) {
      return fetch(`${this._url}/cards/${likeId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
    }

    deleteCardFromServer(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
    }

    updateAvatar({ avatar }) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar
        }),
      })
      .then((res) => this._checkResponse(res));
    }
  };