import Types from './game.types';

import {reducerFactory} from '../utils';
import GameUtil from '@/modules/utils/gameUtil';

const INITIAL_STATE = {
  gameState: GameUtil.GameState.PLAYING,
  boardSteps: 0,
  boardOpenStates: [],
  boardNumbers: [],
};

const handlers = {};

handlers[Types.SET_BOARD_NUMBERS] = (state, action) => ({
  ...state,
  boardNumbers: action.payload,
});

handlers[Types.SET_BOARD_OPENSTATES] = (state, action) => ({
  ...state,
  boardOpenStates: action.payload,
});

handlers[Types.SET_BOARD_STEPS] = (state, action) => ({
  ...state,
  boardSteps: action.payload,
});

handlers[Types.SET_GAME_STATE] = (state, action) => ({
  ...state,
  gameState: action.payload,
});

export default reducerFactory(INITIAL_STATE, handlers);
