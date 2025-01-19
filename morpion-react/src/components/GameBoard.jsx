import React from 'react';
import PropTypes from 'prop-types';
import GameCell from './GameCell';
import './GameBoard.css'; // Assurez-vous d'avoir ce fichier CSS pour les animations

function GameBoard({ board, onCellClick, moves, gameMode }) {
  // Fonction pour déterminer si une cellule doit avoir un effet de disparition
  const getCellClass = (index) => {
    if (gameMode === 'variant' && moves.includes(index)) {
      return 'disappearing'; // Classe CSS pour l'animation de disparition
    }
    return '';
  };

  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          className={`game-cell ${getCellClass(index)}`} // Ajout de la classe CSS si nécessaire
        />
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf([null, 'X', 'O'])).isRequired, // Le plateau de jeu
  onCellClick: PropTypes.func.isRequired, // Fonction appelée lors du clic sur une cellule
  moves: PropTypes.arrayOf(PropTypes.number).isRequired, // Liste des indices de mouvements
  gameMode: PropTypes.string.isRequired, // Mode actuel (classique ou variant)
};

export default GameBoard;
