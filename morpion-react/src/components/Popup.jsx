import CircleSVG from '../assets/circle.svg';
import CrossSVG from '../assets/cross.svg';
import PropTypes from 'prop-types';

function Popup({ winner, onQuit, onNext }) {
  return (
    <div className="game-popup">
      <div className="popup-content">
        {winner !== 'tie' ? (
          <>
            <img src={winner === 'X' ? CrossSVG : CircleSVG} alt={winner} className="popup-icon" />
            <h2>{winner} TAKES THE ROUND</h2>
          </>
        ) : (
          <h2>ITS A TIE!</h2>
        )}
        <div className="popup-buttons">
          <button onClick={onQuit}>QUIT</button>
          <button onClick={onNext}>NEXT ROUND</button>
        </div>
      </div>
    </div>
  );
}
Popup.propTypes = {
  winner: PropTypes.oneOf(['X', 'O', 'tie']).isRequired,  
  onQuit: PropTypes.func.isRequired,  
  onNext: PropTypes.func.isRequired  
};


export default Popup;
