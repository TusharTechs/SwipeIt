import React, { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const BluePage = ({ navigation }) => {
  const [iconVisible, setIconVisible] = useState(null);
  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (nativeEvent.translationX < 20) {
        setIconVisible("cross");
      } else {
        setIconVisible("tick");
      }
    } else if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -100) {
        console.log("Swiped left");
        navigation.navigate("GreenPage");
      } else if (nativeEvent.translationX > 100) {
        console.log("Swiped right");
        navigation.navigate("GreenPage");
      } else {
        console.log("Reset");
      }

      setIconVisible(null);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const rotate = translateX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bluePage,
            {
              transform: [{ translateX }, { rotate }],
            },
          ]}
        >
          {iconVisible && (
            <View
              style={[
                styles.iconContainer,
                iconVisible === "cross"
                  ? styles.crossBackground
                  : styles.tickBackground,
              ]}
            >
              <Icon
                name={iconVisible === "cross" ? "times" : "check"}
                size={40}
                color="white"
              />
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bluePage: {
    width: "70%",
    height: "60%",
    backgroundColor: "lightblue",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "transparent",
  },
  tickBackground: {
    backgroundColor: "green",
  },
  crossBackground: {
    backgroundColor: "red",
  },
});

export default BluePage;
