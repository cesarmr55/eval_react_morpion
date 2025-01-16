import React, { useEffect, useState } from 'react';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Charger les données du leaderboard depuis le localStorage
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    // Trier les joueurs par nombre de victoires décroissant
    const sortedLeaderboard = savedLeaderboard.sort((a, b) => b.wins - a.wins);
    setLeaderboard(sortedLeaderboard);
  }, []);

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length === 0 ? (
            <tr>
              <td colSpan="3">No records yet. Start playing to enter the leaderboard!</td>
            </tr>
          ) : (
            leaderboard.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.wins}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
