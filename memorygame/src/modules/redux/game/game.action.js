import Types from './game.types';

export const generateBoard = (row, col, min, max) => ({
  type: Types.GENERATE_BOARD,
  payload: {row, col, min, max},
});

export const setCardState = (index, state) => ({
  type: Types.SET_CARD_STATE,
  payload: {index, state},
});

export const setPairState = (firstIndex, secondIndex, state) => ({
  type: Types.SET_PAIR_STATE,
  payload: {firstIndex, secondIndex, state},
});

export const setGameState = (gameState) => ({
  type: Types.SET_GAME_STATE,
  payload: gameState,
});
