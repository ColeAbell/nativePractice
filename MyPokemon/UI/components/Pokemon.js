import {Image, Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getOnePokemon} from '../../services/pokemonRequests';

export default function Pokemon({details}) {
  const [pokeSprite, setPokeSprite] = useState(null);

  async function getSprite() {
    try {
      const info = await getOnePokemon(details.url);
      setPokeSprite(info.sprites['front_default']);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getSprite();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.name}>{details.name}</Text>
        <Image source={{uri: pokeSprite}} style={styles.sprite} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sprite: {width: 150, height: 150},
  container: {
    width: 180,
    height: 200,
    margin: 8,
    backgroundColor: '#7fffd4',
    borderRadius: 20,
    borderWidth: 6,
  },
  name: {
    marginTop: 8,
    fontStyle: 'italic',
    fontSize: 25,
  },
});
