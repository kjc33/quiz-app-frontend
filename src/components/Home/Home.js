import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.scss";

const HomePage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
  
    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get("https://quiz-app-backend-32v6.onrender.com/api/users");
          // Sort users based on score in descending order
          const sortedUsers = response.data.sort((a, b) => b.score - a.score);
          // Get the top ten users
          const topTen = sortedUsers.slice(0, 10);
          setLeaderboard(topTen);
        } catch (error) {
          console.error("Error fetching leaderboard:", error);
        }
      };
  
      fetchLeaderboard();
    }, []);
  
    return (
      <div>
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default HomePage;