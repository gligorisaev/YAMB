const saveScores = (scores) => {
    localStorage.setItem("yatzy_scores", JSON.stringify(scores));
};

const loadScores = () => {
    const savedScores = localStorage.getItem("yatzy_scores");
    return savedScores ? JSON.parse(savedScores) : {};
};

export { saveScores, loadScores };
