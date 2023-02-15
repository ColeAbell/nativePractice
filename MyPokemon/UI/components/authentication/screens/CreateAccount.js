import AuthContent from '../Auth/AuthContent';
import React, {useState} from 'react';
import {createUser} from '../../../util/auth';
import {useDispatch} from 'react-redux';
import {authenticationActions} from '../../../../store/authenticationSlice';
import {ActivityIndicator, Alert, View} from 'react-native';
import {set} from 'immer/dist/internal';
import {Text} from 'react-native-elements';

export default function CreateAccount() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function Authenticate(email, password) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      dispatch(authenticationActions.logIn(token));
    } catch (e) {
      Alert.alert('Credentials Invalid, please try again');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return (
      <View>
        <Text>Creating Your Account...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AuthContent onAuthenticate={Authenticate} />;
}
