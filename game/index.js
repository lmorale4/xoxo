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

export const winner = (board, position, turn) => {
  const [row, col] = position;
  if(board.getIn([row+1, col+ 1], turn))
};

export default function reducer(state = DEFAULT, action) {
  switch (action.type) {
    case MOVE:
      return {
        board: state.board.setIn(action.position, action.player),
        turn: state.turn === ' X ' ? ' O ' : ' X ',
      };
    default:
      return state;
  }
}
