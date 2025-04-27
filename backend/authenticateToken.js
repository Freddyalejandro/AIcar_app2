const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del header

    if (!token) {
        return res.status(403).json({ error: 'Access denied' });
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user; // Asignar los datos del usuario al objeto `req.user`
        next(); // Pasar al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;
