const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

describe('API Tests', () => {

  // Prueba de conexión básica
  it('GET /api/datos - should respond with 200', async () => {
    const response = await request(app).get('/api/datos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Porque devuelve usuarios
  });

  // Prueba de signup
  it('POST /api/signup - should register a new user', async () => {
    const newUser = {
      firstName: "Test",
      lastName: "User",
      email: `testuser_${Date.now()}@example.com`, // Email único para cada test
      password: "securepassword"
    };

    const response = await request(app)
      .post('/api/signup')
      .send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('POST /api/signin - should login an existing user', async () => {
    const email = `loginuser_${Date.now()}@example.com`;
    const password = "mypassword";

    // Primero registramos el usuario
    await request(app)
      .post('/api/signup')
      .send({
        firstName: "Login",
        lastName: "User",
        email,
        password
      });

    // Luego intentamos hacer login
    const response = await request(app)
      .post('/api/signin')
      .send({ email, password });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.first_name).toBe("Login");
    expect(response.body.ID).toBeDefined();

    // Verificamos que el token sea válido
    const decoded = jwt.verify(response.body.token, 'secretKey'); // 🚨 Asegúrate que la clave coincida
    expect(decoded.email).toBe(email);
    expect(decoded.first_name).toBe("Login");
  });

  // Prueba de error: login con datos incorrectos
  it('POST /api/signin - should fail with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(404); // Porque el usuario no existe
    expect(response.body.error).toBe('User not found');
  });

  describe('Token Generation', () => {
    it('should generate a valid JWT token with user data', () => {
      const mockUser = {
        id: 123,
        email: 'test@example.com',
        first_name: 'Test'
      };
  
      // Simulamos la creación del token (igual que en tu /api/signin)
      const token = jwt.sign(
        { userId: mockUser.id, email: mockUser.email, first_name: mockUser.first_name },
        'secretKey', // Usa la misma clave
        { expiresIn: '1h' }
      );
  
      // El token debería estar definido
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
  
      // Decodificamos el token para validar su contenido
      const decoded = jwt.verify(token, 'secretKey');
  
      expect(decoded.userId).toBe(mockUser.id);
      expect(decoded.email).toBe(mockUser.email);
      expect(decoded.first_name).toBe(mockUser.first_name);
  
      // También podrías probar que expira en 1 hora
      const expiresInOneHour = (decoded.exp - decoded.iat) === 3600;
      expect(expiresInOneHour).toBe(true);
    });
  });


});