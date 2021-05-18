import {
  Dimensions,
} from 'react-native';

const gameState = {
  RANDOMIZING: 0,
  PLAYING: 1,
  ENDED: 2,
};

const GameUtil = {
  getWindowWidth: () => {
    return Dimensions.get('window').width;
  },
  GameState: Object.freeze(gameState),
  generateRandomizedArray: (count, min, max) => {
    const arr = [];
    var index = 0;
    while (index < count) {
      const rand = Math.floor(Math.random() * (max - min) + min);
      if (!arr.includes(rand)) {
        arr.push(rand);
        index++;
      }
    }
    return arr;
  },
  shuffleInPlace: (array) => {
    var currentIndex = array.length;
    var temp;
    var randomIndex;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; // go to previous
      // swap
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  },
  splitToRowAndCol: (array, row, col) => {
    const arr = [];
    var start = 0;
    while ((start + col) <= array.length) {
      const r = array.slice(start, start + col);
      arr.push(r);
      start += col;
    }
    return arr;
  },
};

export default GameUtil;
