import {React, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-elements';
import Input from './Input';

export default function AuthForm({isLogin, submitHandler, credentialsInvalid}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {emailInvalid, passwordInvalid, emailsDontMatch, passwordsDontMatch} =
    credentialsInvalid;

  function submitForm() {
    let info = {
      email: email,
      password: password,
      confirmEmail: confirmEmail,
      confirmPassword: confirmPassword,
    };
    submitHandler(info);
  }

  return (
    <View>
      <View>
        <Input
          label="Email"
          value={email}
          onUpdateValue={setEmail}
          isInvalid={emailInvalid}
          keyboardType="email-address"
        />
        {!isLogin && (
          <Input
            label="Confirm Email"
            value={confirmEmail}
            onUpdateValue={setConfirmEmail}
            isInvalid={emailsDontMatch}
            keyboardType="email-address"
          />
        )}
        <Input
          label="Password"
          value={password}
          onUpdateValue={setPassword}
          isInvalid={passwordInvalid}
          secure
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onUpdateValue={setConfirmPassword}
            isInvalid={passwordsDontMatch}
            secure
          />
        )}
        <View>
          <Pressable onPress={submitForm}>
            <Text>{isLogin ? 'Login' : 'Create Account'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
