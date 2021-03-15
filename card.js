class Card{
  constructor(cardData, openImageCallback, newApi){
    this.cardData = cardData;
    this.openImageCallback = openImageCallback;
    this.newApi = newApi
  }

  like=(evt)=> {
    evt.target.classList.toggle('place-card__like-icon_liked')
  }

  _removeEventListeners(card){
    card.querySelector('.place-card__like-icon').removeEventListener('click', this.like) 
    card.querySelector('.place-card__image').removeEventListener('click', this.openImage)
    card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove)
  }

  

  remove=(event)=>{  
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
      const card = event.target.closest('.place-card');
      card.parentElement.removeChild(card);
      
      this.newApi.deleteCard(card)
        .then(()=>{
          
          this._removeEventListeners(card)
          
        })
        .catch((err)=>{
          console.log(err)
        })
    } 
  }


  create=()=>{
  
    const plaseCard = document.createElement('div');
    const plaseCardImage = document.createElement('div');
    const placeCardDeleteIcon = document.createElement('button');
    const placeCcardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeIcon = document.createElement('button');
    const placeCcardDescriptionBox = document.createElement('div');
    const placeCardlikesAmount = document.createElement('p');
    
    plaseCard.classList.add('place-card');
    plaseCardImage.classList.add('place-card__image');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCcardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCcardDescriptionBox.classList.add('place-card__descriptionBox');  
    placeCardlikesAmount.classList.add('place-card__likesAmount');
    
    placeCardName.textContent = this.cardData.name;

    plaseCardImage.style.backgroundImage = `url(${this.cardData.link})`
    placeCardLikeIcon.classList.add('place-card__like-icon');

    placeCardlikesAmount.textContent = this.cardData.likes? Object.keys(this.cardData.likes).length : 0

    plaseCard.id = this.cardData._id
        
    placeCcardDescription.appendChild(placeCardName);
    placeCcardDescriptionBox.appendChild(placeCardLikeIcon);
    placeCcardDescriptionBox.appendChild(placeCardlikesAmount);
    placeCcardDescription.appendChild(placeCcardDescriptionBox);

    plaseCardImage.appendChild(placeCardDeleteIcon);

    plaseCard.appendChild(plaseCardImage);
    plaseCard.appendChild(placeCcardDescription);

    placeCardLikeIcon.addEventListener('click', this.like) 
    placeCardDeleteIcon.addEventListener('click', this.remove) 
    plaseCardImage.addEventListener('click', this.openImage);
    
    return plaseCard
  }

  _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }



  openImage=()=>{
    if(event.target.classList.value != 'place-card__delete-icon'){
      this.openImageCallback(this.cardData.link); 
    }
    
      
    
  } 
}


  