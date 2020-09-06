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

  //remove a pile from the current pile
  removePile(card){
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
  }

  //displaying
  showPile(){
    if (this.__cards === []){
      console.log("The Pile is Empty");
    } else {
      console.log(`There are ${this.__size} in this pile`)
      this.__cards.forEach(card => {
        card.showCard();
      });
    }
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
      while (numberOfCards){
        if ( numberOfCards === 1 ) {
          this.__drawPile.insertCard(this.lastCard.turnCard())
        } else{
          this.__drawPile.insertCard(this.lastCard)
        }
        this.removeCard();
        numberOfCards -= 1
      }
      return  this
    } else {
      //gotta reverse the last card in the draw pile
      this.__drawPile.__cards[this.__drawPile.size -1 ] = this.__drawPile.lastCard.turnCard();
      this.reversePile();
      this.insertPile(this.__drawPile); //not sure if I should Reverse the card
      this.reversePile();
      while (this.__drawPile.size){
        this.__drawPile.removeCard();
      }
        return this.draw(numberOfCards);
      }
  }
  showDrawPile(){
    return this.drawDeck.showPile()
  }
}

module.exports.Card = Card
module.exports.Pile = Pile
module.exports.Deck = Deck


class DrawPile extends Pile{
//not sure if need it yet it can just be called a pile
}
class TablePile extends Pile{

}
class Fundation extends Pile{
//check fundation method
}

/*
let aDeck = new Deck()
aDeck.fillDeck()
aDeck.shuffle().flipPile().showPile()

draw5Cards = aDeck.draw(5);
aDeck.showPile();
draw5Cards.flipPile().showPile()


console.log("lets Create 2 list  of Cards");
let card1 = new Card("h",1)
let card2 = new Card("d",2)
let card3 = new Card("s",3)
let card4 = new Card("c",4)
let card5 = new Card("d",5)
let card6 = new Card("h",6)
let arr1 = [card1.turnCard(),card2.turnCard(),card3.turnCard()]
let arr2 = [card4.turnCard(),card5.turnCard(),card6.turnCard()]
let pile1 = new Pile(arr1)
let pile2 = new Pile(arr2)
pile1.showPile()
pile2.showPile()

pile1.insertPile(pile2)
pile1.showPile()
pile2.showPile()


console.log('lets remove piles');
pile1.showPile()
let removedPile = pile1.removePile(card3)
removedPile.showPile()
//pile2.showPile()
//console.log(pile2.size)
*/
