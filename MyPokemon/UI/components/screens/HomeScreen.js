import {React, useEffect, useState} from 'react';
import {getAllPokemon} from '../../../services/pokemonRequests';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import Pokemon from '../Pokemon';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);

  async function getMons() {
    try {
      const myMons = await getAllPokemon();
      setPokemon(myMons.results);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMons();
  }, []);

  return (
    <View>
      {pokemon ? (
        <FlatList
          data={pokemon}
          keyExtractor={item => item.name}
          renderItem={itemData => <Pokemon details={itemData.item} />}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={styles.list}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {flex: 1},
});
