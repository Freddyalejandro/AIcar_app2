import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import LoginPage from '../app/signin'; // Asegúrate de que la ruta sea correcta
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));
global.fetch = jest.fn();
describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clean the mocks before each test
  });

  it('allows you to write email and password', () => {
    render(<LoginPage />);

    // Encuentra los campos de texto y el botón
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

// Simulate writing to fields
    fireEvent.changeText(emailInput, 'samuel@test.com');
    fireEvent.changeText(passwordInput, 'mypassword');

    // Verify that the values ​​are correct
    expect(emailInput.props.value).toBe('samuel@test.com');
    expect(passwordInput.props.value).toBe('mypassword');
  });

  it('navega al hacer login exitoso', async () => {
    render(<LoginPage />);
  
// Simulates the email and password values
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('SIGN IN');
  
    fireEvent.changeText(emailInput, 'samuel@test.com');
    fireEvent.changeText(passwordInput, 'mypassword');
  
// Simulates a successful response from the backend
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        success: true,
        token: 'mocked-token',
        first_name: 'Samuel'
      })
    });
  
    fireEvent.press(signInButton);
  
    // Wait for AsyncStorage to have been called to save the token
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'mocked-token');
    });
  
// Verify that the name has been saved in AsyncStorage
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userName', 'Samuel');
    });
  });
  

  it('muestra error si la respuesta del backend falla', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('SIGN IN');

    fireEvent.changeText(emailInput, 'samuel@test.com');
    fireEvent.changeText(passwordInput, 'mypassword');

    // Simula una respuesta con error del backend
    const errorMessage = 'Invalid credentials';
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ success: false, error: errorMessage })
    });

    fireEvent.press(signInButton);

    // Espera que el mensaje de error se muestre
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });
});
