import React, { useState } from "react";
import "./ToggleHighlightButton.css";

const ToggleHighlightButton = () => {
    const [activeCell, setActiveCell] = useState(null);

    // Track the currently focused input field
    const handleFocus = (event) => {
        setActiveCell(event.target.closest("td"));
    };

    // Toggle highlight for the active cell
    const toggleHighlight = () => {
        if (activeCell) {
            activeCell.classList.toggle("highlight-toggle");
        }
    };

    // Attach event listener to all input fields when component mounts
    React.useEffect(() => {
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
            ADD STAR
        </button>
    );
};

export default ToggleHighlightButton;
