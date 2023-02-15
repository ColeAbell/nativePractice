import {React} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';

export default function Input({
  label,
  value,
  onUpdateValue,
  keyboardType,
  isInvalid,
  secure,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline={!secure}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onUpdateValue}
        secureTextEntry={secure}
        style={styles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontWeight: 'bold',
    margin: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'left',
    borderRadius: 10,
    backgroundColor: 'pink',
    paddingHorizontal: 100,
  },
});
