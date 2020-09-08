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
  //test thise mehtods
  sameRank(card) {
    if (this.rank === card.rank){
      return true
    } else {
      return false
    }
  }
  oneRankDownOf(card){
    if (this.rank + 1 === card.rank){
      return true
    } else {
      return false
    }
  }
  sameSuit(card){
    if (this.suit === card.suit){
      return true
    } else {
      return false
    }
  }
  oppositeColorSuit(card){
    var suits, combination, soulutions;
      suits={
        "Hearts":"0",
        "Spades":"1",
        "Diamonds":"2",
        "Clubs":"3"
      }
      combination = suits[this.suit]+suits[card.suit]
      soulutions = ["01","10","23","32","03","30","21","12"]
      return soulutions.includes(combination)
  }
  sameFaceUp(card){
    if ( (this.face === true) && (card.face === true) ){
      return true
    } else {
      return false
    }
  }
  sameFaceDown(card){
    if ( (this.face === false) && (card.face === false) ){
      return true
    } else {
      return false
    }
  }
  isKing(){
    if (this.rank === 12){
      return true
    } else {
      return false
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
  get firstCard() {
    return this.__cards.slice(0)[0]
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
  findInsiede(card){
    var m = this.size-1
    while (m >= 0 ){
      var check = this.__cards.slice(m, m+1)[0]
      if ( check.sameSuit(card) && check.sameRank(card) ){
        return [true, m]
      }
      m -=1
    }
    return false
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
    const check = this.findInsiede(card)
    if (check[0] ){
      const index = check[1];
      const removedCards = this.removePile(this.size - index)
      return removedCards
    } else {
      return false
    }
  }
  insertPile(insertedPile){
    var m = insertedPile.size;
    while(m){
      this.insertCard(insertedPile.lastCard);
      insertedPile.removeCard();
      m -= 1
    }
    return this
  }
  isEmpty(){
    if (this.size === 0){
      return true
    } else {
      return false
    }
  }
  //displaying
  showPile(){
    if (this.isEmpty()){
      console.log("The Pile is Empty");
    } else {
      //console.log(`There are ${this.__size} in this pile`)
      this.__cards.forEach(card => {
        card.showCard();
      });
    }
    return this
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
class Fundation extends Pile{
  constructor(suit,listCards){
    super(listCards);
    this.__suit = suit;
  }
  get fundatoinSuit(){
    return this.__suit;
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
    var aPile = this.removePile(numberOfCards).flipLastCard().reversePile()
    this.__drawPile.insertPile(aPile)
    return this
   } else {
    this.__drawPile.flipLastCard().reversePile();
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

