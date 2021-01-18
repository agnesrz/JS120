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

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.squares = {};
    this.resetBoard();
  }

  resetBoard() {
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
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

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  getPlayedMoves(playersMarker) {
    let playedMoves = [];

    for (let key in this.squares) {
      if (this.squares[key].getMarker() === playersMarker) {
        playedMoves.push(key);
      }
    }
    return playedMoves;
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
}

Board.CENTER_SQUARE = '5';

class Score {
  constructor() {
    this.humanScore = 0;
    this.computerScore = 0;
  }

  isWinningScore(score) {
    return score === Score.WINNING_SCORE;
  }

  display() {
    console.log(`Your Score: ${this.humanScore}`);
    console.log(`Computer Score: ${this.computerScore}`);
  }

  updateScore(roundWinner) {
    switch (roundWinner) {
      case 'human':
        this.humanScore += 1;
        break;
      case 'computer':
        this.computerScore += 1;
    }
  }
}

Score.WINNING_SCORE = 3;

class Player {
  constructor(marker) {
    this.marker = marker;
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

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.score = new Score();
  }

  play() {
    let player1 = this.human;
    let player2 = this.computer;

    this.displayWelcomeMessage();

    while (true) {
      this.playRound(player1, player2);
      this.score.display();
      this.continueAndClear();

      if (this.gameOver()) break;

      this.board.resetBoard();
      [player1, player2] = [player2, player1];
    }

    this.displayGameResult();
    this.displayGoodbyeMessage();
  }

  playRound(firstPlayer, secondPlayer) {
    this.board.display();

    while (true) {
      this.move(firstPlayer);
      this.board.displayWithClear();
      if (this.roundOver()) break;

      this.move(secondPlayer);
      this.board.displayWithClear();
      if (this.roundOver()) break;
    }

    this.displayRoundResult();
    this.score.updateScore(this.getRoundWinner());
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
    console.log(`The first player to win ${Score.WINNING_SCORE} rounds wins the game!`);
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayRoundResult() {
    if (this.isRoundWinner(this.human)) {
      console.log("You won this round!\n");
    } else if (this.isRoundWinner(this.computer)) {
      console.log("I won this round! Bu-ha-ha...\n");
    } else {
      console.log("A tie game. How boring.\n");
    }
  }

  displayGameResult() {
    console.clear();
    if (this.score.isWinningScore(this.score.humanScore)) {
      console.log("You won the game! Congratulations!");
    } else {
      console.log("I won! I won! Take that, human! It's game over for you!");
    }
    console.log();
  }

  move(player) {
    if (player.constructor === Human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinWithOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choices = this.getMoveOptions();
    let choice = choices.length === 1 ? choices[0] :
      this.chooseRandomSquare(choices);
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  getMoveOptions() {
    if (this.winImminent(Square.COMPUTER_MARKER)) {
      return this.getOffensiveMoves();
    } else if (this.winImminent(Square.HUMAN_MARKER)) {
      return this.getDefensiveMoves();
    } else if (this.board.squares[Board.CENTER_SQUARE].isUnused()) {
      return Array(Board.CENTER_SQUARE);
    } else {
      return this.board.unusedSquares();
    }
  }

  chooseRandomSquare(choices) {
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!(choices.includes(choice)));

    return choice;
  }

  winImminent(playerMarker) {
    let validMoves = this.board.unusedSquares();
    let playedMoves = this.board.getPlayedMoves(playerMarker);

    if (playedMoves.length < 2) return false;

    return validMoves.some(move => {
      let afterNextMove = playedMoves.concat(Array(move));

      return this.containsWinningCombo(afterNextMove);
    });
  }

  containsWinningCombo(arr) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(winningRow => {
      return winningRow.every(move => arr.includes(move));
    });
  }

  getDefensiveMoves() {
    return this.getStrategicMoves(Square.HUMAN_MARKER);
  }

  getOffensiveMoves() {
    return this.getStrategicMoves(Square.COMPUTER_MARKER);
  }

  getStrategicMoves(marker) {
    let validMoves = this.board.unusedSquares();
    let playedMoves = this.board.getPlayedMoves(marker);

    return validMoves.filter(move => {
      let futureMoves = playedMoves.concat(Array(move));

      return this.containsWinningCombo(futureMoves);
    });
  }

  roundOver() {
    return this.board.isFull() || this.someoneWonRound();
  }

  gameOver() {
    return this.score.isWinningScore(this.score.humanScore) ||
           this.score.isWinningScore(this.score.computerScore);
  }

  someoneWonRound() {
    return this.isRoundWinner(this.human) || this.isRoundWinner(this.computer);
  }

  getRoundWinner() {////////////////////////////////////////////////////////////////HERE
    if (this.isRoundWinner(this.human)) {
      return 'human';
    } else if (this.isRoundWinner(this.computer)) {
      return 'computer';
    } else {
      return null;
    }
  }

  isRoundWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  swapPlayerOrder() {
    let [firstPlayer, secondPlayer] = [this.player1, this.player2];

    this.player1 = secondPlayer;
    this.player2 = firstPlayer;
  }

  continueAndClear() {
    readline.question('\nPress any key to continue.');
    console.clear();
  }
  /*
  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question().trim().toLowerCase();

    while (!(['y', 'n'].includes(answer))) {
      console.log("That's not a valid choice. Try again.");
      answer = readline.question().trim().toLowerCase();
    }

    return answer === 'y';
  }
*/
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

TTTGame.joinWithOr = function(list, punctuation = ',', joinWord = 'or') {
  switch (String(list.length)) {
    case '1':
      return list[0];
    case '2':
      return `${list[0]} ${joinWord} ${list[1]}`;
    default:
      return splitAndJoin();
  }

  function splitAndJoin() {
    let firstPart = list.slice(0, list.length - 1);
    let secondPart = list.slice(list.length - 1);

    secondPart[0] = ` ${joinWord} ${secondPart[0]}`;

    return firstPart.join(punctuation + ' ') + secondPart;
  }
};

let game = new TTTGame();
game.play();