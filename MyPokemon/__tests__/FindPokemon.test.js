import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react-native';
import 'react-native';
import React from 'react';
import FindPokemon from '../UI/components/FindPokemon';

describe('Test search pokemon component', () => {
  test('Component renders correctly with error prop false and no entered text', async () => {
    const error = false;
    const whichMock = jest.fn();
    const tree = render(<FindPokemon which={whichMock} isError={error} />);
    expect(screen.getByText('Search For A Pokemon')).toBeTruthy();
    expect(screen.getByPlaceholderText('Click here')).toBeTruthy();
  });

  test('Component error message renders', async () => {
    const error = true;
    const whichMock = jest.fn();
    const tree = render(<FindPokemon which={whichMock} isError={error} />);
    expect(screen.getByText('NO MATCHING POKEMON FOUND')).toBeTruthy();
  });

  test('Entering search text works and cancel search works, confirm prop function is fired on change', () => {
    const error = false;
    const whichMock = jest.fn();
    const tree = render(<FindPokemon which={whichMock} isError={error} />);
    fireEvent.changeText(
      screen.getByPlaceholderText('Click here'),
      'charmander',
    );
    expect(screen.getByText('Cancel Search')).toBeTruthy();
    fireEvent.press(screen.getByTestId('cancel'));
    expect(screen.queryByText('Cancel Search')).toBeNull();
    expect(screen.getByPlaceholderText('Click here').props.value).toEqual('');
    expect(whichMock).toHaveBeenCalledTimes(2);
  });
});
