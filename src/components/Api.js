class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._getResponseData)
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._getResponseData)
    }

    editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._getResponseData)
    }

    editAvatar(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(this._getResponseData)
    }

    addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._getResponseData)
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._getResponseData)
    }

    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._getResponseData)
    }

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._getResponseData)
    }

    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
      authorization: '4ac1cf7c-1047-4676-a884-9a0f42ad12cc',
      'Content-Type': 'application/json'
    }
  }); 