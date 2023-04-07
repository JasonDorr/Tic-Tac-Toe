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

  return {
    getField,
    setField,
  };
})();

const displayController = (() => {
  const fieldCells = Array.from(document.querySelectorAll(".board-cell"));

  const updateBoard = () => {
    for (let i = 0; i < fieldCells.length; i++) {
      fieldCells[i].textContent = gameBoard.getField(i);
    }
  };

  fieldCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (gameController.gameOver() || e.target.textContent !== "") return;

      gameController.playRound(parseInt(e.target.dataset.index));

      updateBoard();
    });
  });
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
      isOver = true;
      return;
    }

    if (isDraw(round)) {
      isOver = true;
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

  const gameOver = () => isOver;

  return {
    getCurrentPlayer,
    playRound,
    gameOver,
  };
})();
