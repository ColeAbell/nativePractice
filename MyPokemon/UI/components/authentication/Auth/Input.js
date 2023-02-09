import {View} from 'react-native';
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
    <View>
      <Text>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChangeText={onUpdateValue}
        secureTextEntry={secure}
      />
    </View>
  );
}
