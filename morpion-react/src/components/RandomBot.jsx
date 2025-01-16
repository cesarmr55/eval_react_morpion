import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function RandomBot({ board, isBotTurn, onBotPlay }) {
  useEffect(() => {
    if (isBotTurn) {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((index) => index !== null);

      if (availableMoves.length > 0) {
        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        
        const botDelay = setTimeout(() => {
          onBotPlay(randomIndex);
        }, 500); 

        return () => clearTimeout(botDelay); 
      }
    }
  }, [isBotTurn, board, onBotPlay]);

  return null;
}

RandomBot.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf([null, 'X', 'O'])).isRequired, 
  isBotTurn: PropTypes.bool.isRequired, 
  onBotPlay: PropTypes.func.isRequired, 
};

export default RandomBot;
