import PropTypes from 'prop-types';



function FooterGame({ scores }) {
  return (
    <footer className="game-scoreboard">
      <div className="score x-score">
      <p>X(You)</p>
        <span>{scores.X}</span>
      </div>
      <div className="score ties-score">
        <p>TIES</p>
        <span>{scores.ties}</span>
      </div>
      <div className="score o-score">
        <p>O(CPU)</p>
        <span>{scores.O}</span>
      </div>
    </footer>
  );
}
FooterGame.propTypes = {
  scores: PropTypes.shape({
    X: PropTypes.number.isRequired,
    O: PropTypes.number.isRequired,
    ties: PropTypes.number.isRequired
  }).isRequired
};

export default FooterGame;
