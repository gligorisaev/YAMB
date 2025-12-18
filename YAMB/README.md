# 🎲 Yamb Scorecard Web App

A web-based scorecard application for playing Yamb (Yugoslav variant of Yahtzee) with friends!

## Features

- ✅ Add multiple players
- ✅ Classic Yamb scorecard with all columns: Down (↓), Up/Down (↕), Up (↑), N, O, R
- ✅ All rows: 1, 2, 3, 4, 5, 6, SUM, MAX, MIN, SUM, T20, S30, F40, K50, Y60
- ✅ Automatic calculation of sums
- ✅ Player tabs for easy switching between players
- ✅ Local storage - your game is saved automatically
- ✅ Responsive design - works on desktop and mobile
- ✅ Beautiful gradient UI

## How to Run

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and go to `http://localhost:3000`

The app will automatically open in your default browser!

## How to Play

### Adding Players
1. Type a player's name in the input field
2. Click "Add Player" or press Enter
3. Add as many players as you want

### Recording Scores
1. Click on a player's tab to view their scorecard
2. Enter scores in the input fields
3. The SUM rows will calculate automatically
4. Scores are saved automatically in your browser

### Yamb Column Rules

- **Down (↓)**: Must fill from top to bottom (1 → 6)
- **Up/Down (↕)**: Can fill from either direction
- **Up (↑)**: Must fill from bottom to top (6 → 1)
- **N (Free)**: Can fill any cell at any time
- **O (Announcement)**: Must announce the cell before rolling
- **R (Hand)**: Only one roll allowed (no re-rolls)

### Score Categories

**Upper Section (1-6)**: Sum of all dice showing that number
- If sum ≥ 60, you get a bonus!

**Lower Section**:
- **MAX**: Sum of all five dice (maximum possible)
- **MIN**: Sum of all five dice (minimum possible)
- **T20 (Trips)**: Sum of all dice if you have three of a kind
- **S30 (Straight)**: 30 points for a small straight (1-2-3-4-5 or 2-3-4-5-6)
- **F40 (Full House)**: 40 points for three of a kind + pair
- **K50 (Four of a Kind/Kare)**: 50 points for four of a kind
- **Y60 (Yamb)**: 60 points for five of a kind

### Managing the Game
- **Switch players**: Click on player tabs
- **Remove a player**: Click the × next to their name in the tab
- **Reset game**: Click "Reset Game" button (clears all data)

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build folder will contain the optimized files ready for deployment.

## Technologies Used

- React 18
- Create React App
- CSS3 with Gradients and Animations
- LocalStorage for data persistence

## Game Rules Reference

Yamb is a dice game played with 5 dice. Players take turns rolling the dice (up to 3 rolls per turn) and must strategically fill their scorecard according to column rules. The goal is to maximize your total score across all columns.

Enjoy your game! 🎲🎉
