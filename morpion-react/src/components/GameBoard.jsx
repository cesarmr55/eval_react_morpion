import GameCell from './GameCell';
import PropTypes from 'prop-types';


function GameBoard({ board, onCellClick }) {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <GameCell key={index} value={cell} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
}
GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired, 
  onCellClick: PropTypes.func.isRequired 
};

export default GameBoard;
