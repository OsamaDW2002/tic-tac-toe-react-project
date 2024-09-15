import {useState} from "react";
import Player from "../component/Player.jsx";
import GameBoard from "../component/GameBoard.jsx";
import Log from "../component/Log.jsx";
import {WINNING_COMBINATIONS} from "../winning-combinations.js";
import GameOver from "../component/GameOver.jsx";
function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
    currentPlayer = 'O';
  return currentPlayer;
}

const initialGameBoard= [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
//  const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }

  }
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex){
   // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {

      const currentPlayer = derivedActivePlayer(prevTurns);
      return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
    });
  }
  function hadelRestart(){
    setGameTurns([]);
  }
  return (
  <main>
    <div id= 'game-container'>
      <ol id= 'players' className={'highlight-player'}>
        <Player name={'Player 1'} symbol={'X'} isActive={activePlayer === 'X'}/>
        <Player name={'Player 2'} symbol={'O'} isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={hadelRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns} />
  </main>
  )
}

export default App
