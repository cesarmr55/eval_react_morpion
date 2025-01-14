import CircleSVG from '../assets/circle.svg';
import CrossSVG from '../assets/cross.svg';
import PropTypes from 'prop-types';


function FooterGame({ scores }) {
  return (
    <footer className="game-scoreboard">
      <div className="score x-score">
        <img src={CrossSVG} alt="Cross" className="score-icon" />
        <span>{scores.X}</span>
      </div>
      <div className="score ties-score">
        <p>TIES</p>
        <span>{scores.ties}</span>
      </div>
      <div className="score o-score">
        <img src={CircleSVG} alt="Circle" className="score-icon" />
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
