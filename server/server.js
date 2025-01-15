const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // ✅ Allows connections from any origin
        methods: ["GET", "POST"]
    }
});

// ✅ Fix Content Security Policy (CSP) issue
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src *; connect-src * ws: wss:;");
    next();
});

let gameState = { scores: {} };

io.on("connection", (socket) => {
    console.log("✅ Player connected:", socket.id);
    socket.emit("gameState", gameState);

    socket.on("updateScore", ({ player, category, col, value }) => {
        if (!gameState.scores[player]) gameState.scores[player] = {};
        if (!gameState.scores[player][category]) gameState.scores[player][category] = {};
        gameState.scores[player][category][col] = value;

        io.emit("gameState", gameState);
    });

    socket.on("disconnect", () => {
        console.log("❌ Player disconnected:", socket.id);
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("✅ WebSocket server running on port 3000 and accessible externally!");
});
