import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../UI/components/screens/HomeScreen';
import * as pokecalls from '../services/pokemonRequests';

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
      return '';
    });
    const optionsMock = jest.fn();
    const navMock = jest.fn();
    const tree = render(
      <HomeScreen navigation={{setOptions: optionsMock, navigate: navMock}} />,
    );
    expect(screen.getByTestId('loading')).toBeTruthy();
  });
});
