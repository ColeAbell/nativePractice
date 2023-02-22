import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

interface messageProps {
  name: string;
}

export const Testing: React.FC<messageProps> = ({name}) => {
  let inner = name;
  return (
    <View>
      <Text>{inner}</Text>
    </View>
  );
};
