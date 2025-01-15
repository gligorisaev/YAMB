import React, { useState, useEffect } from "react";
import { saveScores, loadScores } from "../utils/localStorage";
import { calculateSumWithBonus, calculateSumMaxMin, calculateSumWithoutBonus } from "../utils/calculateScores";
// import ResetButton from "./ResetButton";

import "./Scorecard.css";

const MAX_VALUES = { "1": 5, "2": 10, "3": 15, "4": 20, "5": 25, "6": 30 };

const Scorecard = () => {
    const [scores, setScores] = useState(() => loadScores());
    const [highlightedCell, setHighlightedCell] = useState(null); // Stores which field is selected for highlighting

    const columns = ["↓", "↓↑", "↑", "N", "O", "R"];

    useEffect(() => {
        saveScores(scores);
    }, [scores]);

    const sum1to6 = {};
    const sumMaxMin = {};
    const sumT20Y60 = {};

    columns.forEach(col => {
        sum1to6[col] = calculateSumWithBonus(scores, ["1", "2", "3", "4", "5", "6"], col);
        sumMaxMin[col] = calculateSumMaxMin(scores, col);
        sumT20Y60[col] = calculateSumWithoutBonus(scores, ["T 20", "S 30", "F 40", "K 50", "Y 60"], col);
    });

    sum1to6["R"] = sum1to6["↓"];
    sumMaxMin["R"] = sumMaxMin["↓"];
    sumT20Y60["R"] = sumT20Y60["↓"];

    const grandTotalR = Object.keys(scores)
        .filter(category => !category.includes("SUM") && category !== "Total")
        .map(category => parseInt(scores[category]?.["R"]) || 0)
        .reduce((acc, val) => acc + val, 0) + sum1to6["R"] + sumMaxMin["R"] + sumT20Y60["R"];

    const handleChange = (event, category, col) => {
        setScores({
            ...scores,
            [category]: {
                ...scores[category],
                [col]: event.target.value,
            },
        });
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all scores?")) {
            setScores({});
            setHighlightedCell(null);
        }
    };

    // ✅ Selecting a field (stores its ID)
    const selectField = (category, col) => {
        setHighlightedCell(`${category}-${col}`);
    };

    // ✅ Zvezda button toggles highlighting for the selected field
    const toggleHighlight = () => {
        if (highlightedCell) {
            const [category, col] = highlightedCell.split("-");
            setScores(prevScores => ({
                ...prevScores,
                [category]: {
                    ...prevScores[category],
                    [`${col}_highlighted`]: !prevScores[category]?.[`${col}_highlighted`],
                },
            }));
        }
    };

    const categories = [
        "1", "2", "3", "4", "5", "6",
        "Σ(1-6)", "MAX", "MIN", "Σ(↓↑)",
        "T 20", "S 30", "F 40", "K 50", "Y 60",
        "Σ(T-Y)", "Total"
    ];

    return (
        <div className="scorecard">
            <h2>Yatzy Scorecard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cat</th>
                        {columns.map((col, index) => <th key={index}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, rowIndex) => (
                        <tr key={rowIndex}>
                            <td><strong>{category}</strong></td>
                            {columns.map((col, colIndex) => {
                                const value = scores[category]?.[col] || "";
                                const isMax = MAX_VALUES[category] && parseInt(value) === MAX_VALUES[category];
                                const isZero = value === "0";
                                // const key = `${category}-${col}`;
                                const isHighlighted = scores[category]?.[`${col}_highlighted`]; // ✅ Uses state from Zvezda button

                                return (
                                    <td key={colIndex} 
                                        className={`${isMax ? "highlight-max" : ""} ${isZero ? "highlight-zero" : ""} ${isHighlighted ? "highlight-toggle" : ""}`}
                                        onClick={() => selectField(category, col)} // ✅ Clicking only selects the field
                                    >
                                        {category === "Σ(1-6)" ? (
                                            <span>{sum1to6[col]}</span>
                                        ) : category === "Σ(↓↑)" ? (
                                            <span>{sumMaxMin[col]}</span>
                                        ) : category === "Σ(T-Y)" ? (
                                            <span>{sumT20Y60[col]}</span>
                                        ) : category === "Total" && col === "R" ? (
                                            <span><strong>{grandTotalR}</strong></span>
                                        ) : category.includes("Σ") || category === "Total" ? (
                                            <span>-</span>
                                        ) : (
                                            <input
                                                type="number"
                                                value={value}
                                                onChange={(e) => handleChange(e, category, col)}
                                                className="no-border-input"
                                            />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons-container">
                <button className="toggle-button" onClick={toggleHighlight}>Zvezda</button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default Scorecard;
