import { render, fireEvent, screen } from '@testing-library/react-native';
import LoginPage from '../app/signin';  // Asegúrate de que la ruta sea correcta

describe('LoginPage', () => {
  it('permite escribir en los campos de email y contraseña', () => {
    render(<LoginPage />);
    
    // Encuentra los campos de texto
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    // Simula la escritura en los campos
    fireEvent.changeText(emailInput, 'samuel@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    
    // Verifica que los valores se hayan actualizado
    expect(emailInput.props.value).toBe('samuel@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});
