import {useEffect, useState, React} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPokemon} from '../../../services/pokemonRequests';
import FindPokemon from '../FindPokemon';
import Pokemon from '../Pokemon';

export default function FavoritesScreen({navigation}) {
  const [favPokemon, setFavPokemon] = useState([]);
  const [whichPokes, setWhichPokes] = useState({txt: '', pokes: []});
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  async function setUp() {
    try {
      const pokemon = await getAllPokemon();
      let hold = [];
      for (let i = 0; i < pokemon.results.length; i++) {
        if (favorites.includes(pokemon.results[i].name)) {
          hold.push(pokemon.results[i]);
        }
      }
      setFavPokemon(hold);
    } catch (e) {
      console.error(e);
    }
  }

  function which(text) {
    console.log('yooo');
    if (text !== whichPokes.txt) {
      setWhichPokes({
        txt: text,
        pokes: favPokemon.filter(p => p.name.startsWith(text)),
      });
    }
  }

  function toDetails(details) {
    navigation.navigate('Details', {deets: details});
  }

  useEffect(() => {
    console.log(favorites);
    setUp();
  }, []);

  return (
    <SafeAreaView style={styles.list}>
      <FindPokemon which={which} />
      <View style={styles.container}>
        {favPokemon ? (
          <FlatList
            data={whichPokes.txt !== '' ? whichPokes.pokes : favPokemon}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: '#50C878',
  },
});
