import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import ModeSelection from '../components/ModeSelection';
import PlayerSelection from '../components/PlayerSelection';

function HomePage() {
  const [selectedMode, setSelectedMode] = useState(null); // Mode sélectionné (classique ou variant)
  const [isCpuOpponent, setIsCpuOpponent] = useState(false); // Indique si l'utilisateur joue contre le CPU
  const navigate = useNavigate();

  // Gérer la sélection du mode (classique ou variant, avec ou sans CPU)
  const handleModeSelection = (mode, playAgainstCpu = false) => {
    setSelectedMode(mode);
    setIsCpuOpponent(playAgainstCpu); // Met à jour si le mode inclut un CPU
  };

  // Gérer la sélection des joueurs et rediriger vers la page de jeu
  const handlePlayerSelection = ({ player1, player2 }) => {
    const cpuPlayerName = 'CPU'; // Nom par défaut pour le CPU
    const player2Name = isCpuOpponent ? cpuPlayerName : player2;

    console.log(`Mode: ${selectedMode}, Player 1: ${player1}, Player 2: ${player2Name}`);
    navigate(`/game?mode=${selectedMode}&player1=${player1}&player2=${player2Name}`);
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to Morpion</h1>
      {!selectedMode ? (
        // Étape de sélection du mode
        <ModeSelection onModeSelect={handleModeSelection} />
      ) : (
        // Étape de sélection des joueurs
        <PlayerSelection
          mode={selectedMode}
          isCpuOpponent={isCpuOpponent}
          onPlayerSelect={handlePlayerSelection}
        />
      )}
    </div>
  );
}

export default HomePage;
