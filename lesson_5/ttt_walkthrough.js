// Base code is from the walkthrough with classes. The bonus features were created by me. // Assignment incomplete; will return
let readline = require("readline-sync");

class Square {
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

Square.UNUSED_SQUARE = " ";//// did not use 'static' syntax as my system does not accept it'
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.resetBoard();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(marker, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === marker;
    });

    return markers.length;
  }
  
  twoSquaresInARow(player, row) {
    return this.countMarkersFor(player.getMarker(), row) === 2;
  }

  displayWithClear() {
    //console.clear();
    console.log("");
    console.log("");
    this.display();
  }
  
  resetBoard() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[counter] = new Square();
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.moves = [];
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {//////////////////////////////////////////////////// GAMEPLAY
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();
    
    while (true) {
      this.board.display();
      
      while (true) {
        this.humanMoves();

        if (this.gameOver()) break;
  
        this.computerMoves();
        if (this.gameOver()) break;
  
        this.board.displayWithClear();
      }
      
      this.board.displayWithClear();
      this.displayResults();
      
      if (!(this.playAgain())) break;
      
      this.resetGame();
      //console.clear();
    }
    
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      let prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.human.moves.push(choice);
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choices = this.getMoveChoicesBasedOnStrategy();
    let choice;
    console.log(choices);
        
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!(choices.includes(choice)));

    this.computer.moves.push(choice);
    this.board.markSquareAt(choice, this.computer.getMarker());
  }
  
  getMoveChoicesBasedOnStrategy() {
    if (this.winImminent(this.human.getMarker())) {
      return this.getWinningMoves(this.human.getMarker());
    } else if (this.winImminent(this.computer.getMarker())) {
      return this.getOffensiveMoves(this.computer.getMarker());
    } else {
      return this.board.unusedSquares();
    }
  }
  
  winImminent(playerMarker) {
      return TTTGame.POSSIBLE_WINNING_ROWS.some((row) => {
      return ((this.board.countMarkersFor(playerMarker, row) === 2) &&
              (this.board.countMarkersFor(Square.UNUSED_SQUARE, row) === 1));
    });
  }
  
  getWinningMoves(playerMarker) {
    let context = this;
    let moves = [];
    let winningRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.winImminent(playerMarker, row);
    });
    
    winningRows.forEach(square => {
      if (context.board.squares[square].isUnused()) {
        moves.push(square);
      }
    });
    return moves;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player.getMarker(), row) === 3;
    });
  }
  
  playAgain() {
    console.log('Would you like to play again? Type Y or N.');
    let answer = readline.question().toUpperCase().trim();
    
    if ((answer !== 'Y') && (answer !== 'N')) {
      console.log("That's not a valid choice. Please try again.");
      answer = readline.question().toUpperCase().trim();
    }
    
    return answer === 'Y';
  }
  
  resetGame() {
    this.board.resetBoard();
    this.human.moves = [];
    this.computer.moves = [];
  }
}

TTTGame.POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

TTTGame.joinOr = function(array, punctuation = ',', joinWord = 'or') {
  let arrayLength = array.length;
  
  switch (arrayLength) {
    case 1:
      return array[0];
    case 2:
      return `${array[0]} ${joinWord} ${array[1]}`;
    default:
      return `${array.slice(0, array.length - 1).join(`${punctuation} `)}${punctuation} ${joinWord} ${array[array.length - 1]}`;
  }
};

let game = new TTTGame();
game.play();