class CardList{
  constructor(placesList){
    this.placesList = placesList 
  }

  addCard(cardElement){
    this.placesList.appendChild(cardElement)   
  }

  render=(cards)=>{
    this.cards = cards  
    this.cards.forEach(card=>{
      this.addCard(card) 
    })
  }
}

