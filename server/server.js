const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (can be restricted later)
        methods: ["GET", "POST"]
    }
});

let gameState = {
    players: ["Gigo", "Sonja", "Zane", "Risto"],
    scores: {} // Stores all player scores
};

// Handle new WebSocket connections
io.on("connection", (socket) => {
    console.log("A player connected:", socket.id);

    // Send the current game state to the new player
    socket.emit("gameState", gameState);

    // Listen for score updates
    socket.on("updateScore", ({ player, category, col, value }) => {
        if (!gameState.scores[player]) {
            gameState.scores[player] = {};
        }
        if (!gameState.scores[player][category]) {
            gameState.scores[player][category] = {};
        }
        gameState.scores[player][category][col] = value;

        // Broadcast updated scores to all players
        io.emit("gameState", gameState);
    });

    // Reset game
    socket.on("resetGame", () => {
        gameState.scores = {};
        io.emit("gameState", gameState);
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
