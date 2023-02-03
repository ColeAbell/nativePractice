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

export default function HomeScreen({navigation}) {
  const [pokemon, setPokemon] = useState([]);

  async function getMons() {
    try {
      console.log("im trying");
      const myMons = await getAllPokemon();
      setPokemon(myMons.results);
      console.log("success");
    } catch (e) {
      console.log("flop");
      console.error(e);
    }
  }

  function toDetails(details) {
    navigation.navigate('Details', {deets: details});
  }

  useEffect(() => {
    getMons();
  }, []);

  return (
    <SafeAreaView style={styles.list}>
      {pokemon ? (
        <FlatList
          data={pokemon}
          keyExtractor={item => item.name}
          renderItem={itemData => (
            <Pokemon details={itemData.item} press={toDetails} />
          )}
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
