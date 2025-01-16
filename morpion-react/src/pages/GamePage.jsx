import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import HeaderGame from '../components/HeaderGame';
import FooterGame from '../components/FooterGame';
import Popup from '../components/Popup';
import RandomBot from '../components/RandomBot'; 
import './GamePage.css';

function GamePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const player1Name = queryParams.get('player1') || 'Player 1';
  const player2Name = queryParams.get('player2') || 'Player 2';
  const mode = queryParams.get('mode') || 'local'; 

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores')) || { X: 0, O: 0, ties: 0 };
    setScores(savedScores);
  }, []);

  useEffect(() => {
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
    if (board[index] || winner || (mode === 'cpu' && !isXTurn)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === 'X') {
        setScores((prevScores) => ({ ...prevScores, X: prevScores.X + 1 }));
        if (mode === 'cpu') setStreak((prevStreak) => prevStreak + 1);
      } else if (result === 'O') {
        if (mode === 'cpu') {
          updateLeaderboard(player1Name, streak);
          setStreak(0);
        }
        setScores((prevScores) => ({ ...prevScores, O: prevScores.O + 1 }));
      } else if (result === 'tie') {
        setScores((prevScores) => ({ ...prevScores, ties: prevScores.ties + 1 }));
      }
    }
  };

  const handleBotPlay = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = 'O'; // Le bot joue en tant que "O"
    setBoard(newBoard);
    setIsXTurn(true);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === 'X') {
        setScores((prevScores) => ({ ...prevScores, X: prevScores.X + 1 }));
      } else if (result === 'O') {
        updateLeaderboard(player1Name, streak);
        setScores((prevScores) => ({ ...prevScores, O: prevScores.O + 1 }));
        setStreak(0);
      } else if (result === 'tie') {
        setScores((prevScores) => ({ ...prevScores, ties: prevScores.ties + 1 }));
      }
    }
  };

  const updateLeaderboard = (playerName, wins) => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedLeaderboard = [...savedLeaderboard, { name: playerName, wins }];
    const sortedLeaderboard = updatedLeaderboard.sort((a, b) => b.wins - a.wins);
    localStorage.setItem('leaderboard', JSON.stringify(sortedLeaderboard));
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
      {mode === 'cpu' && (
        <RandomBot board={board} isBotTurn={!isXTurn && !winner} onBotPlay={handleBotPlay} />
      )}
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
