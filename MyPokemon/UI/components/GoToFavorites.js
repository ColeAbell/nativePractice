import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-elements';

export default function GoToFavorites({go}) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={go}
        style={styles.buttonInnerContainer}
        android_ripple={{color: '#AA336A'}}>
        <Text style={styles.name}>Favorites</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonOuterContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    padding: 10,
    backgroundColor: '#FFC0CB',
    elevation: 2,
  },
});
