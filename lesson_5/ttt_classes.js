let readline = require('readline-sync');


class Board {
  constructor() {
    this.squares = {
      1: ' ',
      2: ' ',
      3: ' ',
      4: ' ',
      5: ' ',
      6: ' ',
      7: ' ',
      8: ' ',
      9: ' ',
    };

    this.winningCombos = [[1, 2, 3], [4, 5, 6],
      [7, 8, 9], [1, 4, 7],
      [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7]
    ];
  }

  static displaySampleBoard() {
    let sampleBoard = [
      ['1 | 2 | 3'],
      ['__|___|__'],
      ['4 | 5 | 6'],
      ['__|___|__'],
      ['7 | 8 | 9'],
      ['  |   |  ']
    ];

    console.log(`\n${sampleBoard.join('\n')}`);
  }

  displayBoard() {
    let board = [
      ['   |   |'],
      [` ${this.squares[1]} | ${this.squares[2]} | ${this.squares[3]}`],
      ['___|___|___'],
      ['   |   |'],
      [` ${this.squares[4]} | ${this.squares[5]} | ${this.squares[6]}`],
      ['___|___|___'],
      ['   |   |'],
      [` ${this.squares[7]} | ${this.squares[8]} | ${this.squares[9]}`],
      ['   |   |']
    ];

    console.log(`\n${board.join('\n')}`);
  }

  updateBoard(move, marker) {
    this.squares[move] = marker;
  }

  boardFull() {
    return Object.values(this.squares).every(item => item !== ' ');
  }
}

class Human {
  constructor() {
    this.marker = 'X';
  }

  move(choicesObj) {
    console.log("\nIt's your turn! Type the number of the box where you'd like to place your token.\n");
    Board.displaySampleBoard();

    return this.selectMove(choicesObj);
  }

  selectMove(choicesObj) {
    let choice = readline.question().trim();

    while (choicesObj[choice] !== ' ') {
      console.log("That's not a valid choice. Please try again.");
      choice = readline.question().trim();
    }

    console.clear();
    return choice;
  }
}

class Computer {
  constructor() {
    this.marker = '0';
  }

  move(choicesObj) {
    console.log("\nIt's the computer's turn. Press any key to continue.");
    readline.question();
    console.clear();
    return this.selectMove(choicesObj);
  }


  selectMove(choicesObj) {
    let options = Object.entries(choicesObj).filter(element => element[1] === " ");
    let randomIndex = Math.floor(Math.random() * options.length + 1);

    return options[randomIndex][0];
  }
}

class Game {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.board = new Board();
    this.winner = null;
  }

  winningComboExists(combo, marker) {
    return combo.every(element => {
      return this.board.squares[element] === marker;
    });
  }

  updateWinner(player) {
    this.board.winningCombos.forEach((combo) => {
      if (this.winningComboExists(combo, this[player].marker)) {
        this.winner = player;
      }
    });

    return false;
  }

  displayWelcomeMessage() {
    console.log('Welcome to Tic-Tac-Toe!\n');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic-Tac-Toe. Goodbye!');
  }

  displayResult() {
    switch (this.winner) {
      case 'human':
        console.log('\nCongratulations! You have won the game!');
        break;
      case 'computer':
        console.log('\nThe computer has won the game.');
        break;
      default:
        console.log("\nIt's a tie!");
    }
  }

  gameOver() {
    return this.board.boardFull() || this.winner;
  }

  playAgain() {
    console.log("\nWould you like to play again? Type Y or N.");
    let answer = readline.question().trim().toUpperCase();

    if ((answer !== 'Y') && (answer !== 'N')) {
      console.log("That's not a valid choice. Please try again.");
      answer = readline.question().trim().toUpperCase();
    }

    return answer === 'Y';
  }

  resetGame() {
    this.human = new Human();
    this.computer = new Computer ();
    this.board = new Board ();
    this.winner = null;
  }

  play() {
    this.displayWelcomeMessage();
    this.board.displayBoard();

    while (true) {
      while (true) {
        this.board.updateBoard(this.human.move(this.board.squares), this.human.marker);
        this.board.displayBoard();
        this.updateWinner('human');

        if (this.gameOver()) break;

        this.board.updateBoard(this.computer.move(this.board.squares), this.computer.marker);
        this.board.displayBoard();
        this.updateWinner('computer');

        if (this.gameOver()) break;
      }

      this.displayResult();

      if (!this.playAgain()) break;

      this.resetGame();
      this.board.displayBoard();

    }
    this.displayGoodbyeMessage();
  }
}

let newGame = new Game();
newGame.play();