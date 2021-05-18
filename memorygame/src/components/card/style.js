import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    width: 120,
    height: 160,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardCombined: {
    width: 110,
    height: 150,
    borderRadius: 5,
    borderWidth: 5,
    margin: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ivory',
  },
  cardStyleFront: {
    backgroundColor: 'ivory',
  },
  cardStyleBack: {
    backgroundColor: 'blue',
  },
  textBaseFront: {
    fontSize: 24,
    color: 'black',
  },
  textBaseBack: {
    fontSize: 24,
    color: 'white',
  },
  textStyleBack: {
    transform: [
      {
        rotateY: '180deg',
      },
    ],
  },
});
