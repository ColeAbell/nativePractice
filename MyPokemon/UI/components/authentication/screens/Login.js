import AuthContent from '../Auth/AuthContent';
import React, {useState} from 'react';
import {login} from '../../../util/auth';
import {useDispatch} from 'react-redux';
import {authenticationActions} from '../../../../store/authenticationSlice';
import {ActivityIndicator, Alert, View} from 'react-native';
import {set} from 'immer/dist/internal';
import {Text} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function Authenticate(email, password) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem('token', token);
      dispatch(authenticationActions.logIn(token));
    } catch (e) {
      Alert.alert('Credentials Invalid, please try again');
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return (
      <View>
        <Text>Logging you in...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AuthContent isLogin onAuthenticate={Authenticate} />;
}
