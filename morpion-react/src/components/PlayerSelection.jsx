import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PlayerSelection({ onPlayerSelect }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlayerNames((prevNames) => ({
      ...prevNames,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Par défaut, si les noms ne sont pas renseignés
    const player1 = playerNames.player1 || 'Joueur 1';
    const player2 = selectedMode === 'cpu' ? 'CPU' : playerNames.player2 || 'Joueur 2';

    onPlayerSelect({ mode: selectedMode, player1, player2 });
  };

  return (
    <div className="player-selection">
      {!selectedMode ? (
        <>
          <p className="homepage-description">Who would you like to play against?</p>
          <div className="button-group">
            <button className="game-button cpu-player" onClick={() => handleModeSelection('cpu')}>
              Play against CPU
            </button>
            <button className="game-button local-player" onClick={() => handleModeSelection('local')}>
              Play with Local Player
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleFormSubmit} className="player-form">
          {selectedMode === 'cpu' ? (
            <div>
              <label htmlFor="player1">Your name:</label>
              <input
                type="text"
                id="player1"
                name="player1"
                value={playerNames.player1}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="player1">Player 1 name:</label>
                <input
                  type="text"
                  id="player1"
                  name="player1"
                  value={playerNames.player1}
                  onChange={handleInputChange}
                  placeholder="Enter Player 1 name"
                />
              </div>
              <div>
                <label htmlFor="player2">Player 2 name:</label>
                <input
                  type="text"
                  id="player2"
                  name="player2"
                  value={playerNames.player2}
                  onChange={handleInputChange}
                  placeholder="Enter Player 2 name"
                />
              </div>
            </>
          )}
          <button type="submit">Start Game</button>
        </form>
      )}
    </div>
  );
}

PlayerSelection.propTypes = {
  onPlayerSelect: PropTypes.func.isRequired,
};

export default PlayerSelection;
