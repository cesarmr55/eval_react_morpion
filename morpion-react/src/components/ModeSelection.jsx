import React from 'react';
import PropTypes from 'prop-types';

function ModeSelection({ onModeSelect }) {
  return (
    <div className="mode-selection">
      <p className="homepage-description">Choose your game mode and start playing!</p>
      <div className="button-group">
        {/* Mode classique */}
        <button
          className="game-button classic-mode"
          onClick={() => onModeSelect('classic')}
        >
          Classic Mode
        </button>

        {/* Mode variant */}
        <button
          className="game-button variant-mode"
          onClick={() => onModeSelect('variant')}
        >
          Variant Mode
        </button>

        {/* Mode classique contre CPU */}
        <button
          className="game-button classic-cpu-mode"
          onClick={() => onModeSelect('classic', true)}
        >
          Classic vs CPU
        </button>

        {/* Mode variant contre CPU */}
        <button
          className="game-button variant-cpu-mode"
          onClick={() => onModeSelect('variant', true)}
        >
          Variant vs CPU
        </button>
      </div>
    </div>
  );
}

ModeSelection.propTypes = {
  onModeSelect: PropTypes.func.isRequired, // Fonction appelée lors de la sélection du mode
};

export default ModeSelection;
