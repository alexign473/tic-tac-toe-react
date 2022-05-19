import React from 'react';

const Cell = ({ value, onClick, coords }) => {
  return (
    <div
      className={`cell ${value === 'X' ? 'playerX' : 'playerO'}`}
      onClick={() => onClick(coords)}
    >
      {value}
    </div>
  );
};

export default Cell;
