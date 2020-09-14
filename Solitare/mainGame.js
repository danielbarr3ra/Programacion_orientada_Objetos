const Solitare = require('./newSolitare');
const rlSync = require('readline-sync');
class Game{
  constructor(difficulty){
    this.changeDifficulty(difficulty)
    this.__gameDeck = new Solitare.Deck().fillDeck().shuffle();
    this.fillTable();
    //gotta draw after setting up the table
    this.drawCardFromDeck(this.__drawingNumber)
  }
  get drawNumber(){
    return this.__drawingNumber
  }
  get gameDeck(){
    return this.__gameDeck
  }

  status(){
    console.log("____________________________________________________________")
    console.log(`There are currently ${this.gameDeck.size} cards in the deck`)
    console.log(`These are the ${this.gameDeck.drawDeckSize} cards in the draw deck`)
    this.gameDeck.showDrawPile();
    console.log('These is the table')
    console.log('_________________________________________________')
    this.showTable();
  }
  drawCardFromDeck(){
    this.gameDeck.draw(this.drawNumber);
    return this
  }
  //mehtods to to start game or set up game
  changeDifficulty(difficutly){
    this.__difficulty = difficutly
    switch (difficutly) {
      case "Easy":
        this.__drawingNumber = 1
        break;
      case "Medium":
        this.__drawingNumber = 2
        break;
      case "Hard":
        this.__drawingNumber = 3
        break;

      default:
        this.__drawingNumber = 1
        break;
    }
  }
  fillTable(){
    for (let pileNumber = 1; pileNumber <= 7; pileNumber += 1) {
      let listOfCards = this.gameDeck.removePile(pileNumber).cards
      this["__tablePile"+pileNumber] = new Solitare.TablePile(pileNumber,listOfCards)
      this["__tablePile"+pileNumber].flipLastCard();
    }
    return this
  }
  showTable(){
    for (let i = 1; i <= 7; i +=1){
      console.log("cards in TablePile "+i)
      this["__tablePile"+i].showPile();

    }
  }
  //RULES
  validateSwitch(Card1,Card2){
    //card 1 from pinched pile
    //card 2 receivning card
    if ( Card1.sameFaceUp(Card2) && Card1.oppositeColorSuit(Card2) && Card1.oneRankDownOf(Card2) ){
      return true
    } else {
      return false
    }
  }
  validateEmptySwitch(card){
    if ( card.isKing() ){
      return true
    } else {
      return false
    }
  }

  switchPiletoPile(){
    var SenderNumber, cardToPinch, aRank, aSuit,ReceivingNumber,receivingCard;

    ReceivingNumber = Number(rlSync.question("what pile do you want to append? "))
    receivingCard = this["__tablePile"+ReceivingNumber].lastCard

    SenderNumber = Number(rlSync.question("what pile do you want to pinch? "))
    console.log("--------pile"+SenderNumber);
    this["__tablePile"+SenderNumber].showPile();
    aRank = Number(rlSync.question(`what is the rank of the topcard in pile ${SenderNumber} you want to pinch? `))
    aSuit = rlSync.question("what is its suit? ")
    cardToPinch = new Solitare.Card(aSuit,aRank).turnCard()
    //gotta add logic in case it is an empty then the validate swtich it should be to check if its king
    //should add new rule class just thinking about it
    if ( this["__tablePile"+ReceivingNumber].isEmpty() ) {
      if (this.validateEmptySwitch(cardToPinch)){
        var pinchedPile = this["__tablePile"+SenderNumber].pinchPile(cardToPinch)
        this["__tablePile"+ReceivingNumber].insertPile(pinchedPile)
        this["__tablePile"+SenderNumber].flipLastCard()
      } else {
        return console.log("sorry cant do this")
      }
    }
    //when ever you pinch a pile which is face up you should add logic to not flip the last card from it
    if (this.validateSwitch(cardToPinch,receivingCard)){
      var pinchedPile = this["__tablePile"+SenderNumber].pinchPile(cardToPinch)
      this["__tablePile"+ReceivingNumber].insertPile(pinchedPile)
      if ( !( this["__tablePile"+SenderNumber].isEmpty() ) ){
        this["__tablePile"+SenderNumber].flipLastCard();
      }
      return this
    } else{
      return console.log("cant make this move")
    }
  }
}



const currentGame =  new Game("Hard");
currentGame.status()
let n = 1
while(n<10) {
  currentGame.switchPiletoPile()
  currentGame.status()
  console.log(`move ${n}`)
  n ++
}
*/

//gotta check the drawing method did not get fucked




