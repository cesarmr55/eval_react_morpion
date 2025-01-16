import React, { useState } from 'react';
import './HomePage.css';
import ModeSelection from '../components/ModeSelection';
import PlayerSelection from '../components/PlayerSelection';

function HomePage() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handlePlayerSelection = (playerType) => {
    console.log(`Selected Mode: ${selectedMode}, Player: ${playerType}`);
    // Redirection vers la page de jeu avec le mode et le type de joueur
    window.location.href = `/game?mode=${selectedMode}&player=${playerType}`;
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
