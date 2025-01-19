import React from 'react';
import PropTypes from 'prop-types';

function PopupResume({ onResumeGame, onStartNewGame }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Resume your last game?</h2>
        <div className="popup-buttons">
          <button onClick={onResumeGame}>Resume</button>
          <button onClick={onStartNewGame}>Start New Game</button>
        </div>
      </div>
    </div>
  );
}

PopupResume.propTypes = {
  onResumeGame: PropTypes.func.isRequired,
  onStartNewGame: PropTypes.func.isRequired,
};

export default PopupResume;
