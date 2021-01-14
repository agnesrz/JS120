const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    points: 0
  };
}

function createHuman() {
  let human = {
    chooseMove(rulesObj) {
      let choice;
      rulesObj.displayMoveOptionsWithAbbreviations();

      while (true) {
        choice = readline.question().trim().toLowerCase();
        if (rulesObj.moveAbbreviations[choice]) break;
        console.log("That's not a valid choice. Please try again");
      }

      this.move = rulesObj.moveAbbreviations[choice];
    },
  };
  return Object.assign(human, createPlayer());
}

function createComputer() {
  let computer = {
    moveHistory: null,
    updateMoveHistory(roundWinner) {
      this.moveHistory[this.move].played += 1;

      if (roundWinner === 'human') {
        this.moveHistory[this.move].playedAndLost += 1;
      }
    },
    chooseMove(rulesObj) {
      let choices = this.getChoicesBasedOnStrategy(rulesObj);
      let randomIdx = Math.floor(Math.random() * choices.length);
      let choice = choices[randomIdx];

      this.move = choice;
    },
    getChoicesBasedOnStrategy(rulesObj) {
      // This method removes moves that have historically
      // resulted in a loss from the pool of possible choices
      let choices = Object.values(rulesObj.moveOptions);
      let removeFromChoices = [];

      for (let move in this.moveHistory) {
        if ((this.moveHistory[move].playedAndLost /
             this.moveHistory[move].played) >= .60) {
          removeFromChoices.push(move);
        }
      }
      return choices.filter(move => !removeFromChoices.includes(move));
    },
  };

  return Object.assign(computer, createPlayer());
}

function createRules() {
  let rules = {
    moveOptions: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    moveOptionsThatAreProperNouns: ['spock'],
    moveAbbreviations: {
    // Each key represents the abreviation for the associated value.
      r: 'rock',
      p: 'paper',
      sc: 'scissors',
      l: 'lizard',
      sp: 'spock',
    },
    winningCombos: {
      // The move represented by the key wins against the move(s)
      // listed in the associated array
      rock: ['scissors', 'lizard'],
      paper: ['rock', 'spock'],
      scissors: ['paper', 'lizard'],
      lizard: ['spock', 'paper'],
      spock: ['scissors', 'rock'],
    },
    playOneGame: false,// if true, set playMultipleGames to false
    playMultipleGames: true,// if true, set playOneGame to false, and POINTS_NEEDED_TO_WIN to a value greater than 0
    POINTS_NEEDED_TO_WIN: 5,

    displayMoveOptionsWithAbbreviations() {
      let pairsArr = Object.entries(this.moveAbbreviations).map(pair => {
        let move = this.capitalizeIfMoveIsProperNoun(pair[1]);
        let abbr = this.capitalizeIfMoveIsProperNoun(pair[0]);

        return `${move} [${abbr}]`;
      });

      console.log(`Choose one: ${this.joinWithOr(pairsArr)}`);
    },
    moveIsProperNoun(move) {
      return this.moveOptionsThatAreProperNouns.includes(move);
    },
    capitalizeIfMoveIsProperNoun(move) {
      return this.moveIsProperNoun(move) ?
        this.capitalizeFirstLetter(move) : move;
    }
  };

  return Object.assign(rules, createTextProcessingMethods());
}

function createTextProcessingMethods() {
  return {
    capitalizeFirstLetter(word) {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    },
    joinWithOr(arr) {
      let firstPart = arr.slice(0, arr.length - 1).join(', ');
      let secondPart = arr[arr.length - 1];

      return `${firstPart}, or ${secondPart}`;
    }
  };
}

function createDisplayMethods() {
  return {
    displayGreeting() {
      console.log(`Welcome to ${this.getNameOfGame()}!`);
    },
    displayRoundInfo() {
      console.log(`The first player to win ${this.rules.POINTS_NEEDED_TO_WIN} rounds wins the game!`);
    },
    displayGoodbyeMessage() {
      console.log(`Thanks for playing ${this.getNameOfGame()}. Goodbye!`);
    },
    displayScore() {
      console.log(`Your Score: ${this.human.points}`);
      console.log(`Computer Score: ${this.computer.points}`);
    },
    displayMoves() {
      let humanMove = this.rules.capitalizeIfMoveIsProperNoun(this.human.move);
      let computerMove = this.rules
        .capitalizeIfMoveIsProperNoun(this.computer.move);

      console.log(`You chose ${humanMove}. The computer chose ${computerMove}.`);
    },
    displayRoundResult() {
      let winner = this.getRoundWinner();
      this.displayMoves();
      this.displayRoundWinner(winner);
      this.displayScore();
      this.continueWithClear();
    },
    displayGameResult(winner) {
      this.displayGameWinner(winner);
    },
    displayRoundWinner(winner) {
      switch (winner) {
        case 'human':
          console.log(`You win this round!`);
          break;
        case 'computer':
          console.log(`The computer wins this round!`);
          break;
        default:
          console.log("It's a tie!");
      }
    },
    displayGameWinner(winner) {
      switch (winner) {
        case 'human':
          console.log(`You win the game!`);
          break;
        case 'computer':
          console.log(`The computer wins the game!`);
      }
    }
  };
}

function createRPSGame() {
  let game = {
    human: createHuman(),
    computer: createComputer(),
    rules: createRules(),

    play() {
      this.displayGreeting();
      this.setUpGame();
      while (true) {
        if (this.rules.playOneGame) {
          this.playOneGame();
        } else {
          this.playMultipleRounds();
        }

        if (this.stopPlaying()) break;
        this.resetGame();
      }
      this.displayGoodbyeMessage();
    },
    playOneGame() {
      this.human.chooseMove(this.rules);
      this.computer.chooseMove(this.rules);
      let winner = this.getRoundWinner();
      this.computer.updateMoveHistory(winner);
      this.displayMoves();
      this.displayGameResult(winner);
    },
    playMultipleRounds() {
      this.displayRoundInfo();
      while (!this.gameWinner()) {
        this.human.chooseMove(this.rules);
        this.computer.chooseMove(this.rules);
        this.updateRoundData();
        this.displayRoundResult();
      }
      this.displayGameResult(this.getGameWinner());
    },
    setUpGame() {
      this.setUpMoveHistory();
    },
    setUpMoveHistory() {
      let moveHistoryObj = {};
      let moveOptions = this.rules.moveOptions;

      moveOptions.forEach(move => {
        moveHistoryObj[move] = {};
        moveHistoryObj[move].played = 0;
        // The above property stores the number of times the computer played
        // this move
        moveHistoryObj[move].playedAndLost = 0;
        // The above property stores the number of times the computer played
        // this move and lost the round
      });

      this.computer.moveHistory = moveHistoryObj;
    },
    getNameOfGame() {
      return this.rules.moveOptions.map(element => this
        .capitalizeFirstLetter(element))
        .join(', ');
    },
    gameWinner() {
      return (this.human.points === this.rules.POINTS_NEEDED_TO_WIN) ||
             (this.computer.points === this.rules.POINTS_NEEDED_TO_WIN);
    },
    getGameWinner() {
      return this.human.points === this.rules.POINTS_NEEDED_TO_WIN ?
        'human' : 'computer';
    },
    getRoundWinner() {
      let humanMove = this.human.move.toLowerCase();
      let computerMove = this.computer.move.toLowerCase();

      if (this.rules.winningCombos[humanMove].includes(computerMove)) {
        return 'human';
      } else if (this.rules.winningCombos[computerMove].includes(humanMove)) {
        return 'computer';
      } else {
        return 'tie';
      }
    },
    updateRoundData() {
      let winner = this.getRoundWinner();

      this.updateScore(winner);
      this.computer.updateMoveHistory(this.getRoundWinner());
    },
    updateScore(winner) {
      if (winner === 'human') {
        this.human.points += 1;
      } else if (winner === 'computer') {
        this.computer.points += 1;
      }
    },
    stopPlaying() {
      let answer;
      console.log('Would you like to play again? Y/N');

      while (true) {
        answer = readline.question().trim().toUpperCase();
        if (['Y', 'N'].includes(answer)) break;
        console.log("That's not a valid choice. Please try again.");
      }

      return answer === 'N';
    },
    continueWithClear() {
      readline.question('Press any key to continue');
      console.clear();
    },
    resetGame() {
      this.human.points = 0;
      this.computer.points = 0;
      console.clear();
    }
  };

  return Object.assign(game, createTextProcessingMethods(),
    createDisplayMethods());
}

let game = createRPSGame();
game.play();