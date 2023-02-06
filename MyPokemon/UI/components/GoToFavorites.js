import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from 'react-native-elements';

export default function GoToFavorites({go}) {
  return (
    <Pressable onPress={go}>
      <Text style={styles.name}>Favorites</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
