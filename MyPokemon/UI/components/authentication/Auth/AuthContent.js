import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {Text} from 'react-native-elements';
import AuthForm from './AuthForm';

export default function AuthContent({isLogin, onAuthenticate}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    emailInvalid: false,
    passwordInvalid: false,
    emailsDontMatch: false,
    passwordsDontMatch: false,
  });

  const navigation = useNavigation();

  function switchMode() {
    if (isLogin) {
      navigation.replace('SignUp');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let {email, password, confirmEmail, confirmPassword} = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert(
        'Credentials Invalid, please check your information and try again',
      );
      setCredentialsInvalid({
        emailInvalid: !emailIsValid,
        passwordInvalid: !passwordIsValid,
        emailsDontMatch: !emailsAreEqual,
        passwordsDontMatch: !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate(email, password);
  }

  return (
    <View>
      <AuthForm
        isLogin={isLogin}
        submitHandler={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View>
        <Pressable onPress={switchMode}>
          <Text>{isLogin ? 'Go To Sign Up Page' : 'Go To Login Page'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
