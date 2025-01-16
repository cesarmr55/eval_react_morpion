import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import HeaderGame from '../components/HeaderGame';
import FooterGame from '../components/FooterGame';
import Popup from '../components/Popup';
import './GamePage.css';

function GamePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Récupération des noms des joueurs depuis les paramètres d'URL
  const player1Name = queryParams.get('player1') || 'Player 1';
  const player2Name = queryParams.get('player2') || 'Player 2';

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  useEffect(() => {
    // Charger les scores depuis le localStorage
    const savedScores = JSON.parse(localStorage.getItem('scores')) || { X: 0, O: 0, ties: 0 };
    setScores(savedScores);
  }, []);

  useEffect(() => {
    // Sauvegarder les scores dans le localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return 'tie';
    }
    return null;
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === 'X' || result === 'O') {
        setScores((prevScores) => ({ ...prevScores, [result]: prevScores[result] + 1 }));
      } else if (result === 'tie') {
        setScores((prevScores) => ({ ...prevScores, ties: prevScores.ties + 1 }));
      }
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
  };

  return (
    <div className="game-container">
      <HeaderGame isXTurn={isXTurn} onReset={resetBoard} />
      <GameBoard board={board} onCellClick={handleCellClick} />
      {winner && (
        <Popup
          winner={winner === 'tie' ? 'It\'s a tie!' : `${winner === 'X' ? player1Name : player2Name} wins!`}
          onQuit={() => window.location.href = '/'}
          onNext={resetBoard}
        />
      )}
      <FooterGame scores={scores} player1Name={player1Name} player2Name={player2Name} />
    </div>
  );
}

export default GamePage;
