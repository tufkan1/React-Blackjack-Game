import React from 'react';

const Player = ({ playerId, balance, bet }) => {
    return (
        <div className="player-container">
            <p>Balance: ${balance}</p>
            <p>Current Bet: ${bet}</p>
            <style jsx>{`
        .player-container {
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
        </div>
    );
};

export default Player;
