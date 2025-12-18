import React, { useState, useEffect } from 'react';
import './App.css';
import Scorecard from './components/Scorecard';

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [activePlayer, setActivePlayer] = useState(0);

  // Load players from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem('yambPlayers');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  // Save players to localStorage whenever they change
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('yambPlayers', JSON.stringify(players));
    }
  }, [players]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim(),
        scores: initializeScores(),
        manualMarks: initializeManualMarks()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const initializeScores = () => {
    const columns = ['down', 'updown', 'up', 'n', 'o', 'r'];
    const rows = ['1', '2', '3', '4', '5', '6', 'sum1', 'max', 'min', 'sum2', 't20', 's30', 'f40', 'k50', 'y60', 'sum3'];
    
    const scores = {};
    columns.forEach(col => {
      scores[col] = {};
      rows.forEach(row => {
        scores[col][row] = null;
      });
    });
    return scores;
  };

  const initializeManualMarks = () => {
    const columns = ['down', 'updown', 'up', 'n', 'o', 'r'];
    const rows = ['1', '2', '3', '4', '5', '6', 'max', 'min', 't20', 's30', 'f40', 'k50', 'y60'];
    
    const marks = {};
    columns.forEach(col => {
      marks[col] = {};
      rows.forEach(row => {
        marks[col][row] = false;
      });
    });
    return marks;
  };

  const updateScore = (playerId, column, row, value) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const newScores = { ...player.scores };
        newScores[column] = { ...newScores[column], [row]: value };
        return { ...player, scores: newScores };
      }
      return player;
    }));
  };

  const toggleManualMark = (playerId, column, row) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        // Initialize manualMarks if it doesn't exist
        if (!player.manualMarks) {
          player.manualMarks = initializeManualMarks();
        }
        const newMarks = { ...player.manualMarks };
        if (!newMarks[column]) {
          newMarks[column] = {};
        }
        newMarks[column] = { ...newMarks[column], [row]: !newMarks[column][row] };
        return { ...player, manualMarks: newMarks };
      }
      return player;
    }));
  };

  const removePlayer = (playerId) => {
    setPlayers(players.filter(player => player.id !== playerId));
    if (activePlayer >= players.length - 1) {
      setActivePlayer(Math.max(0, players.length - 2));
    }
  };

  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset all scores?')) {
      setPlayers([]);
      setActivePlayer(0);
      localStorage.removeItem('yambPlayers');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎲 Yamb Scorecard 🎲</h1>
      </header>

      <div className="player-management">
        <div className="add-player">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Enter player name"
          />
          <button onClick={addPlayer}>Add Player</button>
        </div>
        {players.length > 0 && (
          <button className="reset-button" onClick={resetGame}>Reset Game</button>
        )}
      </div>

      {players.length > 0 && (
        <div className="player-tabs">
          {players.map((player, index) => (
            <button
              key={player.id}
              className={`player-tab ${activePlayer === index ? 'active' : ''}`}
              onClick={() => setActivePlayer(index)}
            >
              {player.name}
            </button>
          ))}
        </div>
      )}

      {players.length > 0 && (
        <Scorecard
          player={players[activePlayer]}
          updateScore={updateScore}
          toggleManualMark={toggleManualMark}
        />
      )}

      {players.length === 0 && (
        <div className="welcome-message">
          <p>Add players to start the game!</p>
        </div>
      )}
    </div>
  );
}

export default App;
