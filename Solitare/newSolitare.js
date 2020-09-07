class Card {
  constructor(suit,rank){
    this.__suit = suit;
    this.__rank = rank;
    this.__face = false;
  }
  //getters
  get suit() {
    return this.__suit;
  }
  get rank() {
    return this.__rank;
  }
  get face() {
    return this.__face;
  }
  //mutating methods
  turnCard() {
    this.__face = !this.__face
    return this
  }
  //displaying
  showCard() {
    if (this.__face){
      console.log(`${this.rank} of ${this.suit}`)
      return this
    } else {
      console.log("face down")
      return this
    }
  }
}

class Pile {
  constructor(listCards) {
    this.__cards = listCards || [] ;
    this.__size = this.__cards.length
  }
  //getters
  get cards() {
    return this.__cards;
  }
  get size() {
    return this.__cards.length;
  }
  get lastCard() {
    return this.__cards.slice(-1)[0]
  }
  //mutating methods
  insertCard(aCard) {                 //used in insert pile
    this.__cards.push(aCard);
    this.__size = this.__cards.length;
    return this
  }
  removeCard() {                      //used in remove pile
    this.__cards.pop()
    this.__size = this.__cards.length;
    return this
  }
  flipLastCard(){
    this.__cards[this.size-1] = this.lastCard.turnCard();
    return this
  }
  reversePile() {
    this.__cards.reverse();
    return this
  }
  flipPile() {
    this.__cards.forEach(card => {
      card.turnCard();
    });
    return this
  }
  removePile(numberOfCards){
    const removedPile = new Pile()
    while(numberOfCards){
      let card = this.lastCard;
      removedPile.insertCard(card);
      this.removeCard();
      numberOfCards -= 1
    }
    return removedPile
  }
  //remove pile based on card
  pinchPile(card){
    if ( this.cards.includes(card) ){
      console.log("the card is in the pile")
      const index = this.cards.indexOf(card);
      const removedCards = this.cards.slice(index);
      for ( let i = 0; i < removedCards.length; i++) {
        this.removeCard();
      }
      return new Pile(removedCards);
    } else {
      console.log("this is card is not in the pile")
      return
    }
  }
  insertPile(insertedPile){
    insertedPile.reversePile();
    var m = insertedPile.size;
    while(m){
      this.insertCard(insertedPile.lastCard);
      insertedPile.removeCard();
      m -= 1
    }
    return this
  }

  //displaying
  showPile(){
    if (this.__cards === []){
      console.log("The Pile is Empty");
    } else {
      //console.log(`There are ${this.__size} in this pile`)
      this.__cards.forEach(card => {
        card.showCard();
      });
    }
  }
}
class TablePile extends Pile{
  constructor(pileNumber,listCards){
  super(listCards);
  this.__pileNumber =  pileNumber
  }
  get pileNumber(){
    return this.__pileNumber
  }
}

class Deck extends Pile{
  constructor(listCards){
    super(listCards);
    this.__drawPile = new Pile()
  }
  get drawDeck() {
    return this.__drawPile;
  }
  get drawDeckSize() {
    return this.__drawPile.size;
  }
  fillDeck() {
    const suits = ["Hearts","Spades","Diamonds","Clubs"] //H=0 r, S=1 b, D=2 r, C=3;
    suits.forEach( suit => {
      for (let rank = 0; rank <= 12; rank += 1) {
        let aCard = new Card(suit,rank);
        this.insertCard(aCard)
      }
    });
    return this
  }
  shuffle() {
    var m = this.size, shuffledCard, randomIndex;
    while (m) {
      randomIndex = Math.floor(Math.random() * m--);
      shuffledCard = this.__cards[m];
      this.__cards[m] = this.__cards[randomIndex];
      this.__cards[randomIndex] = shuffledCard;
    }
    return this
  }
  draw(numberOfCards){
   var m = this.__drawPile.size;
   if (m === 0){
    var aPile = this.removePile(numberOfCards)
    this.__drawPile.insertPile(aPile.flipLastCard())
    return this
   } else {
    this.__drawPile.flipLastCard();
    this.reversePile().insertPile(this.__drawPile).reversePile();
    this.__drawPile.removePile(this.__drawPile.size)
    return this.draw(numberOfCards);
    }
  }
  showDrawPile(){
    return this.drawDeck.showPile()
  }
}

module.exports.Card = Card
module.exports.Pile = Pile
module.exports.TablePile = TablePile
module.exports.Deck = Deck


class Fundation extends Pile{
//check fundation method
}


