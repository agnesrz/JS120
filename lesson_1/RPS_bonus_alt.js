const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
    moveHistory: [],
    roundsWon: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    loseHistory: [],
    choose() {
      let choices = this.getChoices();
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      this.moveHistory.push(choices[randomIndex]);
    },
    getChoices() {
      if (this.loseHistory.length === 0) {
        this.initializeLoseHistory();
      }

      let choices = this.loseHistory.slice().sort((a, b) => b[1] - a[1]);

      if (choices.every(elem => elem[1] === choices[0][1])) {
        return choices.map(elem => elem[0]);
      } else {
        let greatestLosses = choices[0][1];
        return choices.filter(elem => elem[1] < greatestLosses).map(elem => elem[0]);
      }
    },
    initializeLoseHistory() {
      this.loseHistory = RPSGame.rules.choices.map(choice => [choice, 0]);
    },
    updateLoseHistory() {
      this.loseHistory.forEach((elem, idx) => {
        if (elem[0] === this.move) {
          this.loseHistory[idx] = [elem[0], elem[1] + 1];
        }
      });
    }
  };
  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choices = RPSGame.rules.choices;
      let choice;

      while (true) {
        console.log(`Please choose ${choices.slice(0, choices.length - 1).join(', ')} or ${choices[choices.length - 1]}`);
        choice = readline.question();
        if (RPSGame.rules.choices.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.moveHistory.push(choice);
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createRules() {
  return {
    nameOfGame: 'Rock, Paper, Scissors, Lizard, Spock',
    pointsToWin: 5,
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    winner(humanMove, computerMove) {
      if (humanMove === computerMove) {
        return 'tie';
      } else if ((humanMove === 'rock' && computerMove === 'scissors') ||
              (humanMove === 'rock' && computerMove === 'lizard') ||
              (humanMove === 'paper' && computerMove === 'rock') ||
              (humanMove === 'paper' && computerMove === 'spock') ||
              (humanMove === 'scissors' && computerMove === 'paper') ||
              (humanMove === 'scissors' && computerMove === 'lizard') ||
              (humanMove === 'lizard' && computerMove === 'spock') |
              (humanMove === 'lizard' && computerMove === 'paper') |
              (humanMove === 'spock' && computerMove === 'scissors') ||
              (humanMove === 'spock' && computerMove === 'rock')) {
        return 'human';
      } else {
        return 'computer';
      }
    }
  };
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  rules: createRules(),

  updateScore(winner) {
    switch (winner) {
      case 'human':
        this.human.roundsWon += 1;
        this.computer.updateLoseHistory();
        break;
      case 'computer':
        this.computer.roundsWon += 1;
        break;
    }
  },

  displayWelcomeMessage() {
    console.log(`Welcome to ${this.rules.nameOfGame}!`);

    if (this.rules.pointsToWin > 1) {
      console.log(`The first person to win ${this.rules.pointsToWin} rounds wins!`);
    }
  },

  displayGoodbyeMessage() {
    console.log(`Thanks for playing ${this.rules.nameOfGame}!`);
  },

  displayScore() {
    console.log(`Your score: ${this.human.roundsWon}, Computer score: ${this.computer.roundsWon}`);
  },
  displayMoves() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  },

  displayWinner(winner, gameOrRound = 'game') {
    switch (winner) {
      case 'human':
        console.log(`You win${gameOrRound === 'round' ? ' this round' : ''}!`);
        break;
      case 'computer':
        console.log(`The computer wins${gameOrRound === 'round' ? ' this round' : ''}!`);
        break;
      default:
        console.log("It's a tie.");
    }
  },

  displayGameWinner(winner) {
    winner === 'human' ? console.log('You win the game!') : console.log('The computer has won the game!');
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      while (true) {
        this.human.choose();
        this.computer.choose();
        this.displayMoves();

        let winner = this.rules.winner(this.human.move, this.computer.move);

        if (this.rules.pointsToWin > 1) {
          this.updateScore(winner);
          this.displayWinner(winner, 'round');
          this.displayScore();
        }

        if ((this.rules.pontsToWin < 2) ||
            ((winner !== 'tie') && (this[winner].roundsWon === this.rules.pointsToWin))) {
          this.displayWinner(winner, 'game');
          break;
        }
      }
      if (!this.playAgain()) break;
      this.human.roundsWon = 0;
      this.computer.roundsWon = 0;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();