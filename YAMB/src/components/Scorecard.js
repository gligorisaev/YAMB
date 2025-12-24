import React from 'react';
import './Scorecard.css';

const Scorecard = ({ player, updateScore, toggleManualMark }) => {
  const [lastTap, setLastTap] = React.useState({});

  const handleDoubleTap = (column, row) => {
    const now = Date.now();
    const key = `${column}-${row}`;
    const lastTapTime = lastTap[key] || 0;
    
    if (now - lastTapTime < 300) {
      // Double tap detected
      toggleManualMark(player.id, column, row);
    }
    
    setLastTap({ ...lastTap, [key]: now });
  };
  const columns = [
    { id: 'down', name: 'Down', symbol: '↓' },
    { id: 'updown', name: 'Up/Down', symbol: '↕' },
    { id: 'up', name: 'Up', symbol: '↑' },
    { id: 'n', name: 'N', symbol: 'N' },
    { id: 'o', name: 'O', symbol: 'O' },
    { id: 'r', name: 'R', symbol: 'R' }
  ];

  const rows = [
    { id: '1', name: '1', isInput: true },
    { id: '2', name: '2', isInput: true },
    { id: '3', name: '3', isInput: true },
    { id: '4', name: '4', isInput: true },
    { id: '5', name: '5', isInput: true },
    { id: '6', name: '6', isInput: true },
    { id: 'sum1', name: 'SUM', isInput: false },
    { id: 'max', name: 'MAX', isInput: true },
    { id: 'min', name: 'MIN', isInput: true },
    { id: 'sum2', name: 'SUM', isInput: false },
    { id: 't20', name: 'T20', isInput: true },
    { id: 's30', name: 'S30', isInput: true },
    { id: 'f40', name: 'F40', isInput: true },
    { id: 'k50', name: 'K50', isInput: true },
    { id: 'y60', name: 'Y60', isInput: true },
    { id: 'sum3', name: 'SUM', isInput: false }
  ];

  const calculateSum1 = (column) => {
    const sum = ['1', '2', '3', '4', '5', '6'].reduce((acc, row) => {
      const value = player.scores[column][row];
      return acc + (value !== null && value !== '' ? parseInt(value) || 0 : 0);
    }, 0);
    // Add 30 bonus if sum >= 60
    if (sum >= 60) {
      return sum + 30;
    }
    return sum > 0 ? sum : '';
  };

  const calculateSum2 = (column) => {
    const maxValue = player.scores[column]['max'];
    const minValue = player.scores[column]['min'];
    const row1Value = player.scores[column]['1'];
    
    const max = maxValue !== null && maxValue !== '' ? parseInt(maxValue) || 0 : 0;
    const min = minValue !== null && minValue !== '' ? parseInt(minValue) || 0 : 0;
    const row1 = row1Value !== null && row1Value !== '' ? parseInt(row1Value) || 0 : 0;
    
    const result = (max - min) * row1;
    
    if (result >= 60) {
      return result + 30;
    }
    return result > 0 ? result : '';
  };

  const calculateSum3 = (column) => {
    const sum = ['t20', 's30', 'f40', 'k50', 'y60'].reduce((acc, row) => {
      const value = player.scores[column][row];
      return acc + (value !== null && value !== '' ? parseInt(value) || 0 : 0);
    }, 0);
    return sum > 0 ? sum : '';
  };

  const handleCellChange = (column, row, value) => {
    // Allow empty string or numbers
    if (value === '' || value === null) {
      updateScore(player.id, column, row, null);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        updateScore(player.id, column, row, numValue);
      }
    }
  };

  const getCellValue = (column, row) => {
    // For R column on SUM rows, calculate sum across all columns
    if (column === 'r' && (row === 'sum1' || row === 'sum2' || row === 'sum3')) {
      const otherColumns = ['down', 'updown', 'up', 'n', 'o'];
      const sum = otherColumns.reduce((acc, col) => {
        let value = 0;
        if (row === 'sum1') {
          value = calculateSum1(col);
        } else if (row === 'sum2') {
          value = calculateSum2(col);
        } else if (row === 'sum3') {
          value = calculateSum3(col);
        }
        return acc + (value !== '' ? parseInt(value) || 0 : 0);
      }, 0);
      return sum > 0 ? sum : '';
    }

    // For R column rows 1-6, add bonus based on orange cells
    if (column === 'r' && ['1', '2', '3', '4', '5', '6'].includes(row)) {
      const baseValue = player.scores[column][row];
      const base = baseValue !== null && baseValue !== '' ? parseInt(baseValue) || 0 : 0;
      
      const maxedCells = countMaxedCells();
      const rowNum = parseInt(row);
      const bonusThreshold = rowNum * 3;
      
      // Add 100 if we have enough orange cells for this row's bonus
      if (maxedCells >= bonusThreshold) {
        return base > 0 || maxedCells >= bonusThreshold ? base + 100 : 100;
      }
      
      return base > 0 ? base : '';
    }
    
    if (row === 'sum1') {
      return calculateSum1(column);
    } else if (row === 'sum2') {
      return calculateSum2(column);
    } else if (row === 'sum3') {
      return calculateSum3(column);
    }
    const value = player.scores[column][row];
    return value !== null && value !== '' ? value : '';
  };

  const calculateTotal = () => {
    const allRows = ['1', '2', '3', '4', '5', '6', 'sum1', 'max', 'min', 'sum2', 't20', 's30', 'f40', 'k50', 'y60', 'sum3'];
    const total = allRows.reduce((acc, row) => {
      const value = getCellValue('r', row);
      return acc + (value !== '' && value !== null ? parseInt(value) || 0 : 0);
    }, 0);
    return total;
  };

  const isMaxValueReached = (column, row) => {
    // Check if manually marked as orange
    if (player.manualMarks && player.manualMarks[column] && player.manualMarks[column][row]) {
      return true;
    }
    
    // Check if rows 1-6 have reached maximum value (row_number × 5)
    if (['1', '2', '3', '4', '5', '6'].includes(row)) {
      const value = player.scores[column][row];
      const maxValue = parseInt(row) * 5;
      return value !== null && value !== '' && parseInt(value) === maxValue;
    }
    // Check if Y60 has reached maximum value (100)
    if (row === 'y60') {
      const value = player.scores[column][row];
      return value !== null && value !== '' && parseInt(value) === 100;
    }
    return false;
  };

  const isZeroValue = (column, row) => {
    const value = player.scores[column][row];
    if (value === null || value === '') return false;
    const numValue = typeof value === 'number' ? value : parseInt(value);
    return numValue === 0;
  };

  const countMaxedCells = () => {
    const allRows = ['1', '2', '3', '4', '5', '6', 'max', 'min', 't20', 's30', 'f40', 'k50', 'y60'];
    const cols = ['down', 'updown', 'up', 'n', 'o', 'r'];
    let count = 0;
    cols.forEach(col => {
      allRows.forEach(row => {
        if (isMaxValueReached(col, row)) {
          count++;
        }
      });
    });
    return count;
  };

  const calculateBonus = () => {
    const maxedCells = countMaxedCells();
    return Math.floor(maxedCells / 3) * 100;
  };

  return (
    <div className="scorecard">
      <h2>{player.name}'s Scorecard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="row-header"></th>
              {columns.map(col => (
                <th key={col.id} className="column-header">
                  <div className="column-symbol">{col.symbol}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className={row.id.startsWith('sum') ? 'sum-row' : ''}>
                <td className="row-label">{row.name}</td>
                {columns.map(col => (
                  <td key={`${col.id}-${row.id}`} className={`${row.isInput ? 'input-cell' : 'calculated-cell'} ${isMaxValueReached(col.id, row.id) ? 'max-reached' : ''} ${isZeroValue(col.id, row.id) ? 'zero-value' : ''}`}>
                    {row.isInput ? (
                      <input
                        type="number"
                        value={getCellValue(col.id, row.id)}
                        onChange={(e) => handleCellChange(col.id, row.id, e.target.value)}
                        onDoubleClick={() => toggleManualMark(player.id, col.id, row.id)}
                        onTouchEnd={() => handleDoubleTap(col.id, row.id)}
                        className="score-input"
                        title="Double-tap to toggle orange highlight"
                      />
                    ) : (
                      <span className="calculated-value">{getCellValue(col.id, row.id)}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-section">
        <div className="bonus-info">
          <span className="bonus-label">Orange Cells: {countMaxedCells()} / Bonus: +{calculateBonus()}</span>
        </div>
        <div className="total-label">TOTAL:</div>
        <div className="total-value">{calculateTotal()}</div>
      </div>
    </div>
  );
};

export default Scorecard;
