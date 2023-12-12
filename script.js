// TODO: Sound effects!

const cells = document.querySelectorAll("[data-cell]");
// NOTE: Attribute selector
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
let oTurn;

startGame();

function startGame() {
  oTurn = false;
  // NOTE: X starts the game
  // TODO: Choose who goes first?
  cells.forEach((cell) => {
    cell.classList.remove(classX);
    cell.classList.remove(classO);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick);
  });
}

function handleClick(e) {
  const cell = e.target;
  // Q: target vs currentTarget?
  const currentClass = oTurn ? classO : classX;
  // NOTE: Place mark >> Check win >> Switch turns
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    console.log("Game ends in victory (but haven't implemented draws)");
  } else {
    switchTurns();
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

function switchTurns() {
  oTurn = !oTurn;
}