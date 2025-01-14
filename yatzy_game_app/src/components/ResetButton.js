import React from "react";
import "./ResetButton.css";

const ResetButton = ({ setScores }) => {
    const resetScores = () => {
        // Reset all scores
        setScores({});

        // Remove all highlighted cells
        document.querySelectorAll(".highlight-toggle").forEach((cell) => {
            cell.classList.remove("highlight-toggle");
        });
    };

    return (
        <button onClick={resetScores} className="reset-button">
            Reset Scores
        </button>
    );
};

export default ResetButton;
