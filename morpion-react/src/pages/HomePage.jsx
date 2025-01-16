import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import ModeSelection from '../components/ModeSelection';
import PlayerSelection from '../components/PlayerSelection';

function HomePage() {
  const [selectedMode, setSelectedMode] = useState(null);
  const navigate = useNavigate();

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handlePlayerSelection = ({ mode, player1, player2 }) => {
    console.log(`Mode: ${mode}, Player 1: ${player1}, Player 2: ${player2}`);
    // Redirection vers la page de jeu avec les paramètres mode et noms des joueurs
    navigate(`/game?mode=${mode}&player1=${player1}&player2=${player2}`);
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to Morpion</h1>
      {!selectedMode ? (
        <ModeSelection onModeSelect={handleModeSelection} />
      ) : (
        <PlayerSelection onPlayerSelect={handlePlayerSelection} />
      )}
    </div>
  );
}

export default HomePage;
