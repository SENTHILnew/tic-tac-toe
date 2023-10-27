const gameContainer = document.querySelector("[data-control='gameContainer']");
const resultElement = document.querySelector("[data-control='winnerMessage']");
const rulesMap = {
  3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
};

let input;
let currentPlayer = "X";
let gameLog;
let rules;

setInput(3);
resetGame();

function resetGame() {
  gameContainer.style.pointerEvents = "auto";
  resultElement.classList.add("hide");
  gameLog = [];
  currentPlayer = "X";
  createBoxes(input * input);
}

function setInput(inputFromSelection) {
  input = inputFromSelection;
  bindRulesBasedOnInput();
}

function bindRulesBasedOnInput() {
  rules = rulesMap[input];
}

function createBoxes(n) {
  const boxes = [];
  for (let i = 0; i < n; i++) {
    boxes.push(box(i));
  }
  gameContainer.replaceChildren(...boxes);
}

function box(index) {
  const box = document.createElement("div");
  box.className = `box box_${index}`;
  box.setAttribute("data-control", `box_${index}`);
  box.onclick = (_event) => {
    updateBox(index);
    checkWinner(gameLog);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };
  return box;
}

function updateBox(index) {
  const box = document.querySelector(`[data-control='box_${index}']`);
  box.innerText = currentPlayer;
  gameLog[index] = currentPlayer;
}

function checkWinner(gameLog) {
  const isGameDraw = checkDraw();
  const isWinner = calculateWinner(gameLog);
  if (isWinner) {
    isWinner.forEach((index) => {
      const element = document.querySelector(`[data-control='box_${index}']`);
      element.classList.add("strike-through");
    });
    gameContainer.style.pointerEvents = "none";
    resultElement.classList.remove("hide");
    resultElement.innerText = `Winner is ${currentPlayer}`;
  } else if (isGameDraw) {
    gameContainer.style.pointerEvents = "none";
    resultElement.classList.remove("hide");
    resultElement.innerText = `Match draw click on reset to start again`;
  }
}

function checkDraw() {
  if (gameLog.length !== 9) return false;
  for (let i = 0; i < gameLog.length; i++) {
    if (!gameLog[i]) {
      return false;
    }
  }
  return true;
}

function calculateWinner(gameLog) {
  for (let i = 0; i < rules.length; i++) {
    const [a, b, c] = rules[i];
    if (gameLog[a] && gameLog[a] === gameLog[b] && gameLog[a] === gameLog[c]) {
      return rules[i];
    }
  }
  return null;
}
