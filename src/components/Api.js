export default class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }
  getInitialCards() {
    console.log(`base url, ${this._baseUrl}`)
    console.log( `headers, ${this._token}`)

    return fetch(`${this._baseUrl}/cards`,{
        headers: {
        authorization: this._token
    } })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  //getUserInfo() {
    // ...
  //}
}