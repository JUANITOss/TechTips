const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');

const router = express.Router();

// Multer for files (PFP)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|svg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, .png, .svg formats allowed!'));
        }
    }
});

// Register
router.post('/register', upload.single('profilePicture'), async (req, res) => {
    const { email, username, password, name, surname, phoneNumber} = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            name,
            surname,
            phoneNumber,
            profilePicture,
            subscription: false,
        });

        await newUser.save();

        const user = await User.findOne({ email });

        req.session.userId = user._id;
        req.session.email = user.email;

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id;
        req.session.email = user.email;

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// GetCurrentUser
router.get('/currentUser', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await User.findById(req.session.userId).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
});

// Update user profile information
router.put('/updateProfile', async (req, res) => {
    const { username, password, name, surname, phoneNumber } = req.body;
    
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

// Update pfp
router.put('/updateProfilePicture', upload.single('profilePicture'), async (req, res) => {
    const profilePicture = req.file ? req.file.filename : null;

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.status(200).json({ message: 'Profile picture updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile picture', error });
    }
});

// Update subscription status
router.put('/updateSubscription', async (req, res) => {
    const { subscription } = req.body;

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.subscription = subscription;

        await user.save();
        res.status(200).json({ message: 'Subscription status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscription status', error });
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error logging out', error: err });
            } else {
                return res.status(200).json({ message: 'Logout successful' });
            }
        });
    } else {
        return res.status(400).json({ message: 'No active session' });
    }
});

module.exports = router;
