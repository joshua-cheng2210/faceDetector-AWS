// SignIn.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {describe, it, test, expect, jest} from '@jest/globals';
import SignIn from './SignIn';
import { routeOptions } from '../../constants';
import userEvent from '@testing-library/user-event'

describe('SignIn Component', () => {
    const onRouteChangeMock = jest.fn();
    const loadAccMock = jest.fn();
    const updateIsSignedInMock = jest.fn();

    const renderComponent = () => {
        return render(
        <SignIn
            onRouteChange={onRouteChangeMock}
            loadAcc={loadAccMock}
            updateIsSignedIn={updateIsSignedInMock}
        />
        );
    };

    const beforeEachGlobalFetch = () => {
        onRouteChangeMock.mockClear();
        loadAccMock.mockClear();
        updateIsSignedInMock.mockClear();
    };

    const afterEachGlobalFetch = () => {
      global.fetch.mockRestore(); // Restore the original fetch function after each test
    };

    it("loading the signIn component successfully", () => {
      renderComponent()
  
      const SignInPage = screen.getByRole("heading", { name: /sign in/i }); //Sign In header
      expect(SignInPage).toBeInTheDocument();

      const emailTextBox = screen.getByRole("textbox", { name: /Email/i }); // Email input field
      expect(emailTextBox).toBeInTheDocument();

      const SingInSubmitButton = screen.getByRole("button", { name: /sign in/i }); // Sign In submit button
      expect(SingInSubmitButton).toBeInTheDocument();
    });

  it('updates email and password state on input change', () => {
    renderComponent()

    // screen.debug();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls loadAcc, updateIsSignedIn, and onRouteChange on successful submission', async () => {
    renderComponent();
    beforeEachGlobalFetch();

    // Mock the fetch function to simulate a successful login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'Test User' }), // Simulate a successful login
      })
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the fetch to complete (important when testing async code)
    await waitFor(() => expect(loadAccMock).toHaveBeenCalled());
    expect(loadAccMock).toHaveBeenCalledWith({ id: 1, name: 'Test User' });
    expect(updateIsSignedInMock).toHaveBeenCalled();
    expect(onRouteChangeMock).toHaveBeenCalledWith(routeOptions.HomeApp);

    // Restore the original fetch function
    afterEachGlobalFetch();
  });

  it('does not call loadAcc, updateIsSignedIn, and onRouteChange on failed submission', async () => {
    renderComponent();
    beforeEachGlobalFetch();

    // Mock the fetch function to simulate a failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve("login failed"), // Simulate a failed login
      })
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the fetch to complete (important when testing async code)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(loadAccMock).not.toHaveBeenCalled();
    expect(updateIsSignedInMock).not.toHaveBeenCalled();
    expect(onRouteChangeMock).not.toHaveBeenCalled();

    // Restore the original fetch function
    afterEachGlobalFetch();
  });

});