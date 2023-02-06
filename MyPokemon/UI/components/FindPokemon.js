import {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native-elements';

export default function FindPokemon({which}) {
  const [search, onChangeSearch] = useState({old: '', recent: ''});

  function onChange(text) {
    onChangeSearch(last => {
      return {old: last.recent, recent: text};
    });
  }

  if (search.recent !== search.old) {
    console.log('oop');
    which(search.recent);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search For A Pokemon</Text>
      <TextInput
        onChangeText={onChange}
        value={search.recent}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF974',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFDD0',
    padding: 5,
    borderRadius: 20,
    fontSize: 25,
  },
});
