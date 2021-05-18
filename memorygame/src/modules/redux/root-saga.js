import {all, call} from 'redux-saga/effects';

import {gameSaga} from './game/game.saga';

export default function* rootSaga() {
  yield all([
    call(gameSaga),
  ]);
}
