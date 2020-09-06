const Solitare = require('./newSolitare')

class Game{
  constructor(){
    this.gameDeck = new Solitare.Deck().fillDeck().shuffle();
    this.gameDrawPile = new Solitare.Pile()
  }
  drawCardsFromPile(amount){
    drawPiles=this.gamaDeck.draw(amount)
    
    return this
  }
}

let aDeck = new Solitare.Deck().fillDeck().shuffle().flipPile();
aDeck.showPile()
aDeck.showDrawPile()
console.log("-----------draw consecutevlie 9 new cards")
aDeck.draw(3)
aDeck.draw(3)
aDeck.draw(3)
aDeck.showDrawPile()
aDeck.showPile()


