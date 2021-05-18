import {combineReducers} from 'redux';

import gameReducer from './game/game.reducer';

export const rootReducerObj = {
  game: gameReducer,
};

const rootReducer = combineReducers(rootReducerObj);

export default rootReducer;
