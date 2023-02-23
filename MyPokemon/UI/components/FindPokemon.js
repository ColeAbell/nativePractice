import {useState, React} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Keyboard} from 'react-native';

export default function FindPokemon({which, isError}) {
  const [search, onChangeSearch] = useState({old: '', recent: ''});

  function onChange(text) {
    const result = text.replace(/[^a-z]/gi, '');
    onChangeSearch(last => {
      return {old: last.recent, recent: result.toLowerCase()};
    });
  }

  function cancel() {
    Keyboard.dismiss();
    onChangeSearch(last => {
      return {old: last.recent, recent: ''};
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
        placeholder="Click here"
        onChangeText={onChange}
        value={search.recent}
        style={styles.input}
      />
      {isError && (
        <Text style={styles.errorMessage}>NO MATCHING POKEMON FOUND</Text>
      )}
      {search.recent !== '' && (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonOuterContainer}>
            <Pressable
              onPress={cancel}
              testID="cancel"
              android_ripple={{color: '#AA336A'}}
              style={styles.buttonInnerContainer}>
              <Text style={styles.text}>Cancel Search</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF974',
  },
  title: {
    fontSize: 17,
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFDD0',
    padding: 5,
    borderRadius: 20,
    fontSize: 25,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  buttonOuterContainer: {
    marginTop: 3,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: '#ADD8E6',
    elevation: 2,
    padding: 7,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
