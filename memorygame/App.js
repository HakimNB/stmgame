import React from 'react';

import GameScreen from '@/scenes/gameScreen';

// redux
import {Provider as ReduxProvider} from 'react-redux';
import {initializeStore} from '@/modules/redux';

// redux - initialize
const [store] = initializeStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <GameScreen />
    </ReduxProvider>
  );
};

export default App;
