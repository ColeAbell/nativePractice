import {React, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
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
          secure={true}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onUpdateValue={setConfirmPassword}
            isInvalid={passwordsDontMatch}
            secure={true}
          />
        )}
        <View style={styles.buttonOuterContainer}>
          <Pressable
            onPress={submitForm}
            android_ripple={{color: '#AA336A'}}
            style={styles.buttonInnerContainer}>
            <Text style={styles.label}>
              {isLogin ? 'Login' : 'Create Account'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFDD0',
    borderColor: '#FFB6C1',
    borderWidth: 5,
    opacity: 0.9,
    padding: 50,
  },
  buttonOuterContainer: {
    marginTop: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    padding: 15,
    backgroundColor: '#FFC0CB',
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
