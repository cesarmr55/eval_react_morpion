import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import HeaderGame from '../components/HeaderGame';
import FooterGame from '../components/FooterGame';
import Popup from '../components/Popup';
import RandomBot from '../components/RandomBot';
import PopupResume from '../components/PopupResume';
import './GamePage.css';

function GamePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const updateLeaderboard = (playerName, wins) => {
    
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
    
    const playerIndex = savedLeaderboard.findIndex((player) => player.name === playerName);
    if (playerIndex !== -1) {
      savedLeaderboard[playerIndex].wins = Math.max(savedLeaderboard[playerIndex].wins, wins);
    } else {
      savedLeaderboard.push({ name: playerName, wins });
    }
  
    
    const sortedLeaderboard = savedLeaderboard.sort((a, b) => b.wins - a.wins);
  
    
    localStorage.setItem('leaderboard', JSON.stringify(sortedLeaderboard));
  };
  

  const player1Name = queryParams.get('player1') || 'Player 1';
  const player2Name = queryParams.get('player2') || 'Player 2';
  const mode = queryParams.get('mode') || 'classic'; // Default to classic mode

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [streak, setStreak] = useState(0);
  const [showResumePopup, setShowResumePopup] = useState(false);

  const [xPositions, setXPositions] = useState([]); // Track X positions in variant mode
  const [oPositions, setOPositions] = useState([]); // Track O positions in variant mode

  const checkWinner = (board) => {
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
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkForTie = (board, gameMode) => {
    if (gameMode === 'classic' && board.every((cell) => cell !== null)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const result = checkWinner(board);
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
      }
    } else if (checkForTie(board, mode)) {
      setWinner('tie');
      setScores((prevScores) => ({ ...prevScores, ties: prevScores.ties + 1 }));
    }
  }, [board, mode]);

  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem('currentGame'));
    if (savedGame && savedGame.board.some((cell) => cell !== null) && !savedGame.winner) {
      setShowResumePopup(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'currentGame',
      JSON.stringify({ board, isXTurn, scores, winner, streak })
    );
  }, [board, isXTurn, scores, winner, streak]);

  const handleCellClick = (index) => {
    if (board[index] || winner || (mode === 'cpu' && !isXTurn)) return;

    const newBoard = [...board];

    if (isXTurn) {
      if (mode === 'variant' && xPositions.length === 3) {
        const [oldest] = xPositions;
        newBoard[oldest] = null;
        setXPositions((prev) => prev.slice(1));
      }
      newBoard[index] = 'X';
      setXPositions((prev) => [...prev, index]);
    } else {
      if (mode === 'variant' && oPositions.length === 3) {
        const [oldest] = oPositions;
        newBoard[oldest] = null;
        setOPositions((prev) => prev.slice(1));
      }
      newBoard[index] = 'O';
      setOPositions((prev) => [...prev, index]);
    }

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
    setXPositions([]);
    setOPositions([]);
  };

  const resumeGame = () => {
    const savedGame = JSON.parse(localStorage.getItem('currentGame'));
    if (savedGame) {
      setBoard(savedGame.board);
      setIsXTurn(savedGame.isXTurn);
      setScores(savedGame.scores);
      setWinner(savedGame.winner);
      setStreak(savedGame.streak);
    }
    setShowResumePopup(false);
  };

  const startNewGame = () => {
    localStorage.removeItem('currentGame');
    resetBoard();
    setShowResumePopup(false);
  };

  return (
    <div className="game-container">
      {showResumePopup && (
        <PopupResume
          onResumeGame={resumeGame}
          onStartNewGame={startNewGame}
        />
      )}
      <HeaderGame isXTurn={isXTurn} onReset={resetBoard} />
      <GameBoard board={board} onCellClick={handleCellClick} mode={mode} />
      {mode === 'cpu' && (
        <RandomBot board={board} isBotTurn={!isXTurn && !winner} onBotPlay={handleCellClick} />
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
