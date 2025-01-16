import React from 'react';
import PropTypes from 'prop-types';

function ModeSelection({ onModeSelect }) {
  return (
    <div className="mode-selection">
      <p className="homepage-description">Choose your game mode and start playing!</p>
      <div className="button-group">
        <button className="game-button classic-mode" onClick={() => onModeSelect('classic')}>
          Classic Mode
        </button>
        <button className="game-button variant-mode" onClick={() => onModeSelect('variant')}>
          Variant Mode
        </button>
      </div>
    </div>
  );
}
ModeSelection.propTypes = {
  onModeSelect: PropTypes.func.isRequired, 
};

export default ModeSelection;
