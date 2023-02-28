import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react-native';
import 'react-native';
import React from 'react';
import GoToFavorites from '../UI/components/GoToFavorites';

describe('Testing button for favorites page navigation', () => {
  test('Confirm button renders properly and function triggers', async () => {
    const mockF = jest.fn();
    const tree = render(<GoToFavorites go={mockF} />);
    expect(screen.findByText('Favorites')).toBeTruthy();
    expect(screen.findByTestId('go')).toBeTruthy();
    fireEvent.press(await screen.findByTestId('go'));
    expect(mockF).toBeCalled();
  });
});
