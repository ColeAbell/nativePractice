import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getOnePokemon} from '../../services/pokemonRequests';

export default function Pokemon({details, press}) {
  const [sprite, setSprite] = useState({sprite: '', allDetails: {}});

  async function getSprite() {
    try {
      const info = await getOnePokemon(details.url);
      setSprite({sprite: info.sprites['front_default'], allDetails: info});
    } catch (e) {
      console.error(e);
    }
  }

  function handlePress() {
    press(sprite.allDetails);
  }

  useEffect(() => {
    async function setting() {
      await getSprite();
    }
    setting();
  }, []);

  if (sprite.sprite === '') {
    return <ActivityIndicator testID="activity" size={'large'} />;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} testID="pressable">
        <View style={styles.innerContainer}>
          <Text style={styles.name}>{details.name}</Text>
          <Image
            source={{uri: sprite.sprite}}
            style={styles.sprite}
            testID="sprite"
          />
        </View>
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
  innerContainer: {
    alignItems: 'center',
  },
  name: {
    marginTop: 10,
    fontStyle: 'italic',
    fontSize: 25,
  },
});
