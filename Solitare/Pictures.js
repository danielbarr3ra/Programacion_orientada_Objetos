class Card{
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.face = false;
  }
  get getRank() {
    return this.rank;
  }
  get getSuit() {
    return this.suit;
  }
  get getFace(){
    return this.face;
  }
  turnFace(){
    this.face = !this.face;
    return this
  }

  showPicture(){
    let faceDown = 
    `
    ____________
    |<<<<<<<<<<<|
    |>>>>>>>>>>>|
    |<<<<<<<<<<<|
    |>>>>>>>>>>>|
    |<<<<<<<<<<<|
    |>>>>>>>>>>>|
    |_|_|_|_|_|_|
    `
    let faceUp = 
    `
    ____________
    |${this.getRank}          |
    |           |
    |           |
    |           |
    |           |
    |           |
    |__________${this.getSuit[0]}|`
    if (!this.face){
      return console.log(faceDown)
    } else{
      return console.log(faceUp)
    }
  }
}

card1= new Card("Hearts","3")

card1.showPicture();
card1.turnFace();
card1.showPicture();
