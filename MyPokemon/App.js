import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './UI/components/screens/HomeScreen';
import DetailsScreen from './UI/components/screens/DetailsScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './store/redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FavoritesScreen from './UI/components/screens/FavoritesScreen';
import LoginScreen from './UI/components/authentication/screens/Login';
import CreateAccount from './UI/components/authentication/screens/CreateAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authenticationActions} from './store/authenticationSlice';
import {Text} from 'react-native-elements';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#fcffcf'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Create Account" component={CreateAccount} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  async function logout() {
    dispatch(authenticationActions.logOut());
    await AsyncStorage.removeItem('token');
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#fcffcf', fontWeight: 'bold'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return (
              <View style={styles.buttonOuterContainer}>
                <Pressable
                  style={styles.buttonInnerContainer}
                  onPress={logout}
                  android_ripple={{color: '#AA336A'}}>
                  <Text style={styles.logout}>Log Out</Text>
                </Pressable>
              </View>
            );
          },
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{headerStyle: {backgroundColor: '#A2E4B8'}}}
      />
    </Stack.Navigator>
  );
}

function Navigator() {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector(state => state.authentication.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(authenticationActions.logIn(token));
      }
    }
    checkToken();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      {!auth ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    textAlign: 'left',
    borderRadius: 10,
    backgroundColor: 'pink',
    paddingHorizontal: 100,
  },
  buttonOuterContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    padding: 10,
    backgroundColor: '#FFC0CB',
    elevation: 2,
  },
});
