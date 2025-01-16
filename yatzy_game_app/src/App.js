import React, { useState } from "react";
import Scorecard from "./components/Scorecard";

const App = () => {
  const players = ["Gigo", "Sonja", "Zane", "Riki"];
  const [selectedPlayer, setSelectedPlayer] = useState(null); // The player playing the game
  const [currentViewPlayer, setCurrentViewPlayer] = useState(null); // The scoreboard currently being viewed

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setCurrentViewPlayer(player);
  };

  const handleViewOtherPlayer = (player) => {
    setCurrentViewPlayer(player);
  };

  const handleBackToMyBoard = () => {
    setCurrentViewPlayer(selectedPlayer);
  };

  return (
    <div className="app-container">
      {!selectedPlayer ? (
        <div className="player-selection">
          <h1>Select Your Player</h1>
          {players.map((player) => (
            <button key={player} onClick={() => handlePlayerSelect(player)}>
              {player}
            </button>
          ))}
        </div>
      ) : (
        <div className="scoreboard-container">
          {players.map((player) => (
            <div
              key={player}
              style={{ display: currentViewPlayer === player ? "block" : "none" }}
            >
              <Scorecard player={player} editable={selectedPlayer === player} />
            </div>
          ))}

          {currentViewPlayer !== selectedPlayer && (
            <button onClick={handleBackToMyBoard}>Back to My Scoreboard</button>
          )}

          <div className="view-other-buttons">
            {players.map(
              (player) =>
                player !== currentViewPlayer && (
                  <button
                    key={player}
                    onClick={() => handleViewOtherPlayer(player)}
                    disabled={player === selectedPlayer}
                  >
                    View {player}'s Board
                  </button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
