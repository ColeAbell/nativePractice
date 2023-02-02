import {React, useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default function DetailsScreen({details}) {
  const [pokeDeets, setPokeDeets] = useState({
    sprites: [],
    name: '',
    types: [],
  });

  useEffect(() => {
    let images = [0, 0];
    let ptypes = [];
    for (const key in details.sprites) {
      if (key === 'front_shiny') {
        images[0] = details.sprites[key];
      } else if (key === 'back_shiny') {
        images[1] = details.sprites[key];
      }
    }
    for (const key in details.types) {
      ptypes.push(details.types[key]);
    }
    setPokeDeets({sprites: images, name: details.name, types: ptypes});
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View>
          <Image source={{uri: pokeDeets.sprites[0]}} style={styles.sprite} />
          <Image source={{uri: pokeDeets.sprites[1]}} style={styles.sprite} />
        </View>
        <Text>{pokeDeets.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sprite: {
    width: 200,
    height: 200,
  },
});
