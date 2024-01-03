'use strict';

const readline = require('node:readline').promises;

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
