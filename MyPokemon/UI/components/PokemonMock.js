import {Pressable, Text} from 'react-native';
import React from 'react';

export default function PokemonMock({details, press}) {
  return (
    <Pressable testID="child" onPress={press}>
      <Text>{details.name}</Text>
    </Pressable>
  );
}
