import CircleSVG from '../assets/circle.svg';
import CrossSVG from '../assets/cross.svg';
import PropTypes from 'prop-types';

function GameCell({ value, onClick }) {
  return (
    <div className="game-cell" onClick={onClick}>
      {value === 'X' && <img src={CrossSVG} alt="Cross" />}
      {value === 'O' && <img src={CircleSVG} alt="Circle" />}
    </div>
  );
}
GameCell.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']).isRequired, 
  onClick: PropTypes.func.isRequired 
};

export default GameCell;
