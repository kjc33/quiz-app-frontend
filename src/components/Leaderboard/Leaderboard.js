import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Leaderboard.scss";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get("https://quiz-app-backend-32v6.onrender.com/api/users");
          // Sort users based on score in descending order
          const sortedUsers = response.data.sort((a, b) => b.score - a.score);
          // Get the top fifteen users
          const topFifteen = sortedUsers.slice(0, 15);
          setLeaderboard(topFifteen);
        } catch (error) {
          console.error("Error fetching leaderboard:", error);
        }
      };
  
      fetchLeaderboard();
    }, []);

  return (
    <section className="leaderboard" id="top-scores">
      <div className="container flex flex-column medium-gap max-width">
        <h2>Top Scores</h2>
        <table className="leaderboard-table">
          <thead className="leaderboard-head">
            <tr>
              <th className="th-rank">Rank</th>
              <th className="th-user-name">User Name</th>
              <th className="th-score">Score</th>
            </tr>
          </thead>
          <tbody className="leaderboard-body">
            {leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td className="td-rank">{index + 1}</td>
                <td className="td-user-name">{user.user_name}</td>
                <td className="td-user-score">{user.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
