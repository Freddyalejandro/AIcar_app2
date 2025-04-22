// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT y extraer el user_id
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'secretKey', (err, user) => { // Reemplaza 'secretKey' con tu clave secreta
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user; // Inyectamos el user_id y otros datos del usuario en req.user
        next(); // Llamamos al siguiente middleware o ruta
    });
}

module.exports = authenticateToken;
