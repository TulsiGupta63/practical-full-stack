const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Register
router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, gender, aadharNumber, age, location } = req.body;
        const user = new User({ username, gender, aadharNumber, age, address: { location } });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/bats');
        });
    } catch (e) {
        res.redirect('/register');
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
}), (req, res) => {
    res.redirect('/bats');
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;
