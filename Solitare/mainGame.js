const Solitare = require('./newSolitare')

class Game{
  constructor(difficulty){
    this.changeDifficulty(difficulty)
    this.gameDeck = new Solitare.Deck().fillDeck().shuffle();
    this.drawCardFromDeck(this.__drawingNumber)
  }
  get drawNumber(){
    return this.__drawingNumber
  }
  status(){
    console.log("____________________________________________________________")
    console.log(`There are currently ${this.gameDeck.size} cards in the deck`)
    console.log(`These are the ${this.gameDeck.drawDeckSize}`)
    this.gameDeck.showDrawPile();
  }
  drawCardFromDeck(){
    this.gameDeck.draw(this.drawNumber);
    return this
  }
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
}

const currentGame =  new Game("Easy");
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()

currentGame.drawCardFromDeck()
currentGame.status()
