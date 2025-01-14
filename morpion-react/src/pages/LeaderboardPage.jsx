import React, { useEffect, useState } from 'react';


function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  
  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
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
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
