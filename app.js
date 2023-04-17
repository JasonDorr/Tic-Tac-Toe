/* eslint-disable no-use-before-define */
const Player = (sign) => {
  const playerSign = sign;

  const getSign = () => playerSign;

  return {
    getSign,
  };
};

const gameBoard = (() => {
  // Creates the Gameboard
  const board = new Array(9);

  const getField = (index) => board[index];

  const setField = (index, sign) => {
    board[index] = sign;
  };

  const restart = () => {
    displayController.toggleModal();
    gameController.gameOver(false);
    for (let i = 0; i < board.length; i++) {
      setField(i, "");
    }
    displayController.removeDisplay();
    displayController.buildDisplay();
  };

  return {
    getField,
    setField,
    restart,
  };
})();

const displayController = (() => {
  const fieldCells = Array.from(document.querySelectorAll(".board-cell"));
  const playerDisplay = document.querySelector(".player");
  const gameOverModal = document.querySelector(".gameOver");
  const winnerMessage = document.querySelector(".gameOverMessage");
  const restartBtn = document.querySelector(".restart");

  playerDisplay.textContent = `X's Turn`;

  const updateBoard = () => {
    for (let i = 0; i < fieldCells.length; i++) {
      fieldCells[i].textContent = gameBoard.getField(i);
    }
  };

  const toggleModal = (gameCheck) => {
    if (gameCheck === "draw") {
      playerDisplay.textContent = "Game Over";
      winnerMessage.textContent = "Draw!";
      gameOverModal.classList.toggle("hidden");
    } else if (gameCheck === "X" || gameCheck === "O") {
      playerDisplay.textContent = "Game Over";
      winnerMessage.textContent = `${gameCheck} is the Winner!`;
      gameOverModal.classList.toggle("hidden");
    } else {
      gameOverModal.classList.toggle("hidden");
      playerDisplay.textContent = "X's Turn";
    }
  };

  const buildDisplay = () => {
    fieldCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (gameController.gameOver() || e.target.textContent !== "") return;

        gameController.playRound(parseInt(e.target.dataset.index, 10));
        playerDisplay.textContent = `${gameController.getCurrentPlayer()}'s Turn`;
        updateBoard();
      });
    });
  };

  buildDisplay();

  const removeDisplay = () => {
    fieldCells.forEach((cell) => {
      cell.removeEventListener("click", (e) => {
        if (gameController.gameOver() || e.target.textContent !== "") return;

        gameController.playRound(parseInt(e.target.dataset.index, 10));
        playerDisplay.textContent = `${gameController.getCurrentPlayer()}'s Turn`;
        updateBoard();
      });
      cell.textContent = "";
    });
  };

  restartBtn.addEventListener("click", gameBoard.restart);

  return {
    toggleModal,
    buildDisplay,
    removeDisplay,
  };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const getCurrentPlayer = () =>
    round % 2 === 1 ? playerX.getSign() : playerO.getSign();

  const playRound = (index) => {
    gameBoard.setField(index, getCurrentPlayer());

    if (isWinner(index)) {
      gameOver(getCurrentPlayer());
      displayController.toggleModal(isOver);
      round = 1;
      return;
    }

    if (isDraw(round)) {
      gameOver("draw");
      displayController.toggleModal(isOver);
      round = 1;
      return;
    }
    round++;
  };

  const isDraw = (roundCount) => roundCount === 9;

  const isWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayer()
        )
      );
  };

  const gameOver = (boolean) => {
    isOver = boolean;
    return isOver;
  };

  return {
    getCurrentPlayer,
    playRound,
    gameOver,
  };
})();
