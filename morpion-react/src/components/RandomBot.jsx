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
        }, 500); // Petite pause pour rendre le bot plus réaliste

        return () => clearTimeout(botDelay); // Nettoyage pour éviter les effets secondaires
      }
    }
  }, [board, isBotTurn, onBotPlay]);

  return null;
}

RandomBot.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf([null, 'X', 'O'])).isRequired,
  isBotTurn: PropTypes.bool.isRequired,
  onBotPlay: PropTypes.func.isRequired,
};

export default RandomBot;
