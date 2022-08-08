const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
// Create an array of winning situations in tic-tac-toe game
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text"
);
// Declare variable turn, if its true, its O turn, if its false, its X turn
let circleTurn;

// Add sound effects
let audioPlaceMark = new Audio(
  "./audio/mixkit-page-forward-single-chime-1107.wav"
);
let winningAudio = new Audio("./audio/mixkit-achievement-bell-600.wav");
let drawAudio = new Audio("./audio/mixkit-funny-fail-low-tone-2876.wav");

//Start the game
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    //Once:true means only fire the eventListener once
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}
// Create a function handleClick
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //placeMark
  placeMark(cell, currentClass);
  audioPlaceMark.play();
  //Check for Win
  if (checkWin(currentClass)) {
    endGame(false);
    winningAudio.play();
    //Check for Draw
  } else if (isDraw()) {
    endGame(true);
    drawAudio.play();
  } else {
    //Switch tunrs
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}
function isDraw() {
  // Structure cellElements into an array so that it can have .every method
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  // Set circleTurn to the opposite so that it will be swapping every single time
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
