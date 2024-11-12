const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/* Variables for elements for Tic-Tac-Toe game */
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const turnIndicator = document.getElementById('currentTurn')
const displayPlayerOneWins = document.getElementById('player1Wins');
const displayPlayerTwoWins = document.getElementById('player2Wins');

let circleTurn;

/* Counters for calculating wins */
let player1Wins = 0;
let player2Wins = 0;

/* Initialization of the board */
startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
	circleTurn = false
	cellElements.forEach(cell => {
	  cell.classList.remove(X_CLASS)
	  cell.classList.remove(CIRCLE_CLASS)
	  cell.classList.remove('winning-cell')
	  cell.removeEventListener('click', handleClick)
	  cell.addEventListener('click', handleClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
	winningMessageTextElement.innerText = ''
	displayCurrentTurn()
}

/* Handling click for the game of Tic-TAC-Toe */
function handleClick(e) {
	const cell = e.target
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
	  endGame(false)
	} else if (isDraw()) {
	  endGame(true)
	} else {
	  swapTurns()
	  setBoardHoverClass()
	  displayCurrentTurn()
	}
}

/* defining the function for when the game ends */
function endGame(draw) {
	if (draw) {
	  winningMessageTextElement.innerText = 'Draw!';
	} else {
	  if (circleTurn) {
		player2Wins++;
		winningMessageTextElement.innerText = "Player 2 Wins!";
	  } else {
		player1Wins++;
		winningMessageTextElement.innerText = "Player 1 Wins!";
	  }
	  displayWinCounts();
	}
  
	winningMessageElement.classList.add('show');
  }

/* check if it's a draw */
function isDraw() {
	return [...cellElements].every(cell => {
	  return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
	})
}

/* Make a turn */
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	circleTurn = !circleTurn
  }

/* Make the game more interactive */

function setBoardHoverClass() {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)
	if (circleTurn) {
	  board.classList.add(CIRCLE_CLASS)
	} else {
	  board.classList.add(X_CLASS)
	}
 }

/* Check if it's a win */
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
	  const isWin = combination.every(index => {
		return cellElements[index].classList.contains(currentClass);
	  });
  
	  if (isWin) {
		combination.forEach(index => {
		  cellElements[index].classList.add('winning-cell');
		});
	  }
  
	  return isWin;
	});
  }

/* Display Player Turn */
function displayCurrentTurn() {
	if (circleTurn) {
	  turnIndicator.textContent = "Player 2's Turn";
	} else {
	  turnIndicator.textContent = "Player 1's Turn";
	}
  }

/* Display the win counts */  
function displayWinCounts() {
	displayPlayerOneWins.textContent = `Player 1 Total Wins: ${player1Wins}`;
	displayPlayerTwoWins.textContent = `Player 2 Total Wins: ${player2Wins}`;
  }


