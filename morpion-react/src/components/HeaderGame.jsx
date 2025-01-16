import PropTypes from "prop-types";

function HeaderGame({ isXTurn, onReset }) {
  return (
    <header className="game-header">
      <div className="game-turn">{isXTurn ? 'X TURN' : 'O TURN'}</div>
      <button className="game-reset" onClick={onReset}>
        ↻
      </button>
    </header>
  );
}
HeaderGame.propTypes = {
  isXTurn: PropTypes.bool.isRequired,  
  onReset: PropTypes.func.isRequired   
};

export default HeaderGame;
