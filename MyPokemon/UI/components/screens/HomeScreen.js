import {React, useEffect, useState} from 'react';
import {getAllPokemon} from '../../../services/pokemonRequests';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  SafeAreaView,
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
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {flex: 1},
});
