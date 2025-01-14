const getValue = (scores, key, col) => {
    return parseInt(scores?.[key]?.[col]) || 0;
};

const calculateSumWithBonus = (scores, keys, col) => {
    const sum = keys.reduce((total, key) => total + getValue(scores, key, col), 0);
    return sum >= 60 ? sum + 30 : sum; // Add 30 bonus if sum is 60 or more
};

const calculateSumMaxMin = (scores, col) => {
    const max = getValue(scores, "MAX", col);
    const min = getValue(scores, "MIN", col);
    const ones = getValue(scores, "1", col);
    
    const result = (max - min) * ones;
    return result >= 60 ? result + 30 : result; // Add 30 bonus if result is 60 or more
};

const calculateSumWithoutBonus = (scores, keys, col) => {
    return keys.reduce((total, key) => total + getValue(scores, key, col), 0);
};

export { calculateSumWithBonus, calculateSumMaxMin, calculateSumWithoutBonus };
