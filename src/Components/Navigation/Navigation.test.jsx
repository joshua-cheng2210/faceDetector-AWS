import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {describe, it, test, expect, jest} from '@jest/globals';
import Navigation from './Navigation';
import { routeOptions } from '../../constants';

describe('Navigation', () => {
  test('when on routeOptions.HomeApp, renders Sign out, calls onRouteChange() and loadAcc()', () => {
    const onRouteChange = jest.fn(); // its an empty function. and this is fine because we dont care how it works but we only care that its called. (test the outputs of it some where else)
    const loadAcc = jest.fn();
    render(
      <Navigation
        onRouteChange={onRouteChange}
        currPage={routeOptions.HomeApp}
        loadAcc={loadAcc}
      />
    );
    const signOut = screen.getByText(/sign out/i);
    expect(signOut).toBeInTheDocument();
    fireEvent.click(signOut);
    expect(onRouteChange).toHaveBeenCalledWith(routeOptions.SignIn);
    expect(loadAcc).toHaveBeenCalledWith({});

    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  test('when on routeOptions.SignIn, renders Register, calls onRouteChange() on click', () => {
    const onRouteChange = jest.fn();
    render(
      <Navigation
        onRouteChange={onRouteChange}
        currPage={routeOptions.SignIn}
      />
    );
    const register = screen.getByText(/register/i);
    expect(register).toBeInTheDocument();
    fireEvent.click(register);
    expect(onRouteChange).toHaveBeenCalledWith(routeOptions.Register);
    expect(onRouteChange).toHaveBeenCalledTimes(1);

    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  test('when on routeOptions.Register, renders Sign in and calls onRouteChange() on click', () => {
    const onRouteChange = jest.fn();
    render(
      <Navigation
        onRouteChange={onRouteChange}
        currPage={routeOptions.Register}
      />
    );
    const signIn = screen.getByText(/sign in/i);
    expect(signIn).toBeInTheDocument();
    fireEvent.click(signIn);
    expect(onRouteChange).toHaveBeenCalledWith(routeOptions.SignIn);
    
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });
});