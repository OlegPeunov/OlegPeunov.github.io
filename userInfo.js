class UserInfo{
  constructor(userName, userJob, userPhoto){
    this.userName = userName
    this.userJob = userJob
    this.userPhoto= userPhoto
  }

  setUserInfo(name, job, avatar){
    this.nameText = name; 
    this.jobText = job;
    this.avatar = avatar;

    this.userName.textContent = this.nameText;   
    this.userJob.textContent = this.jobText;
    this.userPhoto.style.backgroundImage = `url(${this.avatar})`
  }

  updateUserInfo(newName, newJob){
    this.newName = newName;
    this.newJob= newJob;
    
    this.userName.textContent = this.newName; 
    this.userJob.textContent = this.newJob;
  }

}
