import React from "react";
import "./ColorButtons.css";

const ColorButtons = ({ setSelectedColor }) => {
    return (
        <div className="color-buttons">
            <button className="color-red" onClick={() => setSelectedColor("red")}>Red</button>
            <button className="color-orange" onClick={() => setSelectedColor("orange")}>Orange</button>
            <button className="color-none" onClick={() => setSelectedColor("")}>None</button>
        </div>
    );
};

export default ColorButtons;
