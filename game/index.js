import { Map } from 'immutable';

// Constants

const DEFAULT = {
  board: Map(),
  turn: ' X ',
};

const MOVE = 'MOVE';

// action creator

export const move = (player, position) => ({
  type: MOVE,
  position,
  player,
});

function streak(board) {
  const coords = [].slice.call(arguments, 1);
  if (
    board.getIn(coords[0], ' _ ') === board.getIn(coords[1], ' _ ') &&
    board.getIn(coords[0], ' _ ') === board.getIn(coords[2], ' _ ') &&
    board.getIn(coords[1], ' _ ') === board.getIn(coords[2], ' _ ')
  ) {
    return board.getIn(coords[0], null);
  }
  return null;
}

const checkcoords = board => {
  let win = null;
  for (let row = 0; row < 3 && !win; row++) {
    const rowCoords = [];
    const colCoords = [];
    for (let col = 0; col < 3; col++) {
      rowCoords.push([row, col]);
      colCoords.push([col, row]);
    }
    win =
      streak(board, rowCoords[0], rowCoords[1], rowCoords[2]) ||
      streak(board, colCoords[0], colCoords[1], colCoords[2]);
  }
  return win;
};

export const winner = board => {
  return (
    checkcoords(board) ||
    streak(board, [0, 0], [1, 1], [2, 2]) ||
    streak(board, [0, 2], [1, 1], [2, 0])
  );
};

const turnReducer = (turn = ' X ', action) => {
  return action.type === MOVE && turn === ' X ' ? ' O ' : ' X ';
};

const boardReducer = (board, action) => {
  return action.type === MOVE && board.setIn(action.position, action.player);
};

export default function reducer(state = DEFAULT, action) {
  if (action.type === MOVE) {
    console.log(
      'winner',
      winner(state.board.setIn(action.position, action.player))
    );
    return {
      board: boardReducer(state.board, action),
      turn: turnReducer(state.turn, action),
    };
  }
  return state;
}
