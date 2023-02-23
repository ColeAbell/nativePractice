import ditto from './ditto.json';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react-native';
import 'react-native';
import React from 'react';
import Pokemon from '../UI/components/Pokemon';
import * as pokereq from '../services/pokemonRequests';

global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  fetch.resetMocks();
});

/*
test('returns result if object', () => {
  fetch.mockResponseOnce(JSON.stringify(ditto));
  const onResponse = jest.fn();
  const onError = jest.fn();
  return getOnePokemon()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onResponse.mock.calls[0][0]).toEqual(ditto);
      console.log(onResponse.mock.calls);
    });
});
*/

test('Does Pokemon render correctly', async () => {
  //fetch.mockResponseOnce(JSON.stringify(ditto));
  console.log(pokereq);
  /*
  jest.spyOn(pokereq, 'getOnePokemon').mockImplementation(() => {
    return JSON.stringify(ditto);
  });
  */
  pokereq.getOnePokemon = jest.fn().mockImplementation(url => {
    console.log(url);
    return ditto;
  });
  //jest.useFakeTimers();
  const handlePress = jest.fn();
  //async function wait() {
  const tree = render(
    <Pokemon
      details={{
        name: 'ditto',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      }}
      press={handlePress}
    />,
  );

  //}
  //await wait();
  /*
    await act(async () => {
      jest.runAllTimers();
    });
    */
  expect(screen.getByTestId('activity')).toBeTruthy();
  expect(pokereq.getOnePokemon).toHaveBeenCalled();

  await waitFor(() => {
    expect(screen.getByText('ditto')).toBeTruthy();
  });
  expect(screen.getByTestId('sprite').props.source.uri).toEqual(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
  );

  fireEvent.press(await screen.findByTestId('pressable'));
  expect(handlePress).toBeCalledWith(ditto);
  expect(pokereq.getOnePokemon).toBeCalled();
  expect(tree).toMatchSnapshot();
});
