import {put, takeLatest, all, call, select} from 'redux-saga/effects';

import Types from './game.types';

import GameUtil from '@/modules/utils/gameUtil';

function* onGenerateBoardSaga(action) {
  const {row, col, min, max} = action.payload;
  const totalCards = row * col;
  const halfArray = GameUtil.generateRandomizedArray(totalCards / 2, min, max);
  const fullArray = GameUtil.shuffleInPlace([...halfArray, ...halfArray]);
  const boolArray = [];
  for(var i = 0; i < totalCards; i++ ) {
    boolArray.push(false);
  }
  yield put({type: Types.SET_BOARD_OPENSTATES, payload: boolArray});
  yield put({type: Types.SET_BOARD_NUMBERS, payload: fullArray});
  yield put({type: Types.SET_BOARD_STEPS, payload: 0});
  yield put({type: Types.SET_GAME_STATE, payload: GameUtil.GameState.PLAYING});
}

function* onSetCardStateSaga(action) {
  const {index, state} = action.payload;
  const boardOpenStates = yield select((state) => state.game.boardOpenStates);
  const boardSteps = yield select((state) => state.game.boardSteps);
  if ( boardOpenStates[index] != state ) {
    boardOpenStates[index] = state;
    yield put({type: Types.SET_BOARD_OPENSTATES, payload: [...boardOpenStates]});
    if ( state ) {
      yield put({type: Types.SET_BOARD_STEPS, payload: boardSteps + 1});
    }
    if ( boardOpenStates.every(e => e === true) ) {
      yield put({type: Types.SET_GAME_STATE, payload: GameUtil.GameState.ENDED});
    }
  }
}

function* onSetPairStateSaga(action) {
  const {firstIndex, secondIndex, state} = action.payload;
  const boardOpenStates = yield select((st) => st.game.boardOpenStates);
  boardOpenStates[firstIndex] = state;
  boardOpenStates[secondIndex] = state;
  yield put({type: Types.SET_BOARD_OPENSTATES, payload: [...boardOpenStates]});
}

function* runGameSaga() {
  yield takeLatest(Types.GENERATE_BOARD, onGenerateBoardSaga);
  yield takeLatest(Types.SET_CARD_STATE, onSetCardStateSaga);
  yield takeLatest(Types.SET_PAIR_STATE, onSetPairStateSaga);
}

export function* gameSaga() {
  yield all([
    call(runGameSaga),
  ]);
}