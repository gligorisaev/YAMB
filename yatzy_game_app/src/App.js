import React, { useState } from "react";
import Scorecard from "./components/Scorecard";

const App = () => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [viewingPlayer, setViewingPlayer] = useState(null);

    const players = ["Gigo", "Sonja", "Zane", "Riki"];

    const handleSelectPlayer = (player) => {
        setCurrentPlayer(player);
        setViewingPlayer(player);
    };

    const handleViewPlayer = (player) => {
        setViewingPlayer(player);
    };

    const handleBackToMyCard = () => {
        setViewingPlayer(currentPlayer);
    };

    if (!currentPlayer) {
        return (
            <div className="player-selection">
                <h1>Select Your Player</h1>
                {players.map((player) => (
                    <button key={player} onClick={() => handleSelectPlayer(player)}>
                        {player}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="app">
            <h1>YAMB</h1>
            <Scorecard player={viewingPlayer} />
            <div className="buttons-container">
                <button onClick={handleBackToMyCard} disabled={viewingPlayer === currentPlayer}>
                    Back to My Card
                </button>
                {players
                    .filter((player) => player !== currentPlayer)
                    .map((player) => (
                        <button key={player} onClick={() => handleViewPlayer(player)}>
                            View {player}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default App;
