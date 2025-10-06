import { useState } from "react";

function Square({ value, onSquareClick, isHighlighted }) {
  const classes = ["square"];
  if (isHighlighted) {
    classes.push("highlight");
  }

  return (
    <button className={classes.join(" ")} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const winningLine = winnerInfo ? winnerInfo.line : [];
  const isBoardFull = squares.every((square) => square !== null);

  function handleClick(i) {
    if (winnerInfo || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status;
  if (winnerInfo) {
    status = "Winner: " + winnerInfo.player;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRows = [];
  for (let row = 0; row < 3; row += 1) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col += 1) {
      const index = row * 3 + col;
      const isHighlighted = winningLine.includes(index);
      squaresInRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isHighlighted={isHighlighted}
        />
      );
    }
    boardRows.push(
      <div className="board-row" key={row}>
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending((prev) => !prev);
  }

  const moves = history.map((squares, move) => {
    const previousSquares = move > 0 ? history[move - 1] : null;
    const location = previousSquares
      ? getMoveLocation(previousSquares, squares)
      : null;
    const locationLabel = location
      ? ` (${location.row}, ${location.col})`
      : "";

    if (move === currentMove) {
      return (
        <li key={move}>
          <span>{`You are at move #${move}${locationLabel}`}</span>
        </li>
      );
    }

    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {`${description}${locationLabel}`}
        </button>
      </li>
    );
  });

  const movesToDisplay = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button className="sort-button" onClick={toggleSortOrder}>
          Sort moves: {isAscending ? "Descending" : "Ascending"}
        </button>
        <ol>{movesToDisplay}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function getMoveLocation(previousSquares, currentSquares) {
  for (let i = 0; i < currentSquares.length; i += 1) {
    if (previousSquares[i] !== currentSquares[i]) {
      return {
        row: Math.floor(i / 3) + 1,
        col: (i % 3) + 1,
      };
    }
  }
  return null;
}
