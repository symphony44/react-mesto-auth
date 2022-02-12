 class Api {
    constructor(options) {
      this._token = options.token;
      this._id = options.id;
      this._address = options.address;
    }
  
    getUserInfo() {
      return fetch(`https://${this._address}/v1/${this._id}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkIfResolve);
    }
  
    getInitialCards() {
      return fetch(`https://${this._address}/v1/${this._id}/cards`, {
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkIfResolve);
    }
  
    editProfile(data) {
      return fetch(`https://${this._address}/v1/${this._id}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(this._checkIfResolve);
    }
  
    editAvatar(data) {
      return fetch(`https://${this._address}/v1/${this._id}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(this._checkIfResolve);
    }
  
    addCard(data) {
      return fetch(`https://${this._address}/v1/${this._id}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(this._checkIfResolve);
    }
  
    deleteCard(cardId) {
      return fetch(`https://${this._address}/v1/${this._id}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkIfResolve);
    }
  
   /* addLike(cardId) {
      return fetch(`https://${this._address}/v1/${this._id}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkIfResolve);
    }
  
    removeLike(cardId) {
      return fetch(`https://${this._address}/v1/${this._id}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
        .then(this._checkIfResolve);
    } */

    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return fetch(`https://${this._address}/v1/${this._id}/cards/likes/${id}`, {
          method: 'PUT',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          }
        })
          .then(this._checkIfResolve);
      }
      
      return fetch(`https://${this._address}/v1/${this._id}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
          .then(this._checkIfResolve);
    }

    _checkIfResolve(res) {
      if (res.ok) {
        return res.json();
      } else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    }
  }

  const newApi = new Api ({
    token: '1158c204-af6b-46c2-99fa-e137ca6a17ac',
    id: 'cohort-28',
    address: 'mesto.nomoreparties.co'
}); 

export default newApi;