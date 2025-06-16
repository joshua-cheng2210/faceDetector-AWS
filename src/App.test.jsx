import React from 'react';
import { render, screen, fireEvent, debug, within } from '@testing-library/react';
import {describe, it, test, expect, jest} from '@jest/globals';
import App from './App';
import { routeOptions } from './constants';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // screen.debug();
  });

  // should be done in signIn.test.jsx
  // test("load signIn page on start", () => {
  //   render(<App />);
  //   const signInPage = screen.getByText(/sign in/i);
  //   expect(signInPage).toBeInTheDocument();
  // });

});