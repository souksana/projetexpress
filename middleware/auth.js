const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé : administrateur requis' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
