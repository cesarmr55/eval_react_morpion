import PropTypes from 'prop-types';

function FooterGame({ scores, player1Name, player2Name }) {
  return (
    <footer className="game-scoreboard">
      <div className="score x-score">
        <p>{player1Name} (X)</p>
        <span>{scores.X}</span>
      </div>
      <div className="score ties-score">
        <p>TIES</p>
        <span>{scores.ties}</span>
      </div>
      <div className="score o-score">
        <p>{player2Name} (O)</p>
        <span>{scores.O}</span>
      </div>
    </footer>
  );
}

FooterGame.propTypes = {
  scores: PropTypes.shape({
    X: PropTypes.number.isRequired,
    O: PropTypes.number.isRequired,
    ties: PropTypes.number.isRequired,
  }).isRequired,
  player1Name: PropTypes.string.isRequired,
  player2Name: PropTypes.string.isRequired,
};

export default FooterGame;
