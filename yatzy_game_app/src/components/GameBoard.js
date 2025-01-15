import React, { useState } from "react";
import Scorecard from "./Scorecard";
import "./GameBoard.css";

const players = ["Gigo", "Sonja", "Zane", "Risto"];

const GameBoard = () => {
  const [activePlayer, setActivePlayer] = useState("Gigo");

  return (
    <div className="game-board">
      {players.map((player) => (
        <Scorecard key={player} player={player} isEditable={player === activePlayer} />
      ))}
      <div className="player-controls">
        {players.map((player) => (
          <button key={player} onClick={() => setActivePlayer(player)}>
            Play as {player}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
