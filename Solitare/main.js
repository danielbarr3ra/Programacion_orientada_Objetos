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
}

class Stack{
  constructor(){
    this.cardList = [];
  }

  get cards(){
    return this.cardList;
  }

  get showCards(){
    console.log(this.cardList)
  }

  get size(){
    return this.cardList.length;
  }
  fillStack(){
    let suits = ["Hearts","Spades","Diamonds","Clubs"] //H=0 r, S=1 b, D=2 r, C=3;
    suits.forEach( aSuit => {
      for (let index = 0; index <= 12; index++) {
        let aCard = new Card(aSuit,index);
        this.cardList.push(aCard)
      }
    });    
  }

  shuffle(){
    var m = this.cardList.length, shuffledCard, randomIndex;
    while (m) {
      randomIndex = Math.floor(Math.random() * m--);
      shuffledCard = this.cardList[m];
      this.cardList[m] = this.cardList[randomIndex];      //here is the swap
      this.cardList[randomIndex] = shuffledCard;
      }
  }
  removeCard(){
    return this.cardList.pop()
  }
}


class Pile{
  constructor(pileNumber){
    this.cardList = [];
    this.pileNumber=pileNumber;
    }
  get cards(){
    return this.cardList;
  }
  get size(){
    return this.cardList.length;
  }
  get showCards(){
    console.log(this.cardList)
  }

  fillPile(aStack){
    let i = this.pileNumber
    while(i){
      if (i === 1) {
        this.cardList.push(aStack.removeCard().turnFace());
        //this.cardList.push(aStack.removeCard().turnFace()); // if its the last one the face is turnt and you can see it
      } else {
        this.cardList.push(aStack.removeCard());;
        //this.cardList.push(aStack.removeCard());
      }
      i--;
    }
  }
  removeCard(){
    return this.cardList.pop() //will eventually become move card!!!
  }
  addCard(aCard){
    return this.cardList.push(aCard)
  }

  turnLastCard(){
    let n = this.size;
    this.cardList[n-1]=this.cardList[n-1].turnFace();
  }
}

class Table{
  constructor(){
    this.pile1 = new Pile(1)
    this.pile2 = new Pile(2)
    this.pile3 = new Pile(3)
    this.pile4 = new Pile(4)
    this.pile5 = new Pile(5)
    this.pile6 = new Pile(6)
    this.pile7 = new Pile(7)
  }
  get showTable() {
    for (const pile in this) {
      this[pile].showCards
    }
  }
  fillTable(aStack){
    for (const pile in this) {
      this[pile].fillPile(aStack)
      }
    return this
    }
  validSwitch(card1,card2){
    function checkSuit(){ 
      let suit1, suit2, suits;
      suits={
        "Hearts":"0",
        "Spades":"1",
        "Diamonds":"2",
        "Clubs":"3"
      }
      suit1 = suits[card1.getSuit]
      suit2 = suits[card2.getSuit]
      let soulutions = ["01","10","23","32","03","30","21","12"]
      return soulutions.includes(suit1+suit2)
      }
    function checkRank(){
      let rank1,rank2;
      rank1=card1.getRank
      rank2=card2.getRank
      return rank1+1 === rank2
    }
    function checkFace(){
      return (card1.getFace && card2.getFace)
    }
      return checkFace() && checkRank() && checkSuit();
    }

  moveCard(fromPile,toPile){
    if (this[toPile].size > 0) {
      let card1, card2;
      card1=this[fromPile].cardList.slice(-1)[0] //card1 is an object not an array
      card2=this[toPile].cardList.slice(-1)[0];
      if (this.validSwitch(card1,card2)){
        this[fromPile].removeCard()
        this[toPile].addCard(card1)
        this[fromPile].turnLastCard();
        return console.log(`${card1} in ${fromPile} moved to ${toPile}`)
      } else {
        return console.log(`${card1} in ${fromPile} cannot be moved to ${toPile}`)
      }
      //checks if an ampty array to king is valid
    } else if (this[toPile].size === 0){
      let card1 = this[fromPile].cardList.slice(-1)[0] ;//check if its king
      console.log(card1)
      if (card1.getRank === 13 ){
        this[fromPile].removeCard()
        this[toPile].addCard(card1)
        this[fromPile].turnLastCard();
        return console.log(`${card1} in ${fromPile} moved to ${toPile}`)
      } else {
        return console.log(`You can only move kings to empty piles`)
      }
    }
  }
}

class FundationTop {
  constructor() {
    this.Aces = new Pile(1)
    this.Hearts = new Pile(2)
    this.Diamond = new Pile(3)
    this.Clubs = new Pile(4)
  }
  get showFundations(){
    for (const fundation in this) {
      this[fundation].showCards

  }}
  validSwitchFundation(card1,card2){
    function checkSuit(){ 
      let suit1, suit2, suits;
      suits={
        "Hearts":"0",
        "Spades":"1",
        "Diamonds":"2",
        "Clubs":"3"
      }
      suit1 = suits[card1.getSuit]
      suit2 = suits[card2.getSuit]
      let soulutions = ["00","11","22","33"]
      return soulutions.includes(suit1+suit2)
      }
    function checkRank(){
      let rank1,rank2;
      rank1=card1.getRank
      rank2=card2.getRank
      return rank1+1 === rank2
    }
    function checkFace(){
      return (card1.getFace && card2.getFace)
    }
      return checkFace() && checkRank() && checkSuit();
    }

    moveCardFundation(aTable,pilar,fundation){
      if (this[fundation].size === 0){
        let card1
        card1=aTable[pilar].cardList.slice(-1)[0]
        if (card.rank === 0){
          aTable[pilar].removeCard();
          this[fundation].addCard(card1);
          aTable[pilar].turnLastCard();
          return "added it to fundation"
        } else {
          return "this is not valide it has to be an ace"
        }
      } else if (this[fundation].size > 0){
        let card1,card2;
        card1 = aTable[pilar].cardList.slice(-1)[0]
        card2 = this[fundation].cardList.slice(-1)[0]
        if (this.validSwitchFundation(card1,card2)){
          aTable[pilar].removeCard();
          this[fundation].addCard(card1);
          aTable[pilar].turnLastCard();
          return console.log("this was successful")
        } else {
          return console.log("this was not succesful")
        }
      }
}
}

let rlSync = require('readline-sync');
console.log("lets set up the tables")
let round=1;
let aFundation = new FundationTop;
let newStack = new Stack;
let aTable = new Table;

console.log("Lets Shuffle The Deck")
newStack.fillStack();
newStack.shuffle();
aTable.fillTable(newStack)

play = rlSync.question('do you want to Start? ')
while(play){
  //newStack.showCards;
  console.log("----------fundations--------------------")
  aFundation.showFundations
  console.log("----------table--------------------")
  aTable.showTable
  let switching = rlSync.question("do you want to make a move?")
  if (switching === "yes"){
    let location = rlSync.question("in table or foundation?") //table fundation
    if (location === "table"){
      let col1 = rlSync.question("what column would you like to move from?")
      let col2 = rlSync.question("what column would you like to move from?")
      aTable.moveCard(col1,col2)
      aTable.showTable
    } else if (location === "fundation"){
      let theTable = aTable;
      let column = rlSync.question("what column would you like to move from?")
      let fundation = rlSync.question("to what fundation would you like to move from?")
    }
  }
  console.log(`there are ${newStack.size} cards left in deck`)
  play = rlSync.question('do you want to keep playing? ')
  round ++;
}



