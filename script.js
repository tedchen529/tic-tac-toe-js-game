// TODO: Sound effects!

const board = document.querySelector("#board");
const cells = document.querySelectorAll("[data-cell]");
// NOTE: Attribute selector
const restartBtn = document.querySelector("#restart-btn");
const classX = "x";
const classO = "o";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const resultDisplay = document.querySelector("#result-display");
let oTurn;

startGame();

function startGame() {
  resultDisplay.innerHTML = "Start Playing!";
  oTurn = false;
  // NOTE: X starts the game
  // TODO: Choose who goes first?
  cells.forEach((cell) => {
    cell.classList.remove(classX);
    cell.classList.remove(classO);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
    // NOTE: Prevent players from clicking on a cell twice
  });
  showHover();
}

function showHover() {
  board.classList.remove(classX);
  board.classList.remove(classO);
  if (oTurn) {
    board.classList.add(classO);
  } else {
    board.classList.add(classX);
  }
}

function handleClick(e) {
  const cell = e.target;
  // Q: target vs currentTarget?
  const currentClass = oTurn ? classO : classX;
  // NOTE: Place mark >> Check win >> Check draw >> Switch turns >> End game
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
    // NOTE: Game does not end in draw
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
      cell.classList.add("disabled");
    });
    board.classList.remove(classX);
    board.classList.remove(classO);
    // NOTE: Prevent players from continuing the game after results are shown
  } else if (checkDraw()) {
    endGame(true);
    // NOTE: Game ends in draw
  } else {
    switchTurns();
    showHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// NOTE: Checking for winning matches
// NOTE: some() and every()
function checkWin(currentClass) {
  return winCombos.some((combo) => {
    return combo.every((i) => {
      return cells[i].classList.contains(currentClass);
    });
  });
}

// NOTE: Ensure every cell is occupied
// NOTE: Converting NodeList to array
function checkDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(classX) || cell.classList.contains(classO);
  });
}

function switchTurns() {
  oTurn = !oTurn;
}

function endGame(isDraw) {
  if (isDraw) {
    resultDisplay.innerText = `It's a Draw!`;
  } else {
    resultDisplay.innerText = `${oTurn ? "O" : "X"} Wins!`;
  }
}

// NOTE: Wipes the board
restartBtn.addEventListener("click", startGame);

// TODO: Scoreboard (Player 1 vs Player 2)
// TODO: Pick who goes first
// TODO: Confetti animation
