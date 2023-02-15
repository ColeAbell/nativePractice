import {useNavigation} from '@react-navigation/native';
import {useState, React} from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
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
      navigation.replace('Create Account');
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
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../../assets/pokeWallpaper.jpeg')}
        style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.content}>
            <AuthForm
              isLogin={isLogin}
              submitHandler={submitHandler}
              credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.button}>
              <Pressable
                style={styles.buttonInner}
                onPress={switchMode}
                android_ripple={{color: '#FDDC5C'}}>
                <Text style={styles.label}>
                  {isLogin ? 'Sign Up Instead' : 'Login Instead'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFDD0',
    borderColor: '#FFB6C1',
    borderWidth: 8,
    borderRadius: 10,
    opacity: 0.9,
    padding: 50,
  },
  button: {
    marginTop: 70,
    borderRadius: 15,
    overflow: 'hidden',
  },
  buttonInner: {
    backgroundColor: '#D4AF37',
  },
  label: {
    fontWeight: 'bold',
    margin: 8,
    fontSize: 18,
    textAlign: 'center',
  },
});
