import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/leaderboard'>Leaderboard</Link></li>
        <li><Link to='/game'>Game</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;