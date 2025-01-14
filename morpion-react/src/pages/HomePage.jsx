import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to Morpion</h1>
      <p className="homepage-description">Choose your game mode and start playing!</p>
      <div className="button-group">
        <button className="game-button classic-mode">Classic Mode</button>
        <button className="game-button variant-mode">Variant Mode</button>
      </div>
    </div>
  );
}

export default HomePage;
