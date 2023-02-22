import {render, screen, fireEvent, act} from '@testing-library/react-native';
import 'react-native';
import React from 'react';
import HomeScreen from '../UI/components/screens/HomeScreen';
import {getAllPokemon, getOnePokemon} from '../services/pokemonRequests';
import { Text } from 'react-native-elements';

global.fetch = require('jest-fetch-mock');

let content = {
  results: [
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
  ],
};

jest.mock('../UI/components/Pokemon', () => () => {
  return content.results.map(p => <div>{p.name}</div>);
});

beforeEach(() => {
  fetch.resetMocks();
});

test('returns result if object', () => {
  fetch.mockResponseOnce(JSON.stringify(content));
  const onResponse = jest.fn();
  const onError = jest.fn();
  return getAllPokemon()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0]).toEqual(content);
      console.log(onResponse.mock.calls);
    });
});

test('Does home screen work', async () => {
  fetch.mockResponseOnce(JSON.stringify(content));
  jest.useFakeTimers();
  const {getByText} = render(
    <HomeScreen navigation={{setOptions: jest.fn()}} />,
  );
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByText('Please work')).toBeTruthy();
  expect(screen.getByText('venusaur')).toBeOnTheScreen();

  //const pokes = await screen.getAllByTestId('bob');
  //expect(pokes).toHaveLength(3);
});
