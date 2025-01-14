import React, { useState, useEffect } from "react";
import { saveScores, loadScores } from "../utils/localStorage";
import { calculateSumWithBonus, calculateSumMaxMin, calculateSumWithoutBonus } from "../utils/calculateScores";
import ResetButton from "./ResetButton";
import "./Scorecard.css";

const MAX_VALUES = { "1": 5, "2": 10, "3": 15, "4": 20, "5": 25, "6": 30 }; // Max possible values for 1-6

const Scorecard = () => {
    const [scores, setScores] = useState(() => loadScores());

    const columns = ["↓", "↓↑", "↑", "N", "O", "R"];

    useEffect(() => {
        saveScores(scores);
    }, [scores]);

    // Calculate SUM fields dynamically for each column
    const sum1to6 = {};
    const sumMaxMin = {};
    const sumT20Y60 = {};

    columns.forEach(col => {
        sum1to6[col] = calculateSumWithBonus(scores, ["1", "2", "3", "4", "5", "6"], col);
        sumMaxMin[col] = calculateSumMaxMin(scores, col);
        sumT20Y60[col] = calculateSumWithoutBonus(scores, ["T 20", "S 30", "F 40", "K 50", "Y 60"], col);
    });

    // Ensure SUM values are set for column "R"
    sum1to6["R"] = sum1to6["↓"];
    sumMaxMin["R"] = sumMaxMin["↓"];
    sumT20Y60["R"] = sumT20Y60["↓"];

    // Calculate Grand Total (sum of column "R" values)
    const grandTotalR = Object.keys(scores)
        .filter(category => !category.includes("SUM") && category !== "GRAND TOTAL")
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

    const categories = [
        "1", "2", "3", "4", "5", "6",
        "SUM (1-6)", "MAX", "MIN", "SUM (MAX-MIN)",
        "T 20", "S 30", "F 40", "K 50", "Y 60",
        "SUM (T20-Y60)", "GRAND TOTAL"
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
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className={MAX_VALUES[category] && scores[category]?.[col] == MAX_VALUES[category] ? "highlight-max" : ""}>
                                    {category === "SUM (1-6)" ? (
                                        <span>{sum1to6[col]}</span>
                                    ) : category === "SUM (MAX-MIN)" ? (
                                        <span>{sumMaxMin[col]}</span>
                                    ) : category === "SUM (T20-Y60)" ? (
                                        <span>{sumT20Y60[col]}</span>
                                    ) : category === "GRAND TOTAL" && col === "R" ? (
                                        <span><strong>{grandTotalR}</strong></span>
                                    ) : category.includes("SUM") || category === "GRAND TOTAL" ? (
                                        <span>-</span> // Make SUM fields non-editable
                                    ) : col === "R" ? (
                                        <input
                                            type="number"
                                            value={scores[category]?.[col] || ""}
                                            onChange={(e) => handleChange(e, category, col)}
                                            className="no-arrows"
                                        />
                                    ) : (
                                        <input
                                            type="number"
                                            value={scores[category]?.[col] || ""}
                                            onChange={(e) => handleChange(e, category, col)}
                                            className="no-arrows"
                                        />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ResetButton setScores={setScores} />
        </div>
    );
};

export default Scorecard;
