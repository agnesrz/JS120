class Card {
  constructor() {
    // STUB  
  }
}

class Deck {
  constructor() {
    // STUB    
  }
  
  deal() {
    // STUB
  }
}

class Participant {
  constructor() {
    // STUB
    this.bust = null;
    this.score = 0;
  }

  hit() {
    // STUB
  }
  
  stay() {
    // STUB
  }

  isBusted() {
    // STUB    
  }
  
  score() {
    // STUB    
  }
}

class Player extends Participant {
  constructor() {
    // STUB
    this.balance = 5;
  }
}

class Dealer extends Participant {
  constructor() {
    // STUB    
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    // STUB    
  }
  
  start() {
    // SPIKE
    this.displayWelcomeMessage();
    
    do {
      this.player.displayBalance();
      this.playOneRound;
    } while (!this.gameOver());
    
    this.displayGoodbyeMessage();    
  }
  
  playOneRound() {
    // SPIKE
    if (this.deck.cardPileLow) {
      this.shuffleDeck;
    }  

    this.dealer.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
  }
  
  playOneRound() {
    
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    //STUB
  }

  displayGoodbyeMessage() {
    //STUB
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();