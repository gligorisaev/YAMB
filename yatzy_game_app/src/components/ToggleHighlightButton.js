import React, { useState, useEffect } from "react";
import "./ToggleHighlightButton.css";

const ToggleHighlightButton = ({ scores, setScores }) => {
    const [activeCell, setActiveCell] = useState(null);

    // Track the currently focused input field
    const handleFocus = (event) => {
        setActiveCell(event.target.closest("td"));
    };

    // Toggle highlight for the active cell
    const toggleHighlight = () => {
        if (activeCell) {
            activeCell.classList.toggle("highlight-toggle");
            updateRColumn();
        }
    };

    // Function to update column R with 100 for every 3 orange-highlighted fields
    const updateRColumn = () => {
        const highlightedCells = document.querySelectorAll(".highlight-toggle").length;
        const starBonus = Math.floor(highlightedCells / 3) * 100;

        let updatedScores = { ...scores };
        let count = 0;

        Object.keys(updatedScores).forEach((category) => {
            if (!category.includes("SUM") && category !== "GRAND TOTAL") {
                if (count < starBonus / 100) {
                    updatedScores[category]["R"] = 100;
                    count++;
                } else {
                    updatedScores[category]["R"] = "";
                }
            }
        });

        setScores(updatedScores);
    };

    // Attach event listener to all input fields when component mounts
    useEffect(() => {
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            input.addEventListener("focus", handleFocus);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", handleFocus);
            });
        };
    }, []);

    return (
        <button onClick={toggleHighlight} className="toggle-button">
            Add Star
        </button>
    );
};

export default ToggleHighlightButton;
