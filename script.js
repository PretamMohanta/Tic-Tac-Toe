const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// Initialize the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // Reset UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;

  // Remove all winning lines
  document.querySelectorAll(".line").forEach((line) => line.remove());
}

initGame();

// Swap player turns
function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check if the game has a winner or is tied
function checkGameOver() {
  let winner = "";

  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      winner = gameGrid[position[0]];

      // Disable pointer events
      boxes.forEach((box) => (box.style.pointerEvents = "none"));

      // Create and display winning line
      const line = document.createElement("div");
      line.classList.add("line");

      const ticTacToeContainer = document.querySelector(".tic-tac-toe");

      // Check horizontal rows
      if (position[0] === 0 && position[1] === 1 && position[2] === 2) {
        line.classList.add("horizontal-line", "top");
      } else if (position[0] === 3 && position[1] === 4 && position[2] === 5) {
        line.classList.add("horizontal-line", "middle");
      } else if (position[0] === 6 && position[1] === 7 && position[2] === 8) {
        line.classList.add("horizontal-line", "bottom");
      }

      // Check vertical columns
      if (position[0] === 0 && position[1] === 3 && position[2] === 6) {
        line.classList.add("vertical-line", "left");
      } else if (position[0] === 1 && position[1] === 4 && position[2] === 7) {
        line.classList.add("vertical-line", "middle");
      } else if (position[0] === 2 && position[1] === 5 && position[2] === 8) {
        line.classList.add("vertical-line", "right");
      }

      // Check diagonal lines
      if (position[0] === 0 && position[1] === 4 && position[2] === 8) {
        line.classList.add("diagonal-line-left");
      } else if (position[0] === 2 && position[1] === 4 && position[2] === 6) {
        line.classList.add("diagonal-line-right");
      }

      ticTacToeContainer.appendChild(line);
    }
  });

  if (winner) {
    gameInfo.innerText = `Winner Player - ${winner}`;
    newGameBtn.classList.add("active");
    return;
  }

  // Check for a tie
  if (gameGrid.filter((box) => box !== "").length === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
  }
}

// Handle box click
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

// Add event listeners
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

newGameBtn.addEventListener("click", initGame);