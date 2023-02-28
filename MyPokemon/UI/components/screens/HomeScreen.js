import {React, useEffect, useState} from 'react';
import {getAllPokemon} from '../../../services/pokemonRequests';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import Pokemon from '../Pokemon';
import GoToFavorites from '../GoToFavorites';
import FindPokemon from '../FindPokemon';
import {Text} from 'react-native-elements';

export default function HomeScreen({navigation}) {
  const [pokemon, setPokemon] = useState([]);
  const [whichPokes, setWhichPokes] = useState({txt: '', pokes: []});
  const error = whichPokes.txt !== '' && whichPokes.pokes.length === 0;

  async function getMons() {
    try {
      //console.log('im trying');
      const myMons = await getAllPokemon();
      setPokemon(myMons.results);
      //console.log('success');
    } catch (e) {
      console.log('flop');
      console.error(e);
    }
  }

  function which(text) {
    //console.log('yooo');
    if (text !== whichPokes.txt) {
      setWhichPokes({
        txt: text,
        pokes: pokemon.filter(p => p.name.startsWith(text)),
      });
    }
  }

  function toFavorites() {
    navigation.navigate('Favorites');
  }

  function toDetails(details) {
    navigation.navigate('Details', {deets: details});
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <GoToFavorites go={toFavorites} />;
      },
    });
    getMons();
  }, []);

  return (
    <SafeAreaView style={styles.list}>
      <Text>Please work</Text>
      <View style={styles.container}>
        <FindPokemon which={which} isError={error} />
        {pokemon ? (
          <FlatList
            testID="b"
            data={whichPokes.txt !== '' ? whichPokes.pokes : pokemon}
            keyExtractor={item => item.name}
            renderItem={itemData => (
              <Pokemon details={itemData.item} press={toDetails} />
            )}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            style={styles.list}
          />
        ) : (
          <ActivityIndicator testID="loading" size="large" />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: '#0e5d6e',
  },
});
