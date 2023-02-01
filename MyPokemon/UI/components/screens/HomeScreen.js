import {useEffect, useState} from 'react';
import getAllPokemon from '../../../../services/pokemonRequests';
import {View, Text} from 'react-native';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const requests = getAllPokemon();
    setPokemon(requests);
  }, []);

  return (
    <View>
      <Text>{pokemon.length}</Text>
    </View>
  );
}
