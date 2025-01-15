const saveScores = (scores) => {
    localStorage.setItem("yatzy_scores", JSON.stringify(scores));
};

const loadScores = (player) => {
    const savedScores = localStorage.getItem(`scores-${player}`);
    return savedScores ? JSON.parse(savedScores) : {}; // ✅ Returns an empty object if no data exists
};

export { saveScores, loadScores };
