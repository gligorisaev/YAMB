import React from "react";
import "./ResetButton.css";

const ResetButton = ({ setScores }) => {
    const handleReset = () => {
        const confirmReset = window.confirm("Are you sure you want to reset the scores?");
        if (confirmReset) {
            setScores({});
        }
    };

    return (
        <button onClick={handleReset} className="reset-button">
            Reset Scores
        </button>
    );
};

export default ResetButton;
