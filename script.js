(function(){

const container = document.querySelector('.root');
const placesList = container.querySelector('.places-list');
const formButton = container.querySelector('.user-info__button');
const editFormButton = container.querySelector('.user-info__edit-button');
const userName = container.querySelector('.user-info__name');
const userJob = container.querySelector('.user-info__job');
const userPhoto = container.querySelector('.user-info__photo');
const imageWrap = container.querySelector('.image-wrap');
const form = document.forms.new;
const editForm = document.forms.edit;
const popupButton = container.querySelector('#popup-button');
const editPopup = new Popup(editForm);
const popupForm = new Popup(form);
const cardList = new CardList(placesList);
const userValidator = new FormValidator(editForm);
const cardValidator = new FormValidator(form);
const userInfo = new UserInfo(userName, userJob, userPhoto);

const newApi = new Api({
  url: 'https://nomoreparties.co/cohort12',
  authorization: '61bfbbef-2f0f-4ba0-a4c0-c034d01c7f11'
})

newApi.getUserInfo()
  .then((res)=>{
    userInfo.setUserInfo(res.name, res.about, res.avatar)
  })
  .catch((err)=>{
    console.log(err)
  })


newApi.getCards()
  .then((cardsApi)=>{
    const cards = cardsApi.map(cardData =>createCard(cardData)); 
    cardList.render(cards)
  })
  .catch((err)=>{
    console.log(err)
  })

const openImagePopup = (link) => {
  const img = document.querySelector('.popupImage');
  const imageWrap = document.querySelector('.image-wrap');
  img.src = `${link}`
  imageWrap.classList.add('image-wrap_is-opened');
}

const createCard = cardData => {
  const newCard = new Card(cardData, openImagePopup, newApi); 
  return newCard.create();
}

formButton.addEventListener('click', function(){
  popupForm.open()
});

editFormButton.addEventListener('click', function(){
  editPopup.open()
});



form.addEventListener('submit', function(){
  event.preventDefault()
  const name = form.elements.name;
  const link = form.elements.link;

  newApi.postNewCard(name.value, link.value)
    .then(()=>{
      const addCard = new Card({name: `${name.value}`,link: `${link.value}`}, openImagePopup, newApi);
      const cardElement = addCard.create();
      cardList.addCard(cardElement)
      popupForm.close()
      form.reset();
      cardValidator.setSubmitButtonState(popupButton, false)
    })
    .catch((err)=>{
      console.log(err)
    })
});



imageWrap.addEventListener('click', function(){
  imageWrap.classList.remove('image-wrap_is-opened');
});



editForm.addEventListener('submit', function(){
  event.preventDefault()
  const name = editForm.elements.name.value  
  const job = editForm.elements.job.value 
  
  newApi.patchUserData(name,job)
    .then(()=>{
      userInfo.updateUserInfo(name,job)
      editPopup.close()  
    })
    .catch((err)=>{
      console.log(err)
    })
});



userValidator.setEventListeners();
cardValidator.setEventListeners();

}());

/* REVIEW:

Все критические ошибки были исправлены, отличная работа! 
Спасибо за усилия и старания, удачи в следующем спринте и успехов в дальнейшем обучении 🖤

*/

