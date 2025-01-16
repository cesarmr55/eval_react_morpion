import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='app'>
      <NavigationBar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/leaderboard' element={<LeaderboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;