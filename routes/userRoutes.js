const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// route de test
router.get('/test', (req, res) => res.send('hello'));

// login (obtenir token)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Bad credential / incorrect user' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
});

// enregistrement nouvel utilisateur
router.post('/register', async (req, res) => {
    const { nom, prenom, email, pseudo, password } = req.body;
    if (!nom || !prenom || !email || !pseudo || !password) return res.status(400).json({ message: 'Champs obligatoires' });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ nom, prenom, email, pseudo, password: hashedPassword });

    res.json({ message: 'OK' });
});

// profil utilisateur (token requis)
router.get('/profil', verifyToken, async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ['nom', 'prenom', 'email', 'pseudo'] });
    res.json(user);
});

// upload fichier (token requis)
router.post('/add-file', verifyToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier fourni' });
    }
    res.json({ message: 'Fichier uploadé', filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});


// delete utilisateur (admin requis)
router.delete('/users/rm/:id', verifyToken, verifyAdmin, async (req, res) => {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Utilisateur supprimé' });
});

// bloquer utilisateur (admin requis)
router.put('/users/ban/:id', verifyToken, verifyAdmin, async (req, res) => {
    await User.update({ role: 'banned' }, { where: { id: req.params.id } });
    res.json({ message: 'Utilisateur banni' });
});

// lister tous les utilisateurs (admin requis)
router.get('/users/list', verifyToken, verifyAdmin, async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'nom', 'prenom', 'email', 'pseudo', 'role'] });
    res.json(users);
});

// up un utilisateur en admin (admin requis)
router.put('/user/up/:id', verifyToken, verifyAdmin, async (req, res) => {
    await User.update({ role: 'admin' }, { where: { id: req.params.id } });
    res.json({ message: 'Utilisateur promu admin' });
});

// down un admin en utilisateur (admin requis)
router.put('/user/down/:id', verifyToken, verifyAdmin, async (req, res) => {
    await User.update({ role: 'user' }, { where: { id: req.params.id } });
    res.json({ message: 'Utilisateur rétrogradé' });
});

module.exports = router;
