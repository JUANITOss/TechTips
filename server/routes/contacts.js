const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const User = require('../models/User');

// Ruta para obtener todos los contactos de un usuario específico
router.get('/userContacts', async (req, res) => {
    const userId = req.session.userId;

    try {
        const user = await User.findOne({ _id: userId }).populate('contacts');
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.json({ contacts: user.contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para agregar un contacto a un usuario específico
router.post('/addContact', async (req, res) => {
    const { name, contactId } = req.body;
    const userId = req.session.userId;

    try {
        // Crear el contacto
        const newContact = await Contact.create({ name, contactId });

        // Asociar el contacto al usuario
        const user = await User.findOne({ _id: userId });
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        user.contacts.push(newContact);
        await user.save();

        res.status(201).json({ contact: newContact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
