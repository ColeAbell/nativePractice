import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react-native';
import HomeScreen from '../UI/components/screens/HomeScreen';
import * as pokecalls from '../services/pokemonRequests';
import ditto from './ditto.json';
import {Text} from 'react-native';
import * as poke from '../UI/components/Pokemon';
import Pokemon from '../UI/components/Pokemon';

const pokeresult = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
];

describe('Testing Home Component / no navigation', () => {
  test('Confirm Home renders properly', async () => {
    pokecalls.getAllPokemon = jest.fn().mockImplementation(url => {
      return pokeresult;
    });
    pokecalls.getOnePokemon = jest.fn().mockImplementation(url => {
      console.log(url);
      return ditto;
    });
    const optionsMock = jest.fn();
    const navMock = jest.fn();
    let comp;
    const tree = render(
      <HomeScreen navigation={{setOptions: optionsMock, navigate: navMock}} />,
    );
    //expect(creen.etByTestId('loading')).toBeTruthy();
    expect(screen.getByText('Please work')).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('b')).toBeTruthy();
    });
    await waitFor(() => expect(screen.getByText('ditto')).toBeTruthy());
  });
});
