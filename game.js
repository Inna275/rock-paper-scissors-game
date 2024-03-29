'use strict';

const readline = require('node:readline').promises;

const ROUNDS_PROMPT = 'Enter the number of rounds: ';
const CHOICE_PROMPT = 'Enter your choice (rock, paper, or scissors): ';
const REPLAY_PROMPT = 'Play again? (yes/no): ';
const BYE_MESSAGE = 'Goodbye! Thanks for playing.';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gameRules = {
  rock: {
    beats: 'scissors',
    message: 'Rock crushes scissors',
  },
  paper: {
    beats: 'rock',
    message: 'Paper covers rock',
  },
  scissors: {
    beats: 'paper',
    message: 'Scissors cut paper',
  },
};

const getRandomOption = () => {
  const options = Object.keys(gameRules);
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const getComputerChoice = () => {
  const choice = getRandomOption();
  console.log(`Computer chooses ${choice}`);
  return choice;
};

const getNumberOfRounds = async () => {
  const rounds = await rl.question(ROUNDS_PROMPT);
  return rounds;
};

const getUserChoice = async () => {
  const choice = await rl.question(CHOICE_PROMPT);
  return choice;
};

const resetScores = () => ({ userScore: 0, computerScore: 0 });

const determineRoundWinner = (userChoice, computerChoice) => {
  const isUserWin = gameRules[userChoice].beats === computerChoice;
  const isComputerWin = gameRules[computerChoice].beats === userChoice;
  return isUserWin ? 'user' : isComputerWin ? 'computer' : 'tie';
};

const displayRoundResult = (winner, userChoice, computerChoice) => {
  const messages = {
    user: gameRules[userChoice].message,
    computer: gameRules[computerChoice].message,
    tie: 'The round is a draw!',
  };
  console.log(messages[winner]);
};

const updateScores = (winner, user, computer) => {
  const newUserScore = user + (winner === 'user');
  const newComputerScore = computer + (winner === 'computer');
  return { userScore: newUserScore, computerScore: newComputerScore };
};

const playRound = async ({ userScore, computerScore }) => {
  const userChoice = await getUserChoice();
  const computerChoice = getComputerChoice();
  const roundWinner = determineRoundWinner(userChoice, computerChoice);
  displayRoundResult(roundWinner, userChoice, computerChoice);
  const updatedScores = updateScores(roundWinner, userScore, computerScore);
  return updatedScores;
};

const determineWinner = ({ userScore, computerScore }) => {
  console.log(
    `Game over! Your score: ${userScore}, computer score: ${computerScore}`,
  );
  const winner =
    userScore > computerScore ? 'You win!' : 
    userScore < computerScore ? 'Computer win!': 
    'It\'s a tie!';
  console.log(winner);
};

const endGame = () => {
  console.log(BYE_MESSAGE);
  rl.close();
};

const handleReplay = async () => {
  const answer = await rl.question(REPLAY_PROMPT);
  answer.toLowerCase() === 'yes' ? playGame() : endGame();
};

const playGame = async () => {
  let scores = resetScores();
  const rounds = await getNumberOfRounds();
  for (let i = 1; i <= rounds; i++) {
    console.log(`Round ${i} of ${rounds}:`);
    scores = await playRound(scores);
  }
  determineWinner(scores);
  await handleReplay();
};

playGame();
