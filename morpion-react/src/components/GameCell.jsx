import CircleSVG from '../assets/circle.svg';
import CrossSVG from '../assets/cross.svg';
import PropTypes from 'prop-types';

function GameCell({ value, onClick, className }) {
  return (
    <div className={`game-cell ${className}`} onClick={onClick}>
      {value === 'X' && <img src={CrossSVG} alt="Cross" />}
      {value === 'O' && <img src={CircleSVG} alt="Circle" />}
    </div>
  );
}

GameCell.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]).isRequired, 
  onClick: PropTypes.func.isRequired, 
  className: PropTypes.string,
};

GameCell.defaultProps = {
  className: '', 
};

export default GameCell;
