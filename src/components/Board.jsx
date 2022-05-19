import Cell from './Cell';
import useKrest from '../hooks/useKrest';

const Board = () => {
  const { board, winner, onClick, onRestart } = useKrest();

  const getWinnerMsg = () => {
    return winner === 'player'
      ? 'Вы победили!'
      : winner === 'CPU'
      ? 'Победил компьютер'
      : 'Ничья';
  };

  return (
    <div className='board'>
      {board &&
        board.map((row, i) => (
          <div className='row' key={i}>
            {row.map((cell, j) => (
              <Cell key={j} value={cell} onClick={onClick} coords={{ i, j }} />
            ))}
          </div>
        ))}
      <button className='button' onClick={onRestart}>
        Restart
      </button>
      <div className='winner-msg'>{winner && getWinnerMsg()}</div>
    </div>
  );
};

export default Board;
