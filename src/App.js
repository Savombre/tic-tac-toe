import { useState } from 'react';

function Square({ value, onSquareClick }){


  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext,setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X"
    }
    else {
      nextSquares[i] = "O"
    }
    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


function calculateWinner(squares){
  const horizontal1 = [0,1,2];
  const horizontal2 = [3,4,5];
  const horizontal3 = [6,7,8];
  
  const vertical1 = [0,3,6];
  const vertical2 = [1,4,7];
  const vertical3 = [2,5,8];

  const diag1 = [0,4,8];
  const diag2 = [6,4,2];

  const victorylines = [horizontal1, horizontal2, horizontal3, vertical1, vertical2, vertical3, diag1, diag2];

  for (let line of victorylines){
    const [a,b,c] = line
      // If there is no empty box
    if (squares[a] && squares[b] && squares[c]){
      // If they have the same sign
      if (squares[a]==squares[b] && squares[b]==squares[c]){
        return squares[a];
      }
    }
  }
  return null;
}