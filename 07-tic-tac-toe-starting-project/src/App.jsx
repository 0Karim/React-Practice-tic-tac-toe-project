import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GamerOver from "./components/GameOver.jsx";


const intialGameBoard = [
    [null,null,null],   
    [null,null,null],   
    [null,null,null],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [players , setPlayers] = useState({
    X:'Player 1',
    O:'Player 2',
  })
  const [gameTurns, setGameTurns]= useState([])
    // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  
  let gameBoard = [...intialGameBoard.map(array => [...array])] ;
  
  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      
      gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS)
  {
    console.log(combination);
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
      console.log(firstSquareSymbol);
     const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
      console.log(secondSquareSymbol);      
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
      console.log(thirdSquareSymbol);      

      if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  
  function handleRestart(){
    setGameTurns([]);
  }
  

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns=[
        {square: {row: rowIndex, col: colIndex} , player: currentPlayer},
        ...prevTurns        
      ];
      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    });
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player intialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player intialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GamerOver winner={winner} onRestart={handleRestart} />}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App
