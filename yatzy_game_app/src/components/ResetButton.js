import React from "react";
import { saveScores } from "../utils/localStorage";
import "./ResetButton.css";

const ResetButton = ({ setScores }) => {
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all scores?")) {
            const resetScores = {};
            setScores(resetScores);
            saveScores(resetScores);
        }
    };

    return (
        <button className="reset-button" onClick={handleReset}>
            Reset Scores
        </button>
    );
};

export default ResetButton;
