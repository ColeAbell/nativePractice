import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './UI/components/screens/HomeScreen';
import DetailsScreen from './UI/components/screens/DetailsScreen';
import {Provider} from 'react-redux';
import {store} from './store/redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FavoritesScreen from './UI/components/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#fcffcf'},
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{headerStyle: {backgroundColor:'#A2E4B8'}}}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
});
