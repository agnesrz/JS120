let readline = require('readline-sync');

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.numericalValue = null;

    if (Card.FACE_CARDS.includes(value)) {
      this.numericalValue = 10;
    } else if (value === 'Ace') {
      this.numericalValue = 11;
    } else {
      this.numericalValue = Number(value);
    }
  }
}

class Deck {
  constructor() {
    let fullDeck = [];

    Deck.SUITS.forEach(suit => {
      Deck.VALUES.forEach(value => {
        fullDeck.push(new Card(suit, value));
      });
    });

    this.availableCards = fullDeck;
    this.discardedCards = [];
  }

  shuffle() {
    let unshuffled = this.availableCards.slice();
    let shuffled = [];

    for (let cardsLeft = unshuffled.length; cardsLeft > 0; cardsLeft -= 1) {
      let randomIndex = this.getRandomNumber(cardsLeft);

      shuffled.push((unshuffled.splice(randomIndex, 1))[0]);
    }

    this.availableCards = shuffled;
  }

  replenish() {
    this.availableCards.push(...this.discardedCards.splice(0, this.discardedCards.length));
  }

  deal(player) {
    player.hand = this.availableCards.splice(0, TwentyOneGame.CARDS_DEALT_AT_START);
  }

  hit(player) {
    player.hand.push(this.availableCards.shift());
  }

  cardPileLow() {
    return this.availableCards.length <=
           TwentyOneGame.MIN_NUM_OF_CARDS_NEEDED_TO_PLAY;
  }

  getRandomNumber(numOfChoices) {
    return Math.floor(Math.random() * numOfChoices);
  }
}

class Participant {
  constructor() {
    this.hand = null;
  }

  isBusted() {
    return this.getScore() >= TwentyOneGame.BUSTED_VALUE;
  }

  getScore() {
    return this.hand.reduce((total, card) => total + card.numericalValue, 0);
  }

  getCardsAsString() {
    return this.hand.map(card => card.value).join(', ');
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.balance = TwentyOneGame.STARTING_BALANCE;
  }

  displayBalance() {
    console.log(`Your current balance is $${this.balance}.\n`);
  }

  resetBalance() {
    this.balance = TwentyOneGame.STARTING_BALANCE;
  }

  getHandAsString() {
    return this.getCardsAsString();
  }

  getTotal() {
    return this.getScore();
  }
}

Deck.SUITS = ['Spades', 'Clovers', 'Hearts', 'Diamonds'];
Deck.VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
Deck.FACE_CARDS = ['Jack', 'Queen', 'King'];

class Dealer extends Participant {
  constructor() {
    super();
    this.keepOneCardFaceDown = true;
  }

  hideCard() {
    this.keepOneCardFaceDown = true;
  }

  unhideCard() {
    this.keepOneCardFaceDown = false;
  }

  getHandAsString() {
    return this.keepOneCardFaceDown ? this.getFirstCardAsString() + ', [hidden]' :
      this.getCardsAsString();
  }

  getFirstCardAsString() {
    return this.hand[0].value;
  }

  getTotal() {
    return this.keepOneCardFaceDown ? this.hand[0].numericalValue : this.getScore();
  }

  hit() {
    return this.getScore() < TwentyOneGame.SCORE_BELOW_WHICH_DEALER_MUST_HIT;
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = null;
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.prepareNewDeck();
      this.playGame();
      if (!this.keepPlaying()) break;
      this.player.resetBalance();
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  playGame() {
    while (true) {
      this.player.displayBalance();
      this.playRound();
      this.updateBalance();
      if (this.gameOver()) break;
      this.prepareForNextRound();
    }

    this.displayGameResult();
  }

  playRound() {
    this.dealCards();
    this.playerTurn();

    if (!this.player.isBusted()) {
      this.dealerTurn();
    }

    this.displayRoundResult();
  }

  prepareNewDeck() {
    this.deck = new Deck();
    this.deck.shuffle();
  }

  prepareCards() {
    this.discardCards();

    if (this.deck.cardPileLow()) {
      this.deck.replenish();
      this.deck.shuffle();
    }
  }

  prepareForNextRound() {
    this.dealer.hideCard();
    this.prepareCards();
  }

  dealCards() {
    readline.question('Press any key to be dealt your cards.\n');
    this.deck.deal(this.player);
    this.deck.deal(this.dealer);
    console.clear();
  }

  showCards() {
    console.clear();
    console.log(`Your Cards:   ${this.player.getHandAsString()}`);
    console.log(`Your Total:   ${this.player.getTotal()}`);
    console.log('');
    console.log(`Dealer Cards: ${this.dealer.getHandAsString()}`);
    console.log(`Dealer Total: ${this.dealer.getTotal()}`);
    console.log('');
  }

  discardCards() {
    let playerCards = this.player.hand.splice(0, this.player.hand.length);
    let dealerCards = this.dealer.hand.splice(0, this.dealer.hand.length);

    this.deck.discardedCards.push(...playerCards.concat(dealerCards));
  }

  playerTurn() {
    this.showCards();

    while (true) {
      if (this.player.isBusted()) {
        this.dealer.unhideCard();
        break;
      }

      let choice = this.hitOrStay();
      if (choice === 'S') break;

      this.deck.hit(this.player);
      this.showCards();
    }
  }

  dealerTurn() {
    this.dealer.unhideCard();

    while (!this.dealer.isBusted()) {
      this.showCards();

      if (this.dealer.hit()) {
        this.deck.hit(this.dealer);
        readline.question('The dealer has chosen to hit. Press any key to continue.\n');
      } else {
        readline.question('The dealer has chosen to stay. Press any key to continue\n');
        break;
      }
    }
  }

  hitOrStay() {
    let answer = readline.question("Hit or Stay? (h/s)").trim().toUpperCase();

    while (!['H', 'S'].includes(answer)) {
      answer = readline.question("That's not a valid choice. Please try again.")
        .trim().toUpperCase();
    }

    return answer;
  }

  displayWelcomeMessage() {
    console.log(`Welcome to ${TwentyOneGame.NAME_OF_GAME}!\n`);
  }

  displayGoodbyeMessage() {
    console.log(`\nThanks for playing ${TwentyOneGame.NAME_OF_GAME}. Goodbye!`);
  }

  displayRoundResult() {
    this.showCards();

    if (this.player.isBusted()) {
      console.log('Oh no... you busted!');
    } else if (this.dealer.isBusted()) {
      console.log('The dealer busted!');
    } else if (this.playerWins()) {
      console.log('You win!');
    } else if (this.dealerWins()) {
      console.log('You lose this one. Better luck next time.');
    } else {
      console.log("It's a tie.");
    }

    readline.question('\nPress any key to continue.');
    console.clear();
  }

  displayGameResult() {
    this.player.displayBalance();

    if (this.player.balance === TwentyOneGame.MAX_BALANCE) {
      console.log(`Congratulations, you've won all the money!\n`);
    } else {
      console.log(`You're all out of money.\n`);
    }
  }

  playerWins() {
    return ((!this.player.isBusted() && this.dealer.isBusted())) ||
           (!this.player.isBusted() &&
            (this.player.getScore() > this.dealer.getScore()));
  }

  dealerWins() {
    return (this.player.isBusted()) ||
           (!this.dealer.isBusted() &&
            (this.dealer.getScore() > this.player.getScore()));
  }

  gameOver() {
    let playerBalance = this.player.balance;
    let maxBalance = TwentyOneGame.MAX_BALANCE;
    let minBalance = TwentyOneGame.MIN_BALANCE;

    return playerBalance === maxBalance || playerBalance === minBalance;
  }


  updateBalance() {
    if (this.playerWins()) {
      this.player.balance += 1;
    }

    if (this.dealerWins()) {
      this.player.balance -= 1;
    }
  }

  keepPlaying() {
    let answer = readline.question('Would you like to play again? (y/n)')
      .trim().toLowerCase();

    while (!['y', 'n'].includes(answer)) {
      answer = readline.question("That's not a valid choice. Please try again.")
        .trim().toLowerCase();
    }

    return answer === 'y';
  }
}

TwentyOneGame.STARTING_BALANCE = 5;
TwentyOneGame.MAX_BALANCE = 10;
TwentyOneGame.MIN_BALANCE = 0;
TwentyOneGame.NAME_OF_GAME = 'Twenty-One';
TwentyOneGame.MIN_NUM_OF_CARDS_NEEDED_TO_PLAY = 15;
TwentyOneGame.CARDS_DEALT_AT_START = 2;
TwentyOneGame.BUSTED_VALUE = 22;
TwentyOneGame.SCORE_BELOW_WHICH_DEALER_MUST_HIT = 17;

let game = new TwentyOneGame();
game.start();