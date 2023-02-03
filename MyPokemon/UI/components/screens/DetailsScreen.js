import {React, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

export default function DetailsScreen({route, navigation}) {
  const [pokeDeets, setPokeDeets] = useState({
    sprites: [],
    name: '',
    types: [],
  });

  useEffect(() => {
    const details = route.params.deets;
    let images = [0, 0];
    let ptypes = [];
    for (const key in details.sprites) {
      if (key === 'front_shiny') {
        images[0] = details.sprites[key];
      } else if (key === 'back_shiny') {
        images[1] = details.sprites[key];
      }
    }
    for (let i = 0; i < details.types.length; i++) {
      ptypes.push(details.types[i].type.name);
    }
    setPokeDeets({sprites: images, name: details.name, types: ptypes});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: pokeDeets.sprites[0]}} style={styles.sprite} />
        <Image source={{uri: pokeDeets.sprites[1]}} style={styles.sprite} />
      </View>
      <View style={styles.name}>
        <Text style={styles.text}>{pokeDeets.name.toUpperCase()}</Text>
      </View>
      <View style={styles.types}>
        {pokeDeets.types.map(t => {
          return (
            <View>
              <Text style={styles.text}>{t}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sprite: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    marginTop: 45,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DF7F4',
  },
  types: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  type: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
