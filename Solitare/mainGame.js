const Solitare = require('./newSolitare')

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
}



const currentGame =  new Game("Hard");
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()

//console.log(currentGame)