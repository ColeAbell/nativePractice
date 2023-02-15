import {React, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {favoriteActions} from '../../../store/favoritesSlice';
import FavoriteButton from '../FavoriteButton';
import {Icon} from 'react-native-elements';

export default function DetailsScreen({route, navigation}) {
  const [pokeDeets, setPokeDeets] = useState({
    sprites: [],
    name: '',
    types: [],
    isFavorite: false,
  });
  const favorites = useSelector(state => state.favoritesInfo.favorites);
  const dispatch = useDispatch();

  function addFav(name) {
    dispatch(favoriteActions.addFavorite(name));
    console.log('it reached');
  }

  function removeFav(name) {
    dispatch(favoriteActions.removeFavorite(name));
  }

  useEffect(() => {
    const details = route.params.deets;
    let images = [0, 0];
    let ptypes = [];
    let backupImages = [0, 0];
    for (const key in details.sprites) {
      if (key === 'front_shiny') {
        images[0] = details.sprites[key];
      } else if (key === 'back_shiny') {
        images[1] = details.sprites[key];
      } else if (key === 'front_default') {
        backupImages[0] = details.sprites[key];
      } else if (key === 'back_default') {
        backupImages[1] = details.sprites[key];
      }
    }
    if (images.length < 2) {
      if (images[0] === 0) {
        images[0] = backupImages[0];
      } else if (images[1] === 0) {
        images[1] = backupImages[1];
      }
    }
    for (let i = 0; i < details.types.length; i++) {
      ptypes.push(details.types[i].type.name);
    }
    const fav = favorites.includes(details.name);
    console.log(fav);

    navigation.setOptions({
      headerRight: () => {
        return (
          <FavoriteButton
            fav={fav}
            name={details.name}
            addFav={addFav}
            removeFav={removeFav}
          />
        );
      },
    });

    setPokeDeets({
      sprites: images,
      name: details.name,
      types: ptypes,
      isFavorite: fav,
    });
  }, []);

  if (pokeDeets.sprites.length === 0) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: pokeDeets.sprites[0]}} style={styles.sprite} />
        <Image source={{uri: pokeDeets.sprites[1]}} style={styles.sprite} />
      </View>
      <View style={styles.name}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.text}>{pokeDeets.name.toUpperCase()}</Text>
      </View>
      <View style={styles.types}>
        <Text style={styles.title}>Types:</Text>
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
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
