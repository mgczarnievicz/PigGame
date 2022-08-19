'use strict';

//Player 0
const scorePlayer0_Element = document.getElementById('score--0');
const currentScore0_Element = document.getElementById('current--0');
const player0_Element = document.querySelector('.player--0');

//Player 1
const scorePlayer1_Element = document.querySelector('#score--1');
const currentScore1_Element = document.querySelector('#current--1');
const player1_Element = document.querySelector('.player--1');

// General Buttons
const btnNew = document.querySelector('.btn--new');
const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Dice Image
const dice_Element = document.querySelector('.dice');

//Variable
let currentScore = 0;
let activePlayer = 0;
const score = [0, 0];
let playing = true;

function resetScorePlayers() {
  scorePlayer0_Element.textContent = 0;
  scorePlayer1_Element.textContent = 0;
}

function resetCurrentScorePlayers() {
  currentScore0_Element.textContent = 0;
  currentScore1_Element.textContent = 0;
}

function hiddenDice() {
  dice_Element.classList.add('hidden');
}

function resetPlayers() {
  player0_Element.classList.add('player--active');
  player0_Element.classList.remove('player--winner');
  player1_Element.classList.remove('player--active', 'player--winner');
}

resetScorePlayers();
resetCurrentScorePlayers();
hiddenDice();

function showDice(dice) {
  dice_Element.classList.remove('hidden');
  dice_Element.src = 'dice-' + dice + '.png';
}

function setCurrentScore(score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
}

function switchPlayer() {
  currentScore = 0;
  setCurrentScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0_Element.classList.toggle('player--active');
  player1_Element.classList.toggle('player--active');
}

function setScore(score) {
  document.getElementById(`score--${activePlayer}`).textContent = score;
}

function setWinner() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  hiddenDice();
  playing = false;
}

btnDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6 + 1);
    console.log('dice', dice);
    showDice(dice);

    if (dice !== 1) {
      currentScore += dice;
      setCurrentScore(currentScore);
    } else {
      // Dice is 1, so player loose there curret score and next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    setScore(score[activePlayer]);

    if (score[activePlayer] >= 100) {
      //Active player Player Winns!
      setWinner();
    } else {
      //Other Player turn.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  //Reset all players scores
  currentScore = 0;
  activePlayer = 0;
  score[0] = 0;
  score[1] = 0;

  playing = true;

  resetScorePlayers();
  resetCurrentScorePlayers();
  resetPlayers();
  hiddenDice();
});
