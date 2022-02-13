export const BASEURL = 'https://auth.nomoreparties.co';

const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASEURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  })
    .then(response => getResponseData(response));
}

export const authorize = (email, password) => {
  return fetch(`${BASEURL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  })
    .then(response => getResponseData(response))
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        return data;
      }
    })
}

export const getContent = (token) => {
  return fetch(`${BASEURL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => getResponseData(response))
}