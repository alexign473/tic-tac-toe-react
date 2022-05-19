import { useState, useEffect } from 'react';

const useKresty = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    // check row
    for (let row of board) {
      if (isWinCon(row)) return;
    }

    // check column
    for (let i = 0; i < board.length; i++) {
      const col = board.map((row) => row[i]);
      if (isWinCon(col)) return;
    }
    // check diagonal
    const diagonal1 = board.map((row, i) => row[i]);
    const diagonal2 = [];
    for (let i = 0, j = board.length - 1; i < board.length; i++, j--) {
      diagonal2.push(board[i][j]);
    }

    if (isWinCon(diagonal1)) return;
    if (isWinCon(diagonal2)) return;

    // check empty cells
    if (!board.flat().includes('')) {
      setWinner('draw');
      return;
    }

    function isWinCon(arr) {
      if (arr.every((cell) => cell === 'X')) {
        setWinner('player');
        return true;
      } else if (arr.every((cell) => cell === 'O')) {
        setWinner('CPU');
        return true;
      }
    }
  };

  // user move
  const onClick = (coords) => {
    if (board[coords.i][coords.j] || winner) return;
    if (coords) {
      board[coords.i][coords.j] = 'X';
      setBoard((board) => [...board]);
      setTurn('O');
    }
  };

  const cpuMove = () => {
    const cpuTurn = getCpuTurn();
    if (cpuTurn) {
      board[cpuTurn.i][cpuTurn.j] = 'O';
      setBoard((board) => [...board]);
      setTurn('X');
    }
  };

  const getCpuTurn = () => {
    let empty = [];
    board.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell === '') empty.push({ i, j });
      })
    );

    return empty[Math.floor(Math.random() * empty.length)];
  };

  const onRestart = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner(null);
    setTurn('X');
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  // CPU move
  useEffect(() => {
    if (turn === 'O') {
      cpuMove();
    }
  }, [turn]);

  return {
    board,
    winner,
    onClick,
    onRestart,
  };
};

export default useKresty;
