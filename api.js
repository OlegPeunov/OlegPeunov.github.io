class Api{
  constructor(config){
    this.url = config.url
    this.authorization= config.authorization
    

  }
  
   _getResponseData(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`)); 
  }

  getUserInfo=()=>{
    
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(this._getResponseData)
  }

  getCards=()=>{
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.authorization
      }
    })
      .then(this._getResponseData)
  }



  patchUserData=(name,job)=>{
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(this._getResponseData)
  }


  postNewCard=(name, link)=>{
    return fetch(`${this.url}/cards`, {
      method: 'post',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._getResponseData)

  }

  deleteCard=(card)=>{
    this.card=card
    return fetch(`${this.url}/cards/${this.card.id}`,{
      method: 'DELETE',
      headers: {
        authorization: this.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._getResponseData)  
  }

}

















