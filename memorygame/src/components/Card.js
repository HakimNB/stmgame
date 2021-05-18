import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

const Card = (props) => {
  const {cardKey, cardValue, isOpen, onClick} = props;
  const animatedValue = React.useRef(new Animated.Value(0));
  const backInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      }
    ]
  };

  const [flipState, setFlipState] = React.useState(0);
  animatedValue.current.addListener(({value}) => {
    setFlipState(value);
  });
  // const flipCard = () => {
  //   if ( flipState >= 90 ) {
  //     Animated.timing(animatedValue.current, {
  //       useNativeDriver: true,
  //       toValue: 0,
  //       duration: 800,
  //     }).start();
  //     if ( onFlipOpen ) {
  //       onFlipOpen(flipCard);
  //     }
  //   } else {
  //     Animated.timing(animatedValue.current, {
  //       useNativeDriver: true,
  //       toValue: 180,
  //       duration: 800,
  //     }).start();
  //     if ( onFlipClose ) {
  //       onFlipClose(flipCard);
  //     }
  //   }
  // }

  const openCard = () => {
    Animated.timing(animatedValue.current, {
      useNativeDriver: true,
      toValue: 180,
      duration: 800,
    }).start();
  }

  const closeCard = () => {
    Animated.timing(animatedValue.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 800,
    }).start();
  }

  // console.log("Card : " + cardKey + " isOpen: " + isOpen + " flipState: " + flipState);

  if ( isOpen ) {
    if ( flipState == 0 ) {
      openCard();
    }
  } else {
    if ( flipState == 180 ) {
      closeCard();
    }
  }

  // original flipState == 0 : back
  // flipped flipState == 180 : front (show value)
  const extraStyle = flipState >= 90 ? styles.cardStyleFront : styles.cardStyleBack;
  const textStyle = flipState >= 90 ? {} : styles.textStyleBack;

  return (
      <TouchableOpacity onPress={() => onClick(cardKey)}>
        <View style={styles.containerStyle}>
          <Animated.View style={[backAnimatedStyle, styles.flipCardCombined, extraStyle]}>
            <Text style={textStyle}>{cardValue/*flipState >= 90 ? cardValue : '??'*/}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    width: 120,
    height: 160,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardCombined: {
    width: 110,
    height: 150,
    borderRadius: 5,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    position: 'absolute',
  },
  cardStyleFront: {
    backgroundColor: 'red',
  },
  cardStyleBack: {
    backgroundColor: 'yellow',
  },
  textStyleBack: {
    transform: [
      {
        rotateY: '180deg',
      }
    ],
  }
})

export default Card;
