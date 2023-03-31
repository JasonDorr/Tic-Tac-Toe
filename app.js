const Gameboard = (() => {
  // DOM Elements

  const playArea = document.querySelector("#game-board");

  // Creates the Gameboard
  const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const render = () => {
    board.forEach((cell) => {
      cell.toString();
      const newCell = document.createElement("div");
      newCell.textContent = cell;
      newCell.className = "board-cell";
      playArea.appendChild(newCell);
    });
  };

  render();

  return {
    board,
  };
})();

console.log(Gameboard.board);
