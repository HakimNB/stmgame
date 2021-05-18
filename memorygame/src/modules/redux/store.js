import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import {rootReducerObj} from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

let store = null;

export const initializeStore = () => {
  const rootReducer = combineReducers({
    ...rootReducerObj,
  });

  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return [store];
};

export const getStore = () => store;

export default store;
