const readline = require('readline-sync');

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'lizard', 'spock'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

function createPlayer() {
  return {
    move: null,
  };
}

function createScoreBoard() {
  return {
    winningScore: 5,
    humanScore: 0,
    computerScore: 0,
    lastRoundWinner: null,
    
    updateScore(humanMove, computerMove) {
      if (humanMove === computerMove) {
        this.lastRoundWinner = 'tie';
      
      } else if ((humanMove === 'rock' && computerMove === 'scissors') ||
                 (humanMove === 'rock' && computerMove === 'lizard') ||
                 (humanMove === 'paper' && computerMove === 'rock') ||
                 (humanMove === 'paper' && computerMove === 'spock') ||
                 (humanMove === 'scissors' && computerMove === 'paper') ||
                 (humanMove === 'scissors' && computerMove === 'lizard') ||                 
                 (humanMove === 'spock' && computerMove === 'scissors') ||
                 (humanMove === 'spock' && computerMove === 'rock')) {
        this.humanScore += 1;
        this.lastRoundWinner = 'human';
      } else {
        this.computerScore += 1;
        this.lastRoundWinner = 'computer';
      }
    },
  
  displayScore() {
    console.log(`Your score: ${this.humanScore}\nComputer score: ${this.computerScore}`);
  }
  };
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  score: createScoreBoard(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },
  
  gameWinner() {
    let humanWon = this.score.humanScore === this.score.winningScore;
    let computerWon = this.score.computerScore === this.score.winningScore;
     
    return humanWon || computerWon;
  },
    
  displayRoundWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (this.score.lastRoundWinner === 'human') {
      console.log('You win this round!');
    } else if (this.score.lastRoundWinner === 'computer') {
      console.log('Computer wins this round!');
    } else {
      console.log("It's a tie");
    }
  },
  
  displayGameWinner() {
    if (this.score.lastRoundWinner === 'player') {
      console.log('You have won the game!');
    } else {
      console.log('The computer has won the game.');
    }
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
        this.score.updateScore(this.human.move, this.computer.move);
        this.displayRoundWinner();
        this.score.displayScore();
        
        if (this.gameWinner()) {
          this.displayGameWinner();//create
          console.log('    -----     ');
          break;
        }
        console.log('    -----     ');
      }
      
    if (!this.playAgain()) break;
    this.score.humanScore = 0;
    this.score.computerScore = 0;
    this.score.lastRoundWinner = null;
    } 
    
    this.displayGoodbyeMessage();
  }
};

RPSGame.play();