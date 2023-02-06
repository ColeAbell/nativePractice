import {React, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Icon, Image} from 'react-native-elements';

export default function FavoriteButton({fav, addFav, name, removeFav}) {
  const [isFav, setIsFav] = useState(fav);

  function adding() {
    addFav(name);
    console.log('adding fav');
    setIsFav(prev => !prev);
  }

  function remove() {
    removeFav(name);
    console.log('removing fav');
    setIsFav(prev => !prev);
  }

  const no = '../assets/emptyPokeball.png';
  const yes = '../assets/fullPokeball.png';
  return (
    <Pressable onPress={isFav ? remove : adding}>
      <Image source={isFav ? require(yes) : require(no)} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
